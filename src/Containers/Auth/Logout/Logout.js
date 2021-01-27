import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import * as actions from '../../../Store/Actions/Index';
import {connect} from 'react-redux';
class Logout extends Component {
    componentDidMount(){
        this.props.onLogout(this.props.history);
    }
    render(){
        return (
         <Redirect to ='/'/>
        )
    }
}

const mapDispatchToProps =dispatch=>{
    return {
        onLogout: ()=>dispatch(actions.logout())
    };
}
export default connect(null,mapDispatchToProps)(Logout) ;