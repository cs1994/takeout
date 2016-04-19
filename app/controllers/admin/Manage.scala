package controllers.admin
import javax.inject.Inject

import com.google.inject.Singleton
import common.UserConstants.UserState
import common.errCode.{AdminErrcode,CustomerErrorCode}
import common.{Constants, UserConstants}
import controllers.ActionUtils
import models.protocols.AdminProtocols
import models.dao.{AdminDao,RestaurantDao}
//import models.dao.sys.{CustomerDao, AdminDao, StoreShowDao}
import org.slf4j.LoggerFactory
import play.api.cache.CacheApi
import play.api.data.Form
import play.api.data.Forms._
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.api.libs.json.{JsObject, Json}
import play.api.mvc.{Action, Controller}

import scala.collection.mutable.ListBuffer
import scala.concurrent.Future

/**
 * Created by caoshuai on 2016/4/10.
 */
@Singleton
class Manage  @Inject()(
                          adminDao: AdminDao,
                          restaurantDao:RestaurantDao,
                          val actionUtils: ActionUtils,
                          cache: CacheApi
                          ) extends Controller with  AdminProtocols{
  import actionUtils._

  private val logger = LoggerFactory.getLogger(this.getClass)


  private val adminAuth = loggingAction

//  add store admin account
  def addStoreAdmin = adminAuth.async{implicit request =>
    val postData=request.body.asJson.get
    val email=(postData \ "email").as[String]
    val password=(postData \ "password").as[String]

    adminDao.findByEmail(email).flatMap { adminOpt =>
      if(adminOpt.isDefined){
        Future.successful(Ok(CustomerErrorCode.userAlreadyExists))
      }else{
        adminDao.createUser(
          email,
          password,
          UserState.enable,
          UserConstants.UserType.StoreAdmin,
          request.remoteAddress,
          System.currentTimeMillis()
        ).map{result=>
          if(result>0){
            Ok(successResult(Json.obj("id" ->result)))
          }else{
            Ok(CustomerErrorCode.canNotCreateUser)
          }
        }
      }
    }
  }

  def listStoreAdmin(page:Int=1) = adminAuth.async{
    //todo
    val newPage = if(page<1) 1 else page
    adminDao.listByPage(newPage).map{
      case(totalPage,admins)=>
        Ok(successResult(Json.obj("total"->totalPage,"cur"->newPage,"list"->admins.map(rUAdminWriter.writes))))
    }
  }
  def changeStoreAdminState(id:Long,state:Int) = adminAuth.async{
    if(state==UserState.disable || state==UserState.enable){
      adminDao.updateUserState(id,state).map{num=>
        if(num>0){
          Ok(success)
        }else{
          Ok(AdminErrcode.updateUserStateFail)
        }
      }
    }else{
      Future.successful(Ok(AdminErrcode.invalidUserState))
    }
  }

  def deleteStoreAdmin(id:Long)=adminAuth.async{
    adminDao.deleteStoreUser(id).map{num=>
      if(num>0)
        Ok(success)
      else
        Ok(AdminErrcode.deleteStoreAdminFail)
    }
  }
  def resetStoreAdminPassword(id:Long) =adminAuth.async{
    adminDao.findById(id).flatMap{u=>
      if(u.isDefined) {
        adminDao.updateUserPwd(u.get).map{result=>
          if(result > 0)
            Ok(success)
          else
            Ok(AdminErrcode.resetPwdFail)
        }
      }
      else {
        Future.successful(Ok(AdminErrcode.userNotExist))
      }
    }
  }
  def addFoodClassify = adminAuth.async{implicit request=>
    val postData=request.body.asJson.get
    val nameCh=(postData \ "nameCh").as[String]
    val nameEn=(postData \ "nameEn").as[String]
    val index=(postData \ "index").as[Int]

    adminDao.findResTagByName(nameCh).flatMap { classifyOpt =>
      if(classifyOpt.isDefined){
        Future.successful(Ok(AdminErrcode.classifyAlreadyExists))
      }else{
        adminDao.createClassify(
         nameCh,nameEn,index
        ).map{result=>
          if(result>0){
            Ok(successResult(Json.obj("id" ->result)))
          }else{
            Ok(AdminErrcode.canNotCreateClassify)
          }
        }
      }
    }
  }

  def getAllFoodClassify = adminAuth.async{implicit  request =>
    adminDao.getAllClassify.map{list=>
      if(list.nonEmpty){
        Ok(successResult(Json.obj("result" ->list.map(rRestaurantTag.writes))))
      }else{
        Ok(AdminErrcode.getclassifyFail)
      }

    }
  }
  def updateFoodClassify(id:Long) = adminAuth.async{implicit  request =>
    val postData=request.body.asJson.get
    val nameCh=(postData \ "nameCh").as[String]
    val nameEn=(postData \ "nameEn").as[String]
    val index=(postData \ "index").as[Int]
    adminDao.findResTagById(id).flatMap{classifyOpt =>
      if(classifyOpt.isDefined){
        adminDao.updateResTag(id,nameCh,nameEn,index).map{result=>
          if(result>0)
            Ok(success)
          else Ok(AdminErrcode.updateClassifyFail)
        }
      }
      else {
        Future.successful(Ok(AdminErrcode.resTagNotExits))
      }
    }
  }

  def deleteFoodClassify(id:Long)= adminAuth.async{implicit request=>
    adminDao.deleteResTag(id).map{num=>
      if(num>0)
        Ok(success)
      else
        Ok(AdminErrcode.deleteResTagFail)
    }

  }

  //admin catering store manager
  def createRestaurant = adminAuth.async{implicit request=>

    val jsonData = request.body.asJson.get
    val name = (jsonData \ "name").as[String] //店名
  val description = (jsonData \ "description").asOpt[String] //描述
  val announcer = (jsonData \ "announcer").asOpt[String] //公告
  val basePrice = (jsonData \ "basePrice").as[Int] //起送价
  val packFee = (jsonData \ "packFee").as[Int] //送餐费
  val picURL = (jsonData \ "pic").asOpt[String]  //logo图片url
  val duringTime = (jsonData \ "duringTime").asOpt[Long] //送餐时间
  val category = (jsonData \ "category").as[Int] //店铺类别
  val address = (jsonData \ "address").as[String] //地址
  val concessions = (jsonData \ "concessions").asOpt[String] //优惠活动
  val longitude = (jsonData \ "longitude").asOpt[Double] //经度
  val latitude = (jsonData \ "latitude").asOpt[Double] //纬度
  val openingTime = (jsonData \ "openingTime").as[String] //营业时间
  val ownId = (jsonData \ "ownId").as[Long]                        //店家id
  val tel=(jsonData \ "tel").asOpt[String].getOrElse("")

    restaurantDao.createRestaurant(ownId,name,description, announcer,basePrice,packFee,picURL,duringTime,category,
      address, concessions,longitude,latitude,openingTime,tel).map{res=>
      if(res>0){
        Ok(success)
      }else{
        Ok(success)
      }
    }
  }

  def listRestaurant(page:Int=1,tag:Long = -1L) = adminAuth.async{
    val newPage = if(page<1) 1 else page
    restaurantDao.listRestaurantByPage(newPage,tag).map{
      case(totalPage,restaurants)=>
        Ok(successResult(Json.obj("total"->totalPage,"cur"->newPage,"list"->restaurants.map(rRestaurantWriter.writes))))
    }
  }


}
