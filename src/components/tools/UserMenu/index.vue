<template>
  <div class="user-wrapper">
    <div class="content-box">
      <a
        href="https://github.com/bailihuiyue/ant-design-pro-vue3/blob/main/README.md"
        target="_blank"
      >
        <span class="action">
          <QuestionCircleOutlined />
        </span>
      </a>
      <notice-icon class="action" />
      <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <a-avatar class="avatar" size="small" :src="avatar" />
          <span class="nickname">{{ nickname }}</span>
        </span>
        <template #overlay>
          <a-menu class="user-dropdown-menu-wrapper">
            <!-- <a-menu-item key="0">
            <router-link :to="{ name: 'center' }">
              <a-icon type="user" />
              <span>个人中心</span>
            </router-link>
            </a-menu-item>-->
            <!-- <a-menu-item key="1">
            <router-link :to="{ name: 'settings' }">
              <a-icon type="setting" />
              <span>账户设置</span>
            </router-link>
            </a-menu-item>-->
            <a-menu-item key="4" @click="showSystemSetting">
              <a>
                <SettingOutlined />
                <span>{{ $t('tools.userMenu.systemConfig') }}</span>
              </a>
            </a-menu-item>
            <a-menu-item key="5" @click="onLockScreen">
              <a>
                <LockOutlined />
                <span>{{ $t('tools.userMenu.lockScreen') }}</span>
              </a>
            </a-menu-item>
            <!-- <a-menu-item key="2" disabled>
              <SettingOutlined />
              <span>{{ $t('tools.userMenu.test') }}</span>
            </a-menu-item>-->
            <a-menu-divider />
            <a-menu-item key="3">
              <a href="javascript:;" @click="handleLogout">
                <LogoutOutlined />
                <span>{{ $t('tools.userMenu.logout') }}</span>
              </a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <span style="overflow: hidden;display: inline-block;">
        <SelectLang :class="theme" class="action" />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NoticeIcon from '@/components/NoticeIcon/index.vue'
import { logout } from '@/views/user/service'
import { USER_INFO } from '@/store/mutation-types'
import { Modal } from 'ant-design-vue'
import {
  QuestionCircleOutlined,
  SettingOutlined,
  LogoutOutlined,
  LockOutlined
} from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
import SelectLang from '@/components/SelectLang'
import ls from '@/utils/Storage'
import { useRouter } from 'vue-router'
import { clearUserInfo } from '@/utils/util'

export default defineComponent({
  name: 'UserMenu',
  props: ['theme'],
  components: {
    NoticeIcon,
    QuestionCircleOutlined,
    SettingOutlined,
    LogoutOutlined,
    SelectLang,
    LockOutlined
  },
  setup(props) {
    const { t } = useI18n()
    const router = useRouter()
    const UserInfo = ls.get(USER_INFO)
    const store = useStore()
    const handleLogout = () => {
      Modal.confirm({
        title: t('tools.userMenu.tip'),
        content: t('tools.userMenu.checkLogout'),
        onOk: () => {
          logout().then((res) => {
            clearUserInfo()
            router.push({ path: '/user/login' })
          })
        },
        onCancel() {}
      })
    }
    const showSystemSetting = () => {
      store.commit('SET_SETTING_DRAWER', true)
    }

    const onLockScreen = () => {
      store.commit('SET_LOCK_SCREEN', true)
    }

    return {
      avatar: UserInfo.avatar,
      nickname: UserInfo.name,
      handleLogout,
      showSystemSetting,
      onLockScreen
    }
  }
})
</script>
<style lang="less">
.user-dropdown-menu-wrapper {
  .ant-dropdown-menu-item {
    width: 100% !important;
  }
}
</style>
