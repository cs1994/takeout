/**
 * Created by hebenpc on 2015/12/11.
 */
var Debugger={};
Debugger.log  = function(message){
    try{
        console.log(message);
    } catch(exception) {
        return exception;
    }
};

var ButtonBox=React.createClass({
    handleClick:function(){
        this.props.click();
    },
    render:function(){
        var backgroundColor = this.props.backgroundColor;
        var width = this.props.width;
        var content = this.props.content;
        var style={width:width,backgroundColor:backgroundColor};
        //console.log("style = "+JSON.stringify(style));
        return(
            <button type="button" className="btn btn-block" id="personal-button"
                    style={{margin:'50px auto',height:'50px',width:width,backgroundColor:backgroundColor}}
                onClick={this.handleClick}>{content}</button>
        )
    }
});


var BootstrapModalPC=React.createClass({
    propTypes: {
        id: React.PropTypes.number.isRequired
    },
    open:function(){
        $(this.getDOMNode()).modal('show');
    },
    close:function(){
        $(this.getDOMNode()).modal('hide');
    },
    confirm:function(){
        this.props.onConfirm();
    },
    render:function(){
        return(
            <div className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content" style={{margin:'auto',width:'500px'}}>
                        <div className="modal-header">
                            <a className="close" data-dismiss="modal">×</a>
                            <h3>{this.props.title}</h3>
                        </div>
                        <div className="modal-body">
                            {this.props.children}
                        </div>
                        <div className="modal-footer">
                            <a className="btn btn-default" onClick={this.close}>取消</a>
                            <a className="btn btn-success" onClick={this.confirm}>确定</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});


var BootstrapModalMobile=React.createClass({
    propTypes: {
        id: React.PropTypes.number.isRequired
    },
    open:function(){
        $(this.getDOMNode()).modal('show');
    },
    close:function(){
        $(this.getDOMNode()).modal('hide');
    },
    confirm:function(){
        this.props.onConfirm();
    },
    render:function(){
        return(
            <div className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content" style={{margin:'auto',width:'80%'}}>
                        <div className="modal-header">
                            <h3>{this.props.title}</h3>
                        </div>
                        <div className="modal-body">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});


var BootstrapModalMobileSecond=React.createClass({
    propTypes: {
        id: React.PropTypes.number.isRequired
    },
    open:function(){
        $(this.getDOMNode()).modal('show');
    },
    close:function(){
        $(this.getDOMNode()).modal('hide');
    },
    confirm:function(){
        this.props.onConfirm();
    },
    render:function(){
        return(
            <div className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content" style={{margin:'auto',width:'100%'}}>
                        <div className="modal-header">
                            <h3>{this.props.title}</h3>
                        </div>
                        <div className="modal-body">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});
