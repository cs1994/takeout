/**
 * Created by caoshuai on 2015/12/15.
 */

(function(Reflux, global) {

    global.pCaterActions={};
    global.pCaterActions.firstAction = Reflux.createActions([
        'fetchRestaurantList',
        'fetchRestaurantFenlei',
        'changePageNum',
        'changeResType',
        'searchRestaurant'
    ]);

    global.pCaterActions.resAction = Reflux.createActions([
        'fetchRestaurantInfo',  //fetch basic information of a restaurant given.
        'fetchDishLeibieList',  //fetch dish kinds list of a restaurant given.
        'fetchDishList',

        'buyFood',   //buy food
        'minusFood',   //minus food
        'getResInfo',   //get restaurant information
        'handleCartPlus',   //shopping cart plus food
        'handleCartMinus',   //shopping cart plus food
        'cartClean',         //clean the shopping cart
        'changeFoodType',         // change food type
        'getPages',         // get food pages
        'changeFoodPage',         // change food page
    ]);

    global.pCaterActions.orderAction = Reflux.createActions([
        'choseTime',       //Select food delivery time
        'getNote',         //get The user's remarks
        'selectTime',       //asset select arrive time
        'chooseAddress',
        "getDetail",       //get order detail
        'createOrder',
        'createRefund',
        'cancelOrder',
        'refundOrder'
    ]);

    global.pCaterActions.personalAction = Reflux.createActions([
        'changePersonalMessage',
        'addAddress',
        'deleteAddress',
        'editAddress',
        'uploadPicture',
        'collectRestaurant',
        'deleteCollectRestaurant',
        'modifyUserNickName',
        'changePassword',
        'changeOrDelete'
    ]);
    global.pCaterActions.orderEvaluateAction = Reflux.createActions([
        "getDetail",       //get order detail
        "changeResNum",       //
        "submitEvaluation",       //
    ]);

}(window.Reflux, window));