import { BezierEdge, BezierEdgeModel } from '@logicflow/core'
import { getShapeStyleFuction, getTextStyleFunction } from '../utils/getShapeStyleUtil'

// 贝塞尔曲线
class Model extends BezierEdgeModel {
  constructor(data, graphModel) {
    super(data, graphModel)
    this.strokeWidth = 1
  }
  // getTextStyle() {
  //   const style = super.getTextStyle()
  //   return getTextStyleFunction(style, this.properties)
  // }

  getEdgeStyle() {
    const attributes = super.getEdgeStyle()
    const properties = this.properties;
    const style = getShapeStyleFuction(attributes, properties)
    return { ...style }
  }

  // setAttributes() {
  //   this.isAnimation = true;
  // }
  // getEdgeAnimationStyle() {
  //   const style = super.getEdgeAnimationStyle();
  //   style.strokeDasharray = "20 2";
  //   style.animationDuration = "30s";
  //   return style;
  // }
}

export default {
  type: "custom-bezier",
  view: BezierEdge,
  model: Model
};
