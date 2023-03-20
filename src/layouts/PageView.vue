<template>
  <div :style="!router.currentRoute.value?.meta?.hiddenHeaderContent ? 'margin: -24px -24px 0px;' : ''">
    <!-- pageHeader , route meta :true on hide -->
    <page-header v-if="true" :title="state.pageTitle" :logo="logo" :avatar="avatar">
      <slot slot="action" name="action">222</slot>
      <slot slot="content" name="headerContent">111</slot>
      <div slot="content" v-if="!this.$slots.headerContent && state.description">
        <p style="font-size: 14px;color: rgba(0,0,0,.65)">{{ state.description }}</p>
        <div class="link">
          <template v-for="(link, index) in state.linkList" :key="index">
            <a @click="() => { link.callback && link.callback() }">
              <!-- <a-icon :type="link.icon" /> -->
              <span>{{ link.title }}</span>
            </a>
          </template>
        </div>
      </div>
      <slot slot="extra" name="extra">
        <div class="extra-img">
          <img v-if="typeof state.extraImage !== 'undefined'" :src="state.extraImage" />
        </div>
      </slot>
      <div slot="pageMenu">
        <div class="page-menu-search" v-if="state.search">
          <a-input-search style="width: 80%; max-width: 522px;" placeholder="请输入..." size="large" enterButton="搜索" />
        </div>
        <div class="page-menu-tabs" v-if="state.tabs?.items">
          <!-- @change="callback" :activeKey="activeKey" -->
          <a-tabs :tabBarStyle="{ margin: 0 }" :activeKey="state.tabs.active()" @change="state.tabs.callback">
            <a-tab-pane v-for="item in state.tabs.items" :tab="item.title" :key="item.key"></a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </page-header>
    <div class="content">
      <div class="page-header-index-wide">
        <slot>
          <!-- keep-alive  -->
          <keep-alive v-if="multiTab">
            <router-view ref="contentRef" />
          </keep-alive>
          <router-view v-else ref="contentRef" />
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="PageView">
import { reactive, onMounted, onUpdated, toRefs, ref } from 'vue'
import PageHeader from '@/components/PageHeader/index.vue'
import useSiteSettings from '@/store/useSiteSettings'
import { useRouter } from 'vue-router'
// info:todo:用处不大,尚未完成
const props = defineProps({
  avatar: {
    type: String,
    default: null
  },
  title: {
    type: [String, Boolean],
    default: true
  },
  logo: {
    type: String,
    default: null
  },
  directTabs: {
    type: Object,
    default: null
  }
})
const router = useRouter()
const { multiTab } = useSiteSettings()
const state = reactive<any>({
  pageTitle: null,
  description: null,
  linkList: [],
  extraImage: '',
  search: false,
  tabs: {}
})
const contentRef = ref()
const getPageMeta = () => {
  state.pageTitle =
    typeof props.title === 'string' || !props.title
      ? props.title
      : router.currentRoute.value.meta.title

  const content = contentRef.value
  if (content) {
    if (content.pageMeta) {
      Object.assign({}, content.pageMeta)
    } else {
      state.description = content.description
      state.linkList = content.linkList
      state.extraImage = content.extraImage
      state.search = content.search === true
      state.tabs = content.tabs
    }
  }
}

onMounted(() => {
  state.tabs = props.directTabs
  getPageMeta()
})

onUpdated(() => {
  getPageMeta()
})
</script>

<style lang="less" scoped>
.content {
  margin: 24px 24px 0;

  .link {
    margin-top: 16px;

    &:not(:empty) {
      margin-bottom: 16px;
    }

    a {
      margin-right: 32px;
      height: 24px;
      line-height: 24px;
      display: inline-block;

      i {
        font-size: 24px;
        margin-right: 8px;
        vertical-align: middle;
      }

      span {
        height: 24px;
        line-height: 24px;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
}

.page-menu-search {
  text-align: center;
  margin-bottom: 16px;
}

.page-menu-tabs {
  margin-top: 48px;
}

.extra-img {
  margin-top: -60px;
  text-align: center;
  width: 195px;

  img {
    width: 100%;
  }
}

.mobile {
  .extra-img {
    margin-top: 0;
    text-align: center;
    width: 96px;

    img {
      width: 100%;
    }
  }
}
</style>
