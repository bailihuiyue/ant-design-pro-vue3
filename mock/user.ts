// import Mock from 'mockjs'
import { builder, userNav } from './mockUtils'
import { defineMock } from 'vite-plugin-mock-dev-server'
// id: "@id",
// number: "@int(5,9)",
// name: "@name",
// cname: "@cname",
// date: "@dateTime",
// reg: /\w{10}/,

const userApi = {
  Logout: '/auth/logout',
  ForgePassword: '/auth/forge-password',
  Register: '/auth/register',
  SendSmsErr: '/account/sms_err',
  // get my info
  UserInfo: '/user/info',
  UserMenu: '/user/nav'
}

export default defineMock([
  {
    url: '/json',
    method: 'GET',
    body({ params }) {
      return {
        msg: 'json2'
      }
    }
  },
  {
    url: '/auth/login',
    method: 'POST',
    response(req, res, next) {
      const { query, body, params, headers } = req
      let permission = ''
      if (body.username === 'admin') {
        permission = 'admin'
      } else if (body.username === 'ant.design') {
        permission = 'user'
      } else {
        res.statusCode = 403
        res.end(JSON.stringify({ message: '用户名错误,只有admin和ant.design' }))
        return
      }
      const data = {
        id: '4291d7da9005377ec9aec4a71ea837f',
        name: permission,
        username: 'Ones@github',
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
        permission: [permission],
        token: '12312312',
        menu: userNav
      }
      res.end(JSON.stringify(data))
    }
  },
  {
    url: '/auth/2step-code',
    method: 'GET',
    body() {
      return builder({ stepCode: '1' })
    }
  },
  {
    url: '/account/sms',
    method: 'POST',
    body() {
      return builder({ captcha: '123456' })
    }
  },
  {
    url: '/auth/logout',
    method: 'GET',
    body() {
      return builder({}, '[测试接口] 注销成功1')
    }
  },
  {
    url: '/auth/unlock',
    method: 'POST',
    body() {
      return { unlocked: true }
    }
  }
])
