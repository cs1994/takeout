package controllers

import java.io.File

import com.github.nscala_time.time.Imports._
import com.google.inject.{Inject, Singleton}
import common.AppSettings
import org.apache.commons.codec.digest.DigestUtils
import org.slf4j.LoggerFactory
import play.api.libs.json.Json
import play.api.mvc.{Action, Controller}
import util.SecureUtil
import models.protocols.AdminProtocols
import scala.concurrent.Future
import common.errCode.PictureErrcode


/**
 * User: Huangshanqi
 * Date: 2015/12/22
 * Time: 14:15
 */
@Singleton
class PictureManager @Inject()(appSetting:AppSettings,
                               val actionUtils: ActionUtils) extends Controller with AdminProtocols{

  /**
   * 图片管理
   */
  private final val logger = LoggerFactory.getLogger(getClass)
  private final val IMAGE_SAVE_PREFIX  = appSetting.imageSavePrefix
  private final val IMAGE_ACCESS_PREFIX  = appSetting.imageAccessPrefix

  import actionUtils._
  private val adminAuth = loggingAction


  private def genUniqueName(fileName:String) = {
    SecureUtil.nonceStr(16)+DigestUtils.md5Hex(SecureUtil.nonceStr(32)+DateTime.now.getMillis.toString+fileName)
  }

  def uploadRestaurantPic = adminAuth.async{ request=>
    /**
      * upload restaurant image
      * saveDir = /data/worldmall/catering/restaurant
      */
    request.body.asMultipartFormData match {
      case Some(mutilForm)=>{
        if(mutilForm.file("imgFile").isDefined){
          //todo
          val dirPath = s"/catering/restaurant/"
          val dir = new File(IMAGE_SAVE_PREFIX+dirPath)
          if(!dir.exists()){
            dir.mkdirs()
          }
          val temp = mutilForm.file("imgFile").head
          val postFix = temp.filename.split("\\.",2).last
          val fileName = (dirPath+genUniqueName(temp.filename)+ "."+postFix).replaceAll(" ","")
          try {
            temp.ref.moveTo(new File(IMAGE_SAVE_PREFIX+fileName))
            val accessUrl = IMAGE_ACCESS_PREFIX+fileName
            Future.successful(Ok(successResult(Json.obj("url"->accessUrl))))
          }catch {
            case e:Exception =>
              logger.info("upload pic failed:",e)
              Future.successful(Ok(PictureErrcode.uploadImageFail))
          }
        }else{
          Future.successful(Ok(PictureErrcode.invalidForm))
        }
      }
      case None=>{
        Future.successful(Ok(PictureErrcode.invalidForm))
      }
    }
  }

}
