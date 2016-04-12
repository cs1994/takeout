package controllers.admin
import javax.inject.Inject

import com.google.inject.Singleton
import common.UserConstants.UserState
import common.errCode.AdminErrcode._
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

  //add store admin account
  def addStoreAdmin = adminAuth.async{implicit request =>
    val postData=request.body.asJson.get
    val email=(postData \ "email").as[String]
    val password=(postData \ "password").as[String]

    adminDao.findByEmail(emailStr).flatMap { adminOpt =>
      if(adminOpt.isDefined){
        Future.successful(Ok(CustomerErrorCode.userAlreadyExists))
      }else{
        adminDao.createUser(
          emailStr,
          password,
          UserState.enable,
          UserConstants.UserType.StoreAdmin,
          request.remoteAddress,
          System.currentTimeMillis()
        ).map{result=>
          if(result>0){
            Ok(success)
          }else{
            Ok(CustomerErrorCode.canNotCreateUser)
          }
        }
      }
    }


  }

}
