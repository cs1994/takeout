package modules

import actor._
import com.google.inject.AbstractModule
import play.api.libs.concurrent.AkkaGuiceSupport
/**
 * Created by caoshuai on 2016/4/10.
 */
class ActorModule extends AbstractModule with AkkaGuiceSupport {
  override def configure(): Unit = {
    bindActor[AdminActor]("configured-AdminActor")
  }
}
