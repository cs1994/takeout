import javax.inject.{Inject, Singleton}

import akka.actor.ActorRef
import com.google.inject.name.Named
import common.{AccessRecord, UserConstants}
//import models.dao.RestaurantDao
//import models.dao.mall.MallStoreDao
import models.dao.{AdminDao}
import org.slf4j.LoggerFactory
import play.api.mvc._

import scala.concurrent.Future


package object controllers {
  import models.tables.SlickTables._
  import play.api.libs.concurrent.Execution.Implicits.defaultContext

  case class Logging[A](action: Action[A]) extends Action[A] {

    def apply(request: Request[A]): Future[Result] = {
      action(request)
    }

    lazy val parser = action.parser
  }

    object SessionKey {
    val userId = "id"
    val uType = "uType"
    val timestamp = "ts"
    val ip = "ip"
    val mobile = "mobile"
    val smsCode = "smsCode"
    val smsTimestamp = "smsTimestamp"
    val nickName = "nickName"
    val email = "email"
    val storeId = "storeId"
  }

  def getCustomerConfMap(request: Request[AnyContent]): Map[String, String] = {
    lazy val baseInfo = Map(
      "id" -> request.session.get(SessionKey.userId).getOrElse(""),
      "mobile" -> request.session.get(SessionKey.mobile).getOrElse(""),
      "nickName" -> request.session.get(SessionKey.nickName).getOrElse(""),
      "email" -> request.session.get(SessionKey.email).getOrElse(""),
      "uType" -> request.session.get(SessionKey.uType).getOrElse("")
    )
    baseInfo
  }

  @Singleton
  class LoggingAction @Inject()(@Named("configured-VisitCounter") accessActor:ActorRef) extends ActionBuilder[Request] {
    val logger = LoggerFactory.getLogger(getClass)
    def invokeBlock[A](request: Request[A], block: (Request[A]) => Future[Result]) = {
      logger.info(s"access log: path=${request.path},rawQueryString: ${request.rawQueryString},remoteAddress:${request.remoteAddress}" )

//      accessActor ! AccessRecord(System.currentTimeMillis()/1000,request.remoteAddress,request.path)
      block(request)
    }
  }

//  class CustomerRequest[A](val customer: rUCustomer, request: Request[A]) extends WrappedRequest[A](request)
//  class AdminRequest[A](val admin: rUAdmin, request: Request[A]) extends WrappedRequest[A](request)
//  class TestRequest[A](val customer: rUCustomer,val admin: rUAdmin, request: Request[A]) extends WrappedRequest[A](request)
//  class MallStoreRequest[A](val mallStore: rMallStore,val admin: rUAdmin, request: Request[A]) extends WrappedRequest[A](request)
//  class CateringStoreRequest[A](val restaurant: rRestaurant,val admin: rUAdmin, request: Request[A]) extends WrappedRequest[A](request)

//  @Singleton
//  class CustomerAction @Inject()(customerDao: CustomerDao) extends ActionRefiner[Request, CustomerRequest] {
//    /**
//     * 顾客认证
//     */
//    val logger = LoggerFactory.getLogger(getClass)
//    val SessionTimeOut = 24 * 60 * 60 * 1000 //ms
//
//    protected def authCustomer(request: RequestHeader): Future[Option[rUCustomer]] = {
//
//      val session = request.session
//      try {
//        val ip = session.get(SessionKey.ip).get
//        val ts = session.get(SessionKey.timestamp).get.toLong
//        val uid = session.get(SessionKey.userId).get.toLong
//
//        if (ip != request.remoteAddress) {
//          logger.info("Login failed for ip: expected ip=" + ip + " actually ip=" + request.remoteAddress)
//          Future.successful(None)
//        } else if (System.currentTimeMillis() - ts > SessionTimeOut) {
//          logger.info("Login failed for timeout")
//          Future.successful(None)
//        } else {
//          customerDao.findById(uid)
//        }
//      } catch {
//        case ex: Throwable =>
//          logger.info("Not Login Yet."+ex.getMessage)
//          Future.successful(None)
//      }
//    }
//
//    protected def onUnauthorized(request: RequestHeader) =
//      Results.Redirect(controllers.customer.routes.CustomerAuth.loginPage()).withNewSession
//
//    override protected def refine[A](request: Request[A]): Future[Either[Result, CustomerRequest[A]]] = {
//      authCustomer(request).map {
//        case Some(customer) =>
//          Right(new CustomerRequest(customer, request))
//        case None =>
//          Left(onUnauthorized(request))
//      }
//    }
//  }

//  @Singleton
//  class AdminAction @Inject()(adminDao: AdminDao) extends ActionRefiner[Request, AdminRequest] {
//    val logger = LoggerFactory.getLogger(getClass)
//    val SessionTimeOut = 24 * 60 * 60 * 1000 //ms
//
//    protected def authAdmin(request: RequestHeader): Future[Option[rUAdmin]] = {
//
//      val session = request.session
//      try {
//        val ip = session.get(SessionKey.ip).get
//        val ts = session.get(SessionKey.timestamp).get.toLong
//        val uid = session.get(SessionKey.userId).get.toLong
//
//        if (ip != request.remoteAddress) {
//          logger.info("Login failed for ip: expected ip=" + ip + " actually ip=" + request.remoteAddress)
//          Future.successful(None)
//        } else if (System.currentTimeMillis() - ts > SessionTimeOut) {
//          logger.info("Login failed for timeout")
//          Future.successful(None)
//        } else {
//          adminDao.findById(uid)
//        }
//      } catch {
//        case ex: Throwable =>
//          logger.info("Not Login Yet.")
//          Future.successful(None)
//      }
//    }
//
//    protected def onUnauthorized(request: RequestHeader) =
//      Results.Redirect(controllers.admin.routes.AdminAuth.loginPage()).withNewSession
//
//    override protected def refine[A](request: Request[A]): Future[Either[Result, AdminRequest[A]]] = {
//      authAdmin(request).map {
//        case Some(admin) =>
//          Right(new AdminRequest(admin, request))
//        case None =>
//          Left(onUnauthorized(request))
//      }
//    }
//  }


//  @Singleton
//  class SystemAdminAction() extends ActionRefiner[AdminRequest, AdminRequest] {
//    /**
//     * 系统管理员认证
//     */
//    val logger = LoggerFactory.getLogger(getClass)
//    override protected def refine[A](request: AdminRequest[A]): Future[Either[Result, AdminRequest[A]]] = {
//      Future.successful {
//        if (request.admin.userType == UserConstants.UserType.SystemAdmin) {
//          Right(request)
//        } else {
//          Left(Results.Forbidden("Only System Admin can do."))
//        }
//      }
//    }
//  }

//  @Singleton
//  class MallStoreAdminAction @Inject()(mallStoreDao:MallStoreDao)extends ActionRefiner[AdminRequest, MallStoreRequest] {
//    /**
//     * 商家认证
//     */
//    val logger = LoggerFactory.getLogger(getClass)
//
//    protected def onUnauthorized(request: RequestHeader) =
//      Results.Redirect(controllers.admin.routes.AdminAuth.loginPage()).withNewSession
//
//    protected def authMallStore(request: RequestHeader): Future[Option[rMallStore]] = {
//      val adminId = request.session.get(SessionKey.userId).get.toLong
//      try{
//        mallStoreDao.findByAdminId(adminId)
//      }catch {
//        case e:Exception =>{
//          logger.info("Can not find mall store.")
//          Future.successful(None)
//        }
//      }
//    }
//
//    override protected def refine[A](request: AdminRequest[A]): Future[Either[Result, MallStoreRequest[A]]] = {
//      authMallStore(request).map{
//        case Some(mallStore) =>
//          Right(new MallStoreRequest(mallStore,request.admin,request))
//        case None =>
//          Left(onUnauthorized(request))
//      }
//    }
//  }

//  @Singleton
//  class CateringStoreAdminAction@Inject()(restaurantDao:RestaurantDao) extends ActionRefiner[AdminRequest, CateringStoreRequest] {
//    /**
//     * 商家认证
//     */
//    val logger = LoggerFactory.getLogger(getClass)
//
//    protected def onUnauthorized(request: RequestHeader) =
//      Results.Redirect(controllers.admin.routes.AdminAuth.loginPage()).withNewSession
//
//    protected def authCateringStore(request: RequestHeader): Future[Option[rRestaurant]] = {
//      val adminId = request.session.get(SessionKey.userId).get.toLong
//      try{
//        restaurantDao.getRestaurantByUser(adminId)
//      }catch {
//        case e:Exception =>{
//          logger.info("Can not find mall store.")
//          Future.successful(None)
//        }
//      }
//    }
//
//    override protected def refine[A](request: AdminRequest[A]): Future[Either[Result, CateringStoreRequest[A]]] = {
//      authCateringStore(request).map{
//        case Some(restaurant) =>
//          Right(new CateringStoreRequest(restaurant,request.admin,request))
//        case None =>
//          Left(onUnauthorized(request))
//      }
//    }
//  }

//  @Singleton
//  class TestStoreAdminAction @Inject()(customerDao: CustomerDao) extends ActionRefiner[AdminRequest, TestRequest] {
//    /**
//     * 商家认证
//     */
//    val logger = LoggerFactory.getLogger(getClass)
//
//    protected def onUnauthorized(request: RequestHeader) =
//      Results.Redirect(controllers.admin.routes.AdminAuth.loginPage()).withNewSession
//
//    protected def authTest(request: RequestHeader): Future[Option[rUCustomer]] = {
//      val testId = request.session.get(SessionKey.userId).get.toLong
//      try{
//        customerDao.findById(testId)
//      }catch {
//        case e:Exception =>{
//          logger.info("Can not find test store.")
//          Future.successful(None)
//        }
//      }
//    }
//
//    override protected def refine[A](request: AdminRequest[A]): Future[Either[Result, TestRequest[A]]] = {
//
//      authTest(request).map{
//        case Some(testCustomer) =>
//          Right(new TestRequest(testCustomer,request.admin,request))
//        case None =>
//          Left(onUnauthorized(request))
//      }
//    }
//  }


  @Singleton
  case class ActionUtils @Inject()(
//                                    customerDao: CustomerDao,
                                    adminDao: AdminDao,
                                    loggingAction: LoggingAction
//                                    customerAction: CustomerAction,
//                                    adminAction: AdminAction,
//                                    systemAdminAction: SystemAdminAction,
//                                    mallStoreAdminAction: MallStoreAdminAction,
//                                    cateringStoreAdminAction: CateringStoreAdminAction
                                    ) {

  }


}
