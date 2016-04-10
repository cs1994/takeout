package common
import com.google.inject.{Inject, Singleton}
import org.slf4j.LoggerFactory
import play.api.{Configuration, Environment}

/**
 * Created by caoshuai on 2016/4/10.
 */

@Singleton
class AppSettings @Inject()(
                             environment: Environment,
                             configuration: Configuration
                             ) {
  private final val logger  = LoggerFactory.getLogger(getClass)
  private[this] val allConfig = configuration


  //mail
//  private val mailConf = allConfig.getConfig("mail.conf").get
//  val WORLDMALL_EMAIL_ADDRESS = mailConf.getString("WORLDMALL_EMAIL_ADDRESS").getOrElse("cwtc@tnetstar.com")
//  val WORLDMALL_EMAIL_PASSWORD = mailConf.getString("WORLDMALL_EMAIL_PASSWORD").getOrElse("tnet1234567")
//  val SMTP_HOST =  mailConf.getString("SMTP_HOST").getOrElse("smtpcom.263xmail.com")
//  val SMTP_PORT =  mailConf.getString("SMTP_PORT").getOrElse("25")
//  val POP_SERVER =  mailConf.getString("POP_SERVER").getOrElse("popcom.263xmail.com")
//  val POP_PORT =  mailConf.getString("POP_PORT").getOrElse("110")
//
//  //image
//  private val imageConfig = allConfig.getConfig("image").get
//  val imageSavePrefix = imageConfig.getString("savePrefix").getOrElse("/data/worldmall")
//  val imageAccessPrefix = imageConfig.getString("accessPrefix").getOrElse("/pic")
//
//  //deploy
//  private val deployConfig = allConfig.getConfig("deploy.conf").get
//  val deployHost = deployConfig.getString("host").getOrElse("http://guomao.neoap.com")
//
//  //js conf
//  private val frontJSConf = allConfig.getConfig("frontJSConf").get
//  val scriptPath = frontJSConf.getString("scriptPath").getOrElse("/assets/javascripts/")
//  val scriptType = frontJSConf.getString("scriptType").getOrElse("text/jsx")


}
