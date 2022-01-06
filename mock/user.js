// import Mock from 'mockjs'
const { builder, userNav } = require('./mockUtils')
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

api.post("/auth/login", (ctx) => {
  let permission = ''
  if (ctx.post.username === 'admin') {
    permission = 'admin'
  } else if (ctx.post.username === 'ant.design') {
    permission = 'user'
  } else {
    return resp.fail('用户名错误,只有admin和ant.design', 403)
  }
  return {
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
    menu: userNav,
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

api.post("/auth/unlock", (ctx) => {
  return mock({ unlocked: true })
});
