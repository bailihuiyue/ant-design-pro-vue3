import { subtract, divide, add } from 'xe-utils'
import dayjs from 'dayjs'

// 普通grid
export const grid = {
  top: 50,
  left: 10,
  right: 10,
  bottom: 5,
  containLabel: true
}

// 带表头的且在左侧的图表grid
export const titleLeftChartGrid = {
  top: '80px',
  left: '10px',
  right: '10px',
  bottom: '5px',
  containLabel: true
}

export const fontSize = 14
export const months = new Array(12).fill(null).map((_, index) => index + 1 + '月')
export const colors = {
  lighterBlue: '#C8E1FA',
  lightBlue: '#84B7F9',
  mainBlue: '#4095E5',
  green: '#6EC89D',
  gray: '#D9D9D9',
  yellow: '#D9BD7B',
  orange: '#F6B66A',
  up: '#d95556',
  down: '#28bd74'
}

// 指示器类型(鼠标指向时X轴背景颜色)
export const axisPointer = {
  type: 'shadow'
}

// 刻度单位是否缩进 例如:1-12月,interval=1,就是1,3,5,7...月
export const axisLabel = {
  interval: 0,
  fontSize
}

// 刻度的字是否在中线(竖线)上
export const boundaryGap = true
// 去掉相邻柱形的间隔
export const barGap = '0%'

// 自定义tooltip
export const customerToolTip = (data) => {
  const { params, firstData, lastData, middleData } = data
  // params 是一个数组，数组中包含每个系列的数据信息
  let result = ''
  params.forEach((item, index) => {
    // item 是每一个系列的数据
    const seriesName = item.seriesName // 系列名称
    const value = item.value || 0 // 数据值
    const marker = item.marker // 标志图形
    const dataIndex = item.dataIndex
    const normalData = `${marker}${seriesName}: ${value}${moneyUnit}`
    if (index === 0) {
      result += (firstData?.(item, dataIndex) || normalData) + '<br/>'
      // result += `我是第一条<br/>${marker}${seriesName}: ${value}<br/>`
    } else if (params.length === index + 1) {
      result += (lastData?.(item, dataIndex) || normalData) + '<br/>'
      // result += `${marker}${seriesName}: ${value}<br/>我是最后一条`
    } else {
      const tempRes = middleData?.(item, dataIndex)
      result += tempRes === 'doEmpty' ? '' : (middleData?.(item, dataIndex) || normalData) + '<br/>'
      // if (item.seriesName === 'unFinshedProfit' || item.seriesName === '当年总利润') {
      //   if (value) {
      //     result += `${marker}当年总利润: ${value}<br/>`
      //   }
      // } else {
      //   result += `${marker}${seriesName}: ${value}<br/>`
      // }
    }
    // console.log(
    //   props.chartData.月总收入[item.dataIndex],
    //   props.chartData.去年总利润[item.dataIndex]
    // )
  })
  return result
}

export const moneyUnit = '万'

// 利润增加/减少的提示
export const diffTip = (
  { marker, seriesName, value },
  { index, data, diffValOrPer, yuceKey = '预测净利润', shijiKey = '实际净利润', hiddenIndex = null }
) => {
  const yuce = data[yuceKey][index]
  const shiji = data[shijiKey][index]
  const orginDotTip = `${marker}${seriesName}: ${value || 0}${moneyUnit}<br/>`
  let dopTip = ''

  // 不显示利润增加减少的列
  if (hiddenIndex !== null) {
    if (index > hiddenIndex) {
      return ''
    }
  }

  if (shiji) {
    const diff = subtract(shiji, yuce)
    // 差值
    if (diffValOrPer === '1') {
      dopTip = ` <span style='display:inline-block;width:15px'></span>利润 <span style="color: ${
        colors[diff >= 0 ? 'up' : 'down']
      }">${diff >= 0 ? '增加' : '减少'}: ${Math.abs(diff)}${moneyUnit}</span>`
    } else if (diffValOrPer === '2') {
      const difference = subtract(shiji, yuce)
      const diff = divide(difference, yuce).toFixed(2) + '%'
      // 百分比
      dopTip = ` <span style='display:inline-block;width:15px'></span>利润 <span style="color: ${
        colors[difference >= 0 ? 'up' : 'down']
      }">${difference >= 0 ? '增加' : '减少'}: ${diff}</span>`
    }
  }

  return orginDotTip + dopTip
}

export const currentMonthIndex = new Date().getMonth()
export const rightCharMonthStyle = new Array(12).fill(null).map((_, index) => {
  return {
    value: index + 1 + '月',
    textStyle: {
      color: currentMonthIndex === index ? colors.mainBlue : ''
    }
  }
})

export const currentYear = new Date().getFullYear()
export const YYYY_MM = (monthId) => dayjs(new Date(currentYear, monthId - 1, 1)).format('YYYY-MM')

export const themes = {
  auto: [null, null, null, null, null, null, null, null],
  dark: [
    'rgba(0,0,0,0.8)',
    'rgba(0,0,0,0.6)',
    'rgba(0,0,0,0.4)',
    'rgba(0,0,0,0.2)',
    'rgba(0,0,0,0.1)',
    'rgba(0,0,0,0.05)',
    'rgba(0,0,0,0.02)'
  ]
}
