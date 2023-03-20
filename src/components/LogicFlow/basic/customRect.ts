import { RectNode, RectNodeModel, HtmlNode, HtmlNodeModel } from "@logicflow/core";
import { getShapeStyleFuction } from '../utils/getShapeStyleUtil'
import { colors } from '../utils/config'

class CustomRectNode extends RectNode { }

class CustomRectModel extends RectNodeModel {
  initNodeData(data) {
    super.initNodeData(data);
    this.width = 100;
    this.height = 60;
    this.radius = 10;
  }
  getNodeStyle() {
    const style = super.getNodeStyle();
    style.stroke = colors.nodeBorderColor
    style.fill = colors.nodeColor
    const properties = this.getProperties()
    return getShapeStyleFuction(style, properties)
  }
}

class ButtonNode extends HtmlNode {
  setHtml(rootEl) {
    const { properties } = this.props.model;

    const el = document.createElement("div");
    el.className = "uml-wrapper";
    const html = `
      <div style="width:100px;height:60px;border:2px solid #349EFF;background-color:#E8F8FF;border-radius:10px">
      </div>
    `;
    el.innerHTML = html;
    rootEl.innerHTML = "";
    rootEl.appendChild(el);
  }
}

class ButtonNodeModel extends HtmlNodeModel {
  setAttributes() {
    this.stroke = '#349EFF';
    this.fill = '#E8F8FF'
    this.width = 100;
    this.height = 60;
    this.radius = 10;
  }
}

export default {
  type: "custom-rect",
  view: CustomRectNode,
  model: CustomRectModel
};
