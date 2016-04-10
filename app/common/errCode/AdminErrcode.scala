package common.errCode
import models.protocols.BaseJsonProtocols

/**
 * Created by caoshuai on 2016/4/10.
 */
object AdminErrcode extends BaseJsonProtocols{
  val createActivityEmptyForm = jsonResult(1002000, "No form data.")

}
