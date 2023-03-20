<template>
  <div class="Logicflow">
    <a-alert message="一个可以显示流程图的插件,基于滴滴的logicflow,封装成vue3的版本,点击任意节点可以输出他所有的父级名称" />
    <a-button type="primary" style="margin:10px 0" @click="onSaveFlowData">保存</a-button>
    <LogicFlow ref="logicFlowRef" @parentNodes="onSetParentNodes" :flowData="flowData" />
  </div>
</template>
<script lang='ts' setup name="Logicflow">
import { ref } from 'vue'
import LogicFlow from '@/components/LogicFlow/index.vue'
const logicFlowRef = ref()
const onSaveFlowData = () => {
  const data = logicFlowRef.value.getFlowJson()
  console.log(data)
}
const onSetParentNodes = data => {
  console.log(data)
}

const flowData = {
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
}

</script>
<style lang='less'>
.Logicflow {}
</style>
