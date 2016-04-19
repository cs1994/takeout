package controllers.admin
import javax.inject.Inject

import com.google.inject.Singleton
import common.UserConstants.UserState
import common.errCode.{AdminErrcode,CustomerErrorCode}
import common.{Constants, UserConstants}
import controllers.ActionUtils
import models.protocols.AdminProtocols
import models.dao.AdminDao
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


}
