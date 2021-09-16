const { api, delay, mock, resp } = require("apite");

api.get("/member/user/personDetail", {
  id: 22,
  employeeId: '11111111',
  adAccount: 'JACK.LI1',
  email: 'Jack.Li1@home.cn',
  nickname: null,
  bio: null,
  avatar: '/account/levelThreeDept.png',
  skills: 'Java;C#;English;Html',
  mySkills: null,
  interest: '吃饭;睡觉;打豆豆;学习',
  myInterest: '写代码',
  chineseName: '小李',
  englishName: 'Jack Li',
  empPosition: 'IT Software Engineer',
  levelOneDept: 'IT',
  levelTwoDept: 'IT TMP',
  levelThreeDept: 'IT2IT-Shared Services'
})

api.get("/member/label/findAll", [
  {
    id: '60530b2e12b2d557ccaf8e34',
    skill: 'Java;C#;English;Html',
    hobby: '吃饭;睡觉;打豆豆;学习',
    creator: 'abel.yu',
    editor: 'jack.li1',
    insertDate: '2021-03-18T16:11:26.682',
    cdate: '2021-03-18T16:11:26.682',
    edate: '2021-03-23T13:33:31.883'
  }
])

api.post('/member/user/updatePersonDetail', {
  status: 200,
  enMsg: 'OK',
  zhMsg: '成功',
  data: 'update person detail success'
})
