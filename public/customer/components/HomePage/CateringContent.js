/**
 * Created by caoshuai on 2016/4/6.
 */

import { connect } from 'react-redux'
import React, { Component,PropTypes  } from 'react'
import RestaurantList from "./RestaurantList.js"

/**
 * µ¼º½À¸
 * */
export default class CateringContent extends Component{

    changeResType(num){
        var divId = "#type" + this.state.data.resType;
        var id = "#type" + num;
        $(divId).css("color","#fff");
        $(id).css("color","#a6873e");
        pCaterActions.firstAction.changeResType(num);
        $('#searchInput').val('');
        $('#footer').show();
    }
    render(){
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
                <RestaurantList />
                {
                    //<components.CateringFooter />
                }

            </div>
        )
    }
}
