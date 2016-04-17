package models.protocols
import models.protocols.BaseJsonProtocols
import models.tables.SlickTables._
import play.api.libs.json.{JsValue, Json, Writes}

/**
 * Created by caoshuai on 2016/4/10.
 */
trait AdminProtocols extends BaseJsonProtocols{


  implicit val rRestaurant: Writes[rRestaurant] = new Writes[rRestaurant] {
    override def writes(obj: rRestaurant): JsValue = {
      Json.obj(
        "id" -> obj.id,
        "name" -> obj.name,
        "description" -> obj.description,
        "announcer" -> obj.announcer,
        "basePrice" -> obj.basePrice,
        "packFee" -> obj.packFee,
        "sales" -> obj.sales,
        "pic" -> obj.pic,
        "duringTime" -> obj.duringTime,
        "category" -> obj.tag,
        "address" -> obj.address,
        "concessions" -> obj.concessions,
        "isOpen" -> obj.isOpen,
        "longitude" -> obj.longitude,
        "latitude" -> obj.latitude,
        "openingTime" -> obj.openingTime,
        "stars" -> obj.stars,
        "ownerid"->obj.ownerId,
        "authState" -> obj.authState,
        "tel"->obj.tel
      )
    }
  }

  implicit val rUAdminWriter: Writes[rAdmin] = new Writes[rAdmin] {
    override def writes(obj: rAdmin): JsValue = {
      Json.obj(
        "id" -> obj.id,
        "email" -> obj.email,
        "nickName" -> obj.nickName,
        "headImg" -> obj.headImg,
        "state" -> obj.state,
        "userType" -> obj.userType,
        "createTime" -> obj.createTime
      )
    }
  }

//  implicit val rRestaurantOrder: Writes[rrestaurantorder] = new Writes[rRestaurantOrder] {
//    override def writes(obj: rRestaurantOrder): JsValue = {
//      Json.obj(
//        "id" -> obj.id,
//        "userId" -> obj.userId,
//        "userName" -> obj.userName,
//        "address" -> obj.address,
//        "tel" -> obj.tel,
//        "restId" -> obj.restId,
//        "arriveTime" -> obj.arriveTime,
//        "remark" -> obj.remark,
//        "cashCoup" -> obj.cashCoup,
//        "invoice" -> obj.invoice,
//        "address" -> obj.address,
//        "packFee" -> obj.packFee,
//        "state" -> obj.state,
//        "totalFee" -> obj.totalFee,
//        "state" -> obj.state,
//        "isProcessed" -> obj.isProcessed,
//        "tradeno" -> obj.tradeNo,
//        "alipayState" -> obj.alipayState,
//        "createTime" -> obj.createTime,
//        "payType"->obj.payType
//      )
//    }
//  }
//
//  implicit val rDish: Writes[rDish] = new Writes[rDish] {
//    override def writes(obj: rDish): JsValue = {
//      Json.obj(
//        "id" -> obj.id,
//        "storeId" -> obj.restId,
//        "name" -> obj.name,
//        "description" -> obj.description,
//        "price" -> obj.price,
//        "sale" -> obj.sale,
//        "pic" -> obj.pic,
//        "state" -> obj.state
//      )
//    }
//  }
//
//  implicit val rDishTag: Writes[rDishTag] = new Writes[rDishTag] {
//    override def writes(obj: rDishTag): JsValue = {
//      Json.obj(
//        "id" -> obj.id,
//        "restId" -> obj.restId,
//        "tag" -> obj.tag,
//        "tagDescription" -> obj.tagDescription
//      )
//    }
//  }
//
//  implicit val rDishComment: Writes[rDishComment] = new Writes[rDishComment] {
//    override def writes(obj: rDishComment): JsValue = {
//      Json.obj(
//        "id" -> obj.id,
//        "dishId" -> obj.dishId,
//        "userId" -> obj.userId,
//        "userName" -> obj.userName,
//        "createTime" -> obj.createTime,
//        "content" -> obj.content,
//        "score" -> obj.score
//      )
//    }
//  }
//
//  implicit val rRestaurantTag: Writes[rRestaurantTag] = new Writes[rRestaurantTag] {
//    override def writes(obj: rRestaurantTag): JsValue = {
//      Json.obj(
//        "id" -> obj.id,
//        "tagName" -> obj.tagName
//      )
//    }
//  }
//
//
//  implicit val rRefund: Writes[rRefund] = new Writes[rRefund] {
//    override def writes(obj: rRefund): JsValue = {
//      Json.obj(
//        "id" -> obj.id,
//        "tradeNo" -> obj.tradeNo,
//        "outTradeNo" -> obj.outTradeNo,
//        "remark" -> obj.remark,
//        "reason" -> obj.reason,
//        "batchNo" -> obj.batchNo,
//        "state" -> obj.state,
//        "createTime" -> obj.createTime
//      )
//    }
//  }
//
//  implicit val rUCustomer: Writes[rUCustomer] = new Writes[rUCustomer] {
//    override def writes(obj: rUCustomer): JsValue = {
//      Json.obj(
//        "id" -> obj.id,
//        "email" -> obj.email,
//        "mobile" -> obj.mobile,
//        "nickName" -> obj.nickName,
//        "headImg" -> obj.headImg,
//        "realName" -> obj.realName,
//        "state" -> obj.state,
//        "userType" -> obj.userType,
//        "ip" -> obj.ip,
//        "secure" -> obj.secure,
//        "bonus" -> obj.bonus,
//        "insertTime" -> obj.insertTime,
//        "updateTime" -> obj.updateTime
//      )
//    }
//  }
//
//  implicit val rRestaurantOrderAddress: Writes[rRestaurantOrderAddress] = new Writes[rRestaurantOrderAddress] {
//    override def writes(obj: rRestaurantOrderAddress): JsValue = {
//      Json.obj(
//        "id" -> obj.id,
//        "name" -> obj.name,
//        "sex" -> obj.sex,
//        "userId" -> obj.userId,
//        "address" -> obj.address,
//        "tel" -> obj.tel
//      )
//    }
//  }
//
//
//  implicit val rRestaurantOrderDetail: Writes[rRestaurantOrderDetail] = new Writes[rRestaurantOrderDetail] {
//    override def writes(obj: rRestaurantOrderDetail): JsValue = {
//      Json.obj(
//        "id" -> obj.id,
//        "orderId" -> obj.orderId,
//        "dishId" -> obj.dishId,
//        "dishName" -> obj.dishName,
//        "number" -> obj.number,
//        "price" -> obj.price
//      )
//    }
//  }


}

