<template>
  <div class="main">
    <a-form id="formLogin" class="user-layout-login" @submit="handleSubmit" :model="formRef">
      <a-tabs
        :activeKey="customActiveKey"
        :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
        @change="handleTabClick"
      >
        <!-- 账户密码登录 -->
        <a-tab-pane key="tab1" :tab="$t('user.login.tab-login-credentials')">
          <a-alert
            v-if="isLoginError"
            type="error"
            showIcon
            style="margin-bottom: 24px"
            :message="$t('user.login.message-invalid-credentials')"
          />
          <a-form-item v-bind="validateInfos.username">
            <a-input
              size="large"
              type="text"
              :placeholder="$t('user.login.username.placeholder')"
              v-model:value="formRef.username"
            >
              <template #prefix>
                <UserOutlined :style="{ color: 'rgba(0,0,0,.25)' }" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item v-bind="validateInfos.password">
            <a-input-password
              size="large"
              :placeholder="$t('user.login.password.placeholder')"
              v-model:value="formRef.password"
            >
              <template #prefix>
                <LockOutlined :style="{ color: 'rgba(0,0,0,.25)' }" />
              </template>
            </a-input-password>
          </a-form-item>
        </a-tab-pane>
        <!-- 手机号登录 -->
        <a-tab-pane key="tab2" :tab="$t('user.login.tab-login-mobile')">
          <a-form-item v-bind="validateInfos.mobile">
            <a-input
              size="large"
              type="text"
              :placeholder="$t('user.login.mobile.placeholder')"
              v-model:value="formRef.mobile"
            >
              <MobileOutlined :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>

          <a-row :gutter="16">
            <a-col class="gutter-row" :span="16">
              <a-form-item v-bind="validateInfos.captcha">
                <a-input
                  size="large"
                  type="text"
                  :placeholder="$t('user.login.mobile.verification-code.placeholder')"
                  v-model:value="formRef.captcha"
                >
                  <MailOutlined :style="{ color: 'rgba(0,0,0,.25)' }" />
                </a-input>
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <a-button
                class="getCaptcha"
                tabindex="-1"
                :disabled="state.smsSendBtn"
                @click.stop.prevent="getCaptcha"
              >
                {{
                (!state.smsSendBtn && $t("user.register.get-verification-code")) ||
                state.time + " s"
                }}
              </a-button>
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>

      <a-form-item v-bind="validateInfos.rememberMe">
        <a-checkbox v-model:checked="formRef.rememberMe" style="float:left">
          {{
          $t("user.login.remember-me")
          }}
        </a-checkbox>
        <router-link
          :to="{ name: 'recover', params: { user: 'aaa' } }"
          class="forge-password"
          style="float: right"
        >{{ $t("user.login.forgot-password") }}</router-link>
      </a-form-item>

      <a-form-item style="margin-top: 24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
        >{{ $t("user.login.login") }}</a-button>
      </a-form-item>

      <div class="user-login-other">
        <span>{{ $t("user.login.sign-in-with") }}</span>
        <a>
          <AlipayCircleOutlined />
        </a>
        <a>
          <TaobaoCircleOutlined />
        </a>
        <a>
          <WeiboCircleOutlined />
        </a>
        <router-link class="register" :to="{ name: 'register' }">
          {{
          $t("user.login.signup")
          }}
        </router-link>
      </div>
    </a-form>

    <!-- <two-step-captcha
      v-if="requiredTwoStepCaptcha"
      :visible="stepCaptchaVisible"
      @success="stepCaptchaSuccess"
      @cancel="stepCaptchaCancel"
    ></two-step-captcha>-->
  </div>
</template>

<script lang="ts">
// import TwoStepCaptcha from '@/components/tools/TwoStepCaptcha.vue';
import { encryptByMd5 } from '@/utils/encrypt'
import { defineComponent, ref, reactive, UnwrapRef, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Form } from 'ant-design-vue'
import { loginSuccess, requestFailed } from './helper'
import { useRouter } from 'vue-router'
import {
  MobileOutlined,
  MailOutlined,
  AlipayCircleOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined,
  UserOutlined,
  LockOutlined
} from '@ant-design/icons-vue'
import * as api from './service'
import { FormState } from './types'
import config from '@/config/defaultSettings'
import generateAsyncRoutes from '@/router/generateAsyncRoutes'
import { useGetCaptcha } from './helper'

