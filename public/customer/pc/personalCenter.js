/**
 * Created by heben on 2015/12/22.
 */


toastr.options={
    "positionClass": "toast-top-center",
    "hideDuration": "1000"
};


var RouteHandler = ReactRouter.RouteHandler;
var Link = ReactRouter.Link;

var auth = function(){};
auth.isLoggedIn = function(){
    console.log("isLoggedIn");
    return $CONF_ARCY$['id'] != "" && $CONF_ARCY$['uType'] == 3;
};
auth.logIn = function(transition){
      transition.retry();
};
var Personal = React.createClass({
    statics: {
        willTransitionTo: function () {
            if(!auth.isLoggedIn()){
                //transition.abort();
                location.href = "/customer/login?back=" + encodeURIComponent("/personal");
            }
        }
    },
    render: function () {
        if(!auth.isLoggedIn()){
            return null;
        }
        return (
            <div className="container" style={{textAlign:'left'}}>
                <div className="row">
                    <div className="col-md-2" style={{marginLeft:'-120px'}}>
                        <PersonalLeft />
                    </div>
                    <div className="col-md-10" style={{minHeight:'700px',marginTop:'30px'}}>
                        <RouteHandler />
                    </div>
                </div>
            </div>
        )
    }
});

var PersonalLeft = React.createClass({
    changeActive:function(i){
        $('#personal-left').children().children('li').map(function(index){
            if(i == index) $(this).removeClass('active');
            else $(this).addClass('active');
        });
    },
    render:function(){
        return(
            <div id="personal-left" style={{marginBottom:'50px'}}>
                <br />
                {/*<h3>我的资料</h3>
                <ul className="nav nav-pills nav-stacked">
                    <li role="presentation" onClick={this.changeActive.bind(this,0)}><Link to="message">个人信息</Link></li>
                    <li role="presentation" onClick={this.changeActive.bind(this,1)} className="active"><Link to="address" params={{type:0}}>地址管理</Link></li>
                </ul>
                <h3>我的国贸</h3>
                <ul className="nav nav-pills nav-stacked">
                    <li role="presentation" onClick={this.changeActive.bind(this,2)} className="active"><Link to="orderList">我的订单</Link></li>
                    <li role="presentation" onClick={this.changeActive.bind(this,3)} className="active"><Link to="collection">我的收藏</Link></li>
                    <li role="presentation" onClick={this.changeActive.bind(this,4)} className="active"><Link to="evaluate">我的评价</Link></li>
                    <li role="presentation" onClick={this.changeActive.bind(this,5)} className="active"><Link to="pintuan">我的拼团</Link></li>
                    {// <li role="presentation" onClick={this.changeActive.bind(this,6)} className="active"><Link to="integration">我的积分</Link></li>}
                </ul>*/}
                <h3>我的国贸</h3>
                <ul className="nav nav-pills nav-stacked">
                    <li role="presentation" onClick={this.changeActive.bind(this,0)}><Link to="message">个人信息</Link></li>
                    <li role="presentation" onClick={this.changeActive.bind(this,1)} className="active"><Link to="pinche">我的拼车</Link></li>
                    <li role="presentation" onClick={this.changeActive.bind(this,2)} className="active"><Link to="pintuan">我的拼团</Link></li>
                    <li role="presentation" onClick={this.changeActive.bind(this,3)} className="active"><Link to="mymessage">我的留言</Link></li>
                </ul>
            </div>
        )
    }
});


var OrderList = React.createClass({
    mixins:[
        Reflux.connect(stores.personalStore,'data'),
        ReactRouter.State,
        ReactRouter.Navigation,
    ],
    orderDetail:function(id){
        this.transitionTo("/personal/orderDetail/"+id);
    },
    orderEvaluate:function(orderId){
        this.transitionTo("/personal/evaluateOrder/"+orderId);
    },
    render:function(){
        return(
            <div id="orderList">
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <div className="panel-title">
                            <h5>
                                <span style={{width:'15%'}}>下单时间</span>
                                <span style={{width:'40%'}}>订单内容</span>
                                <span style={{width:'15%'}}>支付金额(元)</span>
                                <span style={{width:'15%'}}>状态</span>
                                <span style={{width:'15%'}}>操作</span>
                            </h5>
                        </div>
                    </div>
                    <div className="panel-body">
                            {
                                this.state.data.orderList.map(function(data){
                                    var orderDom = null,payType='';
                                    if(data.order.state >= 1){
                                        if(data.order.payType == 1){
                                            payType = '(在线支付)';
                                        }else{
                                            payType = '(货到付款)';
                                        }
                                    }
                                    if(data.order.state == -1){
                                        orderDom = <span>订单已取消</span>
                                    }else if(data.order.state == 0){
                                        orderDom = <span>未支付</span>
                                    }else if(data.order.state == 1){
                                        orderDom = <span>等待商家接单</span>
                                    }else if(data.order.state == 2){
                                        orderDom = <span>商家已接单</span>
                                    }else if(data.order.state == 3){
                                        orderDom = <span>订单已完成</span>
                                    }else if(data.order.state == 4){
                                        orderDom = <span>订单已完成<br/>
                                            <span className="btn btn-warning btn-sm"
                                                  onClick={this.orderEvaluate.bind(this,data.order.id)}>评价</span></span>
                                    }else if(data.order.state == 5){
                                        orderDom = <span>申请退款中</span>
                                    }else if(data.order.state == 6){
                                        orderDom = <span>退款成功</span>
                                    }else if(data.order.state == 7){
                                        orderDom = <span>退款失败</span>
                                    }else if(data.order.state == 8 ){
                                        orderDom = <span>申请退单中</span>
                                    }
                                    return(
                                        <li>
                                            <span style={{width:'15%'}}>{CaterUtil.timeFormat2(data.order.createTime)}</span>
                                            <span style={{width:'40%'}}>
                                                <img src={data.restaurant.pic} style={{height:'80px',marginRight:'70px'}}/>
                                                <b>{data.restaurant.name}</b>
                                                <p style={{marginLeft:'200px',marginTop:'-30px'}}>订单号:{data.order.id}</p>
                                            </span>
                                            <span style={{width:'15%'}}>￥{data.order.totalFee}
                                                {payType}</span>
                                            <span style={{width:'15%'}}>{orderDom}</span>
                                            <span style={{width:'15%'}}>
                                                <button className="btn btn-success btn-sm" onClick={this.orderDetail.bind(this,data.order.id)}>订单详情</button>
                                            </span>
                                            <hr />
                                        </li>
                                    )
                                }.bind(this))
                            }
                    </div>
                </div>
            </div>
        )
    }
});

