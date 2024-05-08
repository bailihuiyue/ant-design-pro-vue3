import { chartType, chartFeildsList } from '../../types'
import {
  grid,
  axisPointer,
  customerToolTip,
  diffTip,
  boundaryGap,
  axisLabel,
  barGap,
  colors
} from './chartTools'

// 配置库: 所有echart用到的属性都放在这里,这里是生成图表的默认值
// 根据chartFeildsList生成一套配置用来对应某一种图表
const configLibs = (type = chartType.bar) => {
  const libs = {
    //  ***********通用设置**********
    grid: {
      top: 50,
      left: 10,
      right: 10,
      bottom: 5,
      containLabel: true
    },
    title: {
      padding: 10,
      text: '',
      textStyle: {
        color: '#808187',
        fontWeight: 'normal',
        fontSize: 18
      },
      left: 'center'
    },
    legend_lineOrBar: {
      show: true,
      data: ['图例1', '图例2'],
      top: 10,
      left: 'center',
      textStyle: {
        fontSize: 12
      }
    },
    xAxis: {
      id: '', // 唯一标识
      show: true, //是否显示 x 轴。
      type: 'category', //坐标轴类型。 value,category,time,log
      name: '', //坐标轴名称。
      nameTextStyle: {
        color: '' //坐标轴名称的颜色
      },
      axisLabel: {
        interval: 0, //坐标轴刻度标签的显示间隔
        color: '', //坐标轴刻度标签的颜色
        rotate: 0 //刻度标签旋转的角度
      },
      axisLine: {
        onZero: false, //轴线是否在0刻度轴上
        lineStyle: {
          color: '#808188' //坐标轴轴线颜色
        }
      },
      axisTick: {
        // 显示分割线
        show: true
      },
      splitLine: {
        show: false, //x轴分割线
        lineStyle: {
          type: 'solid' //solid dashed dotted
        }
      },
      triggerEvent: true, // 是否可点击
      boundaryGap,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: [
      {
        show: true,
        type: 'value',
        axisLabel: {
          formatter: function (value: number, index: number) {
            // return value !== 0 ? parseInt(value / 1000 + '') + '千万' : 0
            return value !== 0 ? value + '万' : 0
          },
          color: '#888', //坐标轴刻度标签的颜色
          rotate: 0, //刻度标签旋转的角度,
          customLabel: {
            open: true,
            scale: 1,
            unit: '万'
          }
        },
        axisTick: { show: true },
        axisLine: {
          show: true,
          lineStyle: { color: '#888' }
        },
        name: '',
        nameTextStyle: {},
        splitLine: {
          show: true, //y轴分割线
          lineStyle: {
            type: 'solid' //solid dashed dotted
          }
        },
        alignTicks: true
      }
    ],
    //  ***********折线图,柱状图**********
    // 折柱series通用
    series_lineOrBar: [
      {
        key: 'xxx',
        data: [120, 200, 150, 80, 70, 110, 130],
        type,
        name: '图例1',
        barGap,
        itemStyle: {
          color: colors.lightBlue
        }
      },
      {
        key: 'kkk',
        data: [180, 250, 180, 30, 50, 150, 100],
        type,
        name: '图例2',
        barGap,
        itemStyle: {
          color: colors.mainBlue
        }
      }
    ],
    //  ***********饼图**********
    legend_pie: {
      show: true,
      // data: ['图例1', '图例2'],
      top: 0,
      left: 'left',
      orient: 'vertical',
      textStyle: {
        fontSize: 12
      }
    },
    tooltip_pie: {
      trigger: 'item'
    },
    series_pie: {
      name: 'Access From',
      type: 'pie',
      radius: [0, 60], //饼图半径
      itemStyle: {
        borderRadius: 0, //饼图圆角
        borderColor: '#fff',
        borderWidth: 0 //描边线宽
      },
      avoidLabelOverlap: false,
      label: {
        show: true,
        fontSize: 12
      },
      labelLine: {
        show: true
      },
      roseType: false, //是否展示成南丁格尔图  false,'radius'
      data: [
        { value: 1048, name: '天津', itemStyle: { color: null } },
        { value: 735, name: '北京', itemStyle: { color: null } },
        { value: 580, name: '上海', itemStyle: { color: null } }
      ],
      emphasis: {
        label: {
          show: true
          // fontSize: 20,
          // fontWeight: 'bold'
        },
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  }
  let configObj = {}
  const list = chartFeildsList[type]
  list.forEach((item) => {
    configObj[item.split('_')[0]] = libs[item]
  })
  return configObj
}

export default {
  [chartType.bar]: {
    // 用于拖拽后新形成的组件的id,拖拽前为null
    name: '柱状图',
    fieldId: null,
    chartType: chartType.bar,
    interfaceUrl: '',
    span: 8,
    theme: 'blue',
    chartOption: configLibs(chartType.bar)
  },
  [chartType.line]: {
    name: '折线图',
    fieldId: null,
    chartType: chartType.line,
    interfaceUrl: '',
    span: 8,
    theme: 'blue',
    chartOption: configLibs(chartType.line)
  },
  [chartType.pie]: {
    name: '饼图',
    fieldId: null,
    chartType: chartType.pie,
    interfaceUrl: '',
    span: 8,
    chartOption: configLibs(chartType.pie)
  },
  [chartType.custom]: {
    name: '自定义图表',
    fieldId: null,
    chartType: chartType.custom,
    interfaceUrl: '',
    span: 8,
    chartOption: {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }
      ]
    }
  },
  [chartType.lineBar]: {
    // 用于拖拽后新形成的组件的id,拖拽前为null
    name: '折柱混合图',
    fieldId: null,
    chartType: chartType.lineBar,
    interfaceUrl: '',
    dataPosition: ['series', 'data'],
    span: 8,
    chartOption: {
      grid,
      tooltip: {
        trigger: 'axis',
        axisPointer
        // formatter: (params) => {}
      },
      legend: {
        data: ['1', '2', '3', '4', '5']
      },
      title: {
        padding: 10,
        text: undefined,
        textStyle: {
          color: '#000',
          fontWeight: 'normal',
          fontSize: 18
        },
        title: 'center',
        left: 'center'
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        triggerEvent: true,
        boundaryGap,
        axisLabel,
        axisLine: {
          onZero: false //轴线是否在0刻度轴上
        }
      },
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            formatter: function (value: number, index: number) {
              // return value !== 0 ? parseInt(value / 1000 + '') + '千万' : 0
              return value !== 0 ? value + '万' : 0
            },
            ...axisLabel
          },
          alignTicks: true
        },
        {
          type: 'value',
          axisLabel: {
            formatter: function (value: number, index: number) {
              return value !== 0 ? value + '万' : 0
              // return Math.abs(value) >= 10000 ? parseInt(value / 10000 + '') + '亿' : value
            },
            ...axisLabel
          },
          alignTicks: true
        }
      ],
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          name: '1',
          barGap,
          itemStyle: {
            color: colors.lightBlue
          }
        },
        {
          key: 'kkk',
          data: [180, 250, 180, 30, 50, 150, 100],
          type: 'line',
          name: '2',
          barGap,
          itemStyle: {
            color: colors.mainBlue
          },
          yAxisIndex: 1
        }
      ]
    }
  }
}
