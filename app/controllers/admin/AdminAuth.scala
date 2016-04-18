package controllers.admin
import javax.inject.{Inject, Singleton}

import common.{AppSettings, UserConstants}
import common.UserConstants._
import common.errCode.AdminErrcode
import controllers._
import models.protocols.AdminProtocols
import models.dao.{AdminDao}
import org.slf4j.LoggerFactory
import play.api.data.Form
import play.api.data.Forms._
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.api.libs.json.Json
import play.api.mvc.Controller

import scala.concurrent.Future

/**
 * Created by caoshuai on 2016/4/10.
 */
@Singleton
class AdminAuth  @Inject()(
                            adminDao: AdminDao,
                            application:Applications,
                            val actionUtils: ActionUtils,
                            val appSettings: AppSettings
                            ) extends Controller with AdminProtocols{
  /**
   * 系统管理员或者商家认证
   */

  import actionUtils._

  private val logger = LoggerFactory.getLogger(this.getClass)

  private val sysAdminAuth = loggingAction

  def sysIndex = sysAdminAuth { request =>
//    if (request.session.get(SessionKey.userId).isDefined
//      && request.session.get(SessionKey.uType).isDefined
//      && request.session.get(SessionKey.uType).get.toInt == UserConstants.UserType.SystemAdmin) {
//    application.initFirstAdmin()
      val conf = getCustomerConfMap(request)
      Ok(views.html.admin.index(conf))
//    } else {
//      Ok(views.html.pc.admin.login("Login", appSettings.scriptType, appSettings.scriptPath))
//    }
  }



}