var OrderDetail = React.createClass({
    mixins:[
        Reflux.connect(stores.orderDetailStore,'data'),
        Reflux.connect(stores.orderStore,'data2'),
        ReactRouter.State,
        ReactRouter.Navigation,
    ],
    componentWillMount:function(){
        var orderId = this.getParams().id;
        pCaterActions.orderAction.getDetail(orderId);
    },
    componentDidMount:function(){
        window.update=function(){
            stores.orderDetailStore.orderUpdate();
        };
        setInterval('update()',5*1000);
        //stores.orderDetailStore.orderUpdate();
    },
    handleAlipay:function(id){
        stores.orderStore.alipay(id);
    },
    handleRefund:function(data,data2){
        this.refs.refund.open();
        this.refs.refund.data = data;
        this.refs.refund.data2 = data2;
    },
    onConfirm:function(){
        var data = this.refs.refund.data;
        var data2 = this.refs.refund.data2;
        var sendData = {};
        sendData.tradeNo = data.tradeno;
        sendData.outTradeNo = data.id;
        sendData.state = data.state;
        sendData.reason = this.refs.refundReason.getDOMNode().value;
        sendData.remark = this.refs.refundRemark.getDOMNode().value;
        sendData.restId = data2.id;
        sendData.userId = data.userId;
        stores.personalStore.onCreateRefund(sendData);
        this.refs.refund.close();
    },
    confirmOrder:function(){   // 确认收货
        stores.orderDetailStore.confirmOrder();
    },
    cancelOrder:function(orderId){
        var sendData = {orderId:orderId,state:-1};  //取消订单
        pCaterActions.orderAction.cancelOrder(sendData);
    },
    refundOrder:function(orderId){
        var sendData = {orderId:orderId,state:8};  //货到付款的申请退单
        pCaterActions.orderAction.refundOrder(sendData);
    },
    goEvaluate:function(id){
        this.transitionTo("/personal/evaluateOrder/"+id);
    },
    render:function(){
        //var foodCart = JSON.parse(localStorage.foodCart);
        //var address = this.state.data2.address;
        var orderState = this.state.data.orderState;
        var res = this.state.data.res;
        var food = this.state.data.foods;
        var user = this.state.data.user;
        var foodCart = this.state.data.restaurant;
        var address = this.state.data.order;
        var dataState = [
            {state:1,name:'订单已提交',url:"/assets/images/pc_personal/iconfont-dingdan.png"},
            {state:0,name:'等待支付',url:"/assets/images/pc_personal/iconfont-zhifu.png"},
            {state:0,name:'等待商户接单',url:"/assets/images/pc_personal/iconfont-jiedanguanli.png"},
            {state:0,name:'等待送达',url:"/assets/images/pc_personal/iconfont-yiwancheng.png"}
        ];
        Debugger.log(JSON.stringify(address));
        var button1 = null,button2 = null;
        switch (address.state){
            case -1:
                dataState = [];
                button1 = <span style={{float:'right'}}>订单已取消</span>;
                break;
            case 0:
                button1 = <span className="btn btn-success btn-sm" style={{float:'right'}}
                                onClick={this.handleAlipay.bind(this,address.id)}>
                去支付</span>;
                break;
            case 1:
                if(address.payType == 1){
                    dataState[1].state = 1;
                    dataState[1].name = '已支付';
                }else if(address.payType == 0){
                    dataState.pop();
                    dataState[1].state = 0;
                    dataState[1].name = '等待商户接单';
                    dataState[2].state = 0;
                    dataState[2].name = '等待送达';
                    button1 = <span className="btn btn-success btn-sm" style={{float:'right'}}
                                    onClick={this.cancelOrder.bind(this,address.id)}>
                    取消订单</span>;
                }
                break;
            case 2:
                if(address.payType == 1){
                    dataState[1].state = 1;
                    dataState[1].name = '已支付';
                    dataState[2].state = 1;
                    dataState[2].name = '商户已接单';
                }else if(address.payType == 0){
                    dataState.pop();
                    dataState[1].state = 1;
                    dataState[1].name = '商户已接单';
                    dataState[2].state = 0;
                    dataState[2].name = '等待送达';
                }
                if(address.alipayState == 2 && address.state == 1){
                    button1 =
                        <span className="btn btn-success btn-sm" style={{float:'right'}}
                              onClick={this.handleRefund.bind(this,address,foodCart)}>申请退款</span>;
                }else if(address.payType == 0){
                    button1 = <span className="btn btn-success btn-sm" style={{float:'right'}}
                                    onClick={this.refundOrder.bind(this,address.id)}>申请退单</span>;
                }
                    button2 = <span className="btn btn-sm btn-primary" style={{float:'right'}}
                                    onClick={this.confirmOrder}>
                确认收货</span>;
                break;
            case 3:
                if(address.payType == 1){
                    dataState[1].state = 1;
                    dataState[1].name = '已支付';
                    dataState[2].state = 1;
                    dataState[2].name = '商户已接单';
                    dataState[3].state = 1;
                    dataState[3].name = '已完成';
                }else if(address.payType == 0){
                    dataState.pop();
                    dataState[1].state = 1;
                    dataState[1].name = '商户已接单';
                    dataState[2].state = 1;
                    dataState[2].name = '已完成';
                }
                button1 = null;
                button2 = null;
                break;
            case 4:
                if(address.payType == 1){
                    dataState[1].state = 1;
                    dataState[1].name = '已支付';
                    dataState[2].state = 1;
                    dataState[2].name = '商户已接单';
                    dataState[3].state = 1;
                    dataState[3].name = '已完成';
                }else if(address.payType == 0){
                    dataState.pop();
                    dataState[1].state = 1;
                    dataState[1].name = '商户已接单';
                    dataState[2].state = 1;
                    dataState[2].name = '已完成';
                }
                button1 = <span className="btn btn-success btn-sm"
                                onClick = {this.goEvaluate.bind(this,this.state.data.order.id)} style={{float:'right'}}>评价</span>;
                break;
            case 5:
                dataState[1].state = 1;
                dataState[1].name = '支付成功';
                dataState[2].state = 0;
                dataState[2].name = '申请退款中';
                dataState.pop();
                button1 = null;
                break;
            case 6:
                dataState[1].state = 1;
                dataState[1].name = '支付成功';
                dataState[2].state = 1;
                dataState[2].name = '已退款';
                dataState.pop();
                button1 = null;
                break;
            case 7:
                dataState[1].state = 1;
                dataState[1].name = '支付成功';
                dataState[2].state = 1;
                dataState[2].name = '退款失败';
                dataState.pop();
                button1 = null;
                break;
            case 8:
                if(address.payType == 0){
                    dataState.pop();
                    dataState[1].state = 1;
                    dataState[1].name = '商户已接单';
                    dataState[2].state = 0;
                    dataState[2].name = '申请退单中';
                }
                break;
        }
        Debugger.log(JSON.stringify(dataState));
        if(dataState.length == 4){
            var span = <div className="col-md-12">
                <h5>
                    <span style={{marginLeft: '50px'}}>{dataState[0].name}</span>
                    <span style={{marginLeft: '30px'}}>{dataState[1].name}</span>
                    <span style={{marginLeft: '5px'}}>{dataState[2].name}</span>
                    <span style={{marginLeft: '20px'}}>{dataState[3].name}</span>
                </h5>
                <br/>
            </div>
        }else if(dataState.length == 3){
            span = <div className="col-md-12">
                <h5>
                    <span style={{marginLeft: '50px'}}>{dataState[0].name}</span>
                    <span style={{marginLeft: '30px'}}>{dataState[1].name}</span>
                    <span style={{marginLeft: '5px'}}>{dataState[2].name}</span>
                </h5>
                <br/>
            </div>
        }else{
            span = null;
        }
        if(dataState.length){
            var content =
                <div>
                    { dataState.map(function (data, index) {
                        //js报错后，页面就不会再渲染，而是停留在之前的状态。
                        //Debugger.log("index ="+index+"  state =  "+data.state);
                        if (index == 0) {
                            return (
                                <div>
                                    <div className="col-md-1 col-md-offset-1" title={"orderState"+data.state}>
                                        <img src={data.url}/>
                                    </div>
                                    <div className="col-md-2">
                                        <hr/>
                                    </div>
                                </div>
                            )
                        } else if ((index + 1) == dataState.length) {
                            return (
                                <div>
                                    <div className="col-md-1" title={"orderState"+data.state}>
                                        <img src={data.url}/>
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <div>
                                    <div className="col-md-1" title={"orderState"+data.state}>
                                        <img src={data.url}/>
                                    </div>
                                    <div className="col-md-2">
                                        <hr/>
                                    </div>
                                </div>
                            )
                        }
                    })
                    }
                    {span}
                </div>
        }else{
            content =
                <div className="col-md-10" style={{marginLeft:'20px'}}>
                    <div className="panel panel-warning">
                        <div className="panel-heading">
                            <div className="panel-title">
                                订单已取消
                            </div>
                        </div>
                    </div>
                </div>
        }
        if(address.payType == 1){
            var payType = '在线支付';
        }else{
            payType = '货到付款';
        }
        return(
            <div id="orderDetail">
                <h4>订单详情</h4>
                <hr />
                <div className="row">
                    {content}
                    <div className="col-md-10" style={{marginLeft:'20px'}}>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <div className="panel-title">
                                {foodCart.name}
                                <span style={{marginLeft:'25px'}}>订单编号：{address.id}</span>
                                {button1}
                                {button2}
                            </div>
                        </div>
                        <div className="panel-body">
                            <div className="row" id="order" style={{marginBottom:'30px'}}>
                                <div className="col-md-5" style={{border:'1px solid rgb(240,240,240)'}}>
                                    <h4 style={{fontWeight:'bold'}}>
                                        <span>菜品</span>
                                        <span style={{float:'right'}}>价格/数量</span>
                                    </h4>
                                    <hr/>
                                    {
                                        this.state.data.foods.map(function(dish){
                                            return(
                                                <div>
                                                    <li>
                                                        <span>{dish.dishName}</span>
                                                        <span style={{float:'right'}}>￥{dish.price} / {dish.number}</span>
                                                    </li>
                                                    <hr/>
                                                </div>
                                            )
                                        })
                                    }
                                    <div>
                                        <li>
                                            <span>配送费：</span>
                                            <span style={{float:'right'}}>￥{address.packFee}</span>
                                        </li>
                                        <hr/>
                                    </div>
                                    <h4>
                                        <span>合计</span>
                                        <span style={{float:'right',color:'rgb(247,67,66)'}}>￥{address.totalFee}</span>
                                    </h4>
                                </div>
                                <div className="col-md-6 col-md-offset-1" style={{border:'1px solid rgb(240,240,240)'}}>
                                    <h4 style={{fontWeight:'bold'}}>送餐详情</h4>
                                    <hr />
                                    <div>
                                        <p style={{marginTop:'10px'}}>
                                            <span>联系人：{address.userName}</span>
                                        </p>
                                        <p><span>电话：{address.tel}</span></p>
                                        <p>
                                            收货地址： {address.address}
                                        </p>
                                    </div>
                                    <br/>
                                    <p>付款方式：{payType}</p>
                                    <p>下单时间：{CaterUtil.timeFormat(address.createTime)}</p>
                                    {/*<p>送达时间：{address.arriveTime}</p>*/}
                                    <p>给商家留言：{address.remark}</p>
                                </div>
                            </div>
                            </div>
                    </div>
                    </div>
                </div>
                <BootstrapModalPC ref="refund" title='申请退款页面' onConfirm={this.onConfirm}
                    data={0} data2={1}>
                    <form className="form-horizontal" style={{marginLeft:'10px'}}>
                        {/*<div className="form-group">
                            <label for="inputEmail2" className="col-md-3 control-label">退款原因：</label>
                            <div className="col-md-9">
                                <input ref="refundReason" type="text" className="form-control" id="inputEmail2" placeholder="请输入退款原因" />
                            </div>
                        </div>*/}
                        <label className="col-md-3 control-label">退款原因：</label>
                        <select ref="refundReason" style={{display:'inline',marginBottom:'20px',maxWidth:'300px'}} className="form-control">
                            <option>送餐速度太慢了</option>
                            <option>点错菜了</option>
                            <option>我就是要退款</option>
                        </select>
                        <div className="form-group">
                            <label for="inputEmail1" className="col-md-3 control-label">备注：</label>
                            <div className="col-md-9">
                                <input ref="refundRemark" type="text" className="form-control" id="inputEmail1" placeholder="请输入备注信息" />
                            </div>
                        </div>
                    </form>
                </BootstrapModalPC>
            </div>
        )
    }
});

