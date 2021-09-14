<template>
  <div class="footer">
    <div :class="['links',isMobile?'lessMargin':'']">
      <a
        href="https://github.com/bailihuiyue/ant-design-pro-vue3/blob/main/README.md"
        target="_blank"
      >Pro 首页</a>
      <a
        href="https://github.com/bailihuiyue/ant-design-pro-vue3/blob/main/README.md"
        target="_blank"
      >
        <GithubOutlined />
      </a>
      <a href="https://ant.design/">Ant Design</a>
      <a href="https://2x.antdv.com/">Vue Antd</a>
    </div>
    <div class="copyright">
      Copyright
      <CopyrightOutlined />&nbsp;2021
      <span>Ones</span>
    </div>
  </div>
</template>

<script lang="ts">
import { CopyrightOutlined, GithubOutlined } from '@ant-design/icons-vue'
import { defineComponent } from 'vue'
import { isMobile } from '@/utils/device'

export default defineComponent({
  name: 'GlobalFooter',
  components: {
    CopyrightOutlined,
    GithubOutlined
  },
  setup() {
    return { isMobile }
  }
})
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

    &.lessMargin {
      a {
        &:not(:last-child) {
          margin-right: 20px;
        }
      }
    }
  }
  .copyright {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
}
</style>
