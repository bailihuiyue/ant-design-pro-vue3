import "ant-design-vue/lib/menu/style/index.css";
import "ant-design-vue/lib/dropdown/style/index.css";
import { Menu, Dropdown } from 'ant-design-vue'
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup () {
    const currentLang = ref(1)
    const changeLang = ({ key }) => currentLang.value = key
    const langMenu = (
      <Menu selectedKeys={[currentLang.value]} onClick={changeLang}>
        <Menu.Item key={1}>
          1
        </Menu.Item>
        <Menu.Item key={2}>
          2
        </Menu.Item>
      </Menu>
    )
    return () => <span>{currentLang.value}<Dropdown overlay={langMenu}><span>点我</span></Dropdown></span>
  }
})
