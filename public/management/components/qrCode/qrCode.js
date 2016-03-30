/**
 * Created by caoshuai on 2016/3/23.
 */

import { connect } from 'react-redux'
import React, { Component,PropTypes  } from 'react'
import {isAllowedPic} from "../carousel/CarouselUpload.js"
import {fetchCodes} from '../../actions/qrCode/actions.js'

const picRoute = "http://10.1.29.250:30226/hestia/files/download/OnlyForTest/";
const contextTypes =  {
    router: React.PropTypes.object
};
export default class QrCodeContent extends Component {
    constructor(props) {
        super(props);
        this.handleUserPicChange=this.handleUserPicChange.bind(this);
    }
    componentDidMount(){
        this.props.dispatch(fetchCodes());

    }
    handleUserPicChange(id,index,description){
        var files = $('#userPic')[0].files;
        var formData = new FormData();
        formData.append('imgFile', files[0]);
        if(files.length > 0){
            if(isAllowedPic(files[0].type, files[0].size)){
                var url = "/facew/picture/upload";

                var success = function(res){
                    console.log(res);
                    if(res.errCode == 0){

                        console.log("@@@@@@@@ src" +JSON.stringify(res))
                        toastr.options = {
                            "positionClass": "toast-top-center",
                            "hideDuration": "10000",
                        };
                        var msg = '<div><button type="button" id="cancelBtn" class="btn btn-primary">取消</button>' +
                            '<button type="button" id="sureBtn" class="btn" style="margin: 0 8px 0 8px">更换</button></div>';
                        var $toast = toastr.warning(msg, "是否更换二维码？");
                        if ($toast.find('#cancelBtn').length) {
                            $toast.delegate('#cancelBtn', 'click', function () {
                                $toast.remove();
                            });
                        }
                        if ($toast.find('#sureBtn').length) {
                            $toast.delegate('#sureBtn', 'click', function () {
                                var url = "/facew/carousel/updateWholeNew";
                                var successFunc = function(result){
                                    toastr.success("修改成功！");
                                    let imgId = "#erImg" +index;
                                    $(imgId).attr("src",picRoute+res.result);
                                }.bind(this);
                                var postData = {id:id,url:" ",description:description,pictureUrl:res.result,pictype :3,order:0};
                                console.log("postDta@@ " +JSON.stringify(postData));
                                console.log("postDta@@ " +description);
                                ajaxJsonPost(url,postData,successFunc);
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
    }


    render() {
        const {codeList} = this.props;
        console.log("!!!!!!!!!!!! " +JSON.stringify(codeList))
        return (
            <div className="pageheader">
                <h2><i className="fa fa-tachometer"></i> 二维码管理
                </h2>
                <section className="tile">
                    <div className="tile-header">
                        <table className="table tale-condensed">
                            <thead>
                            <tr>
                                <th>名称</th>
                                <th>图片</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {$.map(codeList,function(code,index){
                                return(
                                    <tr>
                                        <td>{code.description}</td>
                                        <td><img style={{height:"120px",width:"120px"}} src={picRoute+code.pictureUrl} id={"erImg"+index}/></td>
                                        <td></td>
                                        <td>
                                            <div>
                                                <input type="file" id="userPic"  className="qrCodeInput"
                                                       onChange={this.handleUserPicChange.bind(this,code.id,index,code.description)}/>
                                                <div className="btn btn-success"><i className="fa fa-hand-o-up"></i>替换</div>&nbsp;&nbsp;
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }.bind(this))
                            }
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        );
    }
}
QrCodeContent.contextTypes = contextTypes;
QrCodeContent.propTypes = {
    codeList:PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};

function getQrcode(state){
    return{
        codeList: state.manageCode?state.manageCode:[]
    }
}
export default connect(getQrcode)(QrCodeContent)