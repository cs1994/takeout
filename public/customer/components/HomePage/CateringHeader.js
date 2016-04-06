/**
 * Created by caoshuai on 2016/4/6.
 */
import { connect } from 'react-redux'
import React, { Component,PropTypes  } from 'react'
/**
 * ������
 * */
export default class CateringHeader extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount(){
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
    }
    componentWillUnmount(){
        $(window).unbind();
    }
    filterRes(num){
        var id ="#filter" + num;
        $('#filter0').css("color","#505050");
        $('#filter1').css("color","#505050");
        $('#filter2').css("color","#505050");
        $('#filter3').css("color","#505050");
        $('#filter4').css("color","#505050");
        $(id).css("color","#a6873e");
        //pCaterActions.firstAction.fetchRestaurantList(null,null,num);
    }
    sequeceRes(num){
        var id ="#seq" + num;
        $('#seq0').css("color","#505050");
        $('#seq1').css("color","#505050");
        $('#seq2').css("color","#505050");
        $('#seq3').css("color","#505050");
        $('#seq4').css("color","#505050");
        $(id).css("color","#a6873e");
        //pCaterActions.firstAction.fetchRestaurantList(null,num,null);
    }
    unfoldFilter(){
        $("#filter").toggle(0);
    }
    unfoldSeq(){
        $("#sequence").toggle(0);
    }
    handleKeydown(event){
        if(event.keyCode == 13) {
            $('#footer').show();
            var input = this.refs.searchInput.getDOMNode().value;
            if (input != '') $('#footer').hide();
            //pCaterActions.firstAction.searchRestaurant(input);
        }
    }
    handleChange(){
        $('#footer').show();
        var input  = this.refs.searchInput.getDOMNode().value;
        if(input != '')  $('#footer').hide();
        //pCaterActions.firstAction.searchRestaurant(input);
    }
    render(){
        return(
            <div className="header" style={{}}>
                <img  src="/assets/images/catering/pc/header.png" alt=""/>
                <div style={{width:'1280px',margin:'auto'}}>
                    <input onKeyDown={this.handleKeydown} type="text" ref="searchInput" id="searchInput" placeholder="�������������"/>
                    <i className="fa fa-search search" onClick={this.handleChange}></i>
                    <div id="headerFoot" className="headerFoot">
                        <div className="square" style={{bottom:"40px"}} onMouseEnter={this.unfoldFilter}
                             onMouseLeave={this.unfoldFilter}>
                            <h5>ɸѡ<i className="fa fa-angle-right"></i></h5>
                            <div id="filter" className="filter">
                                <p onClick={this.filterRes.bind(this,0)} id="filter0">ȫ��</p>
                                <p onClick={this.filterRes.bind(this,1)} id="filter1">����</p>
                                <p onClick={this.filterRes.bind(this,2)} id="filter2">��Ʒ�ػ�</p>
                                <p onClick={this.filterRes.bind(this,3)} id="filter3">������Ӧ</p>
                                <p onClick={this.filterRes.bind(this,4)} id="filter4">֧���Ż�ȯ</p>
                            </div>
                        </div>
                        <div className="square" style={{bottom:0}} onMouseEnter={this.unfoldSeq}
                             onMouseLeave={this.unfoldSeq}>
                            <h5>���� <i className="fa fa-angle-right"></i></h5>
                            <div id="sequence" className="sequence">
                                <p onClick={this.sequeceRes.bind(this,0)} id="seq0">Ĭ��</p>
                                {/*<p onClick={this.sequeceRes.bind(this,1)} id="seq1">����</p>*/}
                                <p onClick={this.sequeceRes.bind(this,2)} id="seq2">���ͼ�</p>
                                <p onClick={this.sequeceRes.bind(this,3)} id="seq3">�Ͳ��ٶ�</p>
                                {/*<p onClick={this.sequeceRes.bind(this,4)} id="seq4">����</p>*/}
                            </div>
                        </div>

                        {/*<div id="filter" className="filter">
                         <p onClick={this.filterRes.bind(this,1)} id="filter1">����</p>
                         <p onClick={this.filterRes.bind(this,2)} id="filter2">��Ʒ�ػ�</p>
                         <p onClick={this.filterRes.bind(this,3)} id="filter3">������Ӧ</p>
                         <p onClick={this.filterRes.bind(this,4)} id="filter4">֧���Ż�ȯ</p>
                         </div>
                         <div id="sequence" className="sequence">
                         <p onClick={this.sequeceRes.bind(this,1)} id="seq1">����</p>
                         <p onClick={this.sequeceRes.bind(this,2)} id="seq2">���ͼ�</p>
                         <p onClick={this.sequeceRes.bind(this,3)} id="seq3">�Ͳ��ٶ�</p>
                         <p onClick={this.sequeceRes.bind(this,4)} id="seq4">����</p>
                         </div>*/}
                    </div>
                </div>
            </div>
        )

    }
}