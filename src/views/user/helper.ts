import { timeFix } from '@/utils/util';
import { storage } from '@/utils/Storage';
import { ACCESS_TOKEN, PERMISSION, USER_INFO } from '@/store/mutation-types';
import { notification ,message} from 'ant-design-vue';
import { Router } from 'vue-router'

export const loginSuccess = (res?, router?: Router) => {
  // 延迟 1 秒显示欢迎信息
  setTimeout(() => {
    notification.success({
      message: '欢迎',
      description: `${timeFix()}，欢迎回来`,
    });
  });
  if(res.token){
    storage.set(ACCESS_TOKEN, res.token, 7 * 24 * 60 * 60 * 1000);
    storage.set(PERMISSION, Array.isArray(res.role) ? res.role : res.role.split(','));
    storage.set(USER_INFO, res);
  }

  // router.push({ path: '/' });
};

export const requestFailed = (err) => {
  notification['error']({
    message: '错误',
    description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
    duration: 4,
  });
};
