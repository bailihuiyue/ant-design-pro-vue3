import * as echarts from 'echarts'
export interface ChartItem {
  // 图表中文名称
  name?: string
  // 用于拖拽后新形成的组件的id,拖拽前为null
  fieldId: null | string
  chartType: string
  interfaceUrl: string
  // 标记echat每个图标数据的位置,比如折线图是数据的series下面的data,那么该字段就是['series','data']
  dataPosition?: string[]
  // a-row占据的空间
  span?: number
  chartOption: any //echarts.EChartsOption
}

// 图表名称枚举
export const chartType = {
  // 折线图
  line: 'line',
  // 柱状图
  bar: 'bar',
  // 饼图
  pie: 'pie',
  // 散点图
  scatter: 'scatter',
  // 雷达图
  radar: 'radar',
  // 自定义
  custom: 'custom',
  // 折柱混合
  lineBar: 'lineBar'
}

// 每种图表所含有的字段
export const chartFeildsList = {
  // 折线图
  line: ['grid', 'legend_lineOrBar', 'title', 'xAxis', 'yAxis', 'series_lineOrBar'],
  // 柱状图
  bar: ['grid', 'legend_lineOrBar', 'title', 'xAxis', 'yAxis', 'series_lineOrBar'],
  // 饼图
  pie: ['title', 'legend_pie', 'series_pie', 'tooltip_pie'],
  // 散点图
  scatter: ['', '', '', '', '', '', '', '', '', '', ''],
  // 雷达图
  radar: ['', '', '', '', '', '', '', '', '', '', ''],
  // 自定义
  custom: ['', '', '', '', '', '', '', '', '', '', ''],
  // 折柱混合
  lineBar: ['', '', '', '', '', '', '', '', '', '', '']
}
