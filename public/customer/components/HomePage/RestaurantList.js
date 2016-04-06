/**
 * Created by caoshuai on 2016/4/6.
 */
import { connect } from 'react-redux'
import React, { Component,PropTypes  } from 'react'
/**
 * 餐厅列表
 * */
const contextTypes =  {
    router: React.PropTypes.object
};
export default class RestaurantList extends Component{
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        var tag = null,
            sort = null,
            filter = null;
        if(this.getQuery().flag) tag = parseInt(this.getQuery().flag);
        //pCaterActions.firstAction.fetchRestaurantList(tag, sort, filter);
        //pCaterActions.firstAction.fetchRestaurantFenlei();
    }
    goToRes(num){
        var path = "/restaurant/" +num;
        this.transitionTo(path);
    }
    render(){
        const {restaurantList} = this.props;
        return(
            <div className="resList">
                {restaurantList.map(function(res,index){
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
                }.bind(this))}
            </div>
        )
    }
}
RestaurantList.contextTypes = contextTypes;
RestaurantList.propTypes = {
    restaurantList:PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};

function getRestaurantList(state){
    return{
        restaurantList: state.restaurantList?state.restaurantList:[]
    }
}
export default connect(getRestaurantList)(RestaurantList)