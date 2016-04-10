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
  lazy val schema: profile.SchemaDescription = Array(tCollection.schema, tDish.schema, tDishcomment.schema, tDishtag.schema, tDishtagrelation.schema, tRefund.schema, tRestaurant.schema, tRestaurantcomment.schema, tRestaurantconcessions.schema, tRestaurantorder.schema, tRestaurantorderaddress.schema, tRestaurantorderdetail.schema, tRestauranttag.schema, tRestauranttop.schema, tUser.schema).reduceLeft(_ ++ _)
  @deprecated("Use .schema instead of .ddl", "3.0")
  def ddl = schema

  /** Entity class storing rows of table tCollection
   *  @param id Database column Id SqlType(BIGINT), AutoInc, PrimaryKey
   *  @param userid Database column userId SqlType(BIGINT), Default(0)
   *  @param restaurantid Database column restaurantId SqlType(BIGINT), Default(0) */
  case class rCollection(id: Long, userid: Long = 0L, restaurantid: Long = 0L)
  /** GetResult implicit for fetching rCollection objects using plain SQL queries */
  implicit def GetResultrCollection(implicit e0: GR[Long]): GR[rCollection] = GR{
    prs => import prs._
    rCollection.tupled((<<[Long], <<[Long], <<[Long]))
  }
  /** Table description of table collection. Objects of this class serve as prototypes for rows in queries. */
  class tCollection(_tableTag: Tag) extends Table[rCollection](_tableTag, "collection") {
    def * = (id, userid, restaurantid) <> (rCollection.tupled, rCollection.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(userid), Rep.Some(restaurantid)).shaped.<>({r=>import r._; _1.map(_=> rCollection.tupled((_1.get, _2.get, _3.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column Id SqlType(BIGINT), AutoInc, PrimaryKey */
    val id: Rep[Long] = column[Long]("Id", O.AutoInc, O.PrimaryKey)
    /** Database column userId SqlType(BIGINT), Default(0) */
    val userid: Rep[Long] = column[Long]("userId", O.Default(0L))
    /** Database column restaurantId SqlType(BIGINT), Default(0) */
    val restaurantid: Rep[Long] = column[Long]("restaurantId", O.Default(0L))
  }
  /** Collection-like TableQuery object for table tCollection */
  lazy val tCollection = new TableQuery(tag => new tCollection(tag))

  /** Entity class storing rows of table tDish
   *  @param id Database column Id SqlType(BIGINT), AutoInc, PrimaryKey
   *  @param restid Database column restId SqlType(BIGINT), Default(0)
   *  @param name Database column name SqlType(VARCHAR), Length(255,true), Default()
   *  @param description Database column description SqlType(VARCHAR), Length(1000,true), Default(Some())
   *  @param price Database column price SqlType(VARCHAR), Length(255,true), Default()
   *  @param sale Database column sale SqlType(BIGINT), Default(0)
   *  @param pic Database column pic SqlType(VARCHAR), Length(1000,true), Default(None)
   *  @param state Database column state SqlType(INT), Default(1)
   *  @param star Database column star SqlType(INT), Default(0) */
  case class rDish(id: Long, restid: Long = 0L, name: String = "", description: Option[String] = Some(""), price: String = "", sale: Long = 0L, pic: Option[String] = None, state: Int = 1, star: Int = 0)
  /** GetResult implicit for fetching rDish objects using plain SQL queries */
  implicit def GetResultrDish(implicit e0: GR[Long], e1: GR[String], e2: GR[Option[String]], e3: GR[Int]): GR[rDish] = GR{
    prs => import prs._
    rDish.tupled((<<[Long], <<[Long], <<[String], <<?[String], <<[String], <<[Long], <<?[String], <<[Int], <<[Int]))
  }
  /** Table description of table dish. Objects of this class serve as prototypes for rows in queries. */
  class tDish(_tableTag: Tag) extends Table[rDish](_tableTag, "dish") {
    def * = (id, restid, name, description, price, sale, pic, state, star) <> (rDish.tupled, rDish.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(restid), Rep.Some(name), description, Rep.Some(price), Rep.Some(sale), pic, Rep.Some(state), Rep.Some(star)).shaped.<>({r=>import r._; _1.map(_=> rDish.tupled((_1.get, _2.get, _3.get, _4, _5.get, _6.get, _7, _8.get, _9.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column Id SqlType(BIGINT), AutoInc, PrimaryKey */
    val id: Rep[Long] = column[Long]("Id", O.AutoInc, O.PrimaryKey)
    /** Database column restId SqlType(BIGINT), Default(0) */
    val restid: Rep[Long] = column[Long]("restId", O.Default(0L))
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

  /** Entity class storing rows of table tDishcomment
   *  @param id Database column Id SqlType(BIGINT), AutoInc, PrimaryKey
   *  @param restid Database column restId SqlType(BIGINT), Default(0)
   *  @param dishid Database column dishId SqlType(BIGINT), Default(0)
   *  @param createtime Database column createTime SqlType(BIGINT), Default(0)
   *  @param userid Database column userId SqlType(BIGINT), Default(0)
   *  @param username Database column userName SqlType(VARCHAR), Length(255,true), Default()
   *  @param score Database column score SqlType(INT), Default(0)
   *  @param content Database column content SqlType(VARCHAR), Length(1000,true), Default(None) */
  case class rDishcomment(id: Long, restid: Long = 0L, dishid: Long = 0L, createtime: Long = 0L, userid: Long = 0L, username: String = "", score: Int = 0, content: Option[String] = None)
  /** GetResult implicit for fetching rDishcomment objects using plain SQL queries */
  implicit def GetResultrDishcomment(implicit e0: GR[Long], e1: GR[String], e2: GR[Int], e3: GR[Option[String]]): GR[rDishcomment] = GR{
    prs => import prs._
    rDishcomment.tupled((<<[Long], <<[Long], <<[Long], <<[Long], <<[Long], <<[String], <<[Int], <<?[String]))
  }
  /** Table description of table dishcomment. Objects of this class serve as prototypes for rows in queries. */
  class tDishcomment(_tableTag: Tag) extends Table[rDishcomment](_tableTag, "dishcomment") {
    def * = (id, restid, dishid, createtime, userid, username, score, content) <> (rDishcomment.tupled, rDishcomment.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(restid), Rep.Some(dishid), Rep.Some(createtime), Rep.Some(userid), Rep.Some(username), Rep.Some(score), content).shaped.<>({r=>import r._; _1.map(_=> rDishcomment.tupled((_1.get, _2.get, _3.get, _4.get, _5.get, _6.get, _7.get, _8)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column Id SqlType(BIGINT), AutoInc, PrimaryKey */
    val id: Rep[Long] = column[Long]("Id", O.AutoInc, O.PrimaryKey)
    /** Database column restId SqlType(BIGINT), Default(0) */
    val restid: Rep[Long] = column[Long]("restId", O.Default(0L))
    /** Database column dishId SqlType(BIGINT), Default(0) */
    val dishid: Rep[Long] = column[Long]("dishId", O.Default(0L))
    /** Database column createTime SqlType(BIGINT), Default(0) */
    val createtime: Rep[Long] = column[Long]("createTime", O.Default(0L))
    /** Database column userId SqlType(BIGINT), Default(0) */
    val userid: Rep[Long] = column[Long]("userId", O.Default(0L))
    /** Database column userName SqlType(VARCHAR), Length(255,true), Default() */
    val username: Rep[String] = column[String]("userName", O.Length(255,varying=true), O.Default(""))
    /** Database column score SqlType(INT), Default(0) */
    val score: Rep[Int] = column[Int]("score", O.Default(0))
    /** Database column content SqlType(VARCHAR), Length(1000,true), Default(None) */
    val content: Rep[Option[String]] = column[Option[String]]("content", O.Length(1000,varying=true), O.Default(None))
  }
  /** Collection-like TableQuery object for table tDishcomment */
  lazy val tDishcomment = new TableQuery(tag => new tDishcomment(tag))

  /** Entity class storing rows of table tDishtag
   *  @param id Database column Id SqlType(BIGINT), AutoInc, PrimaryKey
   *  @param restid Database column restId SqlType(BIGINT), Default(0)
   *  @param tag Database column tag SqlType(VARCHAR), Length(255,true), Default()
   *  @param tagdescription Database column tagDescription SqlType(VARCHAR), Length(255,true), Default() */
  case class rDishtag(id: Long, restid: Long = 0L, tag: String = "", tagdescription: String = "")
  /** GetResult implicit for fetching rDishtag objects using plain SQL queries */
  implicit def GetResultrDishtag(implicit e0: GR[Long], e1: GR[String]): GR[rDishtag] = GR{
    prs => import prs._
    rDishtag.tupled((<<[Long], <<[Long], <<[String], <<[String]))
  }
  /** Table description of table dishtag. Objects of this class serve as prototypes for rows in queries. */
  class tDishtag(_tableTag: Tag) extends Table[rDishtag](_tableTag, "dishtag") {
    def * = (id, restid, tag, tagdescription) <> (rDishtag.tupled, rDishtag.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(restid), Rep.Some(tag), Rep.Some(tagdescription)).shaped.<>({r=>import r._; _1.map(_=> rDishtag.tupled((_1.get, _2.get, _3.get, _4.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column Id SqlType(BIGINT), AutoInc, PrimaryKey */
    val id: Rep[Long] = column[Long]("Id", O.AutoInc, O.PrimaryKey)
    /** Database column restId SqlType(BIGINT), Default(0) */
    val restid: Rep[Long] = column[Long]("restId", O.Default(0L))
    /** Database column tag SqlType(VARCHAR), Length(255,true), Default() */
    val tag: Rep[String] = column[String]("tag", O.Length(255,varying=true), O.Default(""))
    /** Database column tagDescription SqlType(VARCHAR), Length(255,true), Default() */
    val tagdescription: Rep[String] = column[String]("tagDescription", O.Length(255,varying=true), O.Default(""))
  }
  /** Collection-like TableQuery object for table tDishtag */
  lazy val tDishtag = new TableQuery(tag => new tDishtag(tag))

  /** Entity class storing rows of table tDishtagrelation
   *  @param id Database column Id SqlType(BIGINT), AutoInc, PrimaryKey
   *  @param tagid Database column tagid SqlType(BIGINT), Default(0)
   *  @param dishid Database column dishid SqlType(BIGINT), Default(0)
   *  @param restid Database column restid SqlType(BIGINT), Default(0) */
  case class rDishtagrelation(id: Long, tagid: Long = 0L, dishid: Long = 0L, restid: Long = 0L)
  /** GetResult implicit for fetching rDishtagrelation objects using plain SQL queries */
  implicit def GetResultrDishtagrelation(implicit e0: GR[Long]): GR[rDishtagrelation] = GR{
    prs => import prs._
    rDishtagrelation.tupled((<<[Long], <<[Long], <<[Long], <<[Long]))
  }
  /** Table description of table dishtagrelation. Objects of this class serve as prototypes for rows in queries. */
  class tDishtagrelation(_tableTag: Tag) extends Table[rDishtagrelation](_tableTag, "dishtagrelation") {
    def * = (id, tagid, dishid, restid) <> (rDishtagrelation.tupled, rDishtagrelation.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(tagid), Rep.Some(dishid), Rep.Some(restid)).shaped.<>({r=>import r._; _1.map(_=> rDishtagrelation.tupled((_1.get, _2.get, _3.get, _4.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column Id SqlType(BIGINT), AutoInc, PrimaryKey */
    val id: Rep[Long] = column[Long]("Id", O.AutoInc, O.PrimaryKey)
    /** Database column tagid SqlType(BIGINT), Default(0) */
    val tagid: Rep[Long] = column[Long]("tagid", O.Default(0L))
    /** Database column dishid SqlType(BIGINT), Default(0) */
    val dishid: Rep[Long] = column[Long]("dishid", O.Default(0L))
    /** Database column restid SqlType(BIGINT), Default(0) */
    val restid: Rep[Long] = column[Long]("restid", O.Default(0L))
  }
  /** Collection-like TableQuery object for table tDishtagrelation */
  lazy val tDishtagrelation = new TableQuery(tag => new tDishtagrelation(tag))

  /** Entity class storing rows of table tRefund
   *  @param id Database column Id SqlType(BIGINT), AutoInc, PrimaryKey
   *  @param tradeno Database column tradeNo SqlType(VARCHAR), Length(255,true), Default()
   *  @param outtradeno Database column outTradeNo SqlType(VARCHAR), Length(255,true), Default()
   *  @param remark Database column remark SqlType(VARCHAR), Length(255,true), Default(None)
   *  @param reason Database column reason SqlType(VARCHAR), Length(255,true), Default()
   *  @param batchno Database column batchNo SqlType(VARCHAR), Length(255,true), Default()
   *  @param state Database column state SqlType(INT), Default(0)
   *  @param createtime Database column createTime SqlType(BIGINT), Default(0)
   *  @param restid Database column restId SqlType(BIGINT), Default(0)
   *  @param userid Database column userId SqlType(BIGINT), Default(0) */
  case class rRefund(id: Long, tradeno: String = "", outtradeno: String = "", remark: Option[String] = None, reason: String = "", batchno: String = "", state: Int = 0, createtime: Long = 0L, restid: Long = 0L, userid: Long = 0L)
  /** GetResult implicit for fetching rRefund objects using plain SQL queries */
  implicit def GetResultrRefund(implicit e0: GR[Long], e1: GR[String], e2: GR[Option[String]], e3: GR[Int]): GR[rRefund] = GR{
    prs => import prs._
    rRefund.tupled((<<[Long], <<[String], <<[String], <<?[String], <<[String], <<[String], <<[Int], <<[Long], <<[Long], <<[Long]))
  }
  /** Table description of table refund. Objects of this class serve as prototypes for rows in queries. */
  class tRefund(_tableTag: Tag) extends Table[rRefund](_tableTag, "refund") {
    def * = (id, tradeno, outtradeno, remark, reason, batchno, state, createtime, restid, userid) <> (rRefund.tupled, rRefund.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(tradeno), Rep.Some(outtradeno), remark, Rep.Some(reason), Rep.Some(batchno), Rep.Some(state), Rep.Some(createtime), Rep.Some(restid), Rep.Some(userid)).shaped.<>({r=>import r._; _1.map(_=> rRefund.tupled((_1.get, _2.get, _3.get, _4, _5.get, _6.get, _7.get, _8.get, _9.get, _10.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column Id SqlType(BIGINT), AutoInc, PrimaryKey */
    val id: Rep[Long] = column[Long]("Id", O.AutoInc, O.PrimaryKey)
    /** Database column tradeNo SqlType(VARCHAR), Length(255,true), Default() */
    val tradeno: Rep[String] = column[String]("tradeNo", O.Length(255,varying=true), O.Default(""))
    /** Database column outTradeNo SqlType(VARCHAR), Length(255,true), Default() */
    val outtradeno: Rep[String] = column[String]("outTradeNo", O.Length(255,varying=true), O.Default(""))
    /** Database column remark SqlType(VARCHAR), Length(255,true), Default(None) */
    val remark: Rep[Option[String]] = column[Option[String]]("remark", O.Length(255,varying=true), O.Default(None))
    /** Database column reason SqlType(VARCHAR), Length(255,true), Default() */
    val reason: Rep[String] = column[String]("reason", O.Length(255,varying=true), O.Default(""))
    /** Database column batchNo SqlType(VARCHAR), Length(255,true), Default() */
    val batchno: Rep[String] = column[String]("batchNo", O.Length(255,varying=true), O.Default(""))
    /** Database column state SqlType(INT), Default(0) */
    val state: Rep[Int] = column[Int]("state", O.Default(0))
    /** Database column createTime SqlType(BIGINT), Default(0) */
    val createtime: Rep[Long] = column[Long]("createTime", O.Default(0L))
    /** Database column restId SqlType(BIGINT), Default(0) */
    val restid: Rep[Long] = column[Long]("restId", O.Default(0L))
    /** Database column userId SqlType(BIGINT), Default(0) */
    val userid: Rep[Long] = column[Long]("userId", O.Default(0L))
  }
  /** Collection-like TableQuery object for table tRefund */
  lazy val tRefund = new TableQuery(tag => new tRefund(tag))

  /** Entity class storing rows of table tRestaurant
   *  @param id Database column Id SqlType(BIGINT), AutoInc, PrimaryKey
   *  @param name Database column name SqlType(VARCHAR), Length(100,true), Default()
   *  @param description Database column description SqlType(VARCHAR), Length(1000,true), Default(None)
   *  @param announcer Database column announcer SqlType(VARCHAR), Length(1000,true), Default(None)
   *  @param baseprice Database column basePrice SqlType(INT), Default(0)
   *  @param packfee Database column packFee SqlType(INT), Default(0)
   *  @param sales Database column sales SqlType(BIGINT), Default(0)
   *  @param pic Database column pic SqlType(VARCHAR), Length(1000,true), Default(None)
   *  @param duringtime Database column duringTime SqlType(BIGINT), Default(None)
   *  @param tag Database column tag SqlType(BIGINT), Default(0)
   *  @param address Database column address SqlType(VARCHAR), Length(1000,true), Default()
   *  @param concessions Database column concessions SqlType(VARCHAR), Length(1000,true), Default(None)
   *  @param isopen Database column isOpen SqlType(INT), Default(1)
   *  @param longitude Database column longitude SqlType(DOUBLE), Default(None)
   *  @param latitude Database column latitude SqlType(DOUBLE), Default(None)
   *  @param openingtime Database column openingTime SqlType(VARCHAR), Length(255,true), Default()
   *  @param stars Database column stars SqlType(INT), Default(0)
   *  @param ownerid Database column ownerid SqlType(BIGINT), Default(0)
   *  @param authstate Database column authState SqlType(INT), Default(0)
   *  @param tel Database column tel SqlType(VARCHAR), Length(30,true), Default()
   *  @param index Database column index SqlType(INT), Default(0) */
  case class rRestaurant(id: Long, name: String = "", description: Option[String] = None, announcer: Option[String] = None, baseprice: Int = 0, packfee: Int = 0, sales: Long = 0L, pic: Option[String] = None, duringtime: Option[Long] = None, tag: Long = 0L, address: String = "", concessions: Option[String] = None, isopen: Int = 1, longitude: Option[Double] = None, latitude: Option[Double] = None, openingtime: String = "", stars: Int = 0, ownerid: Long = 0L, authstate: Int = 0, tel: String = "", index: Int = 0)
  /** GetResult implicit for fetching rRestaurant objects using plain SQL queries */
  implicit def GetResultrRestaurant(implicit e0: GR[Long], e1: GR[String], e2: GR[Option[String]], e3: GR[Int], e4: GR[Option[Long]], e5: GR[Option[Double]]): GR[rRestaurant] = GR{
    prs => import prs._
    rRestaurant.tupled((<<[Long], <<[String], <<?[String], <<?[String], <<[Int], <<[Int], <<[Long], <<?[String], <<?[Long], <<[Long], <<[String], <<?[String], <<[Int], <<?[Double], <<?[Double], <<[String], <<[Int], <<[Long], <<[Int], <<[String], <<[Int]))
  }
  /** Table description of table restaurant. Objects of this class serve as prototypes for rows in queries. */
  class tRestaurant(_tableTag: Tag) extends Table[rRestaurant](_tableTag, "restaurant") {
    def * = (id, name, description, announcer, baseprice, packfee, sales, pic, duringtime, tag, address, concessions, isopen, longitude, latitude, openingtime, stars, ownerid, authstate, tel, index) <> (rRestaurant.tupled, rRestaurant.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(name), description, announcer, Rep.Some(baseprice), Rep.Some(packfee), Rep.Some(sales), pic, duringtime, Rep.Some(tag), Rep.Some(address), concessions, Rep.Some(isopen), longitude, latitude, Rep.Some(openingtime), Rep.Some(stars), Rep.Some(ownerid), Rep.Some(authstate), Rep.Some(tel), Rep.Some(index)).shaped.<>({r=>import r._; _1.map(_=> rRestaurant.tupled((_1.get, _2.get, _3, _4, _5.get, _6.get, _7.get, _8, _9, _10.get, _11.get, _12, _13.get, _14, _15, _16.get, _17.get, _18.get, _19.get, _20.get, _21.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column Id SqlType(BIGINT), AutoInc, PrimaryKey */
    val id: Rep[Long] = column[Long]("Id", O.AutoInc, O.PrimaryKey)
    /** Database column name SqlType(VARCHAR), Length(100,true), Default() */
    val name: Rep[String] = column[String]("name", O.Length(100,varying=true), O.Default(""))
    /** Database column description SqlType(VARCHAR), Length(1000,true), Default(None) */
    val description: Rep[Option[String]] = column[Option[String]]("description", O.Length(1000,varying=true), O.Default(None))
    /** Database column announcer SqlType(VARCHAR), Length(1000,true), Default(None) */
    val announcer: Rep[Option[String]] = column[Option[String]]("announcer", O.Length(1000,varying=true), O.Default(None))
    /** Database column basePrice SqlType(INT), Default(0) */
    val baseprice: Rep[Int] = column[Int]("basePrice", O.Default(0))
    /** Database column packFee SqlType(INT), Default(0) */
    val packfee: Rep[Int] = column[Int]("packFee", O.Default(0))
    /** Database column sales SqlType(BIGINT), Default(0) */
    val sales: Rep[Long] = column[Long]("sales", O.Default(0L))
    /** Database column pic SqlType(VARCHAR), Length(1000,true), Default(None) */
    val pic: Rep[Option[String]] = column[Option[String]]("pic", O.Length(1000,varying=true), O.Default(None))
    /** Database column duringTime SqlType(BIGINT), Default(None) */
    val duringtime: Rep[Option[Long]] = column[Option[Long]]("duringTime", O.Default(None))
    /** Database column tag SqlType(BIGINT), Default(0) */
    val tag: Rep[Long] = column[Long]("tag", O.Default(0L))
    /** Database column address SqlType(VARCHAR), Length(1000,true), Default() */
    val address: Rep[String] = column[String]("address", O.Length(1000,varying=true), O.Default(""))
    /** Database column concessions SqlType(VARCHAR), Length(1000,true), Default(None) */
    val concessions: Rep[Option[String]] = column[Option[String]]("concessions", O.Length(1000,varying=true), O.Default(None))
    /** Database column isOpen SqlType(INT), Default(1) */
    val isopen: Rep[Int] = column[Int]("isOpen", O.Default(1))
    /** Database column longitude SqlType(DOUBLE), Default(None) */
    val longitude: Rep[Option[Double]] = column[Option[Double]]("longitude", O.Default(None))
    /** Database column latitude SqlType(DOUBLE), Default(None) */
    val latitude: Rep[Option[Double]] = column[Option[Double]]("latitude", O.Default(None))
    /** Database column openingTime SqlType(VARCHAR), Length(255,true), Default() */
    val openingtime: Rep[String] = column[String]("openingTime", O.Length(255,varying=true), O.Default(""))
    /** Database column stars SqlType(INT), Default(0) */
    val stars: Rep[Int] = column[Int]("stars", O.Default(0))
    /** Database column ownerid SqlType(BIGINT), Default(0) */
    val ownerid: Rep[Long] = column[Long]("ownerid", O.Default(0L))
    /** Database column authState SqlType(INT), Default(0) */
    val authstate: Rep[Int] = column[Int]("authState", O.Default(0))
    /** Database column tel SqlType(VARCHAR), Length(30,true), Default() */
    val tel: Rep[String] = column[String]("tel", O.Length(30,varying=true), O.Default(""))
    /** Database column index SqlType(INT), Default(0) */
    val index: Rep[Int] = column[Int]("index", O.Default(0))
  }
  /** Collection-like TableQuery object for table tRestaurant */
  lazy val tRestaurant = new TableQuery(tag => new tRestaurant(tag))

  /** Entity class storing rows of table tRestaurantcomment
   *  @param id Database column Id SqlType(BIGINT), AutoInc, PrimaryKey
   *  @param restid Database column restId SqlType(BIGINT), Default(0)
   *  @param createtime Database column createTime SqlType(BIGINT), Default(0)
   *  @param userid Database column userid SqlType(BIGINT), Default(0)
   *  @param username Database column userName SqlType(VARCHAR), Length(255,true), Default()
   *  @param attitude Database column attitude SqlType(INT), Default(0)
   *  @param speed Database column speed SqlType(INT), Default(0) */
  case class rRestaurantcomment(id: Long, restid: Long = 0L, createtime: Long = 0L, userid: Long = 0L, username: String = "", attitude: Int = 0, speed: Int = 0)
  /** GetResult implicit for fetching rRestaurantcomment objects using plain SQL queries */
  implicit def GetResultrRestaurantcomment(implicit e0: GR[Long], e1: GR[String], e2: GR[Int]): GR[rRestaurantcomment] = GR{
    prs => import prs._
    rRestaurantcomment.tupled((<<[Long], <<[Long], <<[Long], <<[Long], <<[String], <<[Int], <<[Int]))
  }
  /** Table description of table restaurantcomment. Objects of this class serve as prototypes for rows in queries. */
  class tRestaurantcomment(_tableTag: Tag) extends Table[rRestaurantcomment](_tableTag, "restaurantcomment") {
    def * = (id, restid, createtime, userid, username, attitude, speed) <> (rRestaurantcomment.tupled, rRestaurantcomment.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(restid), Rep.Some(createtime), Rep.Some(userid), Rep.Some(username), Rep.Some(attitude), Rep.Some(speed)).shaped.<>({r=>import r._; _1.map(_=> rRestaurantcomment.tupled((_1.get, _2.get, _3.get, _4.get, _5.get, _6.get, _7.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column Id SqlType(BIGINT), AutoInc, PrimaryKey */
    val id: Rep[Long] = column[Long]("Id", O.AutoInc, O.PrimaryKey)
    /** Database column restId SqlType(BIGINT), Default(0) */
    val restid: Rep[Long] = column[Long]("restId", O.Default(0L))
    /** Database column createTime SqlType(BIGINT), Default(0) */
    val createtime: Rep[Long] = column[Long]("createTime", O.Default(0L))
    /** Database column userid SqlType(BIGINT), Default(0) */
    val userid: Rep[Long] = column[Long]("userid", O.Default(0L))
    /** Database column userName SqlType(VARCHAR), Length(255,true), Default() */
    val username: Rep[String] = column[String]("userName", O.Length(255,varying=true), O.Default(""))
    /** Database column attitude SqlType(INT), Default(0) */
    val attitude: Rep[Int] = column[Int]("attitude", O.Default(0))
    /** Database column speed SqlType(INT), Default(0) */
    val speed: Rep[Int] = column[Int]("speed", O.Default(0))
  }
  /** Collection-like TableQuery object for table tRestaurantcomment */
  lazy val tRestaurantcomment = new TableQuery(tag => new tRestaurantcomment(tag))

  /** Entity class storing rows of table tRestaurantconcessions
   *  @param id Database column Id SqlType(BIGINT), AutoInc, PrimaryKey
   *  @param restid Database column restId SqlType(BIGINT), Default(0)
   *  @param reduction Database column reduction SqlType(INT), Default(0)
   *  @param full Database column full SqlType(INT), Default(0)
   *  @param isfullreduction Database column isFullReduction SqlType(INT), Default(0)
   *  @param newproduction Database column newProduction SqlType(INT), Default(0)
   *  @param limit Database column limit SqlType(INT), Default(0)
   *  @param coupon Database column coupon SqlType(INT), Default(0) */
  case class rRestaurantconcessions(id: Long, restid: Long = 0L, reduction: Int = 0, full: Int = 0, isfullreduction: Int = 0, newproduction: Int = 0, limit: Int = 0, coupon: Int = 0)
  /** GetResult implicit for fetching rRestaurantconcessions objects using plain SQL queries */
  implicit def GetResultrRestaurantconcessions(implicit e0: GR[Long], e1: GR[Int]): GR[rRestaurantconcessions] = GR{
    prs => import prs._
    rRestaurantconcessions.tupled((<<[Long], <<[Long], <<[Int], <<[Int], <<[Int], <<[Int], <<[Int], <<[Int]))
  }
  /** Table description of table restaurantconcessions. Objects of this class serve as prototypes for rows in queries. */
  class tRestaurantconcessions(_tableTag: Tag) extends Table[rRestaurantconcessions](_tableTag, "restaurantconcessions") {
    def * = (id, restid, reduction, full, isfullreduction, newproduction, limit, coupon) <> (rRestaurantconcessions.tupled, rRestaurantconcessions.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(restid), Rep.Some(reduction), Rep.Some(full), Rep.Some(isfullreduction), Rep.Some(newproduction), Rep.Some(limit), Rep.Some(coupon)).shaped.<>({r=>import r._; _1.map(_=> rRestaurantconcessions.tupled((_1.get, _2.get, _3.get, _4.get, _5.get, _6.get, _7.get, _8.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column Id SqlType(BIGINT), AutoInc, PrimaryKey */
    val id: Rep[Long] = column[Long]("Id", O.AutoInc, O.PrimaryKey)
    /** Database column restId SqlType(BIGINT), Default(0) */
    val restid: Rep[Long] = column[Long]("restId", O.Default(0L))
    /** Database column reduction SqlType(INT), Default(0) */
    val reduction: Rep[Int] = column[Int]("reduction", O.Default(0))
    /** Database column full SqlType(INT), Default(0) */
    val full: Rep[Int] = column[Int]("full", O.Default(0))
    /** Database column isFullReduction SqlType(INT), Default(0) */
    val isfullreduction: Rep[Int] = column[Int]("isFullReduction", O.Default(0))
    /** Database column newProduction SqlType(INT), Default(0) */
    val newproduction: Rep[Int] = column[Int]("newProduction", O.Default(0))
    /** Database column limit SqlType(INT), Default(0) */
    val limit: Rep[Int] = column[Int]("limit", O.Default(0))
    /** Database column coupon SqlType(INT), Default(0) */
    val coupon: Rep[Int] = column[Int]("coupon", O.Default(0))
  }
  /** Collection-like TableQuery object for table tRestaurantconcessions */
  lazy val tRestaurantconcessions = new TableQuery(tag => new tRestaurantconcessions(tag))

  /** Entity class storing rows of table tRestaurantorder
   *  @param id Database column Id SqlType(BIGINT), AutoInc, PrimaryKey
   *  @param userid Database column userId SqlType(BIGINT), Default(0)
   *  @param username Database column userName SqlType(VARCHAR), Length(255,true), Default()
   *  @param address Database column address SqlType(VARCHAR), Length(1000,true), Default()
   *  @param tel Database column tel SqlType(VARCHAR), Length(255,true), Default()
   *  @param restid Database column restId SqlType(BIGINT), Default(0)
   *  @param arrivetime Database column arriveTime SqlType(VARCHAR), Length(255,true), Default(None)
   *  @param remark Database column remark SqlType(VARCHAR), Length(255,true), Default(None)
   *  @param cashcoup Database column cashCoup SqlType(VARCHAR), Length(255,true), Default(None)
   *  @param invoice Database column invoice SqlType(INT), Default(0)
   *  @param packfee Database column packFee SqlType(VARCHAR), Length(255,true), Default(0)
   *  @param totalfee Database column totalFee SqlType(VARCHAR), Length(255,true), Default()
   *  @param createtime Database column createTime SqlType(BIGINT), Default(0)
   *  @param state Database column state SqlType(INT), Default(0)
   *  @param isprocessed Database column isProcessed SqlType(INT), Default(0)
   *  @param tradeno Database column tradeNo SqlType(VARCHAR), Length(255,true), Default(None)
   *  @param alipaystate Database column alipayState SqlType(INT), Default(0)
   *  @param paytype Database column payType SqlType(INT), Default(0) */
  case class rRestaurantorder(id: Long, userid: Long = 0L, username: String = "", address: String = "", tel: String = "", restid: Long = 0L, arrivetime: Option[String] = None, remark: Option[String] = None, cashcoup: Option[String] = None, invoice: Int = 0, packfee: String = "0", totalfee: String = "", createtime: Long = 0L, state: Int = 0, isprocessed: Int = 0, tradeno: Option[String] = None, alipaystate: Int = 0, paytype: Int = 0)
  /** GetResult implicit for fetching rRestaurantorder objects using plain SQL queries */
  implicit def GetResultrRestaurantorder(implicit e0: GR[Long], e1: GR[String], e2: GR[Option[String]], e3: GR[Int]): GR[rRestaurantorder] = GR{
    prs => import prs._
    rRestaurantorder.tupled((<<[Long], <<[Long], <<[String], <<[String], <<[String], <<[Long], <<?[String], <<?[String], <<?[String], <<[Int], <<[String], <<[String], <<[Long], <<[Int], <<[Int], <<?[String], <<[Int], <<[Int]))
  }
  /** Table description of table restaurantorder. Objects of this class serve as prototypes for rows in queries. */
  class tRestaurantorder(_tableTag: Tag) extends Table[rRestaurantorder](_tableTag, "restaurantorder") {
    def * = (id, userid, username, address, tel, restid, arrivetime, remark, cashcoup, invoice, packfee, totalfee, createtime, state, isprocessed, tradeno, alipaystate, paytype) <> (rRestaurantorder.tupled, rRestaurantorder.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(userid), Rep.Some(username), Rep.Some(address), Rep.Some(tel), Rep.Some(restid), arrivetime, remark, cashcoup, Rep.Some(invoice), Rep.Some(packfee), Rep.Some(totalfee), Rep.Some(createtime), Rep.Some(state), Rep.Some(isprocessed), tradeno, Rep.Some(alipaystate), Rep.Some(paytype)).shaped.<>({r=>import r._; _1.map(_=> rRestaurantorder.tupled((_1.get, _2.get, _3.get, _4.get, _5.get, _6.get, _7, _8, _9, _10.get, _11.get, _12.get, _13.get, _14.get, _15.get, _16, _17.get, _18.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column Id SqlType(BIGINT), AutoInc, PrimaryKey */
    val id: Rep[Long] = column[Long]("Id", O.AutoInc, O.PrimaryKey)
    /** Database column userId SqlType(BIGINT), Default(0) */
    val userid: Rep[Long] = column[Long]("userId", O.Default(0L))
    /** Database column userName SqlType(VARCHAR), Length(255,true), Default() */
    val username: Rep[String] = column[String]("userName", O.Length(255,varying=true), O.Default(""))
    /** Database column address SqlType(VARCHAR), Length(1000,true), Default() */
    val address: Rep[String] = column[String]("address", O.Length(1000,varying=true), O.Default(""))
    /** Database column tel SqlType(VARCHAR), Length(255,true), Default() */
    val tel: Rep[String] = column[String]("tel", O.Length(255,varying=true), O.Default(""))
    /** Database column restId SqlType(BIGINT), Default(0) */
    val restid: Rep[Long] = column[Long]("restId", O.Default(0L))
    /** Database column arriveTime SqlType(VARCHAR), Length(255,true), Default(None) */
    val arrivetime: Rep[Option[String]] = column[Option[String]]("arriveTime", O.Length(255,varying=true), O.Default(None))
    /** Database column remark SqlType(VARCHAR), Length(255,true), Default(None) */
    val remark: Rep[Option[String]] = column[Option[String]]("remark", O.Length(255,varying=true), O.Default(None))
    /** Database column cashCoup SqlType(VARCHAR), Length(255,true), Default(None) */
    val cashcoup: Rep[Option[String]] = column[Option[String]]("cashCoup", O.Length(255,varying=true), O.Default(None))
    /** Database column invoice SqlType(INT), Default(0) */
    val invoice: Rep[Int] = column[Int]("invoice", O.Default(0))
    /** Database column packFee SqlType(VARCHAR), Length(255,true), Default(0) */
    val packfee: Rep[String] = column[String]("packFee", O.Length(255,varying=true), O.Default("0"))
    /** Database column totalFee SqlType(VARCHAR), Length(255,true), Default() */
    val totalfee: Rep[String] = column[String]("totalFee", O.Length(255,varying=true), O.Default(""))
    /** Database column createTime SqlType(BIGINT), Default(0) */
    val createtime: Rep[Long] = column[Long]("createTime", O.Default(0L))
    /** Database column state SqlType(INT), Default(0) */
    val state: Rep[Int] = column[Int]("state", O.Default(0))
    /** Database column isProcessed SqlType(INT), Default(0) */
    val isprocessed: Rep[Int] = column[Int]("isProcessed", O.Default(0))
    /** Database column tradeNo SqlType(VARCHAR), Length(255,true), Default(None) */
    val tradeno: Rep[Option[String]] = column[Option[String]]("tradeNo", O.Length(255,varying=true), O.Default(None))
    /** Database column alipayState SqlType(INT), Default(0) */
    val alipaystate: Rep[Int] = column[Int]("alipayState", O.Default(0))
    /** Database column payType SqlType(INT), Default(0) */
    val paytype: Rep[Int] = column[Int]("payType", O.Default(0))
  }
  /** Collection-like TableQuery object for table tRestaurantorder */
  lazy val tRestaurantorder = new TableQuery(tag => new tRestaurantorder(tag))

  /** Entity class storing rows of table tRestaurantorderaddress
   *  @param id Database column Id SqlType(BIGINT), AutoInc, PrimaryKey
   *  @param name Database column name SqlType(VARCHAR), Length(255,true), Default()
   *  @param sex Database column sex SqlType(INT), Default(Some(0))
   *  @param userid Database column userId SqlType(BIGINT), Default(0)
   *  @param address Database column address SqlType(VARCHAR), Length(255,true), Default()
   *  @param tel Database column tel SqlType(VARCHAR), Length(255,true), Default() */
  case class rRestaurantorderaddress(id: Long, name: String = "", sex: Option[Int] = Some(0), userid: Long = 0L, address: String = "", tel: String = "")
  /** GetResult implicit for fetching rRestaurantorderaddress objects using plain SQL queries */
  implicit def GetResultrRestaurantorderaddress(implicit e0: GR[Long], e1: GR[String], e2: GR[Option[Int]]): GR[rRestaurantorderaddress] = GR{
    prs => import prs._
    rRestaurantorderaddress.tupled((<<[Long], <<[String], <<?[Int], <<[Long], <<[String], <<[String]))
  }
  /** Table description of table restaurantorderaddress. Objects of this class serve as prototypes for rows in queries. */
  class tRestaurantorderaddress(_tableTag: Tag) extends Table[rRestaurantorderaddress](_tableTag, "restaurantorderaddress") {
    def * = (id, name, sex, userid, address, tel) <> (rRestaurantorderaddress.tupled, rRestaurantorderaddress.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(name), sex, Rep.Some(userid), Rep.Some(address), Rep.Some(tel)).shaped.<>({r=>import r._; _1.map(_=> rRestaurantorderaddress.tupled((_1.get, _2.get, _3, _4.get, _5.get, _6.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column Id SqlType(BIGINT), AutoInc, PrimaryKey */
    val id: Rep[Long] = column[Long]("Id", O.AutoInc, O.PrimaryKey)
    /** Database column name SqlType(VARCHAR), Length(255,true), Default() */
    val name: Rep[String] = column[String]("name", O.Length(255,varying=true), O.Default(""))
    /** Database column sex SqlType(INT), Default(Some(0)) */
    val sex: Rep[Option[Int]] = column[Option[Int]]("sex", O.Default(Some(0)))
    /** Database column userId SqlType(BIGINT), Default(0) */
    val userid: Rep[Long] = column[Long]("userId", O.Default(0L))
    /** Database column address SqlType(VARCHAR), Length(255,true), Default() */
    val address: Rep[String] = column[String]("address", O.Length(255,varying=true), O.Default(""))
    /** Database column tel SqlType(VARCHAR), Length(255,true), Default() */
    val tel: Rep[String] = column[String]("tel", O.Length(255,varying=true), O.Default(""))
  }
  /** Collection-like TableQuery object for table tRestaurantorderaddress */
  lazy val tRestaurantorderaddress = new TableQuery(tag => new tRestaurantorderaddress(tag))

  /** Entity class storing rows of table tRestaurantorderdetail
   *  @param id Database column Id SqlType(BIGINT), AutoInc, PrimaryKey
   *  @param orderid Database column orderId SqlType(BIGINT), Default(0)
   *  @param dishid Database column dishId SqlType(BIGINT), Default(0)
   *  @param dishname Database column dishName SqlType(VARCHAR), Length(255,true), Default()
   *  @param number Database column number SqlType(INT), Default(0)
   *  @param price Database column price SqlType(VARCHAR), Length(255,true), Default() */
  case class rRestaurantorderdetail(id: Long, orderid: Long = 0L, dishid: Long = 0L, dishname: String = "", number: Int = 0, price: String = "")
  /** GetResult implicit for fetching rRestaurantorderdetail objects using plain SQL queries */
  implicit def GetResultrRestaurantorderdetail(implicit e0: GR[Long], e1: GR[String], e2: GR[Int]): GR[rRestaurantorderdetail] = GR{
    prs => import prs._
    rRestaurantorderdetail.tupled((<<[Long], <<[Long], <<[Long], <<[String], <<[Int], <<[String]))
  }
  /** Table description of table restaurantorderdetail. Objects of this class serve as prototypes for rows in queries. */
  class tRestaurantorderdetail(_tableTag: Tag) extends Table[rRestaurantorderdetail](_tableTag, "restaurantorderdetail") {
    def * = (id, orderid, dishid, dishname, number, price) <> (rRestaurantorderdetail.tupled, rRestaurantorderdetail.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(orderid), Rep.Some(dishid), Rep.Some(dishname), Rep.Some(number), Rep.Some(price)).shaped.<>({r=>import r._; _1.map(_=> rRestaurantorderdetail.tupled((_1.get, _2.get, _3.get, _4.get, _5.get, _6.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column Id SqlType(BIGINT), AutoInc, PrimaryKey */
    val id: Rep[Long] = column[Long]("Id", O.AutoInc, O.PrimaryKey)
    /** Database column orderId SqlType(BIGINT), Default(0) */
    val orderid: Rep[Long] = column[Long]("orderId", O.Default(0L))
    /** Database column dishId SqlType(BIGINT), Default(0) */
    val dishid: Rep[Long] = column[Long]("dishId", O.Default(0L))
    /** Database column dishName SqlType(VARCHAR), Length(255,true), Default() */
    val dishname: Rep[String] = column[String]("dishName", O.Length(255,varying=true), O.Default(""))
    /** Database column number SqlType(INT), Default(0) */
    val number: Rep[Int] = column[Int]("number", O.Default(0))
    /** Database column price SqlType(VARCHAR), Length(255,true), Default() */
    val price: Rep[String] = column[String]("price", O.Length(255,varying=true), O.Default(""))
  }
  /** Collection-like TableQuery object for table tRestaurantorderdetail */
  lazy val tRestaurantorderdetail = new TableQuery(tag => new tRestaurantorderdetail(tag))

  /** Entity class storing rows of table tRestauranttag
   *  @param id Database column Id SqlType(BIGINT), AutoInc, PrimaryKey
   *  @param tagname Database column tagName SqlType(VARCHAR), Length(255,true), Default() */
  case class rRestauranttag(id: Long, tagname: String = "")
  /** GetResult implicit for fetching rRestauranttag objects using plain SQL queries */
  implicit def GetResultrRestauranttag(implicit e0: GR[Long], e1: GR[String]): GR[rRestauranttag] = GR{
    prs => import prs._
    rRestauranttag.tupled((<<[Long], <<[String]))
  }
  /** Table description of table restauranttag. Objects of this class serve as prototypes for rows in queries. */
  class tRestauranttag(_tableTag: Tag) extends Table[rRestauranttag](_tableTag, "restauranttag") {
    def * = (id, tagname) <> (rRestauranttag.tupled, rRestauranttag.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(tagname)).shaped.<>({r=>import r._; _1.map(_=> rRestauranttag.tupled((_1.get, _2.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column Id SqlType(BIGINT), AutoInc, PrimaryKey */
    val id: Rep[Long] = column[Long]("Id", O.AutoInc, O.PrimaryKey)
    /** Database column tagName SqlType(VARCHAR), Length(255,true), Default() */
    val tagname: Rep[String] = column[String]("tagName", O.Length(255,varying=true), O.Default(""))
  }
  /** Collection-like TableQuery object for table tRestauranttag */
  lazy val tRestauranttag = new TableQuery(tag => new tRestauranttag(tag))

  /** Entity class storing rows of table tRestauranttop
   *  @param order Database column order SqlType(BIGINT), PrimaryKey, Default(0)
   *  @param restid Database column restid SqlType(BIGINT), Default(0) */
  case class rRestauranttop(order: Long = 0L, restid: Long = 0L)
  /** GetResult implicit for fetching rRestauranttop objects using plain SQL queries */
  implicit def GetResultrRestauranttop(implicit e0: GR[Long]): GR[rRestauranttop] = GR{
    prs => import prs._
    rRestauranttop.tupled((<<[Long], <<[Long]))
  }
  /** Table description of table restauranttop. Objects of this class serve as prototypes for rows in queries. */
  class tRestauranttop(_tableTag: Tag) extends Table[rRestauranttop](_tableTag, "restauranttop") {
    def * = (order, restid) <> (rRestauranttop.tupled, rRestauranttop.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(order), Rep.Some(restid)).shaped.<>({r=>import r._; _1.map(_=> rRestauranttop.tupled((_1.get, _2.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column order SqlType(BIGINT), PrimaryKey, Default(0) */
    val order: Rep[Long] = column[Long]("order", O.PrimaryKey, O.Default(0L))
    /** Database column restid SqlType(BIGINT), Default(0) */
    val restid: Rep[Long] = column[Long]("restid", O.Default(0L))
  }
  /** Collection-like TableQuery object for table tRestauranttop */
  lazy val tRestauranttop = new TableQuery(tag => new tRestauranttop(tag))

  /** Entity class storing rows of table tUser
   *  @param id Database column Id SqlType(BIGINT), AutoInc, PrimaryKey
   *  @param email Database column email SqlType(VARCHAR), Length(255,true), Default(None)
   *  @param mobile Database column mobile SqlType(VARCHAR), Length(255,true), Default()
   *  @param nickname Database column nickName SqlType(VARCHAR), Length(255,true), Default(None)
   *  @param headimg Database column headImg SqlType(VARCHAR), Length(500,true), Default(None)
   *  @param state Database column state SqlType(INT), Default(0)
   *  @param usertype Database column userType SqlType(INT), Default(0)
   *  @param ip Database column ip SqlType(VARCHAR), Length(255,true), Default()
   *  @param secure Database column secure SqlType(VARCHAR), Length(255,true), Default()
   *  @param inserttime Database column insertTime SqlType(BIGINT), Default(0)
   *  @param updatetime Database column updateTime SqlType(BIGINT), Default(0)
   *  @param lastloginintime Database column lastLogininTime SqlType(BIGINT), Default(0) */
  case class rUser(id: Long, email: Option[String] = None, mobile: String = "", nickname: Option[String] = None, headimg: Option[String] = None, state: Int = 0, usertype: Int = 0, ip: String = "", secure: String = "", inserttime: Long = 0L, updatetime: Long = 0L, lastloginintime: Long = 0L)
  /** GetResult implicit for fetching rUser objects using plain SQL queries */
  implicit def GetResultrUser(implicit e0: GR[Long], e1: GR[Option[String]], e2: GR[String], e3: GR[Int]): GR[rUser] = GR{
    prs => import prs._
    rUser.tupled((<<[Long], <<?[String], <<[String], <<?[String], <<?[String], <<[Int], <<[Int], <<[String], <<[String], <<[Long], <<[Long], <<[Long]))
  }
  /** Table description of table user. Objects of this class serve as prototypes for rows in queries. */
  class tUser(_tableTag: Tag) extends Table[rUser](_tableTag, "user") {
    def * = (id, email, mobile, nickname, headimg, state, usertype, ip, secure, inserttime, updatetime, lastloginintime) <> (rUser.tupled, rUser.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), email, Rep.Some(mobile), nickname, headimg, Rep.Some(state), Rep.Some(usertype), Rep.Some(ip), Rep.Some(secure), Rep.Some(inserttime), Rep.Some(updatetime), Rep.Some(lastloginintime)).shaped.<>({r=>import r._; _1.map(_=> rUser.tupled((_1.get, _2, _3.get, _4, _5, _6.get, _7.get, _8.get, _9.get, _10.get, _11.get, _12.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column Id SqlType(BIGINT), AutoInc, PrimaryKey */
    val id: Rep[Long] = column[Long]("Id", O.AutoInc, O.PrimaryKey)
    /** Database column email SqlType(VARCHAR), Length(255,true), Default(None) */
    val email: Rep[Option[String]] = column[Option[String]]("email", O.Length(255,varying=true), O.Default(None))
    /** Database column mobile SqlType(VARCHAR), Length(255,true), Default() */
    val mobile: Rep[String] = column[String]("mobile", O.Length(255,varying=true), O.Default(""))
    /** Database column nickName SqlType(VARCHAR), Length(255,true), Default(None) */
    val nickname: Rep[Option[String]] = column[Option[String]]("nickName", O.Length(255,varying=true), O.Default(None))
    /** Database column headImg SqlType(VARCHAR), Length(500,true), Default(None) */
    val headimg: Rep[Option[String]] = column[Option[String]]("headImg", O.Length(500,varying=true), O.Default(None))
    /** Database column state SqlType(INT), Default(0) */
    val state: Rep[Int] = column[Int]("state", O.Default(0))
    /** Database column userType SqlType(INT), Default(0) */
    val usertype: Rep[Int] = column[Int]("userType", O.Default(0))
    /** Database column ip SqlType(VARCHAR), Length(255,true), Default() */
    val ip: Rep[String] = column[String]("ip", O.Length(255,varying=true), O.Default(""))
    /** Database column secure SqlType(VARCHAR), Length(255,true), Default() */
    val secure: Rep[String] = column[String]("secure", O.Length(255,varying=true), O.Default(""))
    /** Database column insertTime SqlType(BIGINT), Default(0) */
    val inserttime: Rep[Long] = column[Long]("insertTime", O.Default(0L))
    /** Database column updateTime SqlType(BIGINT), Default(0) */
    val updatetime: Rep[Long] = column[Long]("updateTime", O.Default(0L))
    /** Database column lastLogininTime SqlType(BIGINT), Default(0) */
    val lastloginintime: Rep[Long] = column[Long]("lastLogininTime", O.Default(0L))
  }
  /** Collection-like TableQuery object for table tUser */
  lazy val tUser = new TableQuery(tag => new tUser(tag))
}
