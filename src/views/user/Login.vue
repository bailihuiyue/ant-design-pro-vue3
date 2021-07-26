<template>
  <div class="main">
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :rules="rules"
      :model="form"
      @submit="handleSubmit"
    >
      <a-tabs
        :activeKey="customActiveKey"
        :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
        @change="handleTabClick"
      >
        <a-tab-pane key="tab1" :tab="$t('user.login.tab-login-credentials')">
          <a-alert
            v-if="isLoginError"
            type="error"
            showIcon
            style="margin-bottom: 24px;"
            :message="$t('user.login.message-invalid-credentials')"
          />
          <a-form-item v-bind="validateInfos.username">
            <a-input
              size="large"
              type="text"
              :placeholder="$t('user.login.username.placeholder')"
              v-model:value="form.username"
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
              v-model:value="form.password"
            >
              <template #prefix>
                <LockOutlined :style="{ color: 'rgba(0,0,0,.25)' }" />
              </template>
            </a-input-password>
          </a-form-item>
        </a-tab-pane>
        <a-tab-pane key="tab2" :tab="$t('user.login.tab-login-mobile')">
          <a-form-item v-bind="validateInfos.mobile">
            <a-input
              size="large"
              type="text"
              :placeholder="$t('user.login.mobile.placeholder')"
              v-model:value="mobile"
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
                  v-model:value="captcha"
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
                v-text="!state.smsSendBtn && $t('user.register.get-verification-code') || (state.time+' s')"
              ></a-button>
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>

      <a-form-item v-bind="validateInfos.rememberMe">
        <a-checkbox v-model:checked="form.rememberMe">{{ $t('user.login.remember-me') }}</a-checkbox>
        <router-link
          :to="{ name: 'recover', params: { user: 'aaa'} }"
          class="forge-password"
          style="float: right;"
        >{{ $t('user.login.forgot-password') }}</router-link>
      </a-form-item>

      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
        >{{ $t('user.login.login') }}</a-button>
      </a-form-item>

      <div class="user-login-other">
        <span>{{ $t('user.login.sign-in-with') }}</span>
        <a>
          <AlipayCircleOutlined />
        </a>
        <a>
          <TaobaoCircleOutlined />
        </a>
        <a>
          <WeiboCircleOutlined />
        </a>
        <!-- <router-link class="register" :to="{ name: 'register' }">{{ $t('user.login.signup') }}</router-link> -->
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
// import TwoStepCaptcha from '@/components/tools/TwoStepCaptcha'
import { mapActions } from 'vuex';
import { encryptByMd5 } from '@/utils/encrypt';
import { defineComponent, ref, reactive, UnwrapRef } from 'vue';
import { Moment } from 'moment';
import { useI18n } from 'vue-i18n';
import { Form } from 'ant-design-vue';
import { loginSuccess, requestFailed } from './helper';
import { useRouter } from 'vue-router';
import {
  MobileOutlined,
  MailOutlined,
  AlipayCircleOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined,
  UserOutlined,
  LockOutlined,
} from '@ant-design/icons-vue';
// import { getSmsCaptcha, get2step } from '@/api/login'
import * as api from './service';

interface FormState {
  rememberMe: boolean;
  username: string;
  password: string;
  mobile: string;
  captcha: string;
}
const useForm = Form.useForm;

export default defineComponent({
  components: {
    // TwoStepCaptcha
    MobileOutlined,
    UserOutlined,
    MailOutlined,
    AlipayCircleOutlined,
    TaobaoCircleOutlined,
    WeiboCircleOutlined,
    LockOutlined,
  },
  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const form: UnwrapRef<FormState> = reactive({
      rememberMe: false,
      username: '',
      password: '',
      mobile: '',
      captcha: '',
    });
    const state = reactive({
      time: 60,
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      smsSendBtn: false,
    });
    const handleUsernameOrEmail = (rule: any, value: string, callback: () => void) => {
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
      if (regex.test(value)) {
        state.loginType = 0;
      } else {
        state.loginType = 1;
      }
      return Promise.resolve();
    };
    const rules = reactive({
      rememberMe: [{ trigger: 'checked' }],
      username: [
        { required: true, message: t('user.userName.required') },
        { validator: handleUsernameOrEmail },
        // { validateTrigger: 'change' },
      ],
      password: [
        { required: true, message: t('user.password.required') },
        { validateTrigger: 'blur' },
      ],
      mobile: [
        {
          required: true,
          pattern: /^1[34578]\d{9}$/,
          message: t('user.login.mobile.placeholder'),
          validateTrigger: 'change',
        },
      ],
      captcha: [
        { required: true, message: t('user.verification-code.required'), validateTrigger: 'blur' },
      ],
    });
    const { validate, validateInfos } = useForm(form, rules);
    const handleTabClick = (key: any) => {
      customActiveKey.value = key;
    };
    const handleSubmit = (e: any) => {
      e.preventDefault();
      state.loginBtn = true;
      const validateFieldsKey =
        customActiveKey.value === 'tab1' ? ['username', 'password'] : ['mobile', 'captcha'];

      validate(validateFieldsKey)
        .then(async () => {
          form.password = encryptByMd5(form.password);
          const res = await api.userLogin(form);
          if (res) {
            loginSuccess(res, router);
            isLoginError.value = false;
          } else {
            requestFailed(res);
            isLoginError.value = true;
            form.password = '';
          }
          state.loginBtn = false;
        })
        .catch((e) => {
          console.log(e);
          setTimeout(() => {
            state.loginBtn = false;
          }, 600);
        });
    };
    const customActiveKey = ref<any>('tab1');
    const loginBtn = ref(false);
    const loginType = ref(0);
    const isLoginError = ref(false);
    const requiredTwoStepCaptcha = ref(false);
    const stepCaptchaVisible = ref(false);
    return {
      form,
      rules,
      state,
      customActiveKey,
      loginBtn,
      loginType,
      isLoginError,
      requiredTwoStepCaptcha,
      stepCaptchaVisible,
      handleTabClick,
      handleSubmit,
      validateInfos,
    };
  },
  created() {
    // get2step({})
    //   .then(res => {
    //     this.requiredTwoStepCaptcha = res.result.stepCode
    //   })
    //   .catch(() => {
    //     this.requiredTwoStepCaptcha = false
    //   })
    // this.requiredTwoStepCaptcha = true
  },
  // methods: {
  //   ...mapActions(['Login', 'Logout']),
  //   // handler
  //   getCaptcha(e) {
  //     e.preventDefault();
  //     const {
  //       form: { validateFields },
  //       state,
  //     } = this;

  //     validateFields(['mobile'], { force: true }, (err, values) => {
  //       if (!err) {
  //         state.smsSendBtn = true;

  //         const interval = window.setInterval(() => {
  //           if (state.time-- <= 0) {
  //             state.time = 60;
  //             state.smsSendBtn = false;
  //             window.clearInterval(interval);
  //           }
  //         }, 1000);

  //         const hide = this.$message.loading('验证码发送中..', 0);
  //         getSmsCaptcha({ mobile: values.mobile })
  //           .then((res) => {
  //             setTimeout(hide, 2500);
  //             this.$notification['success']({
  //               message: '提示',
  //               description: '验证码获取成功，您的验证码为：' + res.result.captcha,
  //               duration: 8,
  //             });
  //           })
  //           .catch((err) => {
  //             setTimeout(hide, 1);
  //             clearInterval(interval);
  //             state.time = 60;
  //             state.smsSendBtn = false;
  //             this.requestFailed(err);
  //           });
  //       }
  //     });
  //   },
  //   stepCaptchaSuccess() {
  //     this.loginSuccess();
  //   },
  //   stepCaptchaCancel() {
  //     this.Logout().then(() => {
  //       this.loginBtn = false;
  //       this.stepCaptchaVisible = false;
  //     });
  //   },
  // },
});
</script>

<style lang="less" scoped>
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

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
