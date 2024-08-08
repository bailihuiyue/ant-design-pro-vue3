// import Mock from 'mockjs'
import { builder, userNav } from './mockUtils'

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

export default [
  {
    pattern: '/json',
    method: 'GET',
    handle: (req, res) => {
      res.end({
        msg: 'json2'
      })
    }
  },
  {
    pattern: '/auth/login',
    method: 'POST',
    handle: (req, res) => {
      let permission = ''
      if (req.params.username === 'admin') {
        permission = 'admin'
      } else if (req.params.username === 'ant.design') {
        permission = 'user'
      } else {
        res.statusCode = 403
        res.end('用户名错误,只有admin和ant.design')
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
      res.end(data)
    }
  },
  {
    pattern: '/auth/2step-code',
    method: 'GET',
    handle: (req, res) => {
      res.end(builder({ stepCode: '@int(0, 1)' }))
    }
  },
  {
    pattern: '/account/sms',
    method: 'POST',
    handle: (req, res) => {
      res.end(builder({ captcha: '@int(10000, 99999)' }))
    }
  },
  {
    pattern: '/auth/logout',
    method: 'GET',
    handle: (req, res) => {
      res.end(builder({}, '[测试接口] 注销成功1'))
    }
  },
  {
    pattern: '/auth/unlock',
    method: 'POST',
    handle: (req, res) => {
      res.end({ unlocked: true })
    }
  }
]
