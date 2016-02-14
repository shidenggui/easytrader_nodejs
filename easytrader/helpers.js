"use strict"
var shelljs = require('shelljs'),
  path = require('path')


function recognizeVerifyCode(imagePath, broker) {
  let cmd = path.resolve('./thirdlibrary/')
  switch (broker) {
    case 'ht':
      cmd += 'yjb_verify_code.jar guojin '
      break
    case 'yjb':
      cmd +='getcode_jdg1.5.jar '
      break
  }
  cmd += 'vcode'
  const verifyCodeStart = -5
  const verifyCodeLength = 4
  console.log(cmd)
  const stdout = shelljs.exec(`java -jar ${cmd}`).output
  console.log(stdout)
  return stdout.substr(verifyCodeStart, verifyCodeLength)
}

module.exports = {
  recognizeVerifyCode
}
