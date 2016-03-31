/**
 * Created by caoshuai on 2015/12/15.
 */

(function(React, ReactRouter, Reflux, global) {
    global.components = {};

    /**=================================================美食主页部分组件===========================================================**/
    /**
     * 搜索框
     * */
    components.CateringHeader = React.createClass({
        mixins: [
            Reflux.connect(global.stores.resListStore,"data"),
            ReactRouter.Navigation
        ],
        componentWillMount:function(){
            //$(document).ready(function(){
            //    $(window).scroll( function() {
            //        var stop = $(window).scrollTop();
            //        if(stop > 0){
            //            if(stop > 530){
            //                var x = 530-stop-80;
            //                $('#headerFoot').css({bottom:x+"px"});
            //            }
            //            else if(stop < 480){ $('#headerFoot').css({bottom:"0px"});}
            //        }
            //    });
            //});
        },
        componentWillUnmount: function(){
            $(window).unbind();
        },
        filterRes:function(num){
            var id ="#filter" + num;
            $('#filter0').css("color","#505050");
            $('#filter1').css("color","#505050");
            $('#filter2').css("color","#505050");
            $('#filter3').css("color","#505050");
            $('#filter4').css("color","#505050");
            $(id).css("color","#a6873e");
            pCaterActions.firstAction.fetchRestaurantList(null,null,num);
        },
        sequeceRes:function(num){
            var id ="#seq" + num;
            $('#seq0').css("color","#505050");
            $('#seq1').css("color","#505050");
            $('#seq2').css("color","#505050");
            $('#seq3').css("color","#505050");
            $('#seq4').css("color","#505050");
            $(id).css("color","#a6873e");
            pCaterActions.firstAction.fetchRestaurantList(null,num,null);
        },
        unfoldFilter:function(){
            $("#filter").toggle(0);
        },
        unfoldSeq:function(){
            $("#sequence").toggle(0);
        },
        handleKeydown:function(event){
            if(event.keyCode == 13) {
                $('#footer').show();
                var input = this.refs.searchInput.getDOMNode().value;
                if (input != '') $('#footer').hide();
                pCaterActions.firstAction.searchRestaurant(input);
            }
        },
        handleChange:function(){
            $('#footer').show();
            var input  = this.refs.searchInput.getDOMNode().value;
            if(input != '')  $('#footer').hide();
            pCaterActions.firstAction.searchRestaurant(input);
        },
        render: function(){
            return(
                <div className="header" style={{}}>
                    <img  src="/assets/images/catering/pc/header.png" alt=""/>
                    <div style={{width:'1280px',margin:'auto'}}>
                    <input onKeyDown={this.handleKeydown} type="text" ref="searchInput" id="searchInput" placeholder="请输入餐厅名字"/>
                    <i className="fa fa-search search" onClick={this.handleChange}></i>
                    <div id="headerFoot" className="headerFoot">
                        <div className="square" style={{bottom:"40px"}} onMouseEnter={this.unfoldFilter}
                             onMouseLeave={this.unfoldFilter}>
                            <h5>筛选<i className="fa fa-angle-right"></i></h5>
                            <div id="filter" className="filter">
                                <p onClick={this.filterRes.bind(this,0)} id="filter0">全部</p>
                                <p onClick={this.filterRes.bind(this,1)} id="filter1">满减</p>
                                <p onClick={this.filterRes.bind(this,2)} id="filter2">新品特惠</p>
                                <p onClick={this.filterRes.bind(this,3)} id="filter3">限量供应</p>
                                <p onClick={this.filterRes.bind(this,4)} id="filter4">支持优惠券</p>
                            </div>
                        </div>
                        <div className="square" style={{bottom:0}} onMouseEnter={this.unfoldSeq}
                             onMouseLeave={this.unfoldSeq}>
                            <h5>排序 <i className="fa fa-angle-right"></i></h5>
                            <div id="sequence" className="sequence">
                                <p onClick={this.sequeceRes.bind(this,0)} id="seq0">默认</p>
                                {/*<p onClick={this.sequeceRes.bind(this,1)} id="seq1">销量</p>*/}
                                <p onClick={this.sequeceRes.bind(this,2)} id="seq2">起送价</p>
                                <p onClick={this.sequeceRes.bind(this,3)} id="seq3">送餐速度</p>
                                {/*<p onClick={this.sequeceRes.bind(this,4)} id="seq4">评价</p>*/}
                            </div>
                        </div>

                        {/*<div id="filter" className="filter">
                            <p onClick={this.filterRes.bind(this,1)} id="filter1">满减</p>
                            <p onClick={this.filterRes.bind(this,2)} id="filter2">新品特惠</p>
                            <p onClick={this.filterRes.bind(this,3)} id="filter3">限量供应</p>
                            <p onClick={this.filterRes.bind(this,4)} id="filter4">支持优惠券</p>
                        </div>
                        <div id="sequence" className="sequence">
                            <p onClick={this.sequeceRes.bind(this,1)} id="seq1">销量</p>
                            <p onClick={this.sequeceRes.bind(this,2)} id="seq2">起送价</p>
                            <p onClick={this.sequeceRes.bind(this,3)} id="seq3">送餐速度</p>
                            <p onClick={this.sequeceRes.bind(this,4)} id="seq4">评价</p>
                        </div>*/}
                    </div>
                    </div>
                </div>
            )

        }
    });
    /**
     * 餐厅列表
     * */
    components.RestaurantList = React.createClass({
        mixins:[
            Reflux.connect(global.stores.resListStore, 'data'),
            ReactRouter.Navigation,
            ReactRouter.State,
        ],
        componentWillMount:function(){
            var tag = null,
                sort = null,
                filter = null;
            if(this.getQuery().flag) tag = parseInt(this.getQuery().flag);
            pCaterActions.firstAction.fetchRestaurantList(tag, sort, filter);
            pCaterActions.firstAction.fetchRestaurantFenlei();
        },
        goToRes:function(num){
            var path = "/restaurant/" +num;
            this.transitionTo(path);
        },
        render:function(){
            return(
                <div className="resList">
                    {this.state.data.restaurantPageList.map(function(res,index){
                        //if(index == 0 || index == 4 ||index == 8){
                            return(
                                <div className="restaurantLeft" onClick={this.goToRes.bind(this,res.id)}>
                                    <img src={res.pic} alt=""/>
                                    <div>
                                        <p className="resNameFirst">{res.name}</p>
                                        {/*<p className="information" >
                                            销量&nbsp;&nbsp;{res.sales}
                                        </p>*/}
                                        <p className="information">
                                            起送&nbsp;&nbsp;
                                            <i className="fa fa-jpy"></i>&nbsp;
                                            {res.basePrice}
                                        </p>
                                        <p className="information">
                                            配送&nbsp;&nbsp;
                                            <i className="fa fa-jpy"></i>&nbsp;
                                            {res.packFee}
                                        </p>
                                        <p className="information">
                                            时间&nbsp;&nbsp;
                                            <i className="fa fa-jpy"></i>&nbsp;
                                            {res.duringTime}分钟
                                        </p>
                                    </div>
                                </div>
                            )
                        //}
                        //else if(index == 1 || index == 5 ||index == 9){
                        //    return(
                        //        <div className="restaurantRight" onClick={this.goToRes.bind(this,res.id)}>
                        //            <img src={res.pic} alt=""/>
                        //            <div>
                        //                <p className="resNameFirst">{res.name}</p>
                        //                <p className="information" >
                        //                    销量&nbsp;&nbsp;{res.sales}
                        //                </p>
                        //                <p className="information">
                        //                    起送&nbsp;&nbsp;
                        //                    <i className="fa fa-jpy"></i>&nbsp;
                        //                    {res.basePrice}
                        //                </p>
                        //                <p className="information">
                        //                    配送&nbsp;&nbsp;
                        //                    <i className="fa fa-jpy"></i>&nbsp;
                        //                    {res.packFee}
                        //                </p>
                        //                <p className="information">
                        //                    时间&nbsp;&nbsp;
                        //                    <i className="fa fa-jpy"></i>&nbsp;
                        //                    {res.duringTime}分钟
                        //                </p>
                        //            </div>
                        //        </div>
                        //    )
                        //}
                        //else if(index == 2 || index == 6){
                        //    return(
                        //        <div className="restaurantLeft" onClick={this.goToRes.bind(this,res.id)}>
                        //            <div style={{float:"left"}}>
                        //                    <p className="resNameFirst">{res.name}</p>
                        //                    <p className="information" >
                        //                        销量&nbsp;&nbsp;{res.sales}
                        //                    </p>
                        //                    <p className="information">
                        //                        起送&nbsp;&nbsp;
                        //                        <i className="fa fa-jpy"></i>&nbsp;
                        //                        {res.basePrice}
                        //                    </p>
                        //                    <p className="information">
                        //                        配送&nbsp;&nbsp;
                        //                        <i className="fa fa-jpy"></i>&nbsp;
                        //                        {res.packFee}
                        //                    </p>
                        //                    <p className="information">
                        //                        时间&nbsp;&nbsp;
                        //                        <i className="fa fa-jpy"></i>&nbsp;
                        //                        {res.duringTime}分钟
                        //                    </p>
                        //            </div>
                        //            <img style={{float:"right"}} src={res.pic} alt=""/>
                        //        </div>
                        //    )
                        //}
                        //else{
                        //    return(
                        //        <div className="restaurantRight" onClick={this.goToRes.bind(this,res.id)}>
                        //            <div style={{float:"left"}}>
                        //                    <p className="resNameFirst">{res.name}</p>
                        //                    <p className="information" >
                        //                        销量&nbsp;&nbsp;{res.sales}
                        //                    </p>
                        //                    <p className="information">
                        //                        起送&nbsp;&nbsp;
                        //                        <i className="fa fa-jpy"></i>&nbsp;
                        //                        {res.basePrice}
                        //                    </p>
                        //                    <p className="information">
                        //                        配送&nbsp;&nbsp;
                        //                        <i className="fa fa-jpy"></i>&nbsp;
                        //                        {res.packFee}
                        //                    </p>
                        //                    <p className="information">
                        //                        时间&nbsp;&nbsp;
                        //                        <i className="fa fa-jpy"></i>&nbsp;
                        //                        {res.duringTime}分钟
                        //                    </p>
                        //            </div>
                        //            <img style={{float:"right"}} src={res.pic} alt=""/>
                        //        </div>
                        //    )
                        //}
                    }.bind(this))}
                </div>
            )
        }
    });
    /**
     * 分页
     * */
    components.CateringFooter = React.createClass({
        mixins:[Reflux.connect(global.stores.resListStore, 'data')],
        componentWillMount:function(){
            //pCaterActions.firstAction.getPages();
        },
        componentWillUpdate:function(){
            var pageNum = this.state.data.pageNum;
            $.each(this.state.data.pageList,function(page){
                var id= "#page"+page;
                if(page == pageNum) $(id).css("color","#a6873e");
                else $(id).css("color","#626262");
            });
        },
        changePage:function(num){
            var id="#page"+num;
            var spanId = "#page"+this.state.data.pageNum;
            $(spanId).css("color","#626262");
            $(id).css("color","#a6873e");
            global.pCaterActions.firstAction.changePageNum(num);
        },
        plusPageNum:function(){
                var num =this.state.data.pageNum+1;
                var id="#page"+num;
                var spanId = "#page"+this.state.data.pageNum;
                $(spanId).css("color","#626262");
                $(id).css("color","#a6873e");
                global.pCaterActions.firstAction.changePageNum(num);
        },
        minusPageNum:function(){
            if(this.state.data.pageNum >1){
                var num =this.state.data.pageNum-1;
                var id="#page"+num;
                var spanId = "#page"+this.state.data.pageNum;
                $(spanId).css("color","#626262");
                $(id).css("color","#a6873e");
                global.pCaterActions.firstAction.changePageNum(num);
            }
        },

        render:function(){
            if(this.state.data.pageNum == 1){
                var left= null;
            }else{
                left = <i className="fa fa-chevron-left" onClick={this.minusPageNum}></i>;
            }
            var eachPage = this.state.data.eachPage;
            if (this.state.data.restaurantList.length%eachPage == 0) {
                var max = parseInt(this.state.data.restaurantList.length/eachPage);
            } else {
                max = parseInt(this.state.data.restaurantList.length/eachPage+1);
            }
            if(this.state.data.pageNum >= max){
                var right = null
            }else{
                right = <i className="fa fa-chevron-right" onClick={this.plusPageNum}></i>;
            }
            var pageNum = this.state.data.pageNum-1;
            var pages = stores.resListStore.pages;
            return(
                <div className="caterFoot" id="footer">
                    {left}&nbsp;&nbsp;
                    {this.state.data.pageList.map(function(page,index){
                        var pageId="page" +page;
                        if(parseInt(pageNum/pages) == parseInt((page-1)/pages)){
                            if(index == 0){
                                return(
                                    <span onClick={this.changePage.bind(this,page)}
                                          style={{color:"#a6873e"}} id={pageId}>{page}&nbsp;&nbsp;</span>
                                )
                            }
                            else{
                                return(
                                    <span onClick={this.changePage.bind(this,page)} id={pageId}>{page}&nbsp;&nbsp;</span>
                                )
                            }
                        }
                    }.bind(this))}
                    {right}
                </div>
            )
        }
    });
    /**
     * 导航栏
     * */
    components.CateringContent = React.createClass({
        mixins: [
            Reflux.connect(global.stores.resListStore,"data"),
            ReactRouter.Navigation
        ],
        changeResType:function(num){
            var divId = "#type" + this.state.data.resType;
            var id = "#type" + num;
            $(divId).css("color","#fff");
            $(id).css("color","#a6873e");
            pCaterActions.firstAction.changeResType(num);
            $('#searchInput').val('');
            $('#footer').show();
        },
        render:function(){
            return(
                <div className="content">
                    <div className="navigation">
                        {this.state.data.fenleiList.map(function(type,index){
                            var top = 90*index+"px";
                            var id="type" + type.tagId;
                            if(type.tagId == this.state.data.resType){
                                return(
                                    <div style={{top:top,color:"#a6873e"}} onClick={this.changeResType.bind(this,type.tagId)} id={id}>
                                        <p>{type.name}</p>
                                    </div>
                                )
                            }
                            else {
                                return(
                                    <div style={{top:top}} onClick={this.changeResType.bind(this,type.tagId)} id={id}>
                                        <p>{type.name}</p>
                                    </div>
                                )
                            }

                        }.bind(this))}
                    </div>
                    <components.RestaurantList />
                    <components.CateringFooter />
                </div>
            )
        }
    });
    /**
     * 美食首页
     * */
    components.CateringIndex = React.createClass({
        mixins: [
            Reflux.connect(global.stores.resListStore, 'cateringStore'),
            ReactRouter.Navigation,
            ReactRouter.State
        ],
        componentWillMount:function(){
            //pCaterActions.firstAction.initialType(this.getQuery().flag);
        },
        render: function(){
            return(
                <div>
                    <components.CateringHeader>
                    </components.CateringHeader>
                    <components.CateringContent></components.CateringContent>
                </div>
            )
        }

    });

    /**==================================================餐厅部分组件=======================================================**/

    /**饭店基本信息**/
    components.ResHeader = React.createClass({
        mixins:[
            Reflux.connect(stores.resStore,'data'),
            //Reflux.connect(stores.personalStore,'data1'),
        ],
        collectRestaurant:function(title,restId) {
            //if ($CONF_ARCY$.id == '') {
            //    toastr.error('你还没有登录，不能收藏');
            //} else {
            //    var userId = $CONF_ARCY$.id;
            //    if (title == '取消收藏') pCaterActions.personalAction.deleteCollectRestaurant(userId, restId);
            //    else if (title == '收藏') pCaterActions.personalAction.collectRestaurant(userId, restId);
            //}
        },
        render:function(){
            var data = this.state.data.restaurantInfo;
            var description = "";
            if(data.description){
                if(data.description.length>250) description = data.description.substring(0,250) +"...";
                else description = data.description;
            }

            //var flag = false;
            //var restId = data.id;
            //this.state.data1.collection.map(function(c){
            //    if(c.id == restId) flag = true;
            //});
            //if(flag) {
            //    var title = '取消收藏';
            //    $(".shoucang i").css("color","#EF725F");
            //} else{
            //    $(".shoucang i").css("color","#eee");
            //    title = '收藏';
            //}
            //for(var i=1;i<=data.stars;i++){
            //    var id="#star" + i;
            //    $(id).css("color","#ffc30c");
            //}
            return(
                <div className="header" style={{}}>
                    <img style={{height:"200px"}} src="/assets/images/catering/pc/resheader1.png" alt=""/>
                    {/*<div className="square"></div>*/}
                    <div className="resInformation">
                        <div className="resHeaderInfo" style={{width:"80%"}}>
                            <img src={data.pic} alt="" style={{float:"left"}}/>
                            <div className="resHeaderName" style={{width:"80%",marginLeft:"100px",}}>
                                <h1>{data.name}（地址：{data.address}）</h1>
                                {//<p style={{marginTop:"10px",marginLeft:"10px",fontSize:"1.1em"}}>
                                    //    <i id="star1" className="fa fa-star"></i><i id="star2" className="fa fa-star"></i><i id="star3" className="fa fa-star"></i>
                                    //    <i id="star4" className="fa fa-star"></i><i id="star5" className="fa fa-star"></i>
                                    //    <span style={{marginLeft:"5px"}}>月售{data.sales}单</span>
                                    //</p>
                                }
                                <p style={{marginTop:"10px",marginLeft:"10px",fontSize:"1.1em"}}>电话：{data.tel}</p>
                                <p style={{marginTop:"10px",marginLeft:"10px",fontSize:"1.1em"}}>描述：{description}</p>
                            </div>
                        </div>
                        {//<div className="resHeaderInfoTwo">
                            //    <div className="resHeaderBaseInfo" style={{left:"10%"}}>
                            //        <p>起送价</p>
                            //        <p>{data.basePrice}元</p>
                            //    </div>
                            //    <div className="resHeaderBaseInfo" style={{left:"30%"}}>
                            //        <p>配送费</p>
                            //        <p>{data.packFee}元</p>
                            //    </div>
                            //    <div className="resHeaderBaseInfo" style={{left:"50%"}}>
                            //        <p>平均送达时间</p>
                            //        <p>{data.duringTime}分钟</p>
                            //    </div>
                            //    <a className="shoucang" onClick={this.collectRestaurant.bind(this,title,restId)}>
                            //        <i className="fa fa-heart"></i>
                            //        <span style={{display:"block"}}>收藏</span>
                            //    </a>
                            //</div>
                        }
                    </div>
                </div>
            )
        }
    });
    /**面包屑**/
    components.FoodPaths = React.createClass({
        mixins:[
            Reflux.connect(stores.resListStore,'data1'),
            Reflux.connect(stores.resStore,'data2'),
            //Reflux.connect(stores.personalStore,'data3'),
            ReactRouter.Navigation,
        ],
        returnResList:function(num){
            this.transitionTo("/");
        },
        //collectRestaurant:function(title,restId) {
        //    if ($CONF_ARCY$.id == '') {
        //        toastr.error('你还没有登录，不能收藏');
        //    } else {
        //        var userId = $CONF_ARCY$.id;
        //        if (title == '取消收藏') pCaterActions.personalAction.deleteCollectRestaurant(userId, restId);
        //        else if (title == '收藏') pCaterActions.personalAction.collectRestaurant(userId, restId);
        //    }
        //},
        render:function(){
            //var flag = false;
            //var restId = this.state.data2.restaurantInfo.id;
            //this.state.data3.collection.map(function(c){
            //    if(c.id == restId) flag = true;
            //});
            //if(flag) {
            //    var src = "/assets/images/pc_personal/iconfont-shoucangyishoucang.png";
            //    var title = '取消收藏';
            //} else{
            //    src = "/assets/images/pc_personal/iconfont-shoucangweishoucang.png";
            //    title = '收藏';
            //}
            /*var num = this.state.data1.resType;
            var data1 = '全部';
            data1 =this.state.data1.fenleiList.map(function(f){
                if(f.tagId == num) return f.name
            });*/
            var resName = this.state.data2.restaurantInfo.name;
            return(
                <div className="bread">
                    <span onClick={this.returnResList.bind(this,0)}>美食</span>&nbsp;
                    <i className="fa fa-chevron-right"></i>&nbsp;
                    {/*<span onClick={this.returnResList.bind(this,num)}>{data1}</span>&nbsp;
                    <i className="fa fa-chevron-right"></i>&nbsp;*/}
                    <span style={{color:"#a6873b"}}>{resName}</span>
                    {//<img src={src} style={{float:'right'}} title={title} onClick={this.collectRestaurant.bind(this,title,restId)}/>
                    }
                </div>
            )
        }
    });

    /**食物列表**/
    components.FoodList = React.createClass({
        mixins:[Reflux.connect(global.stores.resStore,"data")],
        //buyFoods:function(food){
        //    var id="#buy"+food.id;
        //    $(id).css({display:"none"});
        //    var divId = "#div"+food.id;
        //    $(divId).css({display:"block"});
        //    pCaterActions.resAction.buyFood(food);
        //},
        //handlePlus:function(food){
        //    pCaterActions.resAction.buyFood(food);
        //},
        //hadleMinus:function(food){
        //    pCaterActions.resAction.minusFood(food);
        //},
        render:function(){
            //var foodList = JSON.parse(localStorage.foodCart).foodList;
            return(
                <div>
                    {this.state.data.foodListPage.map(function(food,index){
                        //var id="buy" + food.id;
                        //var divId ="div" + food.id;
                        //var num = 0;
                        //foodList.map(function(f){
                        //    if(food.id == f.id) {
                        //        num = f.num;
                        //    }
                        //});
                        //var shopDom = null;
                        //if(num > 0){
                        //    shopDom =
                        //        <div id={divId} className="shopped">
                        //            <img src="/assets/images/catering/pc/jiahao2.png" alt="" className="plusFood"
                        //                 onClick={this.handlePlus.bind(this,food)} />
                        //            <div className="buyNum">
                        //                <p>{num}</p>
                        //                <img src="/assets/images/catering/pc/jianhao.png" alt=""
                        //                     className="minusFood" onClick={this.hadleMinus.bind(this,food)}/>
                        //            </div>
                        //        </div>
                        //} else{
                        //    shopDom =
                        //        <img src="/assets/images/catering/pc/jiahao1.png" alt="" id={id}
                        //             className="jiahao" onClick={this.buyFoods.bind(this,food)}/>
                        //}
                        if(food.state == 1){
                            return(
                                <div>
                                    <div className="food">
                                        <img src={food.pic} alt="" className="foodImg"/>
                                        <div className="foodInfo">
                                            <p className="resName">{food.name}</p>
                                            <p className="foodMation">价格:
                                                &nbsp;<i className="fa fa-jpy"></i>&nbsp;{food.price}</p>
                                            {//<p className="foodMation">月销量:&nbsp;{food.sale}</p>
                                                }
                                            <p className="foodMation">描述:&nbsp;{food.description}</p>
                                        </div>
                                        {//{shopDom}
                                            }
                                    </div>
                                    <hr/>
                                </div>
                            )
                        }
                    }.bind(this))}
                </div>
            )
        }
    });
    /**食物分类导航**/
    components.ResContent = React.createClass({
        mixins:[Reflux.connect(global.stores.resStore,"data")],
        componentWillUpdate:function(){
            //pCaterActions.resAction.getPages();
            var pageNum = this.state.data.pageFoodNum;
            $.each(this.state.data.pageList,function(page){
                var id= "#foodPage"+page;
                if(page == pageNum) $(id).css("color","#a6873e");
                else $(id).css("color","#626262");
            });
        },
        changeFoodType:function(num){
            if(num == 0){
                $("#foodType0").css("color","#a6873e");
                $("#foodType"+this.state.data.foodType).css("color","#505050");
            }else{
                $("#foodType0").css("color","#505050");
                this.state.data.foodTypes.map(function(food){
                    if(food.id == num) $("#foodType"+food.id).css("color","#a6873e");
                    else $("#foodType"+food.id).css("color","#505050");
                });
            }
            var restId = this.state.data.restaurantInfo.id;
            pCaterActions.resAction.changeFoodType(restId,num);
        },
        changeFoodPage:function(page){
            var id="#foodPage"+page;
            var spanId = "#foodPage"+this.state.data.pageFoodNum;
            $(spanId).css("color","#626262");
            $(id).css("color","#a6873e");
            global.pCaterActions.resAction.changeFoodPage(page);
        },

        plusFoodPage:function(){
                var num =this.state.data.pageFoodNum+1;
                var id="#foodPage"+num;
                var spanId = "#foodPage"+this.state.data.pageFoodNum;
                $(spanId).css("color","#626262");
                $(id).css("color","#a6873e");
                global.pCaterActions.resAction.changeFoodPage(num);
        },
        minusFoodPage:function(){
            if(this.state.data.pageFoodNum >1){
                var num =this.state.data.pageFoodNum-1;
                var id="#foodPage"+num;
                var spanId = "#foodPage"+this.state.data.pageFoodNum;
                $(spanId).css("color","#626262");
                $(id).css("color","#a6873e");
                global.pCaterActions.resAction.changeFoodPage(num);
            }
        },

        render:function(){
            if(this.state.data.pageFoodNum == 1){
                var left= null;
            }else{
                left = <i className="fa fa-chevron-left" onClick={this.minusFoodPage}></i>;
            }
            var eachPage = this.state.data.eachPage;
            if (this.state.data.foodList.length%eachPage == 0){
                var max = parseInt(this.state.data.foodList.length/eachPage);
            }else{
                max = parseInt(this.state.data.foodList.length/eachPage+1);
            }
            if(this.state.data.pageFoodNum >= max){
                var right = null
            }else{
                right = <i className="fa fa-chevron-right" onClick={this.plusFoodPage}></i>;
            }
            var pageFoodNum = this.state.data.pageFoodNum-1;
            var pages = stores.resStore.pages;
            var footDom =
                $.map(this.state.data.pageList,function(page,index){
                    var pageId="foodPage" +page;
                    if(parseInt(pageFoodNum/pages) == parseInt((page-1)/pages)){
                        if(index == 0){
                            return(
                                <span onClick={this.changeFoodPage.bind(this,page)}
                                      style={{color:"#a6873e"}} id={pageId}>{page}&nbsp;&nbsp;</span>
                            )
                        }
                        else{
                            return(
                                <span onClick={this.changeFoodPage.bind(this,page)} id={pageId}>{page}&nbsp;&nbsp;</span>
                            )
                        }
                    }
                }.bind(this));
            return(
                <div className="content" style={{height:"1100px"}}>
                    <div className="navigation" style={{height:"1000px"}}>
                        <div style={{color:"#a6873e"}} onClick={this.changeFoodType.bind(this,0)} id="foodType0">
                            <p>全部</p>
                        </div>
                        {this.state.data.foodTypes.map(function(type,index){
                            var top = 90*(index+1)+"px";
                            var id="foodType" + type.id;
                            return(
                                <div style={{top:top}} onClick={this.changeFoodType.bind(this,type.id)} id={id}>
                                    <p>{type.tag}</p>
                                </div>
                            )
                        }.bind(this))}
                    </div>
                    <div className="resList">
                        <components.FoodPaths />
                        <components.FoodList />
                    </div>
                    <div className="caterFoot" style={{top:"1050px"}}>
                        {left}&nbsp;&nbsp;
                        {footDom}
                        {right}
                    </div>
                </div>
            )
        }
    });

    /**购物车**/
    components.ShoppingCart = React.createClass({
        mixins:[
            Reflux.connect(global.stores.resStore,"data"),
            ReactRouter.Navigation,
        ],
        toggleFood:function(){
            $("#foods").toggle('slow');
        },
        handleCartPlus:function(food){
            pCaterActions.resAction.handleCartPlus(food);
        },
        handleCartMinus:function(food){
            pCaterActions.resAction.handleCartMinus(food);
        },
        cleanCart:function(){
            pCaterActions.resAction.cartClean();
        },
        confirmOrder:function(){
            this.transitionTo("order");
        },
        render:function(){
            var moneyDom = null;
            var foodCart = JSON.parse(localStorage.foodCart);
            Debugger.log("ShoppingCart = "+JSON.stringify(foodCart));
            Debugger.log('money = '+foodCart.total);
            if(foodCart.count > 0){
                moneyDom =
                    <div className="cartShop">
                        <p>{foodCart.count}份&nbsp;<i className="fa fa-jpy">
                        </i>&nbsp;{foodCart.total.toFixed(2)}</p>
                    </div>
            }
            var payDom = null;
            var money = (foodCart.minPay -foodCart.total).toFixed(2);
            if(foodCart.count == 0){
                payDom =
                    <div className="pay" style={{width:"150px"}}>
                        <p>购物车是空的</p>
                    </div>
            }
            else if(money >0){
                payDom =
                    <div className="pay" style={{width:"150px"}}>
                        <p>差{money}元起送</p>
                    </div>
            }
            else{
                payDom =
                    <div className="pay" onClick={this.confirmOrder}>
                        <p>去下单</p>
                    </div>
            }
            var count = 0;
            var shopDom =
                $.map(foodCart.foodList, function(food,index){
                    //console.log("index: " + index);
                    if(food.num) var num=food.num;
                    else num = 0;
                    if(num >0){
                        count++;
                        var bottom = count*40 +"px";
                        var money = food.price * food.num;
                        return(
                            <div className="cartHeader" style={{bottom:bottom}}>
                                <p>{food.name}</p>
                                <div style={{float:"right",marginRight:"10px"}}>
                                    <img src="/assets/images/catering/pc/jianhao.png" alt=""
                                    onClick={this.handleCartMinus.bind(this,food)} style={{fontSize:"20px"}}/>
                                    <p>{food.num}</p>
                                    <img src="/assets/images/catering/pc/jiahao2.png" alt=""
                                         onClick={this.handleCartPlus.bind(this,food)} style={{fontSize:"20px"}}/>
                                    <i className="fa fa-jpy" style={{color:"#a6873e"}}></i>
                                    <p>{money.toFixed(2)}</p>
                                </div>
                            </div>
                        )
                    }
                }.bind(this));
            var length = foodCart.foodList.filter(function(food){
                if(food.num >0) return food
            }).length;
            var cartBottom = (length + 1)*40+"px";
            console.log("length aaaaaaaaaaaaaaaaaaa ===== " + length);
            return(
                <div>
                    <div id="foods">
                        <div className="cartHeader" style={{bottom:cartBottom}}>
                            <p>购物车</p>
                            <i onClick={this.cleanCart} className="fa fa-trash-o"></i>
                        </div>
                        {shopDom}
                    </div>
                    <div className="cart">
                        <div className="cartIcon" onClick={this.toggleFood}>
                            <i className="fa fa-shopping-cart"></i>
                        </div>
                        {moneyDom}
                        {payDom}
                    </div>
                </div>
            )
        }
    });


    components.CaterRestaurant = React.createClass({
        mixins:[
            Reflux.connect(global.stores.resStore,"data"),
            ReactRouter.Navigation,
        ],
        componentWillMount:function(){
            var resId = this.props.params.resId;
            //var rId = JSON.parse(localStorage.foodCart).restId;
            /*toastr.options.onclick=function(){
                Debugger.log("aaaaaaaaaaaaaa");
                alert(this.target.tagName);
            };*/
            //if(resId == rId || JSON.parse(localStorage.foodCart).count == 0){
                pCaterActions.resAction.fetchRestaurantInfo(resId);
                pCaterActions.resAction.fetchDishLeibieList(resId);
                pCaterActions.resAction.fetchDishList(resId,0);
            //}else{
                //var $toast = toastr.info("你当前购物车中有其他餐厅的食物，是否清空"+
                //    "<br/><br/>&nbsp;&nbsp;<span id='backRes' class='btn btn-default btn-sm'>返回原餐厅</span>&nbsp;&nbsp;"+
                //"<span id='cartClean' class='btn btn-success btn-sm'>确定清空</span>");
                //
                //// Wire up an event handler to a button in the toast, if it exists
                //if ($toast.find('#backRes').length){
                //    Debugger.log("backRes");
                //    $toast.delegate('#backRes', 'click', function(){
                //        this.transitionTo("/restaurant/"+rId);
                //        $toast.remove();
                //    }.bind(this));
                //};
                //if ($toast.find('#cartClean').length) {
                //    $toast.delegate('#cartClean', 'click', function () {
                //        pCaterActions.resAction.cartClean();
                //        pCaterActions.resAction.fetchRestaurantInfo(resId);
                //        pCaterActions.resAction.fetchDishLeibieList(resId);
                //        pCaterActions.resAction.fetchDishList(resId,0);
                //        $toast.remove();
                //    });
                //}
            //}

            /*if(resId == rId || JSON.parse(localStorage.foodCart).count == 0){
                pCaterActions.resAction.fetchRestaurantInfo(resId);
                pCaterActions.resAction.fetchDishLeibieList(resId);
                pCaterActions.resAction.fetchDishList(resId,0);
            }else if(confirm('当前购物车中有其他餐厅的食物，是否清空')){
                pCaterActions.resAction.cartClean();
                pCaterActions.resAction.fetchRestaurantInfo(resId);
                pCaterActions.resAction.fetchDishLeibieList(resId);
                pCaterActions.resAction.fetchDishList(resId,0);
            }else{
                this.transitionTo("/restaurant/"+rId);
            }*/
        },
        render:function(){
            return(
                <div>
                    <components.ResHeader />
                    <components.ResContent />
                    {//<components.ShoppingCart />
                    }
                </div>
            )
        }
    });


    components.Page404 = React.createClass({
        render:function() {
            return (
                <div className="Page404">
                    <h2 style={{margin: "2rem"}}>{"对不起，您访问的页面不存在(>﹏<)"}</h2>
                    <p><ReactRouter.Link to="/">点此返回主页</ReactRouter.Link></p>
                </div>
            );
        }
    });

    components.PageWaiting = React.createClass({
        render:function() {
            return (
                <div>
                    <components.CateringHeader>
                        <span>...</span>
                    </components.CateringHeader>

                    <div className="content">
                        <img src="/assets/images/pageindev.png" alt="页面正在建设中..." style={{width: '100%', marginTop: '100px'}}/>
                    </div>
                </div>

            );
        }
    });
}(window.React, window.ReactRouter, window.Reflux, window));