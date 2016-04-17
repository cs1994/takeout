package controllers

import javax.inject.Inject

import akka.actor.ActorSystem
import com.google.inject.Singleton
import common.{AppSettings, UserConstants}
import org.slf4j.LoggerFactory
import play.api.mvc._

@Singleton
class Application @Inject() (
                              val actionUtils: ActionUtils,
                              val appSettings: AppSettings,
                              system: ActorSystem
                              ) extends Controller {
  import actionUtils._

  private final val logger = LoggerFactory.getLogger(getClass)

  private val customerAuth = loggingAction

  {

    logger.info("Application init..")
    initFirstAdmin()

    //    createUser("test1@test", "1234")
    //    createUser("test2@test", "1234")
    //    createUser("test3@test", "1234")
  }

  def initFirstAdmin() = {
    adminDao.findById(UserConstants.FIRST_ADMIN_ID).map { admin =>
      if (admin.isEmpty) {
        adminDao.createUser(
          "admin@admin",
          "admin1234567",
          UserConstants.UserState.enable,
          UserConstants.UserType.SystemAdmin,
          "127.0.0.1",
          System.currentTimeMillis(),
          Some(UserConstants.FIRST_ADMIN_ID)
        )
        logger.info("First System admin [admin@admin] was created with password [admin1234567]")
      }
    }
  }


}
