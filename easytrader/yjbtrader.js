'use strict'
var fs = require('fs')
var WebTrader = require('./webtrader'),
  helpers = require('./helpers')


class YJBTrader extends WebTrader {
  constructor() {
    super()
    const ConfigPath = './config/yjb.json'
    this.readSysConfig(ConfigPath)
  }

  prepare(accountPath) {
    super.readConfig(accountPath)
  }
  login() {
    this.request
      .get(this.config['login_page'])
    const verifyCode = this.handleRecognizeCode()
    let form = this.accountConfig['login']
    

  }

  handleRecognizeCode() {
    const imgPath = 'vcode'
    this.request.get({
      url: this.config['verify_code_api'],
      qs: {
        randomStamp: Math.random()
      }
    })
      .pipe(fs.createWriteStream(imgPath))

    const verifyCode = helpers.recognizeVerifyCode(imgPath, 'ht')
    fs.unlink(imgPath)
    return verifyCode
  }

  test() {
    this.login()
  }
}

module.exports = YJBTrader