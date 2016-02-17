'use strict'
var fs = require('fs')
var _ = require('lodash'),
  async = require('async')
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
    async.waterfall([
      callback => {
        this.request
          .get(this.config['login_page'], _ => callback(null))
      },
      callback => {
        let imgPath = 'vcode.jpg'
        let stream = this.request
          .get(this.config.verify_code_api)
          .pipe(fs.createWriteStream(imgPath))

        stream.on('finish', _ => {
          const verifyCode = helpers.recognizeVerifyCode(imgPath, 'yjb')
          console.log(verifyCode)
          fs.unlink(imgPath)
          callback(null, verifyCode)
        })
      },
      (verifyCode, callback) => {
        console.log(verifyCode)
      }
    ], (err, result) => console.log(err, result))



    //const verifyCode = this.handleRecognizeCode()
    //let params = this.config['login']
    //let other_params = {
    //  mac_addr: '0000',
    //  account_content: this.accountConfig.account,
    //  password: this.accountConfig.password,
    //  validateCode: verifyCode
    //}
    //params = _.assign(params, other_params)
    //console.log(params)
    //let login_response = this.request
    //  .post(this.config.login_api)
    //  .form(params)
    //  .on('body', b => console.log(b))

  }

  handleRecognizeCode() {
  }

  test() {
    this.login()
  }
}

module.exports = YJBTrader