export default defineComponent({
  components: {
    // TwoStepCaptcha,
    MobileOutlined,
    UserOutlined,
    MailOutlined,
    AlipayCircleOutlined,
    TaobaoCircleOutlined,
    WeiboCircleOutlined,
    LockOutlined
  },
  setup() {
    const useForm = Form.useForm
    const { t } = useI18n()
    const router = useRouter()

    onMounted(() => {
      api
        .get2step()
        .then((res) => {
          requiredTwoStepCaptcha.value = res.result.stepCode
        })
        .catch(() => {
          requiredTwoStepCaptcha.value = 0
        })
      requiredTwoStepCaptcha.value = 1
    })

    const state = reactive({
      time: 60,
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      smsSendBtn: false
    })

    // #region 表单相关
    const formRef: UnwrapRef<FormState> = reactive({
      rememberMe: false,
      username: '',
      password: '',
      mobile: '',
      captcha: ''
    })

    const handleUsernameOrEmail = (rule, value: string) => {
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (regex.test(value)) {
        state.loginType = 0
      } else {
        state.loginType = 1
      }
      return Promise.resolve()
    }
    const rulesRef = reactive({
      rememberMe: [{ trigger: 'checked' }],
      username: [
        {
          required: true,
          message: t('user.username.required')
        },
        {
          validator: handleUsernameOrEmail,
          trigger: 'change'
        }
      ],
      password: [{ required: true, message: t('user.password.required') }, {}],
      mobile: [
        {
          required: true,
          pattern: /^1[34578]\d{9}$/,
          message: t('user.login.mobile.placeholder'),
          validateTrigger: 'change'
        }
      ],
      captcha: [
        {
          required: true,
          message: t('user.verification-code.required'),
          validateTrigger: 'blur'
        }
      ]
    })
    const { validate, validateInfos } = useForm(formRef, rulesRef)
    const isLoginError = ref(false)
    const handleSubmit = (e: Event) => {
      e.preventDefault()
      state.loginBtn = true
      const validateFieldsKey =
        customActiveKey.value === 'tab1' ? ['username', 'password'] : ['mobile', 'captcha']

      validate(validateFieldsKey)
        .then(async () => {
          formRef.password = encryptByMd5(formRef.password)
          const res = await api.userLogin(formRef)
          if (res) {
            // mock用,可删
            if (res.code === 403) {
              isLoginError.value = true
              formRef.password = ''
              state.loginBtn = false
              return
            }
            if (config.useAsyncRouter) {
              generateAsyncRoutes(router, res.menu)
            }
            loginSuccess(res, router)
            isLoginError.value = false
          } else {
            requestFailed(res)
            isLoginError.value = true
            formRef.password = ''
          }
          state.loginBtn = false
        })
        .catch((e) => {
          state.loginBtn = false
        })
    }
    // #endregion

    //#region 切换tab
    const customActiveKey = ref<string>('tab1')
    const handleTabClick = (key: string) => {
      customActiveKey.value = key
    }
    //#endregion

    //#region 获取验证码
    const getCaptcha = (e: Event) => {
      useGetCaptcha(e, validate, state, formRef, null)
    }
    //#endregion

    //#region TwoStepCaptcha暂时没用
    const requiredTwoStepCaptcha = ref<number>(0)
    const stepCaptchaVisible = ref<boolean>(false)
    const stepCaptchaSuccess = (res) => {
      loginSuccess(res, router)
    }
    const stepCaptchaCancel = () => {
      api.logout().then(() => {
        state.loginBtn = false
        stepCaptchaVisible.value = false
      })
    }
    //#endregion

    return {
      formRef,
      rulesRef,
      state,
      customActiveKey,
      isLoginError,
      requiredTwoStepCaptcha,
      stepCaptchaVisible,
      handleTabClick,
      handleSubmit,
      validateInfos,
      getCaptcha,
      stepCaptchaSuccess,
      stepCaptchaCancel
    }
  }
})
</script>

<style lang="less" scoped>
@import '../../style/index.less';

.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .anticon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: @primary-color;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
