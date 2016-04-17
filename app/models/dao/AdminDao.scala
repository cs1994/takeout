package models.dao

import javax.inject.Inject

import com.google.inject.Singleton
import common.UserConstants
import models.tables.SlickTables
import models.tables.SlickTables._
import org.slf4j.LoggerFactory
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import play.api.libs.json.Json
import slick.driver.JdbcProfile
import slick.driver.MySQLDriver.api._
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import util.SecureUtil._
import scala.collection.mutable.ListBuffer
import scala.concurrent.Future
/**
 * Created by caoshuai on 2016/4/10.
 */
@Singleton
class AdminDao @Inject()(
                          protected val dbConfigProvider: DatabaseConfigProvider
                          ) extends HasDatabaseConfigProvider[JdbcProfile] {

  private final val logger = LoggerFactory.getLogger(getClass)
  private[this] val user = SlickTables.tUser
  private[this] val admin = SlickTables.tAdmin
  private final val PAGE_SIZE = 20


  def findById(uid:Long) = db.run{
    admin.filter(_.id===uid).result.headOption
  }

  def findByEmail(email: String) = db.run{
    admin.filter(_.email === email).result.headOption
  }

  def createUser(
                  email: String,
                  password: String,
                  state: Int,
                  userType: Int,
                  ip: String,
                  createTime: Long,
                  userId: Option[Long] = None
                  ) = {
    val secure = getSecurePassword(password, ip, createTime)
    if (userId.isDefined) {
      val id = userId.get
      logger.info("Create user by id=" + id + " email=" + email)
      db.run(
        admin.map(u => (u.id, u.email, u.state, u.userType, u.ip, u.createTime, u.secure,u.nickName,u.headImg)).
          forceInsert(id, email, state, userType, ip, createTime, secure,email,UserConstants.defaultHead)
      ).onFailure { case e => logger.error("create user failed." + e.getMessage) }
      Future.successful(id)
    } else {
      logger.info("Create user by email=" + email)
      db.run(
        admin.
          map(u => (u.email, u.state, u.userType, u.ip, u.createTime, u.secure,u.nickName,u.headImg)).
          returning(admin.map(_.id)) +=(email, state, userType, ip, createTime, secure,email,UserConstants.defaultHead)
      ).mapTo[Long]
    }
  }

  def getAllAdminNum = {
    db.run(admin.filterNot(_.id===UserConstants.FIRST_ADMIN_ID).length.result)
  }
  def listByPage(page:Int) = {
    val offset = if(page<1) 0 else (page-1)*PAGE_SIZE
    for{
      total<- getAllAdminNum
      list <- db.run{admin.filterNot(_.id===UserConstants.FIRST_ADMIN_ID).sortBy(_.createTime.desc).drop(offset).take(PAGE_SIZE).result}
    }yield {
      (if(total%PAGE_SIZE==0) total/PAGE_SIZE else total/PAGE_SIZE+1,list)
    }
  }

}