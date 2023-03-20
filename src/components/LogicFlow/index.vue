<template>
  <section class="LogicFlow">
    <div id="flow"></div>
  </section>
</template>

<script lang="ts" setup name="LogicFlow">
import { ref, onMounted } from 'vue'
import icon from './icon/rectImg';
import customRect from "./basic/customRect";
import customBezierEdge from "./edge/customBezierEdge";
import { selectedNodeStyle, nodeStyle, edgeStyle, selectedEdgeStyle, colors } from './utils/config'
import LogicFlow from '@logicflow/core'
import { Menu, DndPanel } from '@logicflow/extension';
import "@logicflow/core/dist/style/index.css";
import '@logicflow/extension/lib/style/index.css'
let lfRef = null
let selectedNode = { type: '', id: '' }
const emit = defineEmits(['parentNodes'])

const clearSelectedNodeStyle = (lf) => {
  lf.setProperties(selectedNode.id, selectedNode.type === 'node' ? nodeStyle : edgeStyle)
}

const getFlowJson = () => {
  const data = lfRef.value.getGraphData()
  return data
}

const getAllParentNodes = (lf, id, currentTxt) => {
  const parentNodes = [currentTxt]
  function func(lf, id) {
    const nodes = lf.getNodeIncomingNode(id)
    const node = nodes && nodes[0]
    if (node) {
      parentNodes.push(node.text.value)
      func(lf, node.id)
    }
  }
  func(lf, id)
  emit('parentNodes', parentNodes)
  return parentNodes
}

defineExpose({
  lfRef,
  getFlowJson
})

onMounted(() => {
  const lf = new LogicFlow({
    container: document.querySelector("#flow"),
    plugins: [Menu, DndPanel],
    snapline: false,
  });
  lfRef = ref(lf)
  lf.setDefaultEdgeType('bezier')
  lf.register(customRect);
  lf.register(customBezierEdge);
  lf.setDefaultEdgeType('custom-bezier')
  lf.on('node:click', ({ data }) => {
    // 先清除之前的颜色
    clearSelectedNodeStyle(lf)
    // 再设置新的id
    lf.setProperties(data.id, selectedNodeStyle)
    selectedNode = { id: data.id, type: 'node' }
    getAllParentNodes(lf, data.id, data.text.value)
  });
  lf.on('edge:click', ({ data }) => {
    // 先清除之前的颜色
    clearSelectedNodeStyle(lf)
    // 再设置新的id
    lf.setProperties(data.id, selectedEdgeStyle)
    selectedNode = { id: data.id, type: 'edge' }
  });
  lf.on('blank:click', () => {
    clearSelectedNodeStyle(lf)
    selectedNode = { id: 'blank', type: 'blank' }
  });
  lf.setTheme({
    bezier: {
      stroke: colors.edgeColor,
      adjustLine: {
        stroke: '#949494',
      },
      adjustAnchor: {
        r: 4,
        fill: '#949494',
        stroke: '#949494',
        fillOpacity: 1,
      },
    },
    nodeText: {
      fontSize: 13,
    },
    edgeText: {
      fontSize: 13,
    },
  })
  lf.extension.dndPanel.setPatternItems([
    {
      type: 'custom-rect',
      label: '请拖拽节点',
      icon,
      className: 'flow-rect-node'
    },
  ]);

  // ajax 获取数据
  lf.render({
    "nodes": [
      {
        "id": "0aae5afe-6f20-49ca-98ef-30d73e345c98",
        "type": "custom-rect",
        "x": 588,
        "y": 177,
        "properties": {
          "fill": "#E7F7FE",
          "stroke": "#90CFFD"
        },
        "text": {
          "x": 588,
          "y": 177,
          "value": "a"
        }
      },
      {
        "id": "0412a0e6-eb33-4b9f-895b-ec12295dcb5c",
        "type": "custom-rect",
        "x": 237,
        "y": 170,
        "properties": {
          "fill": "#E7F7FE",
          "stroke": "#90CFFD"
        },
        "text": {
          "x": 237,
          "y": 170,
          "value": "b"
        }
      },
      {
        "id": "d096b7fa-0b9c-4b99-bfa8-b10f2b4dff62",
        "type": "custom-rect",
        "x": 932,
        "y": 170,
        "properties": {
          "fill": "#94D5FD",
          "stroke": "#40A6FE"
        },
        "text": {
          "x": 932,
          "y": 170,
          "value": "c"
        }
      }
    ],
    "edges": [
      {
        "id": "f94ef84d-9c88-42c0-b2c2-6807caef249f",
        "type": "custom-bezier",
        "sourceNodeId": "0aae5afe-6f20-49ca-98ef-30d73e345c98",
        "targetNodeId": "0412a0e6-eb33-4b9f-895b-ec12295dcb5c",
        "startPoint": {
          "x": 538,
          "y": 177
        },
        "endPoint": {
          "x": 287,
          "y": 170
        },
        "properties": {},
        "pointsList": [
          {
            "x": 538,
            "y": 177
          },
          {
            "x": 438,
            "y": 177
          },
          {
            "x": 387,
            "y": 170
          },
          {
            "x": 287,
            "y": 170
          }
        ]
      },
      {
        "id": "7aa8128e-9d06-47e5-aad3-9011ee1664c0",
        "type": "custom-bezier",
        "sourceNodeId": "0aae5afe-6f20-49ca-98ef-30d73e345c98",
        "targetNodeId": "d096b7fa-0b9c-4b99-bfa8-b10f2b4dff62",
        "startPoint": {
          "x": 638,
          "y": 177
        },
        "endPoint": {
          "x": 882,
          "y": 170
        },
        "properties": {
          "stroke": "#AAB7C4"
        },
        "text": {
          "x": 760,
          "y": 173.5,
          "value": "可以写文字"
        },
        "pointsList": [
          {
            "x": 638,
            "y": 177
          },
          {
            "x": 738,
            "y": 177
          },
          {
            "x": 782,
            "y": 170
          },
          {
            "x": 882,
            "y": 170
          }
        ]
      }
    ]
  })
})
</script>

<style lang="less">
.LogicFlow {
  height: 100vh;

  #flow {
    height: 100%;
    width: 100%;

    .flow-rect-node {
      .lf-dnd-shape {
        background-size: 100% 80%;
        width: 50px;
        height: 40px;
      }
    }

    rect {
      cursor: pointer;
    }

    .uml-wrapper {}
  }
}
</style>
