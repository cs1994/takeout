package models.protocols
//import models.protocols._
import models.tables.SlickTables._
import play.api.libs.json.{JsValue, Json, Writes}

/**
 * Created by caoshuai on 2016/4/10.
 */
trait AdminProtocols extends BaseJsonProtocols {


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
        "ownerid" -> obj.ownerId,
        "authState" -> obj.authState,
        "tel" -> obj.tel
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
  implicit val rRestaurantTag: Writes[rRestaurantTag] = new Writes[rRestaurantTag] {
    override def writes(obj: rRestaurantTag): JsValue = {
      Json.obj(
        "id" -> obj.id,
        "tagName" -> obj.tagName,
        "englishName" -> obj.englishName,
        "order" -> obj.order
      )
    }
  }
  implicit val rRestaurantWriter: Writes[rRestaurant] = new Writes[rRestaurant] {
    override def writes(obj: rRestaurant): JsValue = {
      Json.obj (
        "id" -> obj.id,
        "index" -> obj.index,
        "pic" -> obj.pic,
        "name" -> obj.name,
        "classifyName" -> obj.tag,
        "ownerId" -> obj.ownerId,
        "isOpen" -> obj.isOpen,
        "description" -> obj.description,
        "basePrice" -> obj.basePrice,
        "packFee" -> obj.packFee,
        "sales" -> obj.sales,
        "duringTime" -> obj.duringTime,
        "address" -> obj.address,
        "openingTime" -> obj.openingTime,
        "stars" -> obj.stars,
        "tel" -> obj.tel,
        "authState" -> obj.authState
      )
    }
  }
}



