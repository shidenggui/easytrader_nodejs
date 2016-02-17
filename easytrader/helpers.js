"use strict"
var shelljs = require('shelljs'),
  path = require('path'),
  execSync = require('child_process').execSync


function recognizeVerifyCode(imagePath, broker) {
  let cmd = path.resolve('./thirdlibrary/')
  switch (broker) {
    case 'ht':
      cmd += '/getcode_jdk1.5.jar '
      break
    case 'yjb':
      cmd += '/yjb_verify_code.jar guojin '
      break
  }
  cmd += imagePath
  const verifyCodeStart = -5
  const verifyCodeLength = 4
  cmd = `java -jar ${cmd}`
  console.log(cmd)
  const stdout = execSync(cmd, {encoding: 'utf8'})
  console.log(stdout)
  return stdout.substr(verifyCodeStart, verifyCodeLength)
}

module.exports = {
  recognizeVerifyCode
}
