/**
 * Created by caoshuai on 2016/4/18.
 */

import { connect } from 'react-redux'
import React, { Component,PropTypes  } from 'react'
//import Modal from '../../../javascripts/common/modal.js'
import {isAllowedPic,getFormJson} from "../../javascripts/common/function.js"
import {addRestaurant,fetchAllFoodClassify} from "../actions/storeUser/actions.js"

/**
 * 餐厅主人列表
 * */
const contextTypes =  {
    router: React.PropTypes.object
};
export default class AddRestaurant extends Component{
    constructor(props) {
        super(props);
        this.submit=this.submit.bind(this);
    }
    componentWillMount(){
        this.props.dispatch(fetchAllFoodClassify())
    }
    handlePicFileChange(e){
        e.preventDefault();
        var files = $('#picURLInput')[0].files;
        var formData = new FormData();
        formData.append('imgFile', files[0]);
        if(files.length > 0 && isAllowedPic(files[0].type, files[0].size)){
            var url = "/admin/catering/restaurant/pic";

            var success = function(res){
                //console.log(res);
                if(res.errCode == 0){
                    toastr.success("上传成功");
                    //$('input[name=pic]').val(res.url);
                    $('#picURLImg').attr("src", res.url);
                } else{
                    console.log("########" +res.msg)
                    toastr.error(res.msg);
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
                    //console.log(xhr,status,err.toString());
                    toastr.error(err);
                }

            });
        }
        else{
            toastr.warning("请选择大小在1M以内的图片文件!!");
        }
    }
    submit(evt){
        evt.preventDefault();
        //var formData = new FormData($("#newDishForm")[0]);
        var formData = getFormJson($('#newDishForm')[0]);
        var pic = $('#picURLImg').attr("src");
        //if(pic != ""){
        formData.pic = pic;
        //}

        if(formData.name == "" || formData.description == "" || formData.tel == "" || formData.pic == "" || formData.address == "" || formData.basePrice == ""
            || formData.packFee == "" || formData.duringTime == ""){
            toastr.warning("必填项有空");
            return false;
        }

        formData.ownId = parseInt(this.props.location.query.id);
        formData.basePrice = parseFloat(formData.basePrice);
        formData.packFee = parseFloat(formData.packFee);
        formData.duringTime = parseInt(formData.duringTime);
        formData.category = parseInt(formData.category);
        formData.openingTime = "";
        console.log("####formdata" +JSON.stringify(formData))
        this.props.dispatch(addRestaurant(formData))
    }

    render(){
        const {storeUserList,resTags} = this.props;
        return(
            <div id="RestaurantAdd">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-md-offset-3">
                            <form id="newDishForm">
                                <fieldset>
                                    <div id="legend" className="">
                                        <legend className="">新建餐厅</legend>
                                    </div>
                                    <div className="form-group">
                                        <label for="category">所属类别(必填)</label>
                                        <select className="form-control" id="category" name="category">
                                            {
                                                resTags.map(function(e){
                                                return(
                                                    <option value={e.id}>{e.tagName}</option>
                                                )
                                            }.bind(this))
                                            }
                                        </select>
                                        <p className="help-block">餐厅主营归类</p>

                                    </div>
                                    <div className="form-group">
                                        <label for="dishName">名称(必填, 20字以内)</label>
                                        <input type="text" className="form-control" id="name"
                                               name="name" placeholder="" maxLength="20"/>
                                        <p className="help-block">一个好的名字有利于顾客记住</p>

                                    </div>
                                    <div className="form-group">
                                        <label for="dishPic">Logo图片(必填,{"<"}1M)</label>
                                        <input type="file" id="picURLInput"  onChange={this.handlePicFileChange}/>
                                        <img id="picURLImg" src="" alt="" width="100" height="100"/>
                                        <p className="help-block">此图将作为餐厅的Logo, 最佳尺寸:宽高比1:1, 推荐100px*100px</p>
                                    </div>
                                    <div className="form-group">
                                        <label for="address">地址(必填, 50字以内)</label>
                                        <input type="text" className="form-control" id="address"
                                               name="address" placeholder="" maxLength="50"/>
                                        <p className="help-block"></p>

                                    </div>
                                    <div className="form-group">
                                        <label for="tel">联系电话(必填)</label>
                                        <input type="text" className="form-control" id="tel"
                                               name="tel" placeholder="" maxLength="50"/>
                                        <p className="help-block"></p>

                                    </div>
                                    <div className="form-group">
                                        <label for="dishDesc">简介(必填, 500字以内)</label>
                                            <textarea type="text" className="form-control" id="description"
                                                      name="description" maxLength="500" rows="5" placeholder=""/>
                                        <p className="help-block">对此餐厅的简单的描述,来让顾客快速了解该餐厅</p>

                                    </div>

                                    <div className="form-group">
                                        <label for="basePrice">起送价(必填)</label>
                                        <input type="number" className="form-control" id="basePrice"
                                               name="basePrice" placeholder=""/>
                                        <p className="help-block"></p>

                                    </div>
                                    <div className="form-group">
                                        <label for="packFee">配送费(必填)</label>
                                        <input type="number" className="form-control" id="packFee"
                                               name="packFee" placeholder=""/>
                                        <p className="help-block"></p>

                                    </div>
                                    <div className="form-group">
                                        <label for="duringTime">平均送达时间(必填,单位:分钟)</label>
                                        <input type="number" className="form-control" id="duringTime"
                                               name="duringTime" placeholder=""/>
                                        <p className="help-block">从接单到送到客户手中的平均所用时间</p>

                                    </div>

                                    <button type="submit" className="btn btn-success btn-block"
                                           onClick={this.submit} >提交</button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}
AddRestaurant.contextTypes = contextTypes;
AddRestaurant.propTypes = {
    storeUserList:PropTypes.array.isRequired,
    resTags:PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};

function getRestaurantList(state){
    return{
        storeUserList: state.manageStorers.storeUserList?state.manageStorers.storeUserList:[],
        resTags: state.manageStorers.resTags?state.manageStorers.resTags:[]
    }
}
export default connect(getRestaurantList)(AddRestaurant)