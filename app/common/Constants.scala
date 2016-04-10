package common

object Constants {

  val key = ""

  val category = Map(1 -> "�����",2 -> "������",3 -> "С����ʳ",4 -> "��Ʒ��Ʒ",5 -> "��������",6 -> "�ʻ�����",7 -> "�̳���")

  //paytype 0-�������� 1-֧����

  //ϵͳ�ඩ��״̬
  //0-�ȴ�֧����1-�ȴ��̼ҽӵ���2-�ѽӵ���3-��� 4-��ɣ�δ���ۣ� 5-�����˿� 6-���˿� 7-�ܾ��˿� 8-���������̼ҽӵ����û�ȡ������,-1-ȡ��
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


  //֧�����ඩ��״̬
  val alipayStateWaitBuyerPay = 0 // 	���״������ȴ���Ҹ��
  val alipayStateTradeClosed = 1 //��ָ��ʱ�����δ֧��ʱ�رյĽ��ף� �ڽ������ȫ���˿�ɹ�ʱ�رյĽ��ס�
  val alipayStateTradeSuccess = 2 //���׳ɹ����ҿɶԸý������������磺�༶�����˿�ȡ�
  val alipayStateTradePending = 3 //�ȴ������տ��Ҹ������������˺ű����ᣩ
  val alipayStateTradeFinished = 4 //���׳ɹ��ҽ����������������κβ�����

  //�˿�״̬
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

  //�������ֹ���
  val userConfirmOrder = 40     //�û�ȷ���ջ�
  val userConfirmOrderBySys = 30//4Сʱ���Զ�ȷ���ջ�
  val userAddComment = 20       //д��Ʒ����

   object CacheKey {
    val ALL_STORE = "allStore"
    val ALL_SERVICE = "allService"
    val KAPTCHA_TOKEN = "captcha.tokens"
  }
}
