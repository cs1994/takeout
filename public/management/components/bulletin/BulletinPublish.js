/**
 * Created by caoshuai on 2016/3/20.
 */

import { connect } from 'react-redux'
import React, { Component,PropTypes  } from 'react'
import { Link } from 'react-router'
import { addBulletin,getBulletinDetails,updateBulletin} from '../../actions/bulletin/actions.js'

const picRoute = "http://10.1.29.250:30226/hestia/files/download/OnlyForTest/";

export default class BulletinPublish extends Component {
    constructor(props) {
        super(props);
        this.createUE= this.createUE.bind(this);
        this.destroyUE= this.destroyUE.bind(this);
        this.handleClickSubmit = this.handleClickSubmit.bind(this);
    }
    componentWillMount(){
        //console.log("############## " + JSON.stringify(this.props.location.query));
        if(JSON.stringify(this.props.location.query) !="{}"){
            const query = this.props.location.query
            //console.log("!!!!!!11111 " +JSON.stringify(query));
            this.props.dispatch(getBulletinDetails(query.bulletinId))
        }
    }
    componentDidUpdate(){
        const {bulletinDetail} = this.props;
        if(JSON.stringify(bulletinDetail) != "{}"){
            $('#title').val(bulletinDetail.title);
            $('#summary').val(bulletinDetail.summary);
            $('#author').val(bulletinDetail.author);
            $('#ueditor').html(bulletinDetail.text);
            //$("iframe").contents().find("body.view").html(bulletinDetail.text);
            //console.log("!!!!!!!!!!bulletinDetail " + JSON.stringify(bulletinDetail))
        }
    }
    componentDidMount(){
        this.createUE();
    }
    componentWillUnmount(){
        this.destroyUE();
    }
    createUE(){
        UM.getEditor("ueditor", {
            autoHeightEnabled: false,
            initialFrameHeight: 400,
            initialFrameWidth:900,
            imagePath: "",
            imageUrl: "/facew/pictureue/upload",
            imageMaxSize: 1024000,
            imageFieldName:"imgFile"
            //toolbars: [
            //    [
            //        'source', //源代码
            //        //'anchor', //锚点
            //        'undo', //撤销
            //        'redo', //重做
            //        'bold', //加粗
            //        'indent', //首行缩进
            //        //'snapscreen', //截图
            //        'italic', //斜体
            //        'underline', //下划线
            //        'strikethrough', //删除线
            //        'subscript', //下标
            //        'fontborder', //字符边框
            //        'superscript', //上标
            //        'formatmatch', //格式刷
            //        'blockquote', //引用
            //        'pasteplain', //纯文本粘贴模式
            //        'selectall', //全选
            //        //'print', //打印
            //        'preview', //预览
            //        'horizontal', //分隔线
            //        'removeformat', //清除格式
            //        'time', //时间
            //        'date', //日期
            //        'unlink', //取消链接
            //        'insertrow', //前插入行
            //        'insertcol', //前插入列
            //        'mergeright', //右合并单元格
            //        'mergedown', //下合并单元格
            //        'deleterow', //删除行
            //        'deletecol', //删除列
            //        'splittorows', //拆分成行
            //        'splittocols', //拆分成列
            //        'splittocells', //完全拆分单元格
            //        'deletecaption', //删除表格标题
            //        'inserttitle', //插入标题
            //        'mergecells', //合并多个单元格
            //        'deletetable', //删除表格
            //        'cleardoc', //清空文档
            //        'insertparagraphbeforetable', //"表格前插入行"
            //        //'insertcode', //代码语言
            //        'simpleupload', //单图上传
            //        'insertimage', //多图上传
            //        'edittable', //表格属性
            //        'edittd', //单元格属性
            //        'link', //超链接
            //        //'emotion', //表情
            //        //'spechars', //特殊字符
            //        'searchreplace', //查询替换
            //        //'map', //Baidu地图
            //        //'gmap', //Google地图
            //        //'insertvideo', //视频
            //        //'help', //帮助
            //        'justifyleft', //居左对齐
            //        'justifyright', //居右对齐
            //        'justifycenter', //居中对齐
            //        'justifyjustify', //两端对齐
            //        'forecolor', //字体颜色
            //        'backcolor', //背景色
            //        'insertorderedlist', //有序列表
            //        'insertunorderedlist', //无序列表
            //        'fullscreen', //全屏
            //        'directionalityltr', //从左向右输入
            //        'directionalityrtl', //从右向左输入
            //        'rowspacingtop', //段前距
            //        'rowspacingbottom', //段后距
            //        'pagebreak', //分页
            //        'insertframe', //插入Iframe
            //        'imagenone', //默认
            //        'imageleft', //左浮动
            //        'imageright', //右浮动
            //        //'attachment', //附件
            //        'imagecenter', //居中
            //        //'wordimage', //图片转存
            //        'lineheight', //行间距
            //        'edittip ', //编辑提示
            //        'customstyle', //自定义标题
            //        'autotypeset', //自动排版
            //        'fontfamily', //字体
            //        'fontsize', //字号
            //        'paragraph', //段落格式
            //        //'webapp', //百度应用
            //        'touppercase', //字母大写
            //        'tolowercase', //字母小写
            //        //'background', //背景
            //        //'template', //模板
            //        //'scrawl', //涂鸦
            //        //'music', //音乐
            //        'inserttable', //插入表格
            //        'drafts', // 从草稿箱加载
            //        'charts', // 图表
            //    ]
            //
            //]
        });
    }

