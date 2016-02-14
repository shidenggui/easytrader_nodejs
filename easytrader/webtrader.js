'use strict'
var path = require('path'),
  request = require('request')

request = request.defaults({
  jar: true,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko'
  }
})


class WebTrader {
  constructor(configPath) {
    this.config = null
    this.accountConfig = null
    this.request = request

    const globalConfigPath = path.join(__dirname, '/config/global.json')
    this.globalConfig = require(globalConfigPath)
  }

  readSysConfig(configPath) {
    this.config = require(configPath)
  }

  readConfig(accountPath) {
    this.accountConfig = require(accountPath)
  }

  test() {
    console.log(this.config, this.globalConfig)
  }
}

module.exports = WebTrader


