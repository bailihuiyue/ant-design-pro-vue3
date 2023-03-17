const responseBody = {
  message: '',
  timestamp: 0,
  result: null,
  code: 0,
  _status: 0,
  _headers: {}
}


module.exports = {
  builder: (data, message, code = 0, headers = {}) => {
    responseBody.result = data
    if (message !== undefined && message !== null) {
      responseBody.message = message
    }
    if (code !== undefined && code !== 0) {
      responseBody.code = code
      responseBody._status = code
    }
    if (headers !== null && typeof headers === 'object' && Object.keys(headers).length > 0) {
      responseBody._headers = headers
    }
    responseBody.timestamp = new Date().getTime()
    return responseBody
  },
  userNav: [
    // dashboard
    {
      'name': 'dashboard',
      'parentId': 0,
      'id': 1,
      'meta': {
        'icon': 'bx-analyse',
        'title': '仪表盘',
        'show': true,
      },
      'component': 'RouteView',
      'redirect': '/dashboard/workplace'
    },
    {
      'name': 'workplace',
      'parentId': 1,
      'id': 7,
      'meta': {
        'title': '工作台',
        'show': true
      },
      'component': 'Workplace'
    },
    {
      'name': 'monitor',
      'path': 'monitor',
      'parentId': 1,
      'id': 3,
      'meta': {
        'title': '监控页（外部）',
        'show': true,
        'target': 'http://www.baidu.com',
        'blank': true
      }
    },
    {
      'name': 'Analysis',
      'parentId': 1,
      'id': 2,
      'meta': {
        'title': '分析页',
        'show': true
      },
      'component': 'Home',
      'path': '/dashboard/analysis'
    },
    {
      'name': 'tests',
      'parentId': 1,
      'id': 8,
      'meta': {
        'title': '测试功能',
        'show': true
      },
      'component': 'TestWork'
    },

    // form
    {
      'name': 'form',
      'parentId': 0,
      'id': 10,
      'meta': {
        'icon': 'form',
        'title': '表单页'
      },
      'redirect': '/form/base-form',
      'component': 'PageView'
    },
    {
      'name': 'basic-form',
      'parentId': 10,
      'id': 6,
      'meta': {
        'title': '基础表单'
      },
      'component': 'BasicForm'
    },
    {
      'name': 'step-form',
      'parentId': 10,
      'id': 5,
      'meta': {
        'title': '分步表单'
      },
      'component': 'StepForm'
    },
    {
      'name': 'advanced-form',
      'parentId': 10,
      'id': 4,
      'meta': {
        'title': '高级表单'
      },
      'component': 'AdvanceForm'
    },

    // list
    {
      'name': 'list',
      'parentId': 0,
      'id': 10010,
      'meta': {
        'icon': 'table',
        'title': '列表页',
        'show': true
      },
      'redirect': '/list/table-list',
      'component': 'PageView'
    },
    {
      'name': 'table-list',
      'parentId': 10010,
      'id': 10011,
      'path': '/list/table-list/:pageNo([1-9]\\d*)?',
      'meta': {
        'title': '查询表格',
        'show': true
      },
      'component': 'TableList'
    },
    {
      'name': 'basic-list',
      'parentId': 10010,
      'id': 10012,
      'meta': {
        'title': '标准列表',
        'show': true
      },
      'component': 'StandardList'
    },
    {
      'name': 'card',
      'parentId': 10010,
      'id': 10013,
      'meta': {
        'title': '卡片列表',
        'show': true
      },
      'component': 'CardList'
    },
    {
      'name': 'search',
      'parentId': 10010,
      'id': 10014,
      'meta': {
        'title': '搜索列表',
        'show': true
      },
      'redirect': '/list/search/article',
      'component': 'SearchLayout'
    },
    {
      'name': 'article',
      'parentId': 10014,
      'id': 10015,
      'meta': {
        'title': '搜索列表（文章）',
        'show': true
      },
      'component': 'SearchArticles'
    },
    {
      'name': 'project',
      'parentId': 10014,
      'id': 10016,
      'meta': {
        'title': '搜索列表（项目）',
        'show': true
      },
      'component': 'SearchProjects'
    },
    {
      'name': 'application',
      'parentId': 10014,
      'id': 10017,
      'meta': {
        'title': '搜索列表（应用）',
        'show': true
      },
      'component': 'SearchApplications'
    },

    // profile
    {
      'name': 'profile',
      'parentId': 0,
      'id': 10018,
      'meta': {
        'title': '详情页',
        'icon': 'profile',
        'show': true
      },
      'redirect': '/profile/basic',
      'component': 'RouteView'
    },
    {
      'name': 'basic',
      'parentId': 10018,
      'id': 10019,
      'meta': {
        'title': '基础详情页',
        'show': true
      },
      'component': 'ProfileBasic'
    },
    {
      'name': 'advanced',
      'parentId': 10018,
      'id': 10020,
      'meta': {
        'title': '高级详情页',
        'show': true
      },
      'component': 'ProfileAdvanced'
    },

    // result
    {
      'name': 'result',
      'parentId': 0,
      'id': 10021,
      'meta': {
        'title': '结果页',
        'icon': 'check-circle-o',
        'show': true
      },
      'redirect': '/result/success',
      'component': 'PageView'
    },
    {
      'name': 'success',
      'parentId': 10021,
      'id': 10022,
      'meta': {
        'title': '成功',
        'hiddenHeaderContent': true,
        'show': true
      },
      'component': 'ResultSuccess'
    },
    {
      'name': 'fail',
      'parentId': 10021,
      'id': 10023,
      'meta': {
        'title': '失败',
        'hiddenHeaderContent': true,
        'show': true
      },
      'component': 'ResultFail'
    },

    // Exception
    {
      'name': 'exception',
      'parentId': 0,
      'id': 10024,
      'meta': {
        'title': '异常页',
        'icon': 'warning',
        'show': true
      },
      'redirect': '/exception/403',
      'component': 'RouteView'
    },
    {
      'name': '403',
      'parentId': 10024,
      'id': 10025,
      'meta': {
        'title': '403',
        'show': true
      },
      'component': 'Exception403'
    },
    {
      'name': '404',
      'parentId': 10024,
      'id': 10026,
      'meta': {
        'title': '404',
        'show': true
      },
      'component': 'Exception404'
    },
    {
      'name': '500',
      'parentId': 10024,
      'id': 10027,
      'meta': {
        'title': '500',
        'show': true
      },
      'component': 'Exception500'
    },

    // account
    {
      'name': 'account',
      'parentId': 0,
      'id': 10028,
      'meta': {
        'title': '个人页',
        'icon': 'user',
        'show': true
      },
      'redirect': '/account/center',
      'component': 'RouteView'
    },
    {
      'name': 'center',
      'parentId': 10028,
      'id': 10029,
      'meta': {
        'title': '个人中心',
        'show': true
      },
      'component': 'AccountCenter'
    },
    // 特殊三级菜单
    {
      'name': 'settings',
      'parentId': 10028,
      'id': 10030,
      'meta': {
        'title': '个人设置',
        'hideHeader': true,
        'hideChildren': true,
        'show': true
      },
      'redirect': '/account/settings/base',
      'component': 'AccountSettings'
    },
    {
      'name': 'BaseSettings',
      'path': '/account/settings/base',
      'parentId': 10030,
      'id': 10031,
      'meta': {
        'title': '基本设置',
        'show': false
      },
      'component': 'BaseSettings'
    },
    {
      'name': 'SecuritySettings',
      'path': '/account/settings/security',
      'parentId': 10030,
      'id': 10032,
      'meta': {
        'title': '安全设置',
        'show': false
      },
      'component': 'SecuritySettings'
    },
    {
      'name': 'CustomSettings',
      'path': '/account/settings/custom',
      'parentId': 10030,
      'id': 10033,
      'meta': {
        'title': '个性化设置',
        'show': false
      },
      'component': 'CustomSettings'
    },
    {
      'name': 'BindingSettings',
      'path': '/account/settings/binding',
      'parentId': 10030,
      'id': 10034,
      'meta': {
        'title': '账户绑定',
        'show': false
      },
      'component': 'BindingSettings'
    },
    {
      'name': 'NotificationSettings',
      'path': '/account/settings/notification',
      'parentId': 10030,
      'id': 10034,
      'meta': {
        'title': '新消息通知',
        'show': false
      },
      'component': 'NotificationSettings'
    }
  ]
}
