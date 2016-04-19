package models.dao

import javax.inject.Inject

import models.tables.SlickTables
import org.slf4j.LoggerFactory
import play.api.db.slick.{HasDatabaseConfigProvider, DatabaseConfigProvider}
import slick.driver.JdbcProfile
import slick.driver.MySQLDriver.api._
import scala.concurrent.ExecutionContext.Implicits.global
/**
 * Created by caoshuai on 2016/4/19.
 */
class RestaurantDao @Inject()(
                               protected val dbConfigProvider: DatabaseConfigProvider
                               ) extends HasDatabaseConfigProvider[JdbcProfile] {

  private final val logger = LoggerFactory.getLogger(getClass)
  private[this] val restaurant = SlickTables.tRestaurant
  private final val PAGE_SIZE = 10


  def createRestaurant(adminId:Long,name:String,description:Option[String],announcer:Option[String],basePrice:Int,packFee:Int,pic:Option[String],
                       duringTime:Option[Long],tag:Long,address:String,concessions:Option[String],longitude:Option[Double],
                       latitude:Option[Double],openingTime:String,tel:String)={
    db.run(restaurant.map(t=>(t.ownerId,t.name,t.description,t.announcer,t.basePrice,t.packFee,t.pic, t.duringTime,t.tag,t.address,
      t.concessions,t.longitude,t.latitude, t.openingTime,t.isOpen,t.sales,t.stars,t.tel,t.authState,t.index)).returning(restaurant.map(_.id)) += (adminId,name,description,
      announcer,basePrice,packFee,pic,duringTime,tag,address,concessions,longitude,latitude,openingTime,1,0,0,tel,1,100))
    }


  def getAllRestaurantNum(tag: Long) = {
    db.run{
      //      restaurant.length.result
      restaurant.filter(t=>(t.id>0L) && (if(tag > 0L) t.tag === tag else true)).length.result
    }
  }

  def listRestaurantByPage(page:Int,tag:Long) = {
    val offset = if(page<1) 0 else(page-1)*PAGE_SIZE
    for{
      total <- getAllRestaurantNum(tag)
      list <- db.run{restaurant.filter(t=>(t.id>0L) && (if(tag > 0L) t.tag === tag else true)).sortBy(_.ownerId.asc).drop(offset).take(PAGE_SIZE).result}
    }yield {
      (if(total%PAGE_SIZE==0) total/PAGE_SIZE else total/PAGE_SIZE+1,list)
    }
  }
}
