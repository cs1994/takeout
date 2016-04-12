package models.dao

import javax.inject.Inject

import com.google.inject.Singleton
import common.UserConstants
import models.tables.SlickTables
import org.slf4j.LoggerFactory
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import play.api.libs.json.Json
import slick.driver.JdbcProfile
import slick.driver.MySQLDriver.api._
import play.api.libs.concurrent.Execution.Implicits.defaultContext
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


  def findByEmail(email: String) = db.run{
    user.filter(_.email === email).result.headOption
  }
}