var Evaluate = React.createClass({
    mixins:[
        Reflux.connect(stores.orderEvaluateStore,'data'),
        ReactRouter.State,
        ReactRouter.Navigation,
    ],
    componentWillMount:function(){
        var orderId = this.getParams().orderId;
        pCaterActions.orderEvaluateAction.getDetail(orderId);
    },

    lightStar:function(num,flag){
        if(this.state.data.resNum[flag]<1){
            var star = this.state.data.listId[flag];
            var color = this.state.data.colorList[num-1];
            for(var i=1;i<=num;i++){
                var id="#"+star + i;
                $(id).css("color",color);
            }
            for(var j=num+1;j<6;j++){
                var idt="#"+star + j;
                $(idt).css("color","#ccc");
            }
        }
    },
    offStar:function(num,flag){
        if(this.state.data.resNum[flag] <1){
            var star = this.state.data.listId[flag];
            for(var i=1;i<6;i++){
                var id="#"+star + i;
                $(id).css("color","#ccc");
            }
        }
    },
    clickStar:function(num,flag){
        var star = this.state.data.listId[flag];
        var color = this.state.data.colorList[num-1];
        for(var i=1;i<=num;i++){
            var id="#"+star + i;
            $(id).css("color",color);
        }
        for(var m=parseInt(num)+1;m<6;m++){
            var idt="#"+star + m;
            $(idt).css("color","#ccc");
        }
        pCaterActions.orderEvaluateAction.changeResNum(num,flag);
    },
    submitEvaluation:function(){
        var suggest = $("#suggest").val();
        if(this.state.data.resNum[0] ==0) toastr.info("请对商家服务打分");
        else if(this.state.data.resNum[1] ==0) toastr.info("请选择送达时间");
        else if(this.state.data.resNum.indexOf(0) >0) toastr.info("请对菜品评价");
        else pCaterActions.orderEvaluateAction.submitEvaluation(suggest);
    },
    render:function(){
        var order = this.state.data.order;
        var restaurant = this.state.data.restaurant;
        var foods = this.state.data.foods;
        var resNum =this.state.data.resNum;
        var words = this.state.data.words;
        var timeList = this.state.data.timeList;
        var colorList = this.state.data.colorList;
        var foodTitle = "";
        $.map(foods,function(food,index){
            if(index==0) foodTitle = foodTitle +food.dishName;
            else foodTitle = foodTitle +"/" +food.dishName;
        }.bind(this));
        var resDom =
            $.map(this.state.data.listNumber,function(num){
                var id ="res"+num;
                    return(
                        <i className="fa fa-star" id={id} onMouseEnter={this.lightStar.bind(this,num,0)}
                           onMouseLeave={this.offStar.bind(this,num,0)}  onClick={this.clickStar.bind(this,num,0)}></i>
                    )
            }.bind(this));
        var timeDom =
            $.map(this.state.data.listNumber,function(num){
                var id ="time"+num;
                return(
                    <i className="fa fa-star" id={id} onMouseEnter={this.lightStar.bind(this,num,1)}
                       onMouseLeave={this.offStar.bind(this,num,1)}  onClick={this.clickStar.bind(this,num,1)}></i>
                )
            }.bind(this));
        var dishDom =
            $.map(this.state.data.foods,function(food,index){
                var dis = "";
                var mLeft ="";
                if(index==0) {dis = "inline";mLeft="0"}
                else {dis ="block";mLeft = "133px"}
                return(
                    <div style={{display:dis,marginLeft:mLeft}}>
                        <p style={{display:"inline"}}>{food.dishName}</p>
                        <div style={{display:"inline"}}>
                            {this.state.data.listNumber.map(function(num){
                                var id= food.id+num;
                                return(
                                    <i style={{marginLeft:"10px",color:"#ccc"}} className="fa fa-star" id={id} onMouseEnter={this.lightStar.bind(this,num,index+2)}
                                       onMouseLeave={this.offStar.bind(this,num,index+2)}  onClick={this.clickStar.bind(this,num,index+2)}></i>
                                )
                            }.bind(this))
                            }
                        </div>
                        <p  style={{color:colorList[resNum[index+2]-1],display:"inline"}}>{words[resNum[index+2]]}</p>
                    </div>
                )
            }.bind(this));
        return(
            <div className="restList" style={{top:'0'}}>
                <h4>订单号：{order.id}</h4>
                <hr style={{marginTop:0,marginBottom:"10px"}}/>
                <div className="evaluateRes">
                    <img src={restaurant.pic} alt=""/>
                    <span className="evaluateResName">{restaurant.name}</span>
                    <span className="evaluateResFood">{foodTitle}共{foods.length}个菜品</span>
                    <span className="orderTime">下单时间：{order.createTime}</span>
                </div>
                <div className="evaluateDiv">
                    <p className="evaluateName">商家服务</p>
                    <div className="starDiv">
                        {resDom}
                    </div>
                    <p className="starBehind" style={{color:colorList[resNum[0]-1]}}>{words[resNum[0]]}</p>
                </div>
                <div className="evaluateDiv">
                    <p className="evaluateName">送餐速度</p>
                    <div className="starDiv">
                        {timeDom}
                    </div>
                    <p className="starBehind" style={{color:colorList[resNum[1]-1]}}>{timeList[resNum[1]]}</p>
                </div>
                <div style={{width:"100%",marginTop:"20px"}}>
                <p className="evaluateName" style={{display:"inline"}}>评价菜品</p>
                    <div style={{display:"inline",width:"500px",fontSize:"18px",marginLeft:"60px"}}>
                        {dishDom}
                    </div>
                </div>
                <div className="col-md-6" style={{padding:0}}>
                    <div className="panel panel-default">
                        <div className="panel-heading">您的建议</div>
                        <div className="panel-body">
                            <textarea name="" id="suggest" cols="60" rows="4" placeholder="请提供您的宝贵意见"></textarea>
                        </div>
                    </div>
                </div>
                <button type="button" style={{marginTop:"125px",marginLeft:"10%"}}
                onClick={this.submitEvaluation} className="btn btn-default">提交评价</button>
            </div>
        )
    }
});


