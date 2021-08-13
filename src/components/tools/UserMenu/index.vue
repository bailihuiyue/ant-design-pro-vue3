<template>
  <div class="user-wrapper">
    <div class="content-box">
      <!-- TODO:可以改成这个项目的readme.md -->
      <a href="https://pro.loacg.com/docs/getting-started" target="_blank">
        <span class="action">
          <QuestionCircleOutlined />
        </span>
      </a>
      <notice-icon class="action" />
      <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <a-avatar class="avatar" size="small" :src="avatar" />
          <span>{{ nickname }}</span>
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
                <span>{{ $t('tools_UserMenu.systemConfig') }}</span>
              </a>
            </a-menu-item>
            <a-menu-item key="2" disabled>
              <SettingOutlined />
              <span>{{ $t('tools_UserMenu.test') }}</span>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="3">
              <a href="javascript:;" @click="handleLogout">
                <LogoutOutlined />
                <span>{{ $t('tools_UserMenu.logout') }}</span>
              </a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NoticeIcon from '@/components/NoticeIcon/index.vue';
import { logout } from '@/views/user/service';
import { ACCESS_TOKEN, PERMISSION, USER_INFO } from '@/store/mutation-types';
import { ls, store, router } from '@/utils/commonImport';
import { Modal } from 'ant-design-vue';
import { QuestionCircleOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons-vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'UserMenu',
  components: {
    NoticeIcon,
    QuestionCircleOutlined,
    SettingOutlined,
    LogoutOutlined,
  },
  setup(props) {
    const { t } = useI18n();
    const UserInfo = ls.get('User_Info');
    // const store = useStore();
    const handleLogout = () => {
      Modal.confirm({
        title: t('tools_UserMenu.tip'),
        content: t('tools_UserMenu.checkLogout'),
        onOk: () => {
          logout().then((res) => {
            ls.remove(ACCESS_TOKEN);
            ls.remove(PERMISSION);
            ls.remove(USER_INFO);
            router.push({ path: '/user/login' });
          });
        },
        onCancel() {},
      });
    };
    const showSystemSetting = () => {
      store.commit('SET_SETTING_DRAWER', true);
    };

    return {
      avatar: UserInfo.avatar,
      nickname: UserInfo.name,
      handleLogout,
      showSystemSetting,
    };
  },
});
</script>
<style lang="less">
.user-dropdown-menu-wrapper {
  .ant-dropdown-menu-item {
    width: 100% !important;
  }
}
</style>
