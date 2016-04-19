package common.errCode

import models.protocols.BaseJsonProtocols

/**
 * Created by caoshuai on 2016/4/19.
 */

object PictureErrcode extends BaseJsonProtocols{
  def invalidForm = jsonResult(1008001,"invalid form.")
  def uploadImageFail = jsonResult(1008002,"upload image fail.")




}
