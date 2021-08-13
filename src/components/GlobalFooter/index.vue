<template>
  <div class="footer">
    <div class="links">
      <a href="https://pro.loacg.com/" target="_blank">Pro 首页</a>
      <a href="https://github.com/sendya/ant-design-pro-vue" target="_blank">
        <GithubOutlined />
      </a>
      <a href="https://ant.design/">Ant Design</a>
      <a href="https://vue.ant.design/">Vue Antd</a>
    </div>
    <div class="copyright">
      Copyright
      <CopyrightOutlined />2018
      <span>白鹭学园技术组出品</span>
    </div>
  </div>
</template>

<script lang="ts">
import { CopyrightOutlined, GithubOutlined } from '@ant-design/icons-vue';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'GlobalFooter',
  components: {
    CopyrightOutlined,
    GithubOutlined,
  },
});
</script>

<style lang="less" scoped>
.footer {
  padding: 0 16px;
  margin: 48px 0 24px;
  text-align: center;

  .links {
    margin-bottom: 8px;

    a {
      color: rgba(0, 0, 0, 0.45);

      &:hover {
        color: rgba(0, 0, 0, 0.65);
      }

      &:not(:last-child) {
        margin-right: 40px;
      }
    }
  }
  .copyright {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
}
</style>
