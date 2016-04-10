package common

/**
 * Created by caoshuai on 2016/4/10.
 */
object UserConstants {

  object UserType {
    //系统管理员
    val SystemAdmin = 1
    //商家
    val StoreAdmin = 2
    //顾客
    val Customer = 3
  }

  val defaultHead = "/assets/images/defaultHead.jpg"

  object UserState {
    val disable = 0
    val enable = 1
  }

  val FIRST_ADMIN_ID = 100001L
  val SYSTEM_ADMIN_DEFAULT_PW = ""
  val MERCHANT_DEFAULT_PW = "a1b2C3D4"
  val FIRST_CUSTOMER_ID = 100001
}