function isAllowedPic(type, size){
    Debugger.log(type + "," + size);
    var picTypes = { "image/jpeg": "", "image/jpg" : "", "image/png": "", "image/bmp": "", "image/gif": ""};
    return type.toLowerCase() in picTypes && size < 1024 * 1024; //pic size limited 1M
}


var PersonalMessage = React.createClass({
    mixins:[
        Reflux.connect(stores.personalStore,'data'),
        ReactRouter.State,
        ReactRouter.Navigation,
    ],
    componentDidMount:function(){
        stores.personalStore.getUserMessage();
    },
    handleUserPicChange:function(e){
        console.log(e);
        e.preventDefault();
        var mobile = this.state.data.user.mobile;
        var files = $('#userPic')[0].files;
        var formData = new FormData();
        formData.append('imgFile', files[0]);
        if(files.length > 0){
            if(isAllowedPic(files[0].type, files[0].size)){
                Debugger.log("upload file with formData");
                var url = "/admin/user/pic";

                var success = function(res){
                    console.log(res);
                    if(res.errcode == 0){
                        toastr.options = {
                            "positionClass": "toast-top-center",
                            "hideDuration": "10000",
                        };
                        var msg = '<div><button type="button" id="cancelBtn" class="btn btn-primary">取消</button>' +
                            '<button type="button" id="sureBtn" class="btn" style="margin: 0 8px 0 8px">更换</button></div>';
                        var $toast = toastr.warning(msg, "是否更换头像？");
                        if ($toast.find('#cancelBtn').length) {
                            $toast.delegate('#cancelBtn', 'click', function () {
                                $toast.remove();
                            });
                        }
                        if ($toast.find('#sureBtn').length) {
                            $toast.delegate('#sureBtn', 'click', function () {
                                var url = "/user/modifyUserInfo?userId="+$CONF$.id+"&headImg="+res.url+ "&tel="+mobile;
                                var successFunc = function(result){
                                    toastr.success("修改成功！");
                                    $('#userImage').attr("src", res.url);
                                }.bind(this);
                                ajaxGet(url,successFunc);
                            });
                        }

                    } else{
                        toastr.error(res.errmsg);
                    }

                }.bind(this);

                $.ajax({
                    url: url,
                    type: 'POST',
                    data: formData,
                    processData: false,//用来回避jquery对formdata的默认序列化，XMLHttpRequest会对其进行正确处理
                    contentType: false,//设为false才会获得正确的conten-Type
                    async: true,
                    success: success,
                    error: function(xhr,status,err){
                        console.log(xhr,status,err.toString());
                        toastr.error(err);
                    }

                });
            }
            else{
                toastr.warning("请选择大小在1M以内的图片文件!!");
            }
        }
    },
    render: function () {
        var user = this.state.data.user;
        return (
            <div className="">
                <div className="row">
                    <div id="personalMessage-header" className="col-md-5 col-md-offset-1" style={{marginTop:'30px'}}>
                        <li style={{paddingTop:'5px'}}>
                            <span className="symbol">头像</span>
                            <div className="form-group" style={{position:"relative",float:"right"}}>
                                {//<label for="userPic">图片({"<"}1M)</label>
                                }
                                <input type="file" id="userPic"  onChange={this.handleUserPicChange}/>
                                <img id="userImage" src={user.headImg} style={{height:'50px',position:"absolute",top:-15,right:0}} alt=""/>
                            </div>
                            <hr/>
                        </li>
                        <li>
                            <span className="symbol">用户名</span>
                            <span style={{marginLeft:'50px'}}>{user.nickName}</span>
                            <Link to="edit" query={{title:"修改用户名",type:'text',content:[user.nickName],tag:'username'}}>
                                <span className="message btn btn-success btn-sm">编辑</span>
                            </Link>
                            <hr/>
                        </li>
                        <li>
                                <span className="symbol">
                                    <i className="fa fa-user fa-lg" style={{marginRight:'10px'}}>
                                    </i>修改密码</span>
                            <span style={{marginLeft:'50px'}}>********</span>
                            <Link to="edit" query={{title:"修改密码",type:'password',content:['请输入原来的密码',"请输入新密码",'请确认密码'],tag:'password'}}>
                                <span className="message btn btn-success btn-sm">修改</span>
                            </Link>
                            <hr/>
                        </li>
                        <li>
                            <span className="symbol">
                                    <i className="fa fa-mobile-phone fa-lg" style={{marginRight:'10px'}}>
                                    </i>手机</span>
                            <span style={{marginLeft:'50px'}}>{user.mobile.slice(0,3)+"****"+user.mobile.slice(7,11)}</span>
                            {/*<Link to="edit" query={{title:"绑定手机",content:['请输入手机号'],tag:'phone'}}>
                             <span className="message btn btn-success btn-sm">修改</span>
                             </Link>*/}
                            <hr/>
                        </li>
                        <li>
                                <span className="symbol">
                                    <img style={{marginLeft:'10px',height:'20px',position:'relative'}} src="/assets/images/pc_personal/iconfont-jifen.png"  />
                                    积分</span>
                            <span style={{marginLeft:'50px',fontSize:'20px',color:'#ea8010'}}>{user.bonus}</span>
                        </li>
                    </div>
                    <BootstrapModalMobile ref="header" title="修改头像">
                        <h4>相册</h4>
                        <hr/>
                        <h4>拍照</h4>
                    </BootstrapModalMobile>
                </div>
            </div>
        )
    }
});

