import Mock from 'mockjs'
import { builder, getBody } from '../src/utils/util'

const userApi = {
  Logout: '/auth/logout',
  ForgePassword: '/auth/forge-password',
  Register: '/auth/register',
  SendSmsErr: '/account/sms_err',
  // get my info
  UserInfo: '/user/info',
  UserMenu: '/user/nav'
}

export default [
  {
    url: '/auth/login',
    method: 'post',
    response: ({ query }) => {
      return {
        id: '4291d7da9005377ec9aec4a71ea837f',
        name: '天野远子',
        username: 'admin',
        password: '',
        avatar: '/avatar2.jpg',
        status: 1,
        telephone: '',
        lastLoginIp: '27.154.74.117',
        lastLoginTime: 1534837621348,
        creatorId: 'admin',
        createTime: 1497160610259,
        merchantCode: 'TLif2btpzg079h15bk',
        deleted: 0,
        roleId: 'admin',
        role: ['admin']
      }
    },
  },
  {
    url: '/auth/2step-code',
    method: 'get',
    response: ({ query }) => {
      return builder({ stepCode: Mock.mock('@integer(0, 1)') })
    },
  },
  {
    url: '/account/sms',
    method: 'post',
    response: () => {
      return builder({ captcha: Mock.mock('@integer(10000, 99999)') })
    },
  },
  {
    url: '/auth/logout',
    method: 'get',
    response: () => {
      return builder({}, '[测试接口] 注销成功')
    },
  }
]
