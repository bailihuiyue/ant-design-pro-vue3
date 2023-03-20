<template>
  <section class="LogicFlow">
    <div id="flow"></div>
  </section>
</template>

<script lang="ts" setup name="LogicFlow">
import { ref, onMounted, watch } from 'vue'
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
const props = defineProps(['flowData'])

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
    getAllParentNodes(lf, data.id, data?.text?.value)
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
  watch(
    () => props.flowData,
    (newVal) => {
      lf.render(newVal)
    },
    {
      deep: true,
      immediate: true
    }
  );
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
