// import Mock from 'mockjs'
const { builder } = require('./mockUtils')
const { api, delay, mock, resp } = require("apite");

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

api.get("/json", {
  msg: "json2",
});

api.post("/auth/login", () => {
  return {
    id: '4291d7da9005377ec9aec4a71ea837f',
    name: '天野远子3',
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
    role: ['admin'],
    token: '12312312',
    menu: [
      {
        name: 'dashboard',
        parentId: 0,
        id: 1,
        meta: {
          icon: 'dashboard',
          title: 'user.login.login',
          show: true
        },
        component: 'RouteView',
        redirect: '/dashboard/workplace'
      },
      {
        name: 'workplace',
        parentId: 1,
        id: 7,
        meta: {
          title: '工作台',
          show: true
        },
        component: 'Home'
      },
      {
        name: 'monitor',
        path: 'https://www.baidu.com/',
        parentId: 1,
        id: 3,
        meta: {
          title: 'user.login.login',
          target: '_blank',
          show: true
        }
      }
    ],
  }
});

api.get("/auth/2step-code", (ctx) => {
  return mock(builder({ stepCode: '@int(0, 1)' }))
});

api.post("/account/sms", (ctx) => {
  return mock(builder({ captcha: '@int(10000, 99999)' }))
});

api.get("/auth/logout", (ctx) => {
  return builder({}, '[测试接口] 注销成功1')
});
