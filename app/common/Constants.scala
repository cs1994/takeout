package common

object Constants {

  val key = ""

  val category = Map(1 -> "快餐类",2 -> "正餐类",3 -> "小吃零食",4 -> "甜品饮品",5 -> "果蔬生鲜",6 -> "鲜花蛋糕",7 -> "商超类")

  //paytype 0-货到付款 1-支付宝

  //系统侧订单状态
  //0-等待支付，1-等待商家接单，2-已接单，3-完成 4-完成（未评价） 5-申请退款 6-已退款 7-拒绝退款 8-货到付款商家接单后用户取消订单,-1-取消
  val orderStatePaying = 0
  val orderStateWaiting = 1
  val orderStateAccept = 2
  val orderStateFinish = 3
  val orderStateFinishNoComment = 4
  val orderStateRefund = 5
  val orderStateRefundSuccess = 6
  val orderStateRefundRefuse = 7
  val orderStateCancelOrder = 8
  val orderStateCancel = -1


  //支付宝侧订单状态
  val alipayStateWaitBuyerPay = 0 // 	交易创建，等待买家付款。
  val alipayStateTradeClosed = 1 //在指定时间段内未支付时关闭的交易； 在交易完成全额退款成功时关闭的交易。
  val alipayStateTradeSuccess = 2 //交易成功，且可对该交易做操作，如：多级分润、退款等。
  val alipayStateTradePending = 3 //等待卖家收款（买家付款后，如果卖家账号被冻结）
  val alipayStateTradeFinished = 4 //交易成功且结束，即不可再做任何操作。

  //退款状态
  val refundWaiting = 0
  val refundSuccess = 1
  val refundClosed = 2


  object authState{
    val rejected = 0
    val accepted = 1
  }

  object storeType {
    val mallStore = 1
    val restaurant = 2
  }

  //餐饮积分规则
  val userConfirmOrder = 40     //用户确认收货
  val userConfirmOrderBySys = 30//4小时到自动确认收货
  val userAddComment = 20       //写菜品评价

   object CacheKey {
    val ALL_STORE = "allStore"
    val ALL_SERVICE = "allService"
    val KAPTCHA_TOKEN = "captcha.tokens"
  }
}