var EditInputBox=React.createClass({
    mixins:[
        Reflux.connect(stores.personalStore,'data'),
        ReactRouter.State
    ],
    onConfirm:function(){
        var tag = this.getQuery().tag;
        var user = this.state.data.user;
        var sendData={userId:user.id,password:'',name:user.nickName,headImg:user.headImg,phone:user.mobile};
        if(tag == "username"){
            sendData.name = this.refs.input0.getDOMNode().value;
            if(sendData.name == ''){
                toastr.warning('用户名不能为空');
            }else{
                history.back();
                pCaterActions.personalAction.modifyUserNickName(sendData.name);
            }
        }else if(tag == "password"){
            var p0 = this.refs.input0.getDOMNode().value;
            var p1 = this.refs.input1.getDOMNode().value;
            var p2 = this.refs.input2.getDOMNode().value;
             if(p1 != p2){
                toastr.warning('两次输入新密码不一致');
            }else if(p1.length < 8){
                 toastr.warning('密码太过简单');
            }else if(p1 == p2){
                sendData.oldpwd = p0;
                 sendData.newpwd = p1;
                 pCaterActions.personalAction.changePassword(sendData);
                 history.back();
            }
        }else if(tag == 'phone'){
            /* $(this.refs.input0.getDOMNode()).after('<div className="input-group-addon">获取验证码</div>');
             $(this.refs.input0.getDOMNode()).next(
             "<input style='height:40px;margin-top:10px' className='form-control placeholder='请输入验证码' />");*/
            sendData.phone = this.refs.input0.getDOMNode().value;
        }else if(tag == 'suggest'){

        }
        //pCaterActions.personalAction.changePersonalMessage(sendData);
    },
    cancel:function(){
        history.back();
    },
    render:function(){
        //var old =  this.getQuery().old?this.getQuery().old:'请输入';
        var type = this.getQuery().type;
        var title = this.getQuery().title;
        var contents =  this.getQuery().content;
        var backgroundColor = this.getQuery().backgroundColor?this.getQuery().backgroundColor:"rgb(201,186,131)";
        var width = this.getQuery().width?this.getQuery().width:"30%";
        var buttonContent = this.getQuery().buttonContent?this.getQuery().buttonContent:"确定";
        return(
            <div>
                <h4>{title}</h4>
                <br/>
                <div>
                    {
                        contents.map(function(content,index){
                            return(
                                <input ref={"input"+index} type={type} style={{height:'40px',marginTop:'10px',maxWidth:'300px'}} className="form-control"
                                       placeholder={content} />
                            )
                        })
                    }
                </div>
                <br/>
                <span className='btn btn-primary' onClick={this.onConfirm}>确定</span>
                <span className='btn btn-default' onClick={this.cancel}>取消</span>
            </div>
        )
    }
});


