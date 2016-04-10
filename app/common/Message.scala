package common

//import models.tables.SlickTables._
/**
 * User: Huangshanqi
 * Date: 2015/12/18
 * Time: 11:40
 */
sealed trait Message

case class AccessRecord(accessTime:Long,remoteAddress:String,accessPath:String) extends Message

//customer bonus
case class CustomerBonusRecord(uid:Long,bonus:Int,fromService:String,description:String,addTime:Long) extends Message
//case class UpdateCustomerBonusTask(bonusId:Long,uid:Long,bonus:Int,addTime:Long) extends Message
case class UpdateCustomerLoginTimeTask(uid:Long,loginTimestamp:Long) extends Message

//mail
case class SendConfirmEmailTask(token:String,email:String) extends Message


//case class RefundApply(orderInfo:rRestaurantOrder,refundInfo:rRefund)
//case class RefundHistory(refundHistory:Seq[RefundApply])
//case class refundSuccessClass(tradeNo:String)
case class orderCancelClass(orderId:Long,restId:Long)
