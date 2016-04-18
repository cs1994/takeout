package models.tables
// AUTO-GENERATED Slick data model
/** Stand-alone Slick data model for immediate use */
object SlickTables extends {
  val profile = slick.driver.MySQLDriver
} with SlickTables

/** Slick data model trait for extension, choice of backend or usage in the cake pattern. (Make sure to initialize this late.) */
trait SlickTables {
  val profile: slick.driver.JdbcProfile
  import profile.api._
  import slick.model.ForeignKeyAction
  // NOTE: GetResult mappers for plain SQL are only generated for tables where Slick knows how to map the types of all columns.
  import slick.jdbc.{GetResult => GR}

  /** DDL for all tables. Call .create to execute. */
  lazy val schema: profile.SchemaDescription = Array(tAdmin.schema, tCollection.schema, tDish.schema, tDishComment.schema, tDishTag.schema, tDishTagRelation.schema, tRefund.schema, tRestaurant.schema, tRestaurantComment.schema, tRestaurantConcessions.schema, tRestaurantOrder.schema, tRestaurantOrderAddress.schema, tRestaurantOrderDetail.schema, tRestaurantTag.schema, tRestaurantTop.schema, tUser.schema).reduceLeft(_ ++ _)
  @deprecated("Use .schema instead of .ddl", "3.0")
  def ddl = schema

