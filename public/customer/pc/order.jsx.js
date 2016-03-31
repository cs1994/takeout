/**
 * Created by hebenpc on 2015/12/16.
 */


var ConfirmOrder = React.createClass({
    mixins:[
        Reflux.connect(stores.orderStore,'data'),
        Reflux.connect(stores.personalStore,'data2'),
        ReactRouter.State,
        ReactRouter.Navigation,
    ],
    addAddress:function(){
        this.refs.addAddress.open();
        this.refs.addAddress.tag = 0;
    },
    editAddress:function(data){
        this.refs.addAddress.open();
        this.refs.addAddress.tag = 1;
        React.findDOMNode(this.refs.name).value = data.name;
        var sex =data.sex;
        Debugger.log('sex1= '+sex);
        $('input:radio').map(function(){
            this.removeAttribute('checked');
            if($(this).val() == sex) {
                Debugger.log('sex2= '+sex);
                //$(this).attr('checked','true');
                this.setAttribute('checked','true');
            }
        });
        React.findDOMNode(this.refs.phone).value = data.tel;
        React.findDOMNode(this.refs.address1).value = data.address;
        this.refs.addAddress.id = data.id;
    },
    deleteAddress:function(data){
        pCaterActions.personalAction.deleteAddress(data);
    },
    onConfirm:function(){
        var sendData = {};
        var name = React.findDOMNode(this.refs.name).value;
        var sex = parseInt($('input:radio:checked').val());
        var phone = React.findDOMNode(this.refs.phone).value;
        var address = React.findDOMNode(this.refs.address1).value;
        if(this.refs.addAddress.tag){
            sendData = {name:name,sex:sex,phone:phone,address:address,id:this.refs.addAddress.id};
            pCaterActions.personalAction.editAddress(sendData);
        }else{
            sendData = {name:name,sex:sex,phone:phone,address:address,userId:this.state.data2.user.id};
            pCaterActions.personalAction.addAddress(sendData);
        }
        this.refs.addAddress.tag = 0;
        this.refs.addAddress.close();
    },
    changePay:function(index,event){
        var img = document.createElement("img");
        img.src = '/assets/images/personal/index.png';
        img.style.float = 'right';
        img.style.height = '20px';
        img.style.marginTop = '9px';
        if(index == 1){
            $(event.target).addClass('active');
            $(event.target).children().remove();
            $(event.target).next().removeClass('active');
            $(event.target).next().children().remove();
            event.target.appendChild(img);
        }else if(index == 2){
            $(event.target).addClass('active');
            $(event.target).children().remove();
            $(event.target).prev().removeClass('active');
            $(event.target).prev().children().remove();
            event.target.appendChild(img);
        }
    },
    chooseAddress:function(address,index,event){
        //Debugger.log(event.target.tagName);
        if(event.target.tagName != 'I'){
            var img = document.createElement("img");
            img.src = '/assets/images/pc_personal/iconfont-xuanzhong(1).png';
            img.style.height = '40px';
            img.style.position = 'absolute';
            img.style.right = '100px';
            img.style.marginTop = '-50px';
            img.style.zIndex = '3';
            $('.addressList').map(function(e){
                $(this).children('img').remove();
                if(e == index) this.appendChild(img);
            });
            pCaterActions.orderAction.chooseAddress(address);
        }
    },
    confirmOrder:function(){
        var data = {};
        var foodCart = JSON.parse(localStorage.foodCart);
        if($CONF_ARCY$.id) data.userId = $CONF_ARCY$.id;
        else data.userId =100000;
        data.userName = this.state.data.address.name;
        data.address = this.state.data.address.address;
        data.remark = this.refs.remark.getDOMNode().value;
        data.tel = this.state.data.address.tel+"";
        data.restId = foodCart.restId;
        data.arriveTime = this.refs.arriveTime.getDOMNode().value;
        data.invoice = parseInt(this.refs.invoice.getDOMNode().value);
        //data.packFee = ""+foodCart.transPay;
        //data.totalFee = ""+foodCart.total;
        data.dishDetail = foodCart.foodList.map(function(food){
            var foodDetail = food.id+";"+food.name+";"+food.num+";"+food.price;
            return foodDetail;
        });
        data.payType = parseInt($('.payType.active').attr('value'));
        if(data.address){
            if (data.payType == 0 || data.payType == 1) {
                $("#confirmOrder").addClass("disabled");
                Debugger.log("confirmOrder = " + JSON.stringify(data));
                pCaterActions.orderAction.createOrder(data);
                //this.transitionTo('/personal/orderDetail/'+0);
            } else {
                //toastr.info("请选择付款方式");
                alert("请选择付款方式");
            }
        }else{
            alert("请选择收货地址");
        }
    },
    returnCart:function(){
        var restId = JSON.parse(localStorage.foodCart).restId;
        this.transitionTo('/restaurant/'+restId);
    },
    render:function(){
        var foodCart = JSON.parse(localStorage.foodCart);
        var date = new Date();
        var hour = date.getHours();
        if(date.getMinutes() >= 30) var time = [(hour+1)%24+':00',(hour+1)%24+':30',(hour+2)%24+':00',(hour+2)%24+':30',(hour+3)%24+':30'];
        else time = [hour+':30',(hour+1)%24+':00',(hour+1)%24+':30',(hour+2)%24+':00',(hour+3)%24+':00'];
        return(
            <div className="container" style={{marginTop:'30px'}}>
                <div className="row">
                    <div className="panel panel-success">
                        <div className="panel-heading">
                            <span style={{float:'left',cursor:'pointer'}} onClick={this.returnCart}>
                                <img src="/assets/images/pc_personal/iconfont-fanhui.png"/>
                                返回购物车</span>
                            <div className="panel-title">
                                {foodCart.resName}（明光桥店）{'>'} 确认订单
                            </div>
                        </div>
                    </div>
                    <div className="row" id="order" style={{marginBottom:'30px'}}>
                            <div className="col-md-4 col-md-offset-1" style={{border:'1px solid rgb(220,220,220)'}}>
                                <h4 style={{fontWeight:'bold'}}>
                                    <span>菜品</span>
                                    <span style={{float:'right'}}>价格/份数</span>
                                </h4>
                                <hr/>
                                {
                                    foodCart.foodList.map(function(dish){
                                        if(dish.num >0){
                                            return(
                                                <div>
                                                    <li style={{fontSize:'16px'}}>
                                                        <span>{dish.name}</span>
                                                        <span style={{float:'right'}}>￥{dish.price} / {dish.num}</span>
                                                    </li>
                                                    <hr/>
                                                </div>
                                            )
                                        }
                                    })
                                }
                                <div>
                                    <li style={{fontSize:'16px'}}>
                                        <span>配送费</span>
                                        <span style={{float:'right',color:'#8B6CFF'}}>￥{foodCart.transPay}</span>
                                    </li>
                                    <hr/>
                                </div>
                                <br/>
                                <h4>
                                    <b>合计</b>
                                    <span style={{float:'right',fontSize:'30px',marginBottom:'10px',color:'rgb(247,67,66)'}}>
                                        ￥{(foodCart.total+foodCart.transPay).toFixed(2)}</span>
                                </h4>
                            </div>
                            <div className="col-md-5 col-md-offset-1" style={{border:'1px solid rgb(220,220,220)'}}>
                                <h4 style={{fontWeight:'bold'}}>订单详情</h4>
                                <hr />
                                <h5><b>收货地址</b><span className="glyphicon glyphicon-plus" onClick={this.addAddress}
                                              style={{cursor:'pointer',color:'rgb(92,184,92)',float:'right'}}></span></h5>
                                <br/>
                                {
                                    this.state.data2.addressData.map(function(address,index){
                                        if(address.sex){
                                            var sex = '女士';
                                        }else{
                                            sex = '先生';
                                        }
                                        return(
                                            <div>
                                            <div className="addressList" style={{border:'1px solid rgb(153,153,204)'}} onClick={this.chooseAddress.bind(this,address,index)}>
                                                <p style={{marginTop:'10px'}}>
                                                    <span style={{marginLeft:'20px'}}>{address.name}</span>
                                                    <span style={{marginLeft:'15px'}}>{sex}</span>
                                                    <span style={{marginLeft:'30px'}}>{address.tel}</span>
                                                    <i className="fa fa-trash" style={{cursor:'pointer',marginRight:'15px',float:'right'}}
                                                       onClick={this.deleteAddress.bind(this,address)}></i>
                                                    <i className="fa fa-edit" style={{cursor:'pointer',marginRight:'15px',float:'right'}}
                                                       onClick={this.editAddress.bind(this,address)}></i>
                                                </p>
                                                <p style={{marginLeft:'20px',color:'rgb(181,181,181)'}}>
                                                    {address.address}
                                                </p>
                                            </div>
                                            <br/>
                                            </div>
                                        )
                                    }.bind(this))
                                }
                                <br/>
                                <br/>
                                <form>
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-addon">给商家留言</div>
                                        <input ref="remark" type="text" className="form-control"  placeholder="" />
                                    </div>
                                </div>
                                </form>
                                <br/>
                                <h5>
                                <span>付款方式：</span>
                                <span className="payType" value={1} onClick={this.changePay.bind(this,1)}>在线支付
                                </span>
                                <span className="payType" value={0} onClick={this.changePay.bind(this,2)}>餐到付款</span>
                                </h5>
                                <br/>
                                <div className="panel panel-warning">
                                    <div className="panel-heading">
                                        <div className="panel-title">
                                            <span>送达时间：</span>
                                            <select className="form-control" ref="arriveTime" style={{width:'120px',display:'inline'}}>
                                                <option>立即送出</option>
                                                {
                                                    time.map(function(t){
                                                        return(
                                                            <option>{t}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <span style={{marginLeft:'30px'}}>发票：</span>
                                            <select className="form-control" ref="invoice" style={{width:'120px',display:'inline'}}>
                                                <option value={0}>不开发票</option>
                                                <option value={1}>开发票</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <button className="btn btn-success" id="confirmOrder" style={{marginTop:'10px',marginBottom:'40px'}} onClick={this.confirmOrder}>确认下单
                                </button>
                            </div>
                        <BootstrapModalPC tag={0} id={0} ref="addAddress" title="新建地址" onConfirm={this.onConfirm}>
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
                                            <input key="0" type="radio" name="inlineRadioOptions" value={0}/>先生
                                        </label>
                                        <label className="radio-inline">
                                            <input key="1" type="radio" name="inlineRadioOptions" value={1}/>女士
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
                                        <input ref="address1" type="text" className="form-control" id="inputEmail3" placeholder="小区/写字楼/酒店" />
                                    </div>
                                </div>
                                <hr/>
                            </form>
                        </BootstrapModalPC>
                    </div>
                </div>
            </div>
        )
    }
});



var OrderBox = React.createClass({
    componentWillMount:function(){
        if($CONF_ARCY$.id == '') location.href="/customer/login?back=" + encodeURIComponent("/catering#/order");
    },
    render:function(){
        return(
            <div>
            <ConfirmOrder />
            </div>
        )
    }
});