var AddressBox = React.createClass({
    mixins:[
        Reflux.connect(stores.personalStore,'data'),
        ReactRouter.State,
        ReactRouter.Navigation,
    ],
    addAddress:function(tag){
        if(tag == 1){  //新增地址
            $('.address2').removeClass('hide');
            $('.address1').addClass('hide');
            React.findDOMNode(this.refs.name).value = '';
            React.findDOMNode(this.refs.phone).value = '';
            React.findDOMNode(this.refs.address1).value = '';
        }else if(tag == 2){  //编辑地址
            $('.address1').removeClass('hide');
            $('.address2').addClass('hide');
        }
    },
    onConfirm:function(){
        var sendData = {};
        var name = React.findDOMNode(this.refs.name).value;
        var sex = parseInt($('input:radio:checked').val());
        var phone = React.findDOMNode(this.refs.phone).value;
        var address = React.findDOMNode(this.refs.address1).value;
        if(name == ''){
            toastr.warning('请输入用户名');
        }else if(!sex && sex!=0){
            toastr.warning('请选择性别');
        }else if(address == ''){
            toastr.warning('请输入收货地址');
        }else if(phone.length == 11){
            if(this.refs.button.tag){
                sendData = {name:name,sex:sex,phone:phone,address:address,id:this.refs.button.tag};
                pCaterActions.personalAction.editAddress(sendData);
            }else{
                sendData = {name:name,sex:sex,phone:phone,address:address,userId:this.state.data.user.id};
                pCaterActions.personalAction.addAddress(sendData);
            }
            this.refs.button.tag = 0;
            $('.address2').addClass('hide');
            $('.address1').removeClass('hide');
        }else{
            toastr.warning('请输入正确的手机号');
        }
    },
    cancel:function(){
        $('.address2').addClass('hide');
        $('.address1').removeClass('hide');
    },
    deleteAddress:function(data){
        pCaterActions.personalAction.deleteAddress(data);
    },
    editAddress:function(data){
        $('.address2').removeClass('hide');
        $('.address1').addClass('hide');
        React.findDOMNode(this.refs.name).value = data.name;
        var sex = data.sex;
        $('input:radio').map(function(){
            this.removeAttribute('checked');
            if($(this).val() == sex) {
                $(this).attr('checked','true');
                //this.setAttribute('checked','true');
            }
        });
        React.findDOMNode(this.refs.phone).value = data.tel;
        React.findDOMNode(this.refs.address1).value = data.address;
        this.refs.button.tag = data.id;
    },
    chooseAddress:function(data){
        //Debugger.log("data = "+JSON.stringify(data));
        stores.orderConfirmStore.chooseAddress(data);
        this.transitionTo('/orderConfirm');
    },
    render:function(){
        var type = this.getParams().type;
        if(type == 0){
            var addressBox =
                <div className="col-md-6 address1">
                    <h4><b>收货地址</b></h4>
                    <div id="addAddress" style={{background:'#ffffff',marginTop:'10px',height:'40px'}}>
                        <p style={{fontWeight:'bold',cursor:'pointer',paddingTop:'10px',marginLeft:'15px',color:'#6DBB4A'}} onClick={this.addAddress.bind(this,1)}>
                            <i className="fa fa-plus-circle fa-lg" style={{marginRight:'10px'}}></i>
                            新增收货地址</p>
                    </div>
                    <hr />
                    <div id="addressList" style={{background:'#ffffff',marginTop:'10px'}}>
                        {
                            this.state.data.addressData.map(function(data,index){
                                if(index == 0){
                                    var pd = '10px';
                                }else{
                                    pd = '0px';
                                }
                                if(data.sex == 0){
                                    var sex = '先生';
                                }else if(data.sex == 1){
                                    sex = '女士';
                                }
                                return(
                                    <div>
                                        <div className="address" style={{marginLeft:'15px',paddingTop:pd}}>
                                            <p>
                                                <span>{data.name}</span>
                                                <span style={{marginLeft:'15px'}}>{sex}</span>
                                                <span style={{marginLeft:'30px'}}>{data.tel}</span>
                                                <span style={{float:'right',background:'#EC6459'}}
                                                      onClick={this.deleteAddress.bind(this,data)} className="btn btn-sm">
                                                    <i style={{color:'#FFFFFF'}} className="fa fa-trash-o"></i>
                                                </span>
                                                <span style={{float:'right',background:'#4ACAC0'}} className="btn btn-sm"
                                                      onClick={this.editAddress.bind(this,data)}>
                                                    <i style={{color:'#FFFFFF'}} className="fa fa-pencil"></i>
                                                </span>
                                            </p>
                                            <p style={{color:'rgb(181,181,181)'}}>
                                                {data.address}
                                            </p>
                                        </div>
                                        <hr />
                                    </div>
                                )
                            }.bind(this))
                        }
                    </div>
                </div>
        }else if(type == 1){
            addressBox =
                <div className="address1" style={{marginTop:'-50px'}}>
                    <div className="header">
                        <div className="back">
                            <a>
                                <img src="/assets/images/back.png" alt="返回" onClick={function(){history.back();}}/>
                            </a>
                        </div>
                        <div className="title">
                            选择收货地址
                        </div>
                    </div>
                    <div id="addressList" style={{background:'#ffffff',marginTop:'10px'}}>
                        {
                            this.state.data.addressData.map(function(data,index){
                                if(index == 0){
                                    var pd = '10px';
                                }else{
                                    pd = '0px';
                                }
                                if(data.sex == 0){
                                    var sex = '先生';
                                }else if(data.sex == 1){
                                    sex = '女士';
                                }
                                return(
                                    <div onClick={this.chooseAddress.bind(this,data)}>
                                        <div className="address" style={{marginLeft:'15px',paddingTop:pd}}>
                                            <p>
                                                <span>{data.name}</span>
                                                <span style={{marginLeft:'15px'}}>{sex}</span>
                                                <span style={{marginLeft:'30px'}}>{data.tel}</span>
                                                <div className="dropdown" style={{marginTop:'-15px',float:'right'}}>
                                                <span style={{fontSize:'20px'}} className="glyphicon glyphicon-option-vertical dropdown-toggle" type="button"
                                                      id="dropdownMenu1"
                                                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                                </span>
                                                    <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
                                                        <li onClick={this.editAddress.bind(this,data)}><a>编辑</a></li>
                                                        <li role="separator" className="divider"></li>
                                                        <li onClick={this.deleteAddress.bind(this,data)}><a>删除</a></li>
                                                    </ul>
                                                </div>
                                            </p>
                                            <p style={{color:'rgb(181,181,181)'}}>
                                                {data.address}
                                            </p>
                                        </div>
                                        <hr />
                                    </div>
                                )
                            }.bind(this))
                        }
                    </div>
                </div>
        }
        return(
            <div id="col-md-row personal-address">
                {addressBox}
                <div className="col-md-6 address2 hide">
                    <h4>新增地址</h4>
                    <div className="connectPerson" style={{background:'#ffffff',marginTop:'10px'}}>
                        <form className="form-horizontal" style={{marginLeft:'10px'}}>
                            <div className="form-group" style={{paddingTop:'10px'}}>
                                <label for="inputEmail1" className="col-xs-2 control-label">姓名:</label>
                                <div className="col-xs-10">
                                    <input ref="name" style={{border:'0'}} type="text" className="form-control" id="inputEmail1" placeholder="请填写收货人姓名" />
                                </div>
                            </div>
                            <hr />
                            <div className="form-group">
                                <div className="col-xs-10 col-xs-offset-2">
                                    <label className="radio-inline">
                                        <input type="radio" name="inlineRadioOptions" value={0}/>先生
                                    </label>
                                    <label className="radio-inline">
                                        <input type="radio" name="inlineRadioOptions" value={1}/>女士
                                    </label>
                                </div>
                            </div>
                            <hr />
                            <div className="form-group">
                                <label for="inputEmail2" className="col-xs-2 control-label">手机:</label>
                                <div className="col-xs-10">
                                    <input ref="phone" type="text" className="form-control" id="inputEmail2" placeholder="请填写收货人手机号" />
                                </div>
                            </div>
                            <hr/>
                            <div className="form-group">
                                <label for="inputEmail3" className="col-xs-2 control-label">地址:</label>
                                <div className="col-xs-10">
                                    <input ref="address1" type="text" className="form-control" id="inputEmail3" placeholder="小区/写字楼/酒店/门牌号" />
                                </div>
                            </div>
                            <hr/>
                        </form>
                    </div>
                    <span className="btn btn-primary" onClick={this.onConfirm} ref="button" tag={0}>确定</span>
                    <span className="btn btn-default" onClick={this.cancel}>取消</span>
                </div>
            </div>
        )
    }
});

