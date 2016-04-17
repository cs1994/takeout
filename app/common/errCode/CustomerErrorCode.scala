package common.errCode

import models.protocols.BaseJsonProtocols

/**
 * User: Huangshanqi
 * Date: 2015/12/23
 * Time: 11:12
 */
object CustomerErrorCode extends BaseJsonProtocols{
  /**
   * 顾客相关错误码 1004000 --1004999
   */

  def invalidRequest = jsonResult(1004001,"Invalid request !")
  def missingParameters = jsonResult(1004002,"missing parameters !")
  def codeNotCorrect = jsonResult(1004003,"code is not correct !")
  def canNotCreateUser = jsonResult(1004004,"occur exception when create user !")
  def mobileAlreadyExisted = jsonResult(1004005,"mobile already exist !")
  def accountDisabled = jsonResult(1004006,"Your account has been disabled, please contact the administrator.")
  def passwordError = jsonResult(1004007,"Password error.")
  def userNotExist = jsonResult(1004008,"User not exist.")
  def inputFormatError = jsonResult(1004009,"Input format error.")
  def userNameAlreadyExisted = jsonResult(1004010,"username alread exist !")
  def sendSmsCodeFailed = jsonResult(1004011,"send sms code failed.")
  def smsCodeExpired = jsonResult(1004012,"sms code already expired.")
  def invalidMobileToken = jsonResult(1004013,"invalid mobile token")
  def userAlreadyExists = jsonResult(1004014,"user already exists.")
  def deleteUserFail = jsonResult(1004015,"user already exists.")
  def invalidEmailFormat = jsonResult(1004016,"invalid email format.")
  def sendConfirmEmailFail = jsonResult(1004017,"send confirm email fail.")
  def invalidToken = jsonResult(1004018,"invalid token.")
  def updatePwdFail = jsonResult(1004019,"update password fail.")
  def resetPwdFail = jsonResult(1004020,"reset password fail.")

  def leaveMessageFailed=jsonResult(1004030,"leave message failed")
  def deleteMessageFailed=jsonResult(1004031,"delete message failed")
  def msgNotExist=jsonResult(1004032,"the message doesn't exist")
  def userForbid =jsonResult(1004033,"该用户已被禁言!")
  def leaveMsgFrequent=jsonResult(1004034,"请不要在10s内重复留言！")

}
