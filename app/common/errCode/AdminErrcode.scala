package common.errCode
import models.protocols.BaseJsonProtocols

/**
 * Created by caoshuai on 2016/4/10.
 */
object AdminErrcode extends BaseJsonProtocols{
  def classifyAlreadyExists = jsonResult(1002001,"classify already exists!")
  def canNotCreateClassify = jsonResult(1002002,"can not create classify!")
  def getclassifyFail = jsonResult(1002003,"get classify fail!")
  def updateClassifyFail = jsonResult(1002004,"update classify fail!")
  def resTagNotExits = jsonResult(1002005,"classify not exits!")
  def deleteResTagFail = jsonResult(1002006,"delete restaurang tag fail!")
  def updateUserStateFail = jsonResult(1002007,"update state fail!")
  def invalidUserState = jsonResult(1002008,"invalid user state!")
  def deleteStoreAdminFail = jsonResult(1002009,"delete store admin fail!")
  def userNotExist = jsonResult(1002010,"store user not exits!")
  def resetPwdFail = jsonResult(1002011,"reset password fail.")


}
