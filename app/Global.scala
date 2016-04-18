import javax.inject.Inject

import controllers.Applications
import play.api.{Logger, Application, GlobalSettings}

/**
 * Created by caoshuai on 2016/4/18.
 */
class Global  @Inject()(
                       application:Applications
                         ) extends GlobalSettings{

  override def onStart(app:Application): Unit = {
    Logger.info("global setting start ................................")
    application.initFirstAdmin()

    Logger.info("global setting start 33.............................")
  }

}
