package actor

import java.util.concurrent.TimeUnit
import javax.inject.Named

import akka.actor._
import akka.pattern._
import akka.util.Timeout

import com.google.inject.{Inject,Singleton}
//import common.GroupBuyContants._
import models.dao.{AdminDao}
import org.slf4j.LoggerFactory
import play.api.libs.json.JsObject
import scala.collection.mutable.ListBuffer
import scala.concurrent.Await
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.duration.Duration
import scala.concurrent.duration._
import common.errCode.AdminErrcode._
import scala.util.{Success,Failure}

/**
 * Created by caoshuai on 2016/4/10.
 */
@Singleton
class AdminActor @Inject()(
                                      @Named("configured-AdminActor") customerBonusActor:ActorRef,
                                      adminDao: AdminDao
                                      ) extends Actor with Stash{

  import actor.AdminActor._
  implicit val timeout = Timeout(5.seconds)
  private final val logger = LoggerFactory.getLogger(getClass)
  private val delSender = new ListBuffer[(Long,ActorRef)]
  var top10 = new ListBuffer[Long]()

  import com.github.nscala_time.time.Imports._
  def delayTime = {
    val now=DateTime.now
    val delay=DateTime.now.withHour(0).withMinute(0).withSecond(5).withMillisOfSecond(0)
    var a=0
    if(delay.isBefore(now.getMillis))  a=((delay.plusHours(24).getMillis-now.getMillis)/1000).toInt else a=((delay.getMillis-now.getMillis)/1000).toInt
    println(a)
    a
  }

  @throws[Exception](classOf[Exception])
  override def preStart(): Unit = {
    logger.info(s"${self.path.name}  actor starting .........")
  }

  @throws[Exception](classOf[Exception])
  override def postStop(): Unit = {
    logger.info(s"${self.path.name}  actor stopping .........")
  }

  override def receive: Receive = {
    case Create(id,userId,lowerBound,upperBound,endTime) =>
      val send = sender()
//      val childRef = context.actorOf(GroupBuyActor.props(id,userId,GBState.create,upperBound,lowerBound,endTime,0,Seq[Long](),Seq[Long](),groupBuyingDao,customerBonusActor),name = s"GroupBuy:$id")
//      context.watch(childRef)
//      send ! Complete

//    case Delete(id) =>
//      val send = sender()
//      val child = context.child(s"GroupBuy:$id")
//      if(child.isDefined){
//        context.stop(child.get)
//        delSender += ((id,send))
//        top10 -= id
//      }else{
//        send ! Result(GroupBuyingNotExist)
//      }
//
//    case r@Participate(userId,id) =>
//      val send = sender()
//      val child = context.child(s"GroupBuy:$id")
//      if(child.isDefined){
//        child.get.forward(r)
//      }else{
//        send ! Result(GroupBuyingNotExist)
//      }
//
//    case r@CancelParticipate(id,userId) =>
//      val send = sender()
//      val child = context.child(s"GroupBuy:$id")
//      if(child.isDefined){
//        child.get.forward(r)
//      }else{
//        send ! Result(GroupBuyingNotExist)
//      }
//
//    case r@Comment(userId,id,nickName,comment,score,now) =>
//      val send = sender()
//      val child = context.child(s"GroupBuy:$id")
//      if(child.isDefined){
//        child.get.forward(r)
//      }else{
//        send ! Result(GroupBuyingNotExist)
//      }
//
//    case Finish(id) => //子actor向此主actor发送的拼团已结束消息
//      val send = sender() //发送的子actor
//      context.stop(send)

    case Terminated(child) =>
      val id = child.path.toString.split(":").last.toLong
      delSender.filter(_._1 == id).foreach{send =>
//        send._2 ! Complete
      }
      context.unwatch(child)

//    case Top10 =>
//      val now =
//        if(DateTime.now.getHourOfDay ==0) DateTime.now.withHourOfDay(0).withMinuteOfHour(0).withSecondOfMinute(0).withMillisOfSecond(0).getMillis
//        else DateTime.now.plusDays(1).withHourOfDay(0).withMinuteOfHour(0).withSecondOfMinute(0).withMillisOfSecond(0).getMillis
//      groupBuyingDao.getTop10(now).andThen{
//        case Success(list) =>
//          top10.clear()
//          top10 ++= list
//        case Failure(e) => logger.debug("get top10 database error"+e)
//      }.onComplete{
//        case _ =>
//          self ! WakeUp
//      }
//      context.become(sleep)

//    case getTop10 =>
//      sender() ! Top10List(top10.toList)
  }

  def sleep: Receive = {
//    case WakeUp =>
//      unstashAll()
//      context.unbecome()
    case msg =>
      stash()
  }

}

object AdminActor{
  case class Create(gbId: Long,userId:Long,lowerBound: Int,upperBound: Int,endTime: Long)
}