  /** Entity class storing rows of table tAdmin
    *  @param id Database column Id SqlType(BIGINT), AutoInc, PrimaryKey
    *  @param email Database column email SqlType(VARCHAR), Length(255,true), Default()
    *  @param nickName Database column nick_name SqlType(VARCHAR), Length(255,true), Default()
    *  @param headImg Database column head_img SqlType(VARCHAR), Length(255,true), Default()
    *  @param state Database column state SqlType(INT), Default(0)
    *  @param userType Database column user_type SqlType(INT), Default(0)
    *  @param createTime Database column create_time SqlType(BIGINT), Default(0)
    *  @param ip Database column ip SqlType(VARCHAR), Length(255,true), Default()
    *  @param secure Database column secure SqlType(VARCHAR), Length(255,true), Default() */
  case class rAdmin(id: Long, email: String = "", nickName: String = "", headImg: String = "", state: Int = 0, userType: Int = 0, createTime: Long = 0L, ip: String = "", secure: String = "")
  /** GetResult implicit for fetching rAdmin objects using plain SQL queries */
  implicit def GetResultrAdmin(implicit e0: GR[Long], e1: GR[String], e2: GR[Int]): GR[rAdmin] = GR{
    prs => import prs._
      rAdmin.tupled((<<[Long], <<[String], <<[String], <<[String], <<[Int], <<[Int], <<[Long], <<[String], <<[String]))
  }
  /** Table description of table admin. Objects of this class serve as prototypes for rows in queries. */
  class tAdmin(_tableTag: Tag) extends Table[rAdmin](_tableTag, "admin") {
    def * = (id, email, nickName, headImg, state, userType, createTime, ip, secure) <> (rAdmin.tupled, rAdmin.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(email), Rep.Some(nickName), Rep.Some(headImg), Rep.Some(state), Rep.Some(userType), Rep.Some(createTime), Rep.Some(ip), Rep.Some(secure)).shaped.<>({r=>import r._; _1.map(_=> rAdmin.tupled((_1.get, _2.get, _3.get, _4.get, _5.get, _6.get, _7.get, _8.get, _9.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column Id SqlType(BIGINT), AutoInc, PrimaryKey */
    val id: Rep[Long] = column[Long]("Id", O.AutoInc, O.PrimaryKey)
    /** Database column email SqlType(VARCHAR), Length(255,true), Default() */
    val email: Rep[String] = column[String]("email", O.Length(255,varying=true), O.Default(""))
    /** Database column nick_name SqlType(VARCHAR), Length(255,true), Default() */
    val nickName: Rep[String] = column[String]("nick_name", O.Length(255,varying=true), O.Default(""))
    /** Database column head_img SqlType(VARCHAR), Length(255,true), Default() */
    val headImg: Rep[String] = column[String]("head_img", O.Length(255,varying=true), O.Default(""))
    /** Database column state SqlType(INT), Default(0) */
    val state: Rep[Int] = column[Int]("state", O.Default(0))
    /** Database column user_type SqlType(INT), Default(0) */
    val userType: Rep[Int] = column[Int]("user_type", O.Default(0))
    /** Database column create_time SqlType(BIGINT), Default(0) */
    val createTime: Rep[Long] = column[Long]("create_time", O.Default(0L))
    /** Database column ip SqlType(VARCHAR), Length(255,true), Default() */
    val ip: Rep[String] = column[String]("ip", O.Length(255,varying=true), O.Default(""))
    /** Database column secure SqlType(VARCHAR), Length(255,true), Default() */
    val secure: Rep[String] = column[String]("secure", O.Length(255,varying=true), O.Default(""))
  }
  /** Collection-like TableQuery object for table tAdmin */
  lazy val tAdmin = new TableQuery(tag => new tAdmin(tag))

  /** Entity class storing rows of table tCollection
    *  @param id Database column Id SqlType(BIGINT), AutoInc, PrimaryKey
    *  @param userId Database column user_id SqlType(BIGINT), Default(0)
    *  @param restaurantId Database column restaurant_id SqlType(BIGINT), Default(0) */
  case class rCollection(id: Long, userId: Long = 0L, restaurantId: Long = 0L)
  /** GetResult implicit for fetching rCollection objects using plain SQL queries */
  implicit def GetResultrCollection(implicit e0: GR[Long]): GR[rCollection] = GR{
    prs => import prs._
      rCollection.tupled((<<[Long], <<[Long], <<[Long]))
  }
  /** Table description of table collection. Objects of this class serve as prototypes for rows in queries. */
  class tCollection(_tableTag: Tag) extends Table[rCollection](_tableTag, "collection") {
    def * = (id, userId, restaurantId) <> (rCollection.tupled, rCollection.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(userId), Rep.Some(restaurantId)).shaped.<>({r=>import r._; _1.map(_=> rCollection.tupled((_1.get, _2.get, _3.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column Id SqlType(BIGINT), AutoInc, PrimaryKey */
    val id: Rep[Long] = column[Long]("Id", O.AutoInc, O.PrimaryKey)
    /** Database column user_id SqlType(BIGINT), Default(0) */
    val userId: Rep[Long] = column[Long]("user_id", O.Default(0L))
    /** Database column restaurant_id SqlType(BIGINT), Default(0) */
    val restaurantId: Rep[Long] = column[Long]("restaurant_id", O.Default(0L))
  }
  /** Collection-like TableQuery object for table tCollection */
  lazy val tCollection = new TableQuery(tag => new tCollection(tag))

  /** Entity class storing rows of table tDish
    *  @param id Database column Id SqlType(BIGINT), AutoInc, PrimaryKey
    *  @param restId Database column rest_id SqlType(BIGINT), Default(0)
    *  @param name Database column name SqlType(VARCHAR), Length(255,true), Default()
    *  @param description Database column description SqlType(VARCHAR), Length(1000,true), Default(Some())
    *  @param price Database column price SqlType(VARCHAR), Length(255,true), Default()
    *  @param sale Database column sale SqlType(BIGINT), Default(0)
    *  @param pic Database column pic SqlType(VARCHAR), Length(1000,true), Default(None)
    *  @param state Database column state SqlType(INT), Default(1)
    *  @param star Database column star SqlType(INT), Default(0) */
  case class rDish(id: Long, restId: Long = 0L, name: String = "", description: Option[String] = Some(""), price: String = "", sale: Long = 0L, pic: Option[String] = None, state: Int = 1, star: Int = 0)
  /** GetResult implicit for fetching rDish objects using plain SQL queries */
  implicit def GetResultrDish(implicit e0: GR[Long], e1: GR[String], e2: GR[Option[String]], e3: GR[Int]): GR[rDish] = GR{
    prs => import prs._
      rDish.tupled((<<[Long], <<[Long], <<[String], <<?[String], <<[String], <<[Long], <<?[String], <<[Int], <<[Int]))
  }
  /** Table description of table dish. Objects of this class serve as prototypes for rows in queries. */
  class tDish(_tableTag: Tag) extends Table[rDish](_tableTag, "dish") {
    def * = (id, restId, name, description, price, sale, pic, state, star) <> (rDish.tupled, rDish.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(restId), Rep.Some(name), description, Rep.Some(price), Rep.Some(sale), pic, Rep.Some(state), Rep.Some(star)).shaped.<>({r=>import r._; _1.map(_=> rDish.tupled((_1.get, _2.get, _3.get, _4, _5.get, _6.get, _7, _8.get, _9.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column Id SqlType(BIGINT), AutoInc, PrimaryKey */
    val id: Rep[Long] = column[Long]("Id", O.AutoInc, O.PrimaryKey)
    /** Database column rest_id SqlType(BIGINT), Default(0) */
    val restId: Rep[Long] = column[Long]("rest_id", O.Default(0L))
    /** Database column name SqlType(VARCHAR), Length(255,true), Default() */
    val name: Rep[String] = column[String]("name", O.Length(255,varying=true), O.Default(""))
    /** Database column description SqlType(VARCHAR), Length(1000,true), Default(Some()) */
    val description: Rep[Option[String]] = column[Option[String]]("description", O.Length(1000,varying=true), O.Default(Some("")))
    /** Database column price SqlType(VARCHAR), Length(255,true), Default() */
    val price: Rep[String] = column[String]("price", O.Length(255,varying=true), O.Default(""))
    /** Database column sale SqlType(BIGINT), Default(0) */
    val sale: Rep[Long] = column[Long]("sale", O.Default(0L))
    /** Database column pic SqlType(VARCHAR), Length(1000,true), Default(None) */
    val pic: Rep[Option[String]] = column[Option[String]]("pic", O.Length(1000,varying=true), O.Default(None))
    /** Database column state SqlType(INT), Default(1) */
    val state: Rep[Int] = column[Int]("state", O.Default(1))
    /** Database column star SqlType(INT), Default(0) */
    val star: Rep[Int] = column[Int]("star", O.Default(0))
  }
  /** Collection-like TableQuery object for table tDish */
  lazy val tDish = new TableQuery(tag => new tDish(tag))

  /** Entity class storing rows of table tDishComment
    *  @param id Database column Id SqlType(BIGINT), AutoInc, PrimaryKey
    *  @param restId Database column rest_id SqlType(BIGINT), Default(0)
    *  @param dishId Database column dish_id SqlType(BIGINT), Default(0)
    *  @param createTime Database column create_time SqlType(BIGINT), Default(0)
    *  @param userId Database column user_id SqlType(BIGINT), Default(0)
    *  @param userName Database column user_name SqlType(VARCHAR), Length(255,true), Default()
    *  @param score Database column score SqlType(INT), Default(0)
    *  @param content Database column content SqlType(VARCHAR), Length(1000,true), Default(None) */
  case class rDishComment(id: Long, restId: Long = 0L, dishId: Long = 0L, createTime: Long = 0L, userId: Long = 0L, userName: String = "", score: Int = 0, content: Option[String] = None)
  /** GetResult implicit for fetching rDishComment objects using plain SQL queries */
  implicit def GetResultrDishComment(implicit e0: GR[Long], e1: GR[String], e2: GR[Int], e3: GR[Option[String]]): GR[rDishComment] = GR{
    prs => import prs._
      rDishComment.tupled((<<[Long], <<[Long], <<[Long], <<[Long], <<[Long], <<[String], <<[Int], <<?[String]))
  }
  /** Table description of table dish_comment. Objects of this class serve as prototypes for rows in queries. */
  class tDishComment(_tableTag: Tag) extends Table[rDishComment](_tableTag, "dish_comment") {
    def * = (id, restId, dishId, createTime, userId, userName, score, content) <> (rDishComment.tupled, rDishComment.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(restId), Rep.Some(dishId), Rep.Some(createTime), Rep.Some(userId), Rep.Some(userName), Rep.Some(score), content).shaped.<>({r=>import r._; _1.map(_=> rDishComment.tupled((_1.get, _2.get, _3.get, _4.get, _5.get, _6.get, _7.get, _8)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column Id SqlType(BIGINT), AutoInc, PrimaryKey */
    val id: Rep[Long] = column[Long]("Id", O.AutoInc, O.PrimaryKey)
    /** Database column rest_id SqlType(BIGINT), Default(0) */
    val restId: Rep[Long] = column[Long]("rest_id", O.Default(0L))
    /** Database column dish_id SqlType(BIGINT), Default(0) */
    val dishId: Rep[Long] = column[Long]("dish_id", O.Default(0L))
    /** Database column create_time SqlType(BIGINT), Default(0) */
    val createTime: Rep[Long] = column[Long]("create_time", O.Default(0L))
    /** Database column user_id SqlType(BIGINT), Default(0) */
    val userId: Rep[Long] = column[Long]("user_id", O.Default(0L))
    /** Database column user_name SqlType(VARCHAR), Length(255,true), Default() */
    val userName: Rep[String] = column[String]("user_name", O.Length(255,varying=true), O.Default(""))
    /** Database column score SqlType(INT), Default(0) */
    val score: Rep[Int] = column[Int]("score", O.Default(0))
    /** Database column content SqlType(VARCHAR), Length(1000,true), Default(None) */
    val content: Rep[Option[String]] = column[Option[String]]("content", O.Length(1000,varying=true), O.Default(None))
  }
  /** Collection-like TableQuery object for table tDishComment */
  lazy val tDishComment = new TableQuery(tag => new tDishComment(tag))

  /** Entity class storing rows of table tDishTag
    *  @param id Database column Id SqlType(BIGINT), AutoInc, PrimaryKey
    *  @param restId Database column rest_id SqlType(BIGINT), Default(0)
    *  @param tag Database column tag SqlType(VARCHAR), Length(255,true), Default()
    *  @param tagDescription Database column tag_description SqlType(VARCHAR), Length(255,true), Default() */
  case class rDishTag(id: Long, restId: Long = 0L, tag: String = "", tagDescription: String = "")
  /** GetResult implicit for fetching rDishTag objects using plain SQL queries */
  implicit def GetResultrDishTag(implicit e0: GR[Long], e1: GR[String]): GR[rDishTag] = GR{
    prs => import prs._
      rDishTag.tupled((<<[Long], <<[Long], <<[String], <<[String]))
  }
  /** Table description of table dish_tag. Objects of this class serve as prototypes for rows in queries. */
  class tDishTag(_tableTag: Tag) extends Table[rDishTag](_tableTag, "dish_tag") {
    def * = (id, restId, tag, tagDescription) <> (rDishTag.tupled, rDishTag.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(restId), Rep.Some(tag), Rep.Some(tagDescription)).shaped.<>({r=>import r._; _1.map(_=> rDishTag.tupled((_1.get, _2.get, _3.get, _4.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column Id SqlType(BIGINT), AutoInc, PrimaryKey */
    val id: Rep[Long] = column[Long]("Id", O.AutoInc, O.PrimaryKey)
    /** Database column rest_id SqlType(BIGINT), Default(0) */
    val restId: Rep[Long] = column[Long]("rest_id", O.Default(0L))
    /** Database column tag SqlType(VARCHAR), Length(255,true), Default() */
    val tag: Rep[String] = column[String]("tag", O.Length(255,varying=true), O.Default(""))
    /** Database column tag_description SqlType(VARCHAR), Length(255,true), Default() */
    val tagDescription: Rep[String] = column[String]("tag_description", O.Length(255,varying=true), O.Default(""))
  }
  /** Collection-like TableQuery object for table tDishTag */
  lazy val tDishTag = new TableQuery(tag => new tDishTag(tag))

  /** Entity class storing rows of table tDishTagRelation
    *  @param id Database column Id SqlType(BIGINT), AutoInc, PrimaryKey
    *  @param tagId Database column tag_id SqlType(BIGINT), Default(0)
    *  @param dishId Database column dish_id SqlType(BIGINT), Default(0)
    *  @param restId Database column rest_id SqlType(BIGINT), Default(0) */
  case class rDishTagRelation(id: Long, tagId: Long = 0L, dishId: Long = 0L, restId: Long = 0L)
  /** GetResult implicit for fetching rDishTagRelation objects using plain SQL queries */
  implicit def GetResultrDishTagRelation(implicit e0: GR[Long]): GR[rDishTagRelation] = GR{
    prs => import prs._
      rDishTagRelation.tupled((<<[Long], <<[Long], <<[Long], <<[Long]))
  }
  /** Table description of table dish_tag_relation. Objects of this class serve as prototypes for rows in queries. */
  class tDishTagRelation(_tableTag: Tag) extends Table[rDishTagRelation](_tableTag, "dish_tag_relation") {
    def * = (id, tagId, dishId, restId) <> (rDishTagRelation.tupled, rDishTagRelation.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(tagId), Rep.Some(dishId), Rep.Some(restId)).shaped.<>({r=>import r._; _1.map(_=> rDishTagRelation.tupled((_1.get, _2.get, _3.get, _4.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column Id SqlType(BIGINT), AutoInc, PrimaryKey */
    val id: Rep[Long] = column[Long]("Id", O.AutoInc, O.PrimaryKey)
    /** Database column tag_id SqlType(BIGINT), Default(0) */
    val tagId: Rep[Long] = column[Long]("tag_id", O.Default(0L))
    /** Database column dish_id SqlType(BIGINT), Default(0) */
    val dishId: Rep[Long] = column[Long]("dish_id", O.Default(0L))
    /** Database column rest_id SqlType(BIGINT), Default(0) */
    val restId: Rep[Long] = column[Long]("rest_id", O.Default(0L))
  }
  /** Collection-like TableQuery object for table tDishTagRelation */
  lazy val tDishTagRelation = new TableQuery(tag => new tDishTagRelation(tag))

  /** Entity class storing rows of table tRefund
    *  @param id Database column Id SqlType(BIGINT), AutoInc, PrimaryKey
    *  @param tradeNo Database column trade_no SqlType(VARCHAR), Length(255,true), Default()
    *  @param outTradeNo Database column out_trade_no SqlType(VARCHAR), Length(255,true), Default()
    *  @param remark Database column remark SqlType(VARCHAR), Length(255,true), Default(None)
    *  @param reason Database column reason SqlType(VARCHAR), Length(255,true), Default()
    *  @param batchNo Database column batch_no SqlType(VARCHAR), Length(255,true), Default()
    *  @param state Database column state SqlType(INT), Default(0)
    *  @param createTime Database column create_time SqlType(BIGINT), Default(0)
    *  @param restId Database column rest_id SqlType(BIGINT), Default(0)
    *  @param userId Database column user_id SqlType(BIGINT), Default(0) */
  case class rRefund(id: Long, tradeNo: String = "", outTradeNo: String = "", remark: Option[String] = None, reason: String = "", batchNo: String = "", state: Int = 0, createTime: Long = 0L, restId: Long = 0L, userId: Long = 0L)
  /** GetResult implicit for fetching rRefund objects using plain SQL queries */
  implicit def GetResultrRefund(implicit e0: GR[Long], e1: GR[String], e2: GR[Option[String]], e3: GR[Int]): GR[rRefund] = GR{
    prs => import prs._
      rRefund.tupled((<<[Long], <<[String], <<[String], <<?[String], <<[String], <<[String], <<[Int], <<[Long], <<[Long], <<[Long]))
  }
  /** Table description of table refund. Objects of this class serve as prototypes for rows in queries. */
  class tRefund(_tableTag: Tag) extends Table[rRefund](_tableTag, "refund") {
    def * = (id, tradeNo, outTradeNo, remark, reason, batchNo, state, createTime, restId, userId) <> (rRefund.tupled, rRefund.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(tradeNo), Rep.Some(outTradeNo), remark, Rep.Some(reason), Rep.Some(batchNo), Rep.Some(state), Rep.Some(createTime), Rep.Some(restId), Rep.Some(userId)).shaped.<>({r=>import r._; _1.map(_=> rRefund.tupled((_1.get, _2.get, _3.get, _4, _5.get, _6.get, _7.get, _8.get, _9.get, _10.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column Id SqlType(BIGINT), AutoInc, PrimaryKey */
    val id: Rep[Long] = column[Long]("Id", O.AutoInc, O.PrimaryKey)
    /** Database column trade_no SqlType(VARCHAR), Length(255,true), Default() */
    val tradeNo: Rep[String] = column[String]("trade_no", O.Length(255,varying=true), O.Default(""))
    /** Database column out_trade_no SqlType(VARCHAR), Length(255,true), Default() */
    val outTradeNo: Rep[String] = column[String]("out_trade_no", O.Length(255,varying=true), O.Default(""))
    /** Database column remark SqlType(VARCHAR), Length(255,true), Default(None) */
    val remark: Rep[Option[String]] = column[Option[String]]("remark", O.Length(255,varying=true), O.Default(None))
    /** Database column reason SqlType(VARCHAR), Length(255,true), Default() */
    val reason: Rep[String] = column[String]("reason", O.Length(255,varying=true), O.Default(""))
    /** Database column batch_no SqlType(VARCHAR), Length(255,true), Default() */
    val batchNo: Rep[String] = column[String]("batch_no", O.Length(255,varying=true), O.Default(""))
    /** Database column state SqlType(INT), Default(0) */
    val state: Rep[Int] = column[Int]("state", O.Default(0))
    /** Database column create_time SqlType(BIGINT), Default(0) */
    val createTime: Rep[Long] = column[Long]("create_time", O.Default(0L))
    /** Database column rest_id SqlType(BIGINT), Default(0) */
    val restId: Rep[Long] = column[Long]("rest_id", O.Default(0L))
    /** Database column user_id SqlType(BIGINT), Default(0) */
    val userId: Rep[Long] = column[Long]("user_id", O.Default(0L))
  }
  /** Collection-like TableQuery object for table tRefund */
  lazy val tRefund = new TableQuery(tag => new tRefund(tag))

  /** Entity class storing rows of table tRestaurant
    *  @param id Database column Id SqlType(BIGINT), AutoInc, PrimaryKey
    *  @param name Database column name SqlType(VARCHAR), Length(100,true), Default()
    *  @param description Database column description SqlType(VARCHAR), Length(1000,true), Default(None)
    *  @param announcer Database column announcer SqlType(VARCHAR), Length(1000,true), Default(None)
    *  @param basePrice Database column base_price SqlType(INT), Default(0)
    *  @param packFee Database column pack_fee SqlType(INT), Default(0)
    *  @param sales Database column sales SqlType(BIGINT), Default(0)
    *  @param pic Database column pic SqlType(VARCHAR), Length(1000,true), Default(None)
    *  @param duringTime Database column during_time SqlType(BIGINT), Default(None)
    *  @param tag Database column tag SqlType(BIGINT), Default(0)
    *  @param address Database column address SqlType(VARCHAR), Length(1000,true), Default()
    *  @param concessions Database column concessions SqlType(VARCHAR), Length(1000,true), Default(None)
    *  @param isOpen Database column is_open SqlType(INT), Default(1)
    *  @param longitude Database column longitude SqlType(DOUBLE), Default(None)
    *  @param latitude Database column latitude SqlType(DOUBLE), Default(None)
    *  @param openingTime Database column opening_time SqlType(VARCHAR), Length(255,true), Default()
    *  @param stars Database column stars SqlType(INT), Default(0)
    *  @param ownerId Database column owner_id SqlType(BIGINT), Default(0)
    *  @param authState Database column auth_state SqlType(INT), Default(0)
    *  @param tel Database column tel SqlType(VARCHAR), Length(30,true), Default()
    *  @param index Database column index SqlType(INT), Default(0) */
  case class rRestaurant(id: Long, name: String = "", description: Option[String] = None, announcer: Option[String] = None, basePrice: Int = 0, packFee: Int = 0, sales: Long = 0L, pic: Option[String] = None, duringTime: Option[Long] = None, tag: Long = 0L, address: String = "", concessions: Option[String] = None, isOpen: Int = 1, longitude: Option[Double] = None, latitude: Option[Double] = None, openingTime: String = "", stars: Int = 0, ownerId: Long = 0L, authState: Int = 0, tel: String = "", index: Int = 0)
  /** GetResult implicit for fetching rRestaurant objects using plain SQL queries */
  implicit def GetResultrRestaurant(implicit e0: GR[Long], e1: GR[String], e2: GR[Option[String]], e3: GR[Int], e4: GR[Option[Long]], e5: GR[Option[Double]]): GR[rRestaurant] = GR{
    prs => import prs._
      rRestaurant.tupled((<<[Long], <<[String], <<?[String], <<?[String], <<[Int], <<[Int], <<[Long], <<?[String], <<?[Long], <<[Long], <<[String], <<?[String], <<[Int], <<?[Double], <<?[Double], <<[String], <<[Int], <<[Long], <<[Int], <<[String], <<[Int]))
  }
  /** Table description of table restaurant. Objects of this class serve as prototypes for rows in queries. */
  class tRestaurant(_tableTag: Tag) extends Table[rRestaurant](_tableTag, "restaurant") {
    def * = (id, name, description, announcer, basePrice, packFee, sales, pic, duringTime, tag, address, concessions, isOpen, longitude, latitude, openingTime, stars, ownerId, authState, tel, index) <> (rRestaurant.tupled, rRestaurant.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(name), description, announcer, Rep.Some(basePrice), Rep.Some(packFee), Rep.Some(sales), pic, duringTime, Rep.Some(tag), Rep.Some(address), concessions, Rep.Some(isOpen), longitude, latitude, Rep.Some(openingTime), Rep.Some(stars), Rep.Some(ownerId), Rep.Some(authState), Rep.Some(tel), Rep.Some(index)).shaped.<>({r=>import r._; _1.map(_=> rRestaurant.tupled((_1.get, _2.get, _3, _4, _5.get, _6.get, _7.get, _8, _9, _10.get, _11.get, _12, _13.get, _14, _15, _16.get, _17.get, _18.get, _19.get, _20.get, _21.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column Id SqlType(BIGINT), AutoInc, PrimaryKey */
    val id: Rep[Long] = column[Long]("Id", O.AutoInc, O.PrimaryKey)
    /** Database column name SqlType(VARCHAR), Length(100,true), Default() */
    val name: Rep[String] = column[String]("name", O.Length(100,varying=true), O.Default(""))
    /** Database column description SqlType(VARCHAR), Length(1000,true), Default(None) */
    val description: Rep[Option[String]] = column[Option[String]]("description", O.Length(1000,varying=true), O.Default(None))
    /** Database column announcer SqlType(VARCHAR), Length(1000,true), Default(None) */
    val announcer: Rep[Option[String]] = column[Option[String]]("announcer", O.Length(1000,varying=true), O.Default(None))
    /** Database column base_price SqlType(INT), Default(0) */
    val basePrice: Rep[Int] = column[Int]("base_price", O.Default(0))
    /** Database column pack_fee SqlType(INT), Default(0) */
    val packFee: Rep[Int] = column[Int]("pack_fee", O.Default(0))
    /** Database column sales SqlType(BIGINT), Default(0) */
    val sales: Rep[Long] = column[Long]("sales", O.Default(0L))
    /** Database column pic SqlType(VARCHAR), Length(1000,true), Default(None) */
    val pic: Rep[Option[String]] = column[Option[String]]("pic", O.Length(1000,varying=true), O.Default(None))
    /** Database column during_time SqlType(BIGINT), Default(None) */
    val duringTime: Rep[Option[Long]] = column[Option[Long]]("during_time", O.Default(None))
    /** Database column tag SqlType(BIGINT), Default(0) */
    val tag: Rep[Long] = column[Long]("tag", O.Default(0L))
    /** Database column address SqlType(VARCHAR), Length(1000,true), Default() */
    val address: Rep[String] = column[String]("address", O.Length(1000,varying=true), O.Default(""))
    /** Database column concessions SqlType(VARCHAR), Length(1000,true), Default(None) */
    val concessions: Rep[Option[String]] = column[Option[String]]("concessions", O.Length(1000,varying=true), O.Default(None))
    /** Database column is_open SqlType(INT), Default(1) */
    val isOpen: Rep[Int] = column[Int]("is_open", O.Default(1))
    /** Database column longitude SqlType(DOUBLE), Default(None) */
    val longitude: Rep[Option[Double]] = column[Option[Double]]("longitude", O.Default(None))
    /** Database column latitude SqlType(DOUBLE), Default(None) */
    val latitude: Rep[Option[Double]] = column[Option[Double]]("latitude", O.Default(None))
    /** Database column opening_time SqlType(VARCHAR), Length(255,true), Default() */
    val openingTime: Rep[String] = column[String]("opening_time", O.Length(255,varying=true), O.Default(""))
    /** Database column stars SqlType(INT), Default(0) */
    val stars: Rep[Int] = column[Int]("stars", O.Default(0))
    /** Database column owner_id SqlType(BIGINT), Default(0) */
    val ownerId: Rep[Long] = column[Long]("owner_id", O.Default(0L))
    /** Database column auth_state SqlType(INT), Default(0) */
    val authState: Rep[Int] = column[Int]("auth_state", O.Default(0))
    /** Database column tel SqlType(VARCHAR), Length(30,true), Default() */
    val tel: Rep[String] = column[String]("tel", O.Length(30,varying=true), O.Default(""))
    /** Database column index SqlType(INT), Default(0) */
    val index: Rep[Int] = column[Int]("index", O.Default(0))
  }
  /** Collection-like TableQuery object for table tRestaurant */
  lazy val tRestaurant = new TableQuery(tag => new tRestaurant(tag))

  /** Entity class storing rows of table tRestaurantComment
    *  @param id Database column Id SqlType(BIGINT), AutoInc, PrimaryKey
    *  @param restId Database column rest_id SqlType(BIGINT), Default(0)
    *  @param createTime Database column create_time SqlType(BIGINT), Default(0)
    *  @param userId Database column user_id SqlType(BIGINT), Default(0)
    *  @param userName Database column user_name SqlType(VARCHAR), Length(255,true), Default()
    *  @param attitude Database column attitude SqlType(INT), Default(0)
    *  @param speed Database column speed SqlType(INT), Default(0) */
  case class rRestaurantComment(id: Long, restId: Long = 0L, createTime: Long = 0L, userId: Long = 0L, userName: String = "", attitude: Int = 0, speed: Int = 0)
  /** GetResult implicit for fetching rRestaurantComment objects using plain SQL queries */
  implicit def GetResultrRestaurantComment(implicit e0: GR[Long], e1: GR[String], e2: GR[Int]): GR[rRestaurantComment] = GR{
    prs => import prs._
      rRestaurantComment.tupled((<<[Long], <<[Long], <<[Long], <<[Long], <<[String], <<[Int], <<[Int]))
  }
  /** Table description of table restaurant_comment. Objects of this class serve as prototypes for rows in queries. */
  class tRestaurantComment(_tableTag: Tag) extends Table[rRestaurantComment](_tableTag, "restaurant_comment") {
    def * = (id, restId, createTime, userId, userName, attitude, speed) <> (rRestaurantComment.tupled, rRestaurantComment.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(restId), Rep.Some(createTime), Rep.Some(userId), Rep.Some(userName), Rep.Some(attitude), Rep.Some(speed)).shaped.<>({r=>import r._; _1.map(_=> rRestaurantComment.tupled((_1.get, _2.get, _3.get, _4.get, _5.get, _6.get, _7.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column Id SqlType(BIGINT), AutoInc, PrimaryKey */
    val id: Rep[Long] = column[Long]("Id", O.AutoInc, O.PrimaryKey)
    /** Database column rest_id SqlType(BIGINT), Default(0) */
    val restId: Rep[Long] = column[Long]("rest_id", O.Default(0L))
    /** Database column create_time SqlType(BIGINT), Default(0) */
    val createTime: Rep[Long] = column[Long]("create_time", O.Default(0L))
    /** Database column user_id SqlType(BIGINT), Default(0) */
    val userId: Rep[Long] = column[Long]("user_id", O.Default(0L))
    /** Database column user_name SqlType(VARCHAR), Length(255,true), Default() */
    val userName: Rep[String] = column[String]("user_name", O.Length(255,varying=true), O.Default(""))
    /** Database column attitude SqlType(INT), Default(0) */
    val attitude: Rep[Int] = column[Int]("attitude", O.Default(0))
    /** Database column speed SqlType(INT), Default(0) */
    val speed: Rep[Int] = column[Int]("speed", O.Default(0))
  }
  /** Collection-like TableQuery object for table tRestaurantComment */
  lazy val tRestaurantComment = new TableQuery(tag => new tRestaurantComment(tag))

  /** Entity class storing rows of table tRestaurantConcessions
    *  @param id Database column Id SqlType(BIGINT), AutoInc, PrimaryKey
    *  @param restId Database column rest_id SqlType(BIGINT), Default(0)
    *  @param reduction Database column reduction SqlType(INT), Default(0)
    *  @param full Database column full SqlType(INT), Default(0)
    *  @param isFullReduction Database column is_full_reduction SqlType(INT), Default(0)
    *  @param newProduction Database column new_production SqlType(INT), Default(0)
    *  @param limit Database column limit SqlType(INT), Default(0)
    *  @param coupon Database column coupon SqlType(INT), Default(0) */
  case class rRestaurantConcessions(id: Long, restId: Long = 0L, reduction: Int = 0, full: Int = 0, isFullReduction: Int = 0, newProduction: Int = 0, limit: Int = 0, coupon: Int = 0)
  /** GetResult implicit for fetching rRestaurantConcessions objects using plain SQL queries */
  implicit def GetResultrRestaurantConcessions(implicit e0: GR[Long], e1: GR[Int]): GR[rRestaurantConcessions] = GR{
    prs => import prs._
      rRestaurantConcessions.tupled((<<[Long], <<[Long], <<[Int], <<[Int], <<[Int], <<[Int], <<[Int], <<[Int]))
  }
  /** Table description of table restaurant_concessions. Objects of this class serve as prototypes for rows in queries. */
  class tRestaurantConcessions(_tableTag: Tag) extends Table[rRestaurantConcessions](_tableTag, "restaurant_concessions") {
    def * = (id, restId, reduction, full, isFullReduction, newProduction, limit, coupon) <> (rRestaurantConcessions.tupled, rRestaurantConcessions.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(restId), Rep.Some(reduction), Rep.Some(full), Rep.Some(isFullReduction), Rep.Some(newProduction), Rep.Some(limit), Rep.Some(coupon)).shaped.<>({r=>import r._; _1.map(_=> rRestaurantConcessions.tupled((_1.get, _2.get, _3.get, _4.get, _5.get, _6.get, _7.get, _8.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column Id SqlType(BIGINT), AutoInc, PrimaryKey */
    val id: Rep[Long] = column[Long]("Id", O.AutoInc, O.PrimaryKey)
    /** Database column rest_id SqlType(BIGINT), Default(0) */
    val restId: Rep[Long] = column[Long]("rest_id", O.Default(0L))
    /** Database column reduction SqlType(INT), Default(0) */
    val reduction: Rep[Int] = column[Int]("reduction", O.Default(0))
    /** Database column full SqlType(INT), Default(0) */
    val full: Rep[Int] = column[Int]("full", O.Default(0))
    /** Database column is_full_reduction SqlType(INT), Default(0) */
    val isFullReduction: Rep[Int] = column[Int]("is_full_reduction", O.Default(0))
    /** Database column new_production SqlType(INT), Default(0) */
    val newProduction: Rep[Int] = column[Int]("new_production", O.Default(0))
    /** Database column limit SqlType(INT), Default(0) */
    val limit: Rep[Int] = column[Int]("limit", O.Default(0))
    /** Database column coupon SqlType(INT), Default(0) */
    val coupon: Rep[Int] = column[Int]("coupon", O.Default(0))
  }
  /** Collection-like TableQuery object for table tRestaurantConcessions */
  lazy val tRestaurantConcessions = new TableQuery(tag => new tRestaurantConcessions(tag))

  /** Entity class storing rows of table tRestaurantOrder
    *  @param id Database column Id SqlType(BIGINT), AutoInc, PrimaryKey
    *  @param userId Database column user_id SqlType(BIGINT), Default(0)
    *  @param userName Database column user_name SqlType(VARCHAR), Length(255,true), Default()
    *  @param address Database column address SqlType(VARCHAR), Length(1000,true), Default()
    *  @param tel Database column tel SqlType(VARCHAR), Length(255,true), Default()
    *  @param restId Database column rest_id SqlType(BIGINT), Default(0)
    *  @param arriveTime Database column arrive_time SqlType(VARCHAR), Length(255,true), Default(None)
    *  @param remark Database column remark SqlType(VARCHAR), Length(255,true), Default(None)
    *  @param cashCoup Database column cash_coup SqlType(VARCHAR), Length(255,true), Default(None)
    *  @param invoice Database column invoice SqlType(INT), Default(0)
    *  @param packFee Database column pack_fee SqlType(VARCHAR), Length(255,true), Default(0)
    *  @param totalFee Database column total_fee SqlType(VARCHAR), Length(255,true), Default()
    *  @param createTime Database column create_time SqlType(BIGINT), Default(0)
    *  @param state Database column state SqlType(INT), Default(0)
    *  @param isProcessed Database column is_processed SqlType(INT), Default(0)
    *  @param tradeNo Database column trade_no SqlType(VARCHAR), Length(255,true), Default(None)
    *  @param alipayState Database column alipay_state SqlType(INT), Default(0)
    *  @param payType Database column pay_type SqlType(INT), Default(0) */
  case class rRestaurantOrder(id: Long, userId: Long = 0L, userName: String = "", address: String = "", tel: String = "", restId: Long = 0L, arriveTime: Option[String] = None, remark: Option[String] = None, cashCoup: Option[String] = None, invoice: Int = 0, packFee: String = "0", totalFee: String = "", createTime: Long = 0L, state: Int = 0, isProcessed: Int = 0, tradeNo: Option[String] = None, alipayState: Int = 0, payType: Int = 0)
  /** GetResult implicit for fetching rRestaurantOrder objects using plain SQL queries */
  implicit def GetResultrRestaurantOrder(implicit e0: GR[Long], e1: GR[String], e2: GR[Option[String]], e3: GR[Int]): GR[rRestaurantOrder] = GR{
    prs => import prs._
      rRestaurantOrder.tupled((<<[Long], <<[Long], <<[String], <<[String], <<[String], <<[Long], <<?[String], <<?[String], <<?[String], <<[Int], <<[String], <<[String], <<[Long], <<[Int], <<[Int], <<?[String], <<[Int], <<[Int]))
  }
  /** Table description of table restaurant_order. Objects of this class serve as prototypes for rows in queries. */
  class tRestaurantOrder(_tableTag: Tag) extends Table[rRestaurantOrder](_tableTag, "restaurant_order") {
    def * = (id, userId, userName, address, tel, restId, arriveTime, remark, cashCoup, invoice, packFee, totalFee, createTime, state, isProcessed, tradeNo, alipayState, payType) <> (rRestaurantOrder.tupled, rRestaurantOrder.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(userId), Rep.Some(userName), Rep.Some(address), Rep.Some(tel), Rep.Some(restId), arriveTime, remark, cashCoup, Rep.Some(invoice), Rep.Some(packFee), Rep.Some(totalFee), Rep.Some(createTime), Rep.Some(state), Rep.Some(isProcessed), tradeNo, Rep.Some(alipayState), Rep.Some(payType)).shaped.<>({r=>import r._; _1.map(_=> rRestaurantOrder.tupled((_1.get, _2.get, _3.get, _4.get, _5.get, _6.get, _7, _8, _9, _10.get, _11.get, _12.get, _13.get, _14.get, _15.get, _16, _17.get, _18.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column Id SqlType(BIGINT), AutoInc, PrimaryKey */
    val id: Rep[Long] = column[Long]("Id", O.AutoInc, O.PrimaryKey)
    /** Database column user_id SqlType(BIGINT), Default(0) */
    val userId: Rep[Long] = column[Long]("user_id", O.Default(0L))
    /** Database column user_name SqlType(VARCHAR), Length(255,true), Default() */
    val userName: Rep[String] = column[String]("user_name", O.Length(255,varying=true), O.Default(""))
    /** Database column address SqlType(VARCHAR), Length(1000,true), Default() */
    val address: Rep[String] = column[String]("address", O.Length(1000,varying=true), O.Default(""))
    /** Database column tel SqlType(VARCHAR), Length(255,true), Default() */
    val tel: Rep[String] = column[String]("tel", O.Length(255,varying=true), O.Default(""))
    /** Database column rest_id SqlType(BIGINT), Default(0) */
    val restId: Rep[Long] = column[Long]("rest_id", O.Default(0L))
    /** Database column arrive_time SqlType(VARCHAR), Length(255,true), Default(None) */
    val arriveTime: Rep[Option[String]] = column[Option[String]]("arrive_time", O.Length(255,varying=true), O.Default(None))
    /** Database column remark SqlType(VARCHAR), Length(255,true), Default(None) */
    val remark: Rep[Option[String]] = column[Option[String]]("remark", O.Length(255,varying=true), O.Default(None))
    /** Database column cash_coup SqlType(VARCHAR), Length(255,true), Default(None) */
    val cashCoup: Rep[Option[String]] = column[Option[String]]("cash_coup", O.Length(255,varying=true), O.Default(None))
    /** Database column invoice SqlType(INT), Default(0) */
    val invoice: Rep[Int] = column[Int]("invoice", O.Default(0))
    /** Database column pack_fee SqlType(VARCHAR), Length(255,true), Default(0) */
    val packFee: Rep[String] = column[String]("pack_fee", O.Length(255,varying=true), O.Default("0"))
    /** Database column total_fee SqlType(VARCHAR), Length(255,true), Default() */
    val totalFee: Rep[String] = column[String]("total_fee", O.Length(255,varying=true), O.Default(""))
    /** Database column create_time SqlType(BIGINT), Default(0) */
    val createTime: Rep[Long] = column[Long]("create_time", O.Default(0L))
    /** Database column state SqlType(INT), Default(0) */
    val state: Rep[Int] = column[Int]("state", O.Default(0))
    /** Database column is_processed SqlType(INT), Default(0) */
    val isProcessed: Rep[Int] = column[Int]("is_processed", O.Default(0))
    /** Database column trade_no SqlType(VARCHAR), Length(255,true), Default(None) */
    val tradeNo: Rep[Option[String]] = column[Option[String]]("trade_no", O.Length(255,varying=true), O.Default(None))
    /** Database column alipay_state SqlType(INT), Default(0) */
    val alipayState: Rep[Int] = column[Int]("alipay_state", O.Default(0))
    /** Database column pay_type SqlType(INT), Default(0) */
    val payType: Rep[Int] = column[Int]("pay_type", O.Default(0))
  }
  /** Collection-like TableQuery object for table tRestaurantOrder */
  lazy val tRestaurantOrder = new TableQuery(tag => new tRestaurantOrder(tag))

  /** Entity class storing rows of table tRestaurantOrderAddress
    *  @param id Database column Id SqlType(BIGINT), AutoInc, PrimaryKey
    *  @param name Database column name SqlType(VARCHAR), Length(255,true), Default()
    *  @param sex Database column sex SqlType(INT), Default(Some(0))
    *  @param userId Database column user_id SqlType(BIGINT), Default(0)
    *  @param address Database column address SqlType(VARCHAR), Length(255,true), Default()
    *  @param tel Database column tel SqlType(VARCHAR), Length(255,true), Default() */
  case class rRestaurantOrderAddress(id: Long, name: String = "", sex: Option[Int] = Some(0), userId: Long = 0L, address: String = "", tel: String = "")
  /** GetResult implicit for fetching rRestaurantOrderAddress objects using plain SQL queries */
  implicit def GetResultrRestaurantOrderAddress(implicit e0: GR[Long], e1: GR[String], e2: GR[Option[Int]]): GR[rRestaurantOrderAddress] = GR{
    prs => import prs._
      rRestaurantOrderAddress.tupled((<<[Long], <<[String], <<?[Int], <<[Long], <<[String], <<[String]))
  }
  /** Table description of table restaurant_order_address. Objects of this class serve as prototypes for rows in queries. */
  class tRestaurantOrderAddress(_tableTag: Tag) extends Table[rRestaurantOrderAddress](_tableTag, "restaurant_order_address") {
    def * = (id, name, sex, userId, address, tel) <> (rRestaurantOrderAddress.tupled, rRestaurantOrderAddress.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(name), sex, Rep.Some(userId), Rep.Some(address), Rep.Some(tel)).shaped.<>({r=>import r._; _1.map(_=> rRestaurantOrderAddress.tupled((_1.get, _2.get, _3, _4.get, _5.get, _6.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column Id SqlType(BIGINT), AutoInc, PrimaryKey */
    val id: Rep[Long] = column[Long]("Id", O.AutoInc, O.PrimaryKey)
    /** Database column name SqlType(VARCHAR), Length(255,true), Default() */
    val name: Rep[String] = column[String]("name", O.Length(255,varying=true), O.Default(""))
    /** Database column sex SqlType(INT), Default(Some(0)) */
    val sex: Rep[Option[Int]] = column[Option[Int]]("sex", O.Default(Some(0)))
    /** Database column user_id SqlType(BIGINT), Default(0) */
    val userId: Rep[Long] = column[Long]("user_id", O.Default(0L))
    /** Database column address SqlType(VARCHAR), Length(255,true), Default() */
    val address: Rep[String] = column[String]("address", O.Length(255,varying=true), O.Default(""))
    /** Database column tel SqlType(VARCHAR), Length(255,true), Default() */
    val tel: Rep[String] = column[String]("tel", O.Length(255,varying=true), O.Default(""))
  }
  /** Collection-like TableQuery object for table tRestaurantOrderAddress */
  lazy val tRestaurantOrderAddress = new TableQuery(tag => new tRestaurantOrderAddress(tag))

  /** Entity class storing rows of table tRestaurantOrderDetail
    *  @param id Database column Id SqlType(BIGINT), AutoInc, PrimaryKey
    *  @param orderId Database column order_id SqlType(BIGINT), Default(0)
    *  @param dishId Database column dish_id SqlType(BIGINT), Default(0)
    *  @param dishName Database column dish_name SqlType(VARCHAR), Length(255,true), Default()
    *  @param number Database column number SqlType(INT), Default(0)
    *  @param price Database column price SqlType(VARCHAR), Length(255,true), Default() */
  case class rRestaurantOrderDetail(id: Long, orderId: Long = 0L, dishId: Long = 0L, dishName: String = "", number: Int = 0, price: String = "")
  /** GetResult implicit for fetching rRestaurantOrderDetail objects using plain SQL queries */
  implicit def GetResultrRestaurantOrderDetail(implicit e0: GR[Long], e1: GR[String], e2: GR[Int]): GR[rRestaurantOrderDetail] = GR{
    prs => import prs._
      rRestaurantOrderDetail.tupled((<<[Long], <<[Long], <<[Long], <<[String], <<[Int], <<[String]))
  }
  /** Table description of table restaurant_order_detail. Objects of this class serve as prototypes for rows in queries. */
  class tRestaurantOrderDetail(_tableTag: Tag) extends Table[rRestaurantOrderDetail](_tableTag, "restaurant_order_detail") {
    def * = (id, orderId, dishId, dishName, number, price) <> (rRestaurantOrderDetail.tupled, rRestaurantOrderDetail.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(orderId), Rep.Some(dishId), Rep.Some(dishName), Rep.Some(number), Rep.Some(price)).shaped.<>({r=>import r._; _1.map(_=> rRestaurantOrderDetail.tupled((_1.get, _2.get, _3.get, _4.get, _5.get, _6.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column Id SqlType(BIGINT), AutoInc, PrimaryKey */
    val id: Rep[Long] = column[Long]("Id", O.AutoInc, O.PrimaryKey)
    /** Database column order_id SqlType(BIGINT), Default(0) */
    val orderId: Rep[Long] = column[Long]("order_id", O.Default(0L))
    /** Database column dish_id SqlType(BIGINT), Default(0) */
    val dishId: Rep[Long] = column[Long]("dish_id", O.Default(0L))
    /** Database column dish_name SqlType(VARCHAR), Length(255,true), Default() */
    val dishName: Rep[String] = column[String]("dish_name", O.Length(255,varying=true), O.Default(""))
    /** Database column number SqlType(INT), Default(0) */
    val number: Rep[Int] = column[Int]("number", O.Default(0))
    /** Database column price SqlType(VARCHAR), Length(255,true), Default() */
    val price: Rep[String] = column[String]("price", O.Length(255,varying=true), O.Default(""))
  }
  /** Collection-like TableQuery object for table tRestaurantOrderDetail */
  lazy val tRestaurantOrderDetail = new TableQuery(tag => new tRestaurantOrderDetail(tag))

  /** Entity class storing rows of table tRestaurantTag
    *  @param id Database column Id SqlType(BIGINT), AutoInc, PrimaryKey
    *  @param tagName Database column tag_name SqlType(VARCHAR), Length(255,true), Default()
    *  @param englishName Database column english_name SqlType(VARCHAR), Length(255,true), Default()
    *  @param order Database column order SqlType(INT), Default(0) */
  case class rRestaurantTag(id: Long, tagName: String = "", englishName: String = "", order: Int = 0)
  /** GetResult implicit for fetching rRestaurantTag objects using plain SQL queries */
  implicit def GetResultrRestaurantTag(implicit e0: GR[Long], e1: GR[String], e2: GR[Int]): GR[rRestaurantTag] = GR{
    prs => import prs._
      rRestaurantTag.tupled((<<[Long], <<[String], <<[String], <<[Int]))
  }
  /** Table description of table restaurant_tag. Objects of this class serve as prototypes for rows in queries. */
  class tRestaurantTag(_tableTag: Tag) extends Table[rRestaurantTag](_tableTag, "restaurant_tag") {
    def * = (id, tagName, englishName, order) <> (rRestaurantTag.tupled, rRestaurantTag.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(tagName), Rep.Some(englishName), Rep.Some(order)).shaped.<>({r=>import r._; _1.map(_=> rRestaurantTag.tupled((_1.get, _2.get, _3.get, _4.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column Id SqlType(BIGINT), AutoInc, PrimaryKey */
    val id: Rep[Long] = column[Long]("Id", O.AutoInc, O.PrimaryKey)
    /** Database column tag_name SqlType(VARCHAR), Length(255,true), Default() */
    val tagName: Rep[String] = column[String]("tag_name", O.Length(255,varying=true), O.Default(""))
    /** Database column english_name SqlType(VARCHAR), Length(255,true), Default() */
    val englishName: Rep[String] = column[String]("english_name", O.Length(255,varying=true), O.Default(""))
    /** Database column order SqlType(INT), Default(0) */
    val order: Rep[Int] = column[Int]("order", O.Default(0))
  }
  /** Collection-like TableQuery object for table tRestaurantTag */
  lazy val tRestaurantTag = new TableQuery(tag => new tRestaurantTag(tag))

  /** Entity class storing rows of table tRestaurantTop
    *  @param order Database column order SqlType(BIGINT), PrimaryKey, Default(0)
    *  @param restId Database column rest_id SqlType(BIGINT), Default(0) */
  case class rRestaurantTop(order: Long = 0L, restId: Long = 0L)
  /** GetResult implicit for fetching rRestaurantTop objects using plain SQL queries */
  implicit def GetResultrRestaurantTop(implicit e0: GR[Long]): GR[rRestaurantTop] = GR{
    prs => import prs._
      rRestaurantTop.tupled((<<[Long], <<[Long]))
  }
  /** Table description of table restaurant_top. Objects of this class serve as prototypes for rows in queries. */
  class tRestaurantTop(_tableTag: Tag) extends Table[rRestaurantTop](_tableTag, "restaurant_top") {
    def * = (order, restId) <> (rRestaurantTop.tupled, rRestaurantTop.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(order), Rep.Some(restId)).shaped.<>({r=>import r._; _1.map(_=> rRestaurantTop.tupled((_1.get, _2.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column order SqlType(BIGINT), PrimaryKey, Default(0) */
    val order: Rep[Long] = column[Long]("order", O.PrimaryKey, O.Default(0L))
    /** Database column rest_id SqlType(BIGINT), Default(0) */
    val restId: Rep[Long] = column[Long]("rest_id", O.Default(0L))
  }
  /** Collection-like TableQuery object for table tRestaurantTop */
  lazy val tRestaurantTop = new TableQuery(tag => new tRestaurantTop(tag))

  /** Entity class storing rows of table tUser
    *  @param id Database column Id SqlType(BIGINT), AutoInc, PrimaryKey
    *  @param email Database column email SqlType(VARCHAR), Length(255,true), Default()
    *  @param mobile Database column mobile SqlType(VARCHAR), Length(255,true), Default()
    *  @param nickName Database column nick_name SqlType(VARCHAR), Length(255,true), Default()
    *  @param headImg Database column head_img SqlType(VARCHAR), Length(500,true), Default()
    *  @param state Database column state SqlType(INT), Default(0)
    *  @param userType Database column user_type SqlType(INT), Default(0)
    *  @param ip Database column ip SqlType(VARCHAR), Length(255,true), Default()
    *  @param secure Database column secure SqlType(VARCHAR), Length(255,true), Default()
    *  @param insertTime Database column insert_time SqlType(BIGINT), Default(0)
    *  @param updateTime Database column update_time SqlType(BIGINT), Default(0)
    *  @param lastlogininTime Database column lastLoginin_time SqlType(BIGINT), Default(0) */
  case class rUser(id: Long, email: String = "", mobile: String = "", nickName: String = "", headImg: String = "", state: Int = 0, userType: Int = 0, ip: String = "", secure: String = "", insertTime: Long = 0L, updateTime: Long = 0L, lastlogininTime: Long = 0L)
  /** GetResult implicit for fetching rUser objects using plain SQL queries */
  implicit def GetResultrUser(implicit e0: GR[Long], e1: GR[String], e2: GR[Int]): GR[rUser] = GR{
    prs => import prs._
      rUser.tupled((<<[Long], <<[String], <<[String], <<[String], <<[String], <<[Int], <<[Int], <<[String], <<[String], <<[Long], <<[Long], <<[Long]))
  }
  /** Table description of table user. Objects of this class serve as prototypes for rows in queries. */
  class tUser(_tableTag: Tag) extends Table[rUser](_tableTag, "user") {
    def * = (id, email, mobile, nickName, headImg, state, userType, ip, secure, insertTime, updateTime, lastlogininTime) <> (rUser.tupled, rUser.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(email), Rep.Some(mobile), Rep.Some(nickName), Rep.Some(headImg), Rep.Some(state), Rep.Some(userType), Rep.Some(ip), Rep.Some(secure), Rep.Some(insertTime), Rep.Some(updateTime), Rep.Some(lastlogininTime)).shaped.<>({r=>import r._; _1.map(_=> rUser.tupled((_1.get, _2.get, _3.get, _4.get, _5.get, _6.get, _7.get, _8.get, _9.get, _10.get, _11.get, _12.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column Id SqlType(BIGINT), AutoInc, PrimaryKey */
    val id: Rep[Long] = column[Long]("Id", O.AutoInc, O.PrimaryKey)
    /** Database column email SqlType(VARCHAR), Length(255,true), Default() */
    val email: Rep[String] = column[String]("email", O.Length(255,varying=true), O.Default(""))
    /** Database column mobile SqlType(VARCHAR), Length(255,true), Default() */
    val mobile: Rep[String] = column[String]("mobile", O.Length(255,varying=true), O.Default(""))
    /** Database column nick_name SqlType(VARCHAR), Length(255,true), Default() */
    val nickName: Rep[String] = column[String]("nick_name", O.Length(255,varying=true), O.Default(""))
    /** Database column head_img SqlType(VARCHAR), Length(500,true), Default() */
    val headImg: Rep[String] = column[String]("head_img", O.Length(500,varying=true), O.Default(""))
    /** Database column state SqlType(INT), Default(0) */
    val state: Rep[Int] = column[Int]("state", O.Default(0))
    /** Database column user_type SqlType(INT), Default(0) */
    val userType: Rep[Int] = column[Int]("user_type", O.Default(0))
    /** Database column ip SqlType(VARCHAR), Length(255,true), Default() */
    val ip: Rep[String] = column[String]("ip", O.Length(255,varying=true), O.Default(""))
    /** Database column secure SqlType(VARCHAR), Length(255,true), Default() */
    val secure: Rep[String] = column[String]("secure", O.Length(255,varying=true), O.Default(""))
    /** Database column insert_time SqlType(BIGINT), Default(0) */
    val insertTime: Rep[Long] = column[Long]("insert_time", O.Default(0L))
    /** Database column update_time SqlType(BIGINT), Default(0) */
    val updateTime: Rep[Long] = column[Long]("update_time", O.Default(0L))
    /** Database column lastLoginin_time SqlType(BIGINT), Default(0) */
    val lastlogininTime: Rep[Long] = column[Long]("lastLoginin_time", O.Default(0L))
  }
  /** Collection-like TableQuery object for table tUser */
  lazy val tUser = new TableQuery(tag => new tUser(tag))
}