    destroyUE(){
        UM.getEditor('ueditor').destroy();
    }
    handleClickSubmit(e){
        e.preventDefault();
        var title = $('#title').val().trim();
        var author = $('#author').val().trim();
        var summary = $('#summary').val().trim();
        var content = UM.getEditor("ueditor").getContent();

        if(title == "" || author == "" || summary == "" || content == ""){
            toastr.warning("必填项有空,请检查");
            return;
        }

        var postData = {title: title,summary: summary, author: author, useable:1, text: content};
        //console.log("###############!!!!!!!!!!! " + content);
        if(JSON.stringify(this.props.location.query) !="{}"){
            const query = this.props.location.query
            this.props.dispatch(updateBulletin(query.bulletinId,postData,query.index))
        }
        else this.props.dispatch(addBulletin(postData));
    }
    render() {
        //console.log("$$$$$$$$####" +this)
        //var {bulletinList} = this.props;
        //console.log("$$$$$$" +JSON.stringify(bulletinList));
        return (
            <div className="tile-header">
                <h2 className="uploadButton">
                    <div className="btn btn-success" >
                        <i className="fa fa-plus"></i>
                        <Link to="/bulletin">返回</Link>
                    </div>
                </h2>
                <p>新建快报</p>
                <form>
                    <fieldset>
                        <div className="form-group">
                            <label for="title"> 标题(必填, 100字以内)</label>
                            <input type="text" className="form-control" id="title"
                                   name="title" placeholder="" maxLength="100"/>
                            <p className="help-block"></p>

                        </div>
                        <div className="form-group">
                            <label for="summary"> 摘要(必填,500字以内)</label>
                            <input type="text" className="form-control" id="summary"
                                   name="summary" placeholder="" maxLength="500"/>
                            <p className="help-block"></p>

                        </div>
                        <div className="form-group">
                            <label for="author">发布者(必填,50字以内)</label>
                            <input type="text" className="form-control" id="author"
                                   name="author" placeholder="" maxLength="50"/>
                            <p className="help-block"></p>
                        </div>
                        <div className="form-group">
                            <label for="content">内容(必填)</label>
                            <script id="ueditor" className="ueditor" name="content" type="text/plain">
                            </script>
                            {/*<textarea type="text" className="form-control" id="description"
                             name="content" rows="3" placeholder=""/>*/}
                            <p className="help-block"></p>
                        </div>

                        <button type="submit" className="btn btn-success btn-block"
                                onClick={this.handleClickSubmit}>提交</button>
                    </fieldset>

                </form>
            </div>
        );
    }
}
BulletinPublish.propTypes = {
    bulletinDetail:PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

function getBulletinList(state){
    return{
        bulletinDetail: state.bulletin.bulletinDetail?state.bulletin.bulletinDetail:{}
    }
}
export default connect(getBulletinList)(BulletinPublish)