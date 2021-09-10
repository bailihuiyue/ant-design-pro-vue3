import { timeFix } from '@/utils/util';
import ls from '@/utils/Storage';
import { ACCESS_TOKEN, PERMISSION, USER_INFO } from '@/store/mutation-types';
import { message, notification } from 'ant-design-vue';
import { Router } from 'vue-router'
import { getSmsCaptcha } from './service'

export const loginSuccess = (res, router: Router) => {
  // 延迟 1 秒显示欢迎信息
  setTimeout(() => {
    notification.success({
      message: '欢迎',
      description: `${timeFix()}，欢迎回来`,
    });
  });
  if (res.token) {
    ls.set(ACCESS_TOKEN, res.token, 7 * 24 * 60 * 60 * 1000);
    ls.set(PERMISSION, Array.isArray(res.permission) ? res.permission : res.permission.split(','));
    ls.set(USER_INFO, res);
  }
  router.push({ path: '/' });
};

export const requestFailed = (err) => {
  notification['error']({
    message: '错误',
    description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
    duration: 4,
  });
};

export const useGetCaptcha = (e, validate, state, form, registerBtn) => {
  e.preventDefault();
  validate(['mobile']).then((res) => {
    state.smsSendBtn = true;
    const interval = window.setInterval(() => {
      if (state.time-- <= 0) {
        state.time = 60;
        state.smsSendBtn = false;
        window.clearInterval(interval);
      }
    }, 1000);

    message.loading('验证码发送中..', 1);

    getSmsCaptcha({ mobile: form.mobile })
      .then((res) => {
        notification['success']({
          message: '提示',
          description: '验证码获取成功，您的验证码为：' + res.result.captcha,
          duration: 8,
        });
      })
      .catch((err) => {
        clearInterval(interval);
        state.time = 60;
        state.smsSendBtn = false;
        requestFailed(err);
        registerBtn && (registerBtn.value = false);
      });
  });
};