var CollectionBox=React.createClass({
    mixins:[
        Reflux.connect(stores.personalStore,'data')
    ],
    render:function(){
        if(this.state.data.collection.length){
            var collectionList =
                <div>
                        {this.state.data.collection.map(function(r){
                            return(
                                <div className="col-md-3">
                                    <div className="thumbnail">
                                        <Link to="restaurant" params={{resId:r.id}}>
                                        <img style={{width:'100%',height:'120px'}} src={r.pic} />
                                        </Link>
                                        <div className="caption" style={{textAlign:'center'}}>
                                            <h3>{r.name}</h3>
                                            <p>销量：{r.sales}</p>
                                            <p>
                                                <span>起送：￥{r.basePrice}</span>&nbsp;&nbsp;
                                                <span>配送：￥{r.packFee}</span>
                                            </p>
                                            <p>时间：{r.duringTime}分钟</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                </div>
        }else{
            collectionList =
                <div style={{textAlign:'center',marginTop:'200px'}}>
                    <img src="/assets/images/personal/iconfont-no.png" style={{height:'60px'}}/>
                    <h5>你当前暂时没有收藏的商家</h5>
                </div>
        }
        return(
            <div className="restList" style={{top:'0'}}>
                <h4>我的收藏</h4>
                <hr/>
                {collectionList}
            </div>
        )
    }
});


var IntegrationBox = React.createClass({
    onConfirm:function(){

    },
    render:function(){
        return(
            <div>
                <h4>我的积分</h4>
                <p style={{marginLeft:'15px',marginTop:'10px'}}>
                    {/*<span>当前积分</span>
                    <i style={{marginLeft:'200px',color:'#1997C6',marginRight:'15px'}} className="fa fa-question"></i>
                    <span style={{color:'#1997C6'}}>积分说明</span>*/}
                </p>
                <p style={{margin:'150px 0px 0px 150px',width:'120px',height:'120px',color:'#ea8010',
                display:'block',border:'1px solid rgb(204,204,204)'}}>
                    <span style={{display:'inline-block',marginTop:'40px',fontSize:'40px'}}>1280</span>
                    <span>分</span>
                </p>
            </div>
        )
    }
});

var EvaluateBox = React.createClass({
    mixins:[
        Reflux.connect(stores.personalStore,'data')
    ],
    componentWillMount:function(){
        stores.personalStore.getUserEvaluate();
    },
    render:function(){
        if(this.state.data.evaluate.length){
            var evaluateList =
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>时间</th>
                        <th>餐厅</th>
                        <th>菜品</th>
                        <th>评分</th>
                        <th>备注</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.data.evaluate.map(function(t){
                            var star = [];
                            for(var i=0;i < 5;i++){
                                if(i<t.score)
                                star.push(<span style={{color:'rgb(255,108,96)'}} className="fa fa-star fa-lg"></span>);
                                else star.push(<span className="fa fa-star-o fa-lg"></span>);
                            };
                            return(
                                <tr>
                                    <td>{CaterUtil.timeFormat2(t.createTime)}</td>
                                    <td>{/*<img src={t.restImg}/>*/}
                                        <span style={{/*marginLeft:'10px'*/}}>{t.restName}</span>
                                    </td>
                                    <td><img src={t.dishImg}/>
                                        <span style={{marginLeft:'10px'}}>{t.dishName}</span>
                                    </td>
                                    <td>{
                                        star.map(function(s){
                                            return s;
                                        })
                                    }
                                    </td>
                                    <td>{t.content}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>;
        }else{
            evaluateList =
                <div style={{textAlign:'center',marginTop:'200px'}}>
                    <img src="/assets/images/personal/iconfont-no.png" style={{height:'60px'}}/>
                    <h5>你当前暂时没有评价</h5>
                </div>
        }
        return(
            <div>
                <h4>我的评价</h4>
                {evaluateList}
            </div>
        )
    }
});

var TuanBox = React.createClass({
    mixins:[
        Reflux.connect(stores.personalStore,'data')
    ],
    componentWillMount:function(){
        stores.personalStore.getUserTuanParticipate();
        stores.personalStore.getUserTuanInitiate();
        stores.personalStore.getUserTuanComment();
    },
    changeBox:function(box){
        if(box == 1){
            $('.initiateList').removeClass('hide');
            $('.participateList').addClass('hide');
            $('.waitCommentList').addClass('hide');
            $('.initiate').addClass('active');
            $('.participate').removeClass('active');
            $('.comment').removeClass('active');
        }else if(box == 2){
            $('.initiateList').addClass('hide');
            $('.participateList').removeClass('hide');
            $('.waitCommentList').addClass('hide');
            $('.initiate').removeClass('active');
            $('.participate').addClass('active');
            $('.comment').removeClass('active');
        }else if(box == 3){
            $('.initiateList').addClass('hide');
            $('.participateList').addClass('hide');
            $('.waitCommentList').removeClass('hide');
            $('.initiate').removeClass('active');
            $('.participate').removeClass('active');
            $('.comment').addClass('active');
        }
    },
    evaluation:function(id){
        location.href="/catering#/pintuan/evaluate/"+id;
    },
    cancelParticipate:function(id,index){
        swal({
            title:"确认取消？",type:"warning",showCancelButton:true,confirmButtonColor:"#DD6B55",
            confirmButtonText: "确认", cancelButtonText:"取消",closeOnConfirm: false},function(isConfirm){
            if(isConfirm){CateringActions.personalAction.cancelParticipate(id,index);}
        });
    },
    getParticipateUser:function(id){
        location.href="/catering#/pintuan/participateUser/"+id;
    },
    render:function(){
        if(this.state.data.tuan.initiate.length){
            var initiateTuanList =
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th style={{width:'15%'}}>报名截止</th>
                        <th style={{width:'30%'}}>状态</th>
                        <th>内容</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.data.tuan.initiate.map(function(t){
                            return(
                                <tr>
                                    <td style={{width:'15%'}}>{CaterUtil.timeFormat3(parseInt(t.endTime))}</td>
                                    {/*<td style={{width:'15%'}}>{CaterUtil.timeFormat3(parseInt(t.startTime))}</td>*/}
                                    <td style={{width:'30%'}}>{t.state}</td>
                                    <td>{t.subject.slice(0,20)+"..."}</td>
                                    <td style={{width:"25%"}}>
                                        <button onClick={this.getParticipateUser.bind(this,t.id)}
                                                className="btn btn-sm btn-success">参与人员</button>
                                    </td>
                                </tr>
                            )
                        }.bind(this))
                    }
                    </tbody>
                </table>;
        }else{
            initiateTuanList =
                <div style={{textAlign:'center',marginTop:'200px'}}>
                    <img src="/assets/images/personal/iconfont-no.png" style={{height:'60px'}}/>
                    <h5>你当前暂时没有发起拼团</h5>
                </div>
        }
        if(this.state.data.tuan.participate.length){
            var participateTuanList =
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th style={{width:'15%'}}>活动开始</th>
                        <th style={{width:'30%'}}>状态</th>
                        <th>内容</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.data.tuan.participate.map(function(t,index){
                            if(t.state == "报名中" || t.state == "报名已满"){
                                var button =
                                    <button onClick={this.cancelParticipate.bind(this,t.id,index)} className="btn btn-danger btn-sm">取消参与</button>
                            }else{
                                button = <button style={{opacity:0.6}} className="btn btn-danger btn-sm">取消参与</button>
                            }
                            return(
                                <tr>
                                    <td style={{width:'15%'}}>{CaterUtil.timeFormat3(parseInt(t.startTime))}</td>
                                    <td style={{width:'30%'}}>{t.state}</td>
                                    <td>{t.subject.slice(0,20)+"..."}</td>
                                    <td>{button}</td>
                                </tr>
                            )
                        }.bind(this))
                    }
                    </tbody>
                </table>;
        }else{
            participateTuanList =
                <div style={{textAlign:'center',marginTop:'200px'}}>
                    <img src="/assets/images/personal/iconfont-no.png" style={{height:'60px'}}/>
                    <h5>你当前暂时没有参与拼团</h5>
                </div>
        }
        if(this.state.data.tuan.comment.length){
            var commentTuanList =
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th style={{width:'20%'}}>发起人</th>
                        <th>标题</th>
                        <th>内容</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.data.tuan.comment.map(function(t){
                            return(
                                <tr>
                                    <td style={{width:'20%'}}>{t.initiator}</td>
                                    <td>{t.subject}</td>
                                    <td>{t.subscribe.slice(0,20)+"..."}</td>
                                    <td style={{width:'25%'}}>
                                        <button onClick={this.evaluation.bind(this,t.id)}
                                                className="btn btn-sm btn-success">评价</button>
                                    </td>
                                </tr>
                            )
                        }.bind(this))
                    }
                    </tbody>
                </table>;
        }else{
            commentTuanList =
                <div style={{textAlign:'center',marginTop:'120px'}}>
                    <img src="/assets/images/personal/iconfont-no.png" style={{height:'60px'}}/>
                    <h5>你当前暂时没有待评论的拼团</h5>
                </div>
        }
        return(
            <div style={{marginBottom:'50px'}}>
                <h4>我的拼团</h4>
                <hr/>
                <ol className="breadcrumb" style={{cursor:'pointer'}}>
                    <li className="initiate active" onClick={this.changeBox.bind(this,1)}><a>我发起的</a></li>
                    <li className="participate" onClick={this.changeBox.bind(this,2)}><a>我参与的</a></li>
                    <li className="comment" onClick={this.changeBox.bind(this,3)}><a>待评价</a></li>
                </ol>
                <div className="initiateList">{initiateTuanList}</div>
                <div className="participateList hide">{participateTuanList}</div>
                <div className="waitCommentList hide">{commentTuanList}</div>
            </div>
        )
    }
});

var PinCheBox = React.createClass({
    mixins:[
        Reflux.connect(stores.personalStore,'data')
    ],
    componentDidMount:function(){
        stores.personalStore.getUserPinChe();
    },
    changeOrDelete:function(orderId,index){
        if(confirm("你确认删除当前拼车信息吗")){
            pCaterActions.personalAction.changeOrDelete(orderId,index);
        }
    },
    render:function(){
        return(
            <div>
                <h4>我的拼车</h4>
                <hr/>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>目的地</th>
                        <th>出发时间</th>
                        <th>备注</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.data.pinche.map(function(t,index){
                            return(
                                <tr>
                                    <td>{t.destination}</td>
                                    <td>{t.startTime}</td>
                                    <td>{t.remark}</td>
                                    <td>
                                    <button style={{background:'#EC6459'}}
                                            onClick={this.changeOrDelete.bind(this,t.Id,index)}
                                            className="btn btn-sm">
                                        <i style={{color:'#FFFFFF'}} className="fa fa-trash-o"></i>
                                    </button>
                                    </td>
                                </tr>
                            )
                        }.bind(this))
                    }
                    </tbody>
                </table>
            </div>
        )
    }
});


var MessageBox = React.createClass({
    mixins:[
        Reflux.connect(stores.personalStore,'data')
    ],
    componentDidMount:function(){
        stores.personalStore.getUserMessageBoard(1);
    },
    colorList:[
        //7种淡色
        'rgb(253,254,207)','rgb(180,211,108)','rgb(127,206,243)','rgb(239,156,160)',
        '#ffc', '#cfc', '#ccf',
        //5种亮色
        'rgb(255, 105, 79)', 'rgb(142, 209, 44)', 'rgb(254, 208, 8)', 'rgb(235, 235, 235)',
        'rgb(38, 144, 246)'
    ],
    showDelete:function(){
        $(".deleteMessage").each(function(){
            $(this).fadeIn(500);
        });
    },
    render:function(){
        if(this.state.data.pageCount > 1){
            var pageBox = <Pagination />;
        }else{
            pageBox = null;
        }
        if(this.state.data.message.length){
            var messageBox =
                <div>
                    <div className="row">
                        <h4>我的留言
                            <button onClick={this.showDelete} style={{border:'none',float:'right',background:'#41CAC0'}} className="btn btn-danger btn-xs">
                                <i className="fa fa-pencil"></i>
                            </button>
                        </h4>
                        {this.state.data.message.map(function(m,index){
                            var color = this.colorList[index%12];
                            return (
                                <div className="col-md-4" style={{marginTop:'30px'}}>
                                    <div style={{paddingTop:'20px',textAlign:'center',height:'130px',marginLeft:'30px',background:color}}>
                                        <button style={{border:'none',background:'transparent'}}>
                                            <a style={{textDecoration:'none',color:'#000000'}}
                                               href={"/messageboard#/message/"+m.mainMsgId}>
                                                <h5 style={{fontFamily:'Helvetica'}}>{m.content.slice(0,15)+"..."}</h5>
                                            <h5 style={{marginTop:'20px'}}>时间: {CaterUtil.timeFormat2(m.createTime)}</h5>
                                        </a>
                                        </button>
                                        <br/>
                                        <button className="deleteMessage" style={{display:'none',background:'#EC6459'}}
                                                className="btn btn-danger btn-xs">
                                            <i className="fa fa-trash-o"></i>
                                        </button>
                                    </div>
                                </div>
                            )
                        }.bind(this))}
                    </div>
                    <br/>
                    {pageBox}
                    <br/>
                </div>
        }else{
            messageBox  =
                <div style={{textAlign:'center',marginTop:'120px'}}>
                    <img src="/assets/images/personal/iconfont-no.png" style={{height:'60px'}}/>
                    <h5>你当前暂时没有留言</h5>
                </div>
        }
        return (
            <div>
                {messageBox}
            </div>
        )
    }
});


var Pagination = React.createClass({
    mixins:[
        Reflux.connect(stores.personalStore, "data"),
        ReactRouter.Navigation
    ],
    componentDidMount:function(){
        this.init();
    },
    componentDidUpdate:function(){
        this.init();
    },
    init: function(){
        var options = {
            currentPage: this.state.data.currentPage,
            totalPages: this.state.data.pageCount,
            alignment:"center",
            itemTexts: function (type, page, current) {
                switch (type) {
                    case "first":
                        return "首页";
                    case "prev":
                        return "上一页";
                    case "next":
                        return "下一页";
                    case "last":
                        return "尾页";
                    case "page":
                        return page;
                }

            },
            onPageClicked: function(e,originalEvent,type,page){
                stores.personalStore.getUserMessageBoard(page);
            }
        };

        $('#pagination').bootstrapPaginator(options);
    },
    render:function(){
        return(
            <div className="row">
                <div className="col-sm-6 col-sm-offset-3">
                    <div id="pagination"></div>
                </div>
            </div>
        )
    }
});