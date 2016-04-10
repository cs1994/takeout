package modules

import com.google.inject.AbstractModule
import common.AppSettings

import play.api.{Configuration, Environment}
/**
 * Created by caoshuai on 2016/4/10.
 */

class CommonModule(
                    environment: Environment,
                    configuration: Configuration) extends AbstractModule {
  override def configure(): Unit = {
    bind(classOf[AppSettings]).asEagerSingleton()
  }
}


