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
  }
}
