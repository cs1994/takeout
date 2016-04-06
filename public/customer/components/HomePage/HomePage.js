/**
 * Created by caoshuai on 2016/4/6.
 */
import { connect } from 'react-redux'
import React, { Component,PropTypes  } from 'react'
//import { fetchSliders,deleteSliders,changeSliderOrders } from '../../actions/sliders/action.js'
import CateringContent from './CateringContent.js'
import CateringHeader from './CateringHeader.js'

const contextTypes =  {
    router: React.PropTypes.object
};
export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount(){
        this.props.dispatch(fetchSliders());
    }

    render() {

        //console.log("!!!!!!!!"¡¡+ JSON.stringify(this.props.sliderList));
        return (
            <div >
                <CateringHeader />
                <CateringContent />
            </div>
        );
    }
}
HomePage.contextTypes = contextTypes;
HomePage.propTypes = {
    //sliderList:PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};

function getStoreList(state){
    return{
        //sliderList: state.manageSlider.sliderList?state.manageSlider.sliderList:[]
    }
}
export default connect(getStoreList)(HomePage)