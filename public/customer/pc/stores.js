/**
 * Created by caoshuai on 2015/12/15.
 */


(function(React, Router, Reflux, global) {
    global.stores = {};

    /*global.stores.resListStore = Reflux.createStore({
     listenables: [global.pCaterActions.firstAction],

     init:function(){
     this.resList =[
     {id: 1, name: 'Cyrielle的美食', pic: '/assets/images/catering/pc/rest1.jpeg', count: 9875, minPay: 20, transPay: 5, time: 40 },
     {id: 2, name: '乌巢披萨（国贸店）', pic: '/assets/images/catering/pc/rest2.png', count: 7560, minPay: 20, transPay: 5, time: 40 },
     {id: 3, name: 'Arrese Bakery & 咖啡厅', pic: '/assets/images/catering/pc/rest3.png', count: 560, minPay: 20, transPay: 5, time: 40 },
     {id: 4, name: '生蚝的故乡', pic: '/assets/images/catering/pc/rest4.png', count: 750, minPay: 20, transPay: 5, time: 40 },
     {id: 5, name: '水果捞', pic: '/assets/images/catering/pc/rest5.jpeg', count: 30, minPay: 20, transPay: 5, time: 40 },
     {id: 6, name: '摩大甜品', pic: '/assets/images/catering/pc/rest1.jpeg', count: 105, minPay: 20, transPay: 5, time: 40 },
     {id: 7, name: '冰纷蛋糕屋', pic: '/assets/images/catering/pc/rest4.png', count: 45, minPay: 20, transPay: 10, time: 60 },
     {id: 8, name: '养生早点', pic: '/assets/images/catering/pc/rest6.png', count: 88, minPay: 20, transPay: 5, time: 40 },
     {id: 9, name: '养生早点', pic: '/assets/images/catering/pc/rest5.jpeg', count: 88, minPay: 20, transPay: 5, time: 40 },
     {id: 10, name: '养生早点', pic: '/assets/images/catering/pc/rest7.png', count: 88, minPay: 20, transPay: 5, time: 40 },
     ];
     this.resTypes=[
     {id:1,name:"全部商家"},{id:2,name:"中餐"},{id:3,name:"亚洲"},{id:4,name:"西餐"},
     {id:5,name:"面包甜点"},{id:6,name:"咖啡酒吧"},{id:7,name:"小吃零食"},{id:8,name:"果蔬生鲜"},{id:9,name:"鲜花蛋糕"},
     ];// restaurant type
     //this.typeNum = 1;
     this.pageNum = 1;//now page number
     //this.pageSum = Math.ceil(this.resList.length/10);
     //this.pageRes = [];
     this.pageList=[];
     this.resType = 1;//now restaurant type
     this.filterId = 0;
     this.seqId = 0;
     },

     getInitialState:function(){
     return({
     resList:this.resList,
     pageNum:this.pageNum,
     pageRes:this.pageRes,
     pageSum:this.pageSum,
     pageList:this.pageList,
     resTypes:this.resTypes,
     resType:this.resType,
     filterId:this.filterId,
     seqId:this.seqId,
     //typeNum:this.typeNum,
     });
     },
     updateStore:function(){
     this.trigger({
     resList:this.resList,
     pageNum:this.pageNum,
     pageRes:this.pageRes,
     pageSum:this.pageSum,
     pageList:this.pageList,
     resTypes:this.resTypes,
     resType:this.resType,
     filterId:this.filterId,
     seqId:this.seqId,
     //typeNum:this.typeNum,
     })
     },
     onInitialType:function(num){
     this.resType = num;
     this.updateStore();
     },

     onGetPages:function(num){

     this.pageList = [1,2,3,4];
     this.updateStore();
     },
     onChangePageNum:function(num){
     this.pageNum = num;
     var rx = Math.ceil(Math.random() * num) + 1;
     var old = this.resList;
     this.resList = old.slice(rx, old.length).concat(old.slice(0, rx));
     this.updateStore();
     },

     onChangeType:function(num){
     this.resType =num;
     var rx = Math.ceil(Math.random() * 4) + 1;
     var old = this.resList;
     this.resList = old.slice(rx, old.length).concat(old.slice(0, rx));
     this.updateStore();
     },

     onResSequece:function(num){
     this.seqId = num;
     var rx = Math.ceil(Math.random() * num) + 1;
     var old = this.resList;
     this.resList = old.slice(rx, old.length).concat(old.slice(0, rx));
     this.updateStore();
     },
     onResFilter:function(num){
     this.filterId = num;
     var rx = Math.ceil(Math.random() * num) + 1;
     var old = this.resList;
     this.resList = old.slice(rx, old.length).concat(old.slice(0, rx));
     this.updateStore();
     },
     });*/

    /*global.stores.resStore = Reflux.createStore({
     listenables:[global.pCaterActions.resAction],
     init:function(){
     this.foodList=[{foodId:"1",url:"/assets/images/catering/pc/rest2.png",name:"9寸海鲜披萨",monthSale:"12",materials:"洋葱 虾 蛤蜊 蔬菜",price:30},
     {foodId:"2",url:"/assets/images/catering/wuchaopisa.jpg",name:"乌巢披萨",monthSale:"12",materials:"洋葱 虾 蛤蜊 蔬菜",price:13},
     {foodId:"3",url:"/assets/images/catering/coffee.jpg",name:"咖啡",monthSale:"12",materials:"洋葱 虾 蛤蜊 蔬菜",price:23},
     {foodId:"4",url:"/assets/images/catering/shenghao.jpeg",name:"生蚝",monthSale:"12",materials:"洋葱 虾 蛤蜊 蔬菜",price:33},
     {foodId:"5",url:"/assets/images/catering/rest1.jpeg",name:"水果捞",monthSale:"12",materials:"洋葱 虾 蛤蜊 蔬菜",price:20}];
     this.foodCart ={total: 0,count: 0, transPay: 0, minPay: 0,resName:"",restId:0,foodList:[]};
     this.foodTypes=[
     {id:1,name:"所有商品"},{id:2,name:"披萨"},{id:3,name:"意面"},{id:4,name:"沙拉"},
     {id:5,name:"热饮"},{id:6,name:"冷饮"},{id:7,name:"小吃"}];
     this.foodType = 1;
     this.pageList=[];
     this.pageFoodNum = 1;
     },
     getInitialState:function(){
     if(localStorage.foodList){
     this.foodList = JSON.parse(localStorage.foodList)
     }else{
     localStorage.setItem("foodList",JSON.stringify(this.foodList));
     }
     if(localStorage.foodCart){
     this.foodCart = JSON.parse(localStorage.foodCart);
     this.foodCart.foodList = [];
     this.foodList.map(function(e){
     if(e.num >0) this.foodCart.foodList.unshift(e);
     }.bind(this));
     } else{
     localStorage.setItem("foodCart",JSON.stringify(this.foodCart));
     }

     Debugger.log("getInitialState foodCart = "+JSON.stringify(localStorage.foodCart));
     Debugger.log("getInitialState foodList = "+JSON.stringify(localStorage.foodList));

     return({
     foodList:this.foodList,
     foodCart:this.foodCart,
     foodTypes:this.foodTypes,
     foodType:this.foodType,
     pageList:this.pageList,
     pageFoodNum:this.pageFoodNum,
     });
     },
     updateStore:function(){
     this.trigger({
     foodList:this.foodList,
     foodCart:this.foodCart,
     foodTypes:this.foodTypes,
     foodType:this.foodType,
     pageList:this.pageList,
     pageFoodNum:this.pageFoodNum,
     })
     },
     onBuyFood:function(food,index){
     if(!this.foodList[index].hasOwnProperty('num')) this.foodList[index].num = 0;
     this.foodList[index].num ++;
     var flag = false;
     var foodList =this.foodCart.foodList;
     Debugger.log("onBuyFood foodList = "+JSON.stringify(foodList));
     $.each(foodList, function(i, e){
     if(e.foodId == food.foodId){
     console.log("$$$$$$$$$$ " +e.num);
     flag = true;
     return false;
     }
     });
     this.foodCart.total += food.price;
     this.foodCart.count ++;
     if(!flag){
     this.foodCart.foodList.unshift(this.foodList[index]);//引用
     console.log("%%%%%%%%%% " + this.foodCart.foodList[0].num);
     }
     localStorage.setItem("foodList",JSON.stringify(this.foodList));
     localStorage.setItem("foodCart",JSON.stringify(this.foodCart));
     this.updateStore();
     Debugger.log("onBuyFood foodCart = "+JSON.stringify(localStorage.foodCart));
     Debugger.log("onBuyFood foodList = "+JSON.stringify(localStorage.foodList));
     },
     onMinusFood:function(food,index){
     this.foodList[index].num--;
     this.foodCart.total -= this.foodList[index].price;
     this.foodCart.count --;
     if(this.foodList[index].num == 0){
     var len = this.foodCart.foodList.length;
     var foodCart=this.foodCart.foodList;
     var foodList = [];
     $.each(this.foodCart.foodList, function(i, e){
     if(e.foodId == food.foodId){
     foodList = foodCart.slice(0,i).concat(foodCart.slice(i+1,len));
     return false;
     }
     });
     this.foodCart.foodList = foodList;
     }
     else{
     foodList = this.foodCart.foodList;
     $.each(foodList, function(i, e){
     if(e.foodId == food.foodId){
     return false;
     }
     });
     this.foodCart.foodList = foodList;
     }

     localStorage.setItem("foodList",JSON.stringify(this.foodList));
     localStorage.setItem("foodCart",JSON.stringify(this.foodCart));
     this.updateStore();
     Debugger.log("onMinusFood foodCart = "+JSON.stringify(localStorage.foodCart));
     Debugger.log("onMinusFood foodList = "+JSON.stringify(localStorage.foodList));
     },
     onHandleCartPlus:function(food,index){
     this.foodCart.foodList[index].num ++;
     this.foodCart.total += food.price;
     this.foodCart.count ++;
     $.each(this.foodList, function(i, e){
     if(e.foodId == food.foodId){
     return false;  //跳出each循环  return false <==> break;   return true <==> continue;
     }
     });
     localStorage.setItem("foodList",JSON.stringify(this.foodList));
     localStorage.setItem("foodCart",JSON.stringify(this.foodCart));
     this.updateStore();
     Debugger.log("onHandleCartPlus foodCart = "+JSON.stringify(localStorage.foodCart));
     Debugger.log("onHandleCartPlus foodList = "+JSON.stringify(localStorage.foodList));
     },
     onHandleCartMinus:function(food,index){
     this.foodCart.foodList[index].num --;
     this.foodCart.total -= this.foodCart.foodList[index].price;
     this.foodCart.count --;
     if(this.foodCart.foodList[index].num == 0){
     var len = this.foodCart.foodList.length;
     var foodCart = this.foodCart.foodList;
     var foodListCart = [];
     $.each(foodCart, function(i, e){
     if(e.foodId == food.foodId){
     foodListCart = foodCart.slice(0,i).concat(foodCart.slice(i+1,len));
     return false;
     }
     });
     this.foodCart.foodList = foodListCart;
     }
     var foodList = this.foodList;
     $.each(foodList, function(i, e){
     if(e.foodId == food.foodId){
     return false;
     }
     });
     localStorage.setItem("foodList",JSON.stringify(this.foodList));
     localStorage.setItem("foodCart",JSON.stringify(this.foodCart));
     this.updateStore();
     Debugger.log("onHandleCartMinus foodCart = "+JSON.stringify(localStorage.foodCart));
     Debugger.log("onHandleCartMinus foodList = "+JSON.stringify(localStorage.foodList));
     },
     onGetResInfo:function(resId){
     this.foodCart.transPay = 10;  //配送费
     this.foodCart.minPay = 100;  //起送价
     this.foodCart.resName = "Cyrielle的美食";
     this.foodCart.restId = 1;
     this.updateStore();
     localStorage.setItem("foodCart",JSON.stringify(this.foodCart));
     },
     onCartClean:function(){
     $.each(this.foodList, function(i, e){
     if(e.hasOwnProperty('num')){
     e.num = 0;
     }
     });
     this.foodCart.foodList = [];
     this.foodCart.total = 0;
     this.foodCart.count = 0;
     localStorage.setItem("foodList",JSON.stringify(this.foodList));
     localStorage.setItem("foodCart",JSON.stringify(this.foodCart));
     this.updateStore();
     },
     onChangeFoodType:function(num){
     this.foodType = num;
     var rx = Math.ceil(Math.random() * num) + 1;
     var old = this.foodList;
     this.foodList = old.slice(rx, old.length).concat(old.slice(0, rx));
     localStorage.setItem("foodList",JSON.stringify(this.foodList));
     this.updateStore();
     },
     onGetPages:function(){
     this.pageList=[1,2,3,4];
     this.updateStore();
     },
     onChangeFoodPage:function(num){
     this.pageFoodNum = num;
     var rx = Math.ceil(Math.random() * num) + 1;
     var old = this.foodList;
     this.foodList = old.slice(rx, old.length).concat(old.slice(0, rx));
     localStorage.setItem("foodList",JSON.stringify(this.foodList));
     this.updateStore();
     },
     });*/


    global.stores.resListStore = Reflux.createStore({
        listenables: [global.pCaterActions.firstAction],

        init: function(){
            this.pageList=[];
            this.resType = 0;
            this.pageNum = 1;
            this.restaurantPageList=[];
            this.restaurantList = [];
            this.fenleiList = [];
            this.filterList = [
                {filterId: 1, name: '满减'},
                {filterId: 2, name: '新品特惠'},
                {filterId: 3, name: '限量供应'},
                {filterId: 4, name: '支持优惠券'}
            ];

            this.sortList = [
                //{sortId: 1, name: '距离'},
                {sortId: 2, name: '销量'},
                {sortId: 3, name: '起送价'},
                {sortId: 4, name: '送餐速度'},
                {sortId: 5, name: '评价'}
            ];
            this.tag = 0;
            this.filter = 0;
            this.sort = 0;
            this.eachPage = 15;
            this.pages = 8;
        },
        getInitialState:function(){
            return{
                restaurantList: this.restaurantList,
                fenleiList: this.fenleiList,
                filterList: this.filterList,
                sortList : this.sortList,
                pageNum:this.pageNum,
                restaurantPageList:this.restaurantPageList,
                resType:this.resType,
                pageList:this.pageList,
                eachPage:this.eachPage
            }
        },
        updateStore: function(){
            this.trigger({
                restaurantList: this.restaurantList,
                fenleiList: this.fenleiList,
                filterList: this.filterList,
                sortList : this.sortList,
                pageNum:this.pageNum,
                restaurantPageList:this.restaurantPageList,
                resType:this.resType,
                pageList:this.pageList,
                eachPage:this.eachPage
            })
        },
        onFetchRestaurantList: function(tag, sort, filter){
            this.pageNum = 1;
            if(tag != null) this.tag = tag;
            if(sort != null) this.sort = sort;
            if(filter != null) this.filter = filter;
            this.resType = this.tag;
            console.log("tag=" + this.tag + ", sort=" + this.sort + ", filter=" + this.filter);
            var url = "/restaurant/listAllRestaurant?tag="+ this.tag +"&sort=" + this.sort + "&filter=" + this.filter;
            ajaxGet(url, function(res){
                this.restaurantList = res.data;
                var eachPage = this.eachPage;
                this.restaurantPageList = res.data.slice(0,eachPage);
                this.pageList = this.restaurantList.map(function(r,index){
                    if(index % eachPage ==0) return index/eachPage+1
                });
                Debugger.log('onFetchRestaurantList page = '+JSON.stringify(this.pageList));
                this.updateStore();
            }.bind(this));
            //var rx = Math.ceil(Math.random() * 5) + 1;
            //var ord = this.restaurantList;
            //this.restaurantList = ord.slice(rx, ord.length).concat(ord.slice(0, rx));
            //this.updateStore();
        },
        onFetchRestaurantFenlei: function(){
            var url = "/restaurant/getNumByCategory";
            ajaxGet(url, function(res){
                this.fenleiList = res.category;
                this.updateStore();
            }.bind(this));
        },
        onChangePageNum:function(num){
            this.pageNum = num;
            this.restaurantPageList = this.restaurantList.slice((this.pageNum-1)*this.eachPage,this.pageNum*this.eachPage);
            this.updateStore();
        },
        onChangeResType:function(num){
            this.resType = num;
            this.onFetchRestaurantList(num,null,null);
        },
        onSearchRestaurant:function(input){
            var count = 0;
            this.restaurantPageList = [];
             this.restaurantList.map(function(r){
                if(r.name.indexOf(input) >=0 && count<=this.eachPage){
                    count ++;
                    this.restaurantPageList.push(r);
                }
            }.bind(this));
            if(count == 0) toastr.info('未搜索到任何餐厅信息');
            Debugger.log("onSearchRestaurant = "+JSON.stringify(this.restaurantPageList));
            this.updateStore();
        }
    });



    global.stores.resStore = Reflux.createStore({
        listenables:[global.pCaterActions.resAction],
        init:function(){
            this.foodList=[];
            //this.foodCart ={total: 0,count: 0, transPay: 0, minPay: 0,resName:"",restId:0,foodList:[]};
            this.foodTypes=[
                //{id:1,name:"所有商品"},{id:2,name:"披萨"},{id:3,name:"意面"},{id:4,name:"沙拉"},
                //{id:5,name:"热饮"},{id:6,name:"冷饮"},{id:7,name:"小吃"}
            ];
            this.foodType = 1;
            this.pageList=[];
            this.pageFoodNum = 1;
            this.restaurantInfo = {};
            this.foodListPage = [];
            this.eachPage = 5;
            this.pages = 8;
        },
        getInitialState:function(){
            /*if(localStorage.foodList){
                this.foodList = JSON.parse(localStorage.foodList)
            }else{
                localStorage.setItem("foodList",JSON.stringify(this.foodList));
            }*/
            //if(localStorage.foodCart){
            //    this.foodCart = JSON.parse(localStorage.foodCart);
            //} else{
            //    localStorage.setItem("foodCart",JSON.stringify(this.foodCart));
            //}

            /*Debugger.log("getInitialState foodCart = "+JSON.stringify(localStorage.foodCart));
            Debugger.log("getInitialState foodList = "+JSON.stringify(localStorage.foodList));*/

            return({
                foodList:this.foodList,
                //foodCart:this.foodCart,
                foodTypes:this.foodTypes,
                foodType:this.foodType,
                pageList:this.pageList,
                pageFoodNum:this.pageFoodNum,
                foodListPage:this.foodListPage,
                restaurantInfo:this.restaurantInfo,
                eachPage:this.eachPage,
            });
        },
        updateStore:function(){
            this.trigger({
                foodList:this.foodList,
                //foodCart:this.foodCart,
                foodTypes:this.foodTypes,
                foodType:this.foodType,
                pageList:this.pageList,
                pageFoodNum:this.pageFoodNum,
                foodListPage:this.foodListPage,
                restaurantInfo:this.restaurantInfo,
                eachPage:this.eachPage
            })
        },
        onFetchRestaurantInfo: function(restaurantId){
            // 可通过ajax向后台请求获得，也可从restaurantListStore中筛选（问题是如果直接输url去加入某个餐厅主页，restaurantListStore中不一定有该餐厅的数据）
            var url = "/shanghu/restaurant/getRestaurantInfo?rId=" + restaurantId;
            ajaxGet(url, function(res){
                this.restaurantInfo = res.data;

                /*
                 * {"id":3,"name":"肯德基","description":"有了肯德基~生活好滋味~","announcer":"第二杯半价！","basePrice":5,
                 * "packFee":0,"pic":"/assets/images/catering/shenghao.jpeg","duringTime":40,"categort":1,
                 * "address":"知春路200号","concessions":null,"longitude":1,"latitude":1,
                 * "openingTime":"10：00-20：00","state":1}}
                 * */
                //this.foodCart.transPay = this.restaurantInfo.packFee;  //配送费
                //this.foodCart.minPay = this.restaurantInfo.basePrice;  //起送价
                //this.foodCart.resName = this.restaurantInfo.name;
                //this.foodCart.restId = this.restaurantInfo.id;
                this.updateStore();
                //console.log("RestaurantInfo####### " + JSON.stringify(this.restaurantInfo));
                //localStorage.setItem("foodCart",JSON.stringify(this.foodCart));
            }.bind(this));
            ////this.restaurantInfo = {id: 2, name: '乌巢披萨（国贸店）', pic: '/assets/images/catering/wuchaopisa.jpg', count: 7560, minPay: 20, transPay: 5, time: 40 };
            //this.cart.transPay = this.restaurantInfo.transPay;  //配送费
            //this.cart.minPay = this.restaurantInfo.minPay;  //起送价
            //this.updateStore();
            Debugger.log("#### " +JSON.stringify(this.restaurantInfo));
        },
        onFetchDishLeibieList: function(restaurantId){
            var url = "/dish/listTags?restId=" + restaurantId;
            ajaxGet(url, function(res){
                this.foodTypes = res.data;
                this.updateStore();
            }.bind(this));
        },
        onFetchDishList: function(restaurantId, tagId){
            // 根据id获取餐厅菜品列表 this.dishList
            var url = "/dish/listByTag?restId=" + restaurantId + "&tagId=" + tagId;
            ajaxGet(url, function(res){
                this.foodList = [];
                this.pageFoodNum = 1;
                res.data.map(function(food,index){
                    this.foodList.push(food);
                //    this.foodList[index].num = 0;
                }.bind(this));
                ////this.foodCart.foodList = this.foodList;
                var eachPage = this.eachPage;
                this.pageList = this.foodList.map(function(f,index){
                    if(index % eachPage == 0) return index/eachPage+1;
                });
                //Debugger.log("onFetchDishList pageList  = "+JSON.stringify(this.foodList));
                this.foodListPage = this.foodList.slice(0,eachPage);
                this.updateStore();
                //localStorage.setItem("foodList",JSON.stringify(this.foodList));
                //localStorage.setItem("foodCart",JSON.stringify(this.foodCart));
            }.bind(this));

        },
        //onBuyFood:function(food){
        //    var flag = true;
        //    Debugger.log("onbuy food1 = "+JSON.stringify(this.foodCart.foodList));
        //    this.foodCart.foodList.map(function(f){
        //        if(food.id == f.id) {
        //            f.num ++;
        //            flag = false;
        //        }
        //    });
        //    Debugger.log("onbuy food2 = "+JSON.stringify(this.foodCart.foodList));
        //    if(flag)  {
        //        food.num = 1;
        //        this.foodCart.foodList.push(food);
        //    }
        //
        //
        //    //Debugger.log("onBuyFood 2= "+JSON.stringify(this.foodCart.foodList[food.id]));
        //    this.foodCart.total = 0;
        //    this.foodCart.count++;
        //    this.foodCart.foodList.map(function(f){
        //        this.foodCart.total  += parseFloat(f.price)*f.num;
        //    }.bind(this));
        //    Debugger.log("onbuy food3 = "+JSON.stringify(this.foodCart.foodList));
        //
        //    localStorage.setItem("foodList",JSON.stringify(this.foodList));
        //    localStorage.setItem("foodCart",JSON.stringify(this.foodCart));
        //    this.updateStore();
        //    /*Debugger.log("onBuyFood foodCart = "+JSON.stringify(localStorage.foodCart));
        //    Debugger.log("onBuyFood foodList = "+JSON.stringify(localStorage.foodList));*/
        //},
        //onMinusFood:function(food){
        //    this.foodCart.foodList.map(function(f){
        //        if(food.id == f.id) {
        //            f.num --;
        //        }
        //    });
        //    this.foodCart.total = 0;
        //    this.foodCart.count --;
        //    this.foodCart.foodList.map(function(f){
        //        this.foodCart.total  += parseFloat(f.price)*f.num;
        //    }.bind(this));
        //
        //    localStorage.setItem("foodList",JSON.stringify(this.foodList));
        //    localStorage.setItem("foodCart",JSON.stringify(this.foodCart));
        //    this.updateStore();
        //    Debugger.log("onMinusFood foodCart = "+JSON.stringify(localStorage.foodCart));
        //    Debugger.log("onMinusFood foodList = "+JSON.stringify(localStorage.foodList));
        //},
        //onHandleCartPlus:function(food){
        //    this.foodCart.foodList.map(function(f){
        //        if(food.id == f.id) {
        //            f.num ++;
        //        }
        //    });
        //
        //    this.foodCart.total = 0;
        //    this.foodCart.count++;
        //    this.foodCart.foodList.map(function(f){
        //        this.foodCart.total  += parseFloat(f.price)*f.num;
        //    }.bind(this));
        //
        //    localStorage.setItem("foodList",JSON.stringify(this.foodList));
        //    localStorage.setItem("foodCart",JSON.stringify(this.foodCart));
        //    this.updateStore();
        //    Debugger.log("onHandleCartPlus foodCart = "+JSON.stringify(localStorage.foodCart));
        //    Debugger.log("onHandleCartPlus foodList = "+JSON.stringify(localStorage.foodList));
        //},
        //onHandleCartMinus:function(food){
        //    this.foodCart.foodList.map(function(f){
        //        if(food.id == f.id) {
        //            f.num --;
        //        }
        //    });
        //
        //    this.foodCart.count --;
        //    this.foodCart.total = 0;
        //    this.foodCart.foodList.map(function(f){
        //        this.foodCart.total  += parseFloat(f.price)*f.num;
        //    }.bind(this));
        //
        //    localStorage.setItem("foodList",JSON.stringify(this.foodList));
        //    localStorage.setItem("foodCart",JSON.stringify(this.foodCart));
        //    this.updateStore();
        //    /*Debugger.log("onHandleCartMinus foodCart = "+JSON.stringify(localStorage.foodCart));
        //    Debugger.log("onHandleCartMinus foodList = "+JSON.stringify(localStorage.foodList));*/
        //},
        //onCartClean:function(){
        //    this.foodCart.foodList = [];
        //    this.foodCart.total = 0;
        //    this.foodCart.count = 0;
        //    localStorage.setItem("foodList",JSON.stringify([]));
        //    localStorage.setItem("foodCart",JSON.stringify(this.foodCart));
        //    this.updateStore();
        //},
        onChangeFoodType:function(restId,num){
            this.foodType = num;
            this.onFetchDishList(restId,num);
        },
        onGetPages:function(){
            this.pageList=[
                1,2,3,4];
            this.updateStore();
        },
        onChangeFoodPage:function(num){
            this.pageFoodNum = num;
            this.foodListPage = this.foodList.slice((num-1)*this.eachPage,num*this.eachPage);
            this.updateStore();
        },
    });


    global.stores.orderStore = Reflux.createStore({
        listenables:[pCaterActions.orderAction],
        init:function(){
            this.dishList = [
                {name:'美味辣子鸡',price:24,num:1},{name:'西葫芦炒肉',price:20,num:1},{name:'米饭',price:1,num:1},{name:'配送费',price:2,num:1}
            ];
            this.address = {};
        },
        getInitialState:function(){
            return({
                dishList: this.dishList,
                address: this.address
            })
        },
        update:function(){
            this.trigger({
                dishList: this.dishList,
                address: this.address
            })
        },
        onChooseAddress:function(address){
            this.address = address;
            this.update();
        },
        onCreateOrder:function(data){
            Debugger.log("createOrder data = "+JSON.stringify(data));
            var url = "/order/createOrder";
            var successFunc = function(result){
                pCaterActions.resAction.cartClean();
                if(data.payType == 1)
                    this.alipay(result.outTradeNo);
                else if(data.payType == 0)
                    location.href="/personal/orderDetail/"+result.outTradeNo;
                Debugger.log("createOrder success = "+result);
            }.bind(this);
            ajaxJsonPost(url,data,successFunc);
        },
        alipay:function(outTradeNo){
            location.href  = "/alipayTest/directPay?outTradeNo="+outTradeNo+
                "&subject="+"pc美食订单";
        },
    });

    global.stores.personalStore = Reflux.createStore({
        listenables:[pCaterActions.personalAction],
        init:function(){
            this.orderList=[];
            this.addressData = [];
            this.user = {id:100000,headImg:'/assets/images/personal/head.jpeg',nickName:'张三',password:'123456',mobile:'13209090909'};
            this.collection = [];
            this.tuan = {participate:[],initiate:[],comment:[]};
            this.evaluate=[];
            this.id = 0;
            this.pinche=[];
            this.message=[];
            this.currentPage = 1;
            this.pageCount = 1;
        },
        update:function(){
            this.trigger({
                orderList: this.orderList,
                addressData:this.addressData,
                user:this.user,
                collection:this.collection,
                tuan:this.tuan,
                evaluate:this.evaluate,
                pinche:this.pinche,
                message:this.message,  //用户的留言
                pageCount:this.pageCount,
                currentPage:this.currentPage
            })
        },
        getInitialState:function(){
            if($CONF_ARCY$.id !='') this.id = $CONF_ARCY$.id;
            return({
                orderList: this.orderList,
                addressData:this.addressData,
                user:this.user,
                collection:this.collection,
                tuan:this.tuan,
                evaluate:this.evaluate,
                pinche:this.pinche,
                message:this.message,  //用户的留言
                pageCount:this.pageCount,
                currentPage:this.currentPage
            });
        },
        getUserMessage:function(){
            var url = '/user/getUserInfo?userId='+this.id;
            var successFunc = function(result){
                this.user = result.data;
                this.update();
                console.log('getUserMessage = '+JSON.stringify(result));
            }.bind(this);
            ajaxGet(url,successFunc);
        },
        getUserAddress:function(){
            var url = '/user/listAddress?userId='+this.id;
            var successFunc = function(result){
                this.addressData = result.data;
                this.update();
                //Debugger.log('getUserAddress = '+JSON.stringify(result));
            }.bind(this);
            ajaxGet(url,successFunc);
        },
        getUserCollection:function(){
            var url='/user/listByUserId?userId='+this.id;
            var successFunc = function(result){
                this.collection = result.data;
                this.update();
                //Debugger.log('getUserCollection = '+JSON.stringify(result));
            }.bind(this);
            ajaxGet(url,successFunc);
        },
        getUserOrder:function(){
            var url='/order/listByUser?userId='+this.id;
            var successFunc = function(result){
                this.orderList = result.data;
                this.update();
                //Debugger.log('getUserOrder = '+JSON.stringify(result));
            }.bind(this);
            ajaxGet(url,successFunc);
        },
        getUserTuanParticipate:function(){
            var url='/gb/participateList';
            var successFunc = function(result){
                this.tuan.participate = result;
                this.update();
                //Debugger.log('getUserCollection = '+JSON.stringify(result));
            }.bind(this);
            $.ajax({
                url:url,
                dataType:'json',
                type:'GET',
                success:function(res){
                    successFunc(res);
                }.bind(this),
                error:function(xhr,status,err){
                    console.log(xhr,status,err.toString());
                }.bind(this)
            });
        },
        getUserTuanInitiate:function(){
            var url='/gb/initiateList';
            var successFunc = function(result){
                this.tuan.initiate = result;
                this.update();
            }.bind(this);
            $.ajax({
                url:url,
                dataType:'json',
                type:'GET',
                success:function(res){
                    successFunc(res);
                }.bind(this),
                error:function(xhr,status,err){
                    console.log(xhr,status,err.toString());
                }.bind(this)
            });
        },
        getUserTuanComment:function(){
            var url='/gb/waitCommentList';
            var successFunc = function(result){
                this.tuan.comment = result;
                this.update();
            }.bind(this);
            $.ajax({
                url:url,
                dataType:'json',
                type:'GET',
                success:function(res){
                    successFunc(res);
                }.bind(this),
                error:function(xhr,status,err){
                    console.log(xhr,status,err.toString());
                }.bind(this)
            });
        },
        getUserEvaluate:function(){
            var url='/comment/listDishCommentByUser?userId='+this.id;
            var successFunc = function(result){
                this.evaluate = result.data;
                this.update();
                Debugger.log('getUserEvaluate = '+JSON.stringify(result));
            }.bind(this);
            ajaxGet(url,successFunc);
        },
        getUserPinChe:function(){
            var urlThree = "/car/FinishedInfo";
            ajaxGet(urlThree, function (res) {
                this.pinche = res.result;
                this.update();
                console.log("all  pinche = " + JSON.stringify(res.result));
            }.bind(this));
        },
        getUserMessageBoard:function(page){
            var urlThree = "/messageBoard/getUserMessage?page="+page;
            ajaxGet(urlThree, function(res){
                this.message = res.data;
                this.pageCount = res.pageCount;
                this.currentPage = res.curPage;
                this.update();
                console.log("getUserMessageBoard = " + JSON.stringify(res.data));
            }.bind(this));
        },
        onChangePersonalMessage:function(data){
            var url = "/user/modifyUserInfo?userId="+this.id+"&headImg="+data.headImg+"&tel="+data.phone;
            var successFunc = function(result){
                this.getUserMessage();
                //Debugger.log('onChangePersonalMessage = '+JSON.stringify(result));
            }.bind(this);
            ajaxGet(url,successFunc);
        },
        onModifyUserNickName:function(nickname){
            var url = "/user/modifyUserNickName?userId="+this.id+"&nickname="+nickname;
            var successFunc = function(result){
                this.getUserMessage();
                //Debugger.log('onChangePersonalMessage = '+JSON.stringify(result));
            }.bind(this);
            ajaxGet(url,successFunc);
        },
        onChangePassword:function(data){
            var url = "/customer/updatepwd";
            var successFunc = function(result){
                this.getUserMessage();
                Debugger.log('onChangePassword = '+JSON.stringify(result));
            }.bind(this);
            $.ajax({
                url:url,
                dataType:'json',
                type:'POST',
                data:data,
                success:function(data){
                    var errcode=data.errcode;
                    var errmsg=data.errmsg;
                    if(errcode == 0){
                        toastr.success("修改密码成功");
                        successFunc(data);
                    }else if(errcode == 1004019){
                        toastr.error("系统错误");
                    }else if(errcode == 1004007){
                        toastr.error("修改密码失败，请输入正确的旧密码");
                    }
                }.bind(this),
                error:function(xhr,status,err){
                    console.log(xhr,status,err.toString());
                }.bind(this)
            });
        },
        onAddAddress:function(data){
            //Debugger.log("onAddAddressStart = "+JSON.stringify(data));
            var url = "/user/addAddress?name="+data.name+"&userId="+this.id+
                '&sex='+data.sex+'&tel='+data.phone+'&address='+data.address;
            var successFunc = function(result){
                this.getUserAddress();
                //Debugger.log("onAddAddress = "+JSON.stringify(result));
            }.bind(this);
            ajaxGet(url,successFunc);
        },
        onEditAddress:function(data){
            var url = "/user/modifyAddress?name="+data.name+"&id="+data.id+
                '&sex='+data.sex+'&tel='+data.phone+'&address='+data.address;
            var successFunc = function(result){
                this.getUserAddress();
                //Debugger.log("onEditAddress = "+JSON.stringify(result));
            }.bind(this);
            ajaxGet(url,successFunc);
        },
        onDeleteAddress:function(data){
            var url = "/user/deleteAddress?id="+data.id;
            var successFunc = function(result){
                this.getUserAddress();
                //Debugger.log("onDeleteAddress = "+JSON.stringify(result));
            }.bind(this);
            ajaxGet(url,successFunc);
        },
        onCreateRefund:function(data){
            var url = "/refund/create";
            var successFunc = function(result){
                Debugger.log("onCreateRefund success "+result);
                toastr.success('创建退款成功，等待商家确认');
            }.bind(this);
            ajaxJsonPost(url,data,successFunc);
        },
        onCollectRestaurant:function(userId,restId){
            var url = '/user/collectRest?userId='+userId+'&restId='+restId;
            var successFunc = function(result){
                this.getUserCollection();
                Debugger.log("onCollect success "+JSON.stringify(result));
                toastr.success('收藏餐厅成功，可在我的收藏中查看');
            }.bind(this);
            ajaxGet(url,successFunc);
        },
        onDeleteCollectRestaurant:function(userId,restId){
            var url = '/user/deleteCollection?userId='+userId+'&restId='+restId;
            var successFunc = function(result){
                this.getUserCollection();
                Debugger.log("onDeleteCollect success "+JSON.stringify(result));
                toastr.success('取消收藏餐厅成功');
            }.bind(this);
            ajaxGet(url,successFunc);
        },
        onChangeOrDelete:function(id,index){
            var url = "/car/reEditCarInfo";
            var data={id:id};
            var successFunc = function(result){
                var old = [];
                old =this.pinche;
                this.pinche = old.slice(0,index).concat(old.slice(index+1,old.length));
                toastr.success("删除成功");
                this.update();
            }.bind(this);
            ajaxJsonPost(url, data, successFunc);
        },
        onUploadPicture:function(){

        },
    });


    global.stores.orderDetailStore =Reflux.createStore({
        listenables:[pCaterActions.orderAction],
        init:function(){
            this.orderId="";
            this.order = {};
            this.restaurant={id:"1",name:"Cyrielle的美食",url:"/assets/images/catering/cyrielle.jpeg"};
            this.foods =[{name:"套餐一",url:"/assets/images/catering/taocan1.jpg",num:"1",money:"15"}];
            this.user={name:"Arcy",phone:"1234567890",address:"国贸一号楼",method:"在线支付",time:"2015-12-14"};
        },
        getInitialState:function(){
            return{
                order:this.order,
                restaurant:this.restaurant,
                foods:this.foods,
                user:this.user
            }
        },
        updateStore:function(){
            this.trigger({
                order:this.order,
                restaurant:this.restaurant,
                foods:this.foods,
                user:this.user
            })
        },
        onGetDetail:function(orderId){
            var url = "/order/listById?orderId="+orderId;
            var successFunc = function(result){
                this.foods = result.dishes;
                this.restaurant = result.restaurant;
                this.order = result.order;
                console.log("@@@@ " +JSON.stringify(this.foods));
                this.updateStore();
            }.bind(this);
            ajaxGet(url,successFunc);
        },
        confirmOrder:function(){   //确认收货
            var orderId = this.order.id;
            var url = '/order/confirmOrder?orderId='+orderId;
            var successFunc = function(result){
                this.onGetDetail(orderId);
                Debugger.log("confirmOrder success "+JSON.stringify(result));
            }.bind(this);
            ajaxGet(url,successFunc);
        },
        onCancelOrder:function(data){
            var url = '/order/changeOrderState';
            var successFunc = function(result){
                Debugger.log("onCancelOrder success "+result);
                toastr.success('取消订单成功');
            }.bind(this);
            ajaxJsonPost(url,data,successFunc);
        },
        onRefundOrder:function(data){  //申请退单
            var url = '/order/changeOrderState';
            var successFunc = function(result){
                Debugger.log("onRefundOrder success "+result);
                toastr.success('申请退单成功');
            }.bind(this);
            ajaxJsonPost(url,data,successFunc);
        },
        orderUpdate:function(){
            var state = this.order.state;
            if(state == 1 || state == 5 || state == 8){
                var orderId = this.order.id;
                this.onGetDetail(orderId);
            }
        },
    });

    global.stores.orderEvaluateStore = Reflux.createStore({
        listenables:[pCaterActions.orderEvaluateAction],
        init:function(){
            this.order = {};
            this.restaurant={id:"1",name:"Cyrielle的美食",url:"/assets/images/catering/cyrielle.jpeg"};
            this.foods =[{name:"套餐一",url:"/assets/images/catering/taocan1.jpg",num:"1",money:"15"}];
            this.resNum = [0,0];
            this.listNumber =['1','2','3','4','5'];
            this.listId=["res","time"];
            this.colorList=["#a3a6af","#a3a6af","#f3b518","#f18b1b","#eb6643"];
            this.words = ["点击星星打分","极差","失望","一般","满意","惊喜"];
            this.timeList = ["点击星星选择时间","20分钟","40分钟","60分钟","80分钟","100分钟"];
        },
        getInitialState:function(){
            return{
                order:this.order,
                restaurant:this.restaurant,
                foods:this.foods,
                resNum:this.resNum,
                listNumber:this.listNumber,
                listId:this.listId,
                colorList:this.colorList,
                words:this.words,
                timeList:this.timeList,
            }
        },
        updateStore:function(){
            this.trigger({
                order:this.order,
                restaurant:this.restaurant,
                foods:this.foods,
                resNum:this.resNum,
                listNumber:this.listNumber,
                listId:this.listId,
                colorList:this.colorList,
                words:this.words,
                timeList:this.timeList,
            })
        },
        onSubmitEvaluation:function(suggest){
            var url="/comment/createComment";
            var speed = parseInt(this.timeList[this.resNum[1]].substring(0,2));
            var score = [];
            var resNum = this.resNum;
            $.map(this.foods,function(food,index){
                var foodScore = food.dishId+";"+ resNum[parseInt(index+2)];
                score.push(foodScore);
            });
            var data={orderId:this.order.id,userId:parseInt($CONF_ARCY$['id']),userName:$CONF_ARCY$['nickName'],storeId:this.restaurant.id,
                attitude:parseInt(resNum[0]),speed:speed,score:score,content:suggest};
            var successFunc = function (result) {
                toastr.success("成功");
                history.back();
            }.bind(this);
            ajaxJsonPost(url, data, successFunc);
        },
        onChangeResNum:function(num,flag){
            this.resNum[flag] = num;
            this.updateStore();
        },
        onGetDetail:function(orderId){
            var url = "/order/listById?orderId="+orderId;
            var successFunc = function(result){
                this.foods = result.dishes;
                this.restaurant = result.restaurant;
                this.order = result.order;
                console.log("foods " + JSON.stringify(this.foods));
                console.log("restaurant " + JSON.stringify(this.restaurant));
                console.log("order " + JSON.stringify(this.order));
                $.map(this.foods,function(food){
                    this.listId.push(food.id);
                    this.resNum.push(0);
                }.bind(this));
                this.updateStore();
            }.bind(this);
            ajaxGet(url,successFunc);
        },
    });


    global.stores.participateUserStore = Reflux.createStore({
        init:function(){
            this.id = 0;
            this.user = [];
        },
        getInitialState:function(){
            console.log("init init init");
            return({
                id:this.id,
                user:this.user
            });
        },
        update:function(){
            this.trigger({
                id:this.id,
                user:this.user
            })
        },

        participateUser:function(id){
            var url='/gb/participateUser?gbId='+id;
            console.log(url);
            var successFunc = function(result){
                this.id = id;
                this.user = result;
                this.update();
                Debugger.log('getParticipateUser = '+JSON.stringify(result));
            }.bind(this);
            $.ajax({
                url:url,
                dataType:'json',
                type:'GET',
                success:function(res){
                    successFunc(res);
                }.bind(this),
                error:function(xhr,status,err){
                    console.log(xhr,status,err.toString());
                }.bind(this)
            });
        }
    });

    global.stores.tuanEvaluationStore = Reflux.createStore({
        init:function(){
            this.info = {};
            this.score = 0;
            this.listNumber =['1','2','3','4','5'];
            this.colorList=["#a3a6af","#a3a6af","#f3b518","#f18b1b","#eb6643"];
            this.words = ["","极差","失望","一般","满意","惊喜"];
        },
        updateStore: function () {
            this.trigger({
                info:this.info,
                score:this.score,
                listNumber:this.listNumber,
                colorList:this.colorList,
                words:this.words
            })
        },
        getInitialState: function () {
            return {
                info:this.info,
                score:this.score,
                listNumber:this.listNumber,
                colorList:this.colorList,
                words:this.words
            }
        },
        fetchDetail: function(id){
            var url = "/gb/info?gbId=" + id;
            console.log("fetch detail--"+url);
            ajaxGet(url, function(gb){
                console.log("get message--"+gb);
                this.info = {gbId: gb.gbId, subject: gb.subject, subscribe: gb.subscribe, img: gb.img};
                console.log("!!!!! " + JSON.stringify(this.info));
                this.score = 0;
                this.updateStore();
            }.bind(this));
        },
        changeScore:function(num){
            this.score = num;
            this.updateStore();
        },
        submitComment: function (suggest) {
            var url="/gb/comment?gbId="+this.info.gbId;
            var data={score:this.score,comment:suggest};
            console.log(JSON.stringify(data));
            var successFunc = function (result) {
                swal({
                    title: "评价成功",
                    type: "success",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确定",
                },function(){history.back();});
            }.bind(this);
            ajaxJsonPost(url, data, successFunc);
        }
    });
    toastr.options={
        "positionClass": "toast-top-center",
        "hideDuration": "1000"
    };

}(window.React, window.ReactRouter, window.Reflux, window));