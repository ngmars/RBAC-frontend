import * as actions from '../../../../Store/Actions/Index'; 
import {Redirect} from 'react-router-dom';
import Navbar from '../../../../Components/Navbar/Navbar';
import Sidebar from '../../../../Components/Sidebar/Sidebar';
import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import FormData from 'form-data'; 
import MyPlot from '../../../../Components/MyPlots/MyPlots';
const ViewPlots = props =>{
   
    useEffect (()=>{
        let token = localStorage.getItem('token')
        props.onFetchPlotForApproval(token);
    },[]);

    let sidebar = <Sidebar/>;
    let navbar =  <Navbar name ={localStorage.getItem('name')}/>;
    let count = 0;
    
    let PlotElement= null;
    let TokenExpRedirect = null;
    if (!localStorage.getItem('token')){
        TokenExpRedirect =<Redirect to ='/'/>
    }
   
    const redirectHandler= (event)=> {
        console.log('EVENTTTT',event)
        //this.props.onFetchOneEvents(event);
        localStorage.setItem('Plot',event)
        props.history.push('/appvgetplot/appv');
    }
    if(!props.loading){

        PlotElement= props.PlotForApprovals.map(event =>(
        <div class="reposition">
        <button name="componentButton" value={event} onClick= {()=>redirectHandler(event.id)}>
        <MyPlot
            vname={event.vname}
            sname={event.sname}
            area={event.area}
              />
        </button>
        </div>
           ))
    }
    return(
        <div>
            {navbar}
            {sidebar}
            <div class="fund-pics row">
                  {PlotElement}  
            </div>
         
    </div>)

    }
    
    

const mapAllOrganizationsDispatchToProps =dispatch => {
  
    return{
        onFetchPlotForApproval:(token) =>dispatch(actions.fetchPlotForApproval(token)),
        //onFetchOneEvents:(OrganizationId)=>dispatch(actions.fetchOneOrganizations(fundId))
    };
}


//to access the errors and loading state 
const mapStatetoProps = state =>{
    console.log('main page vwrole',state)
    return {
    PlotForApprovals: state.PlotForApprovals.PlotForApprovals,
    loading:state.PlotForApprovals.loading,
    token:state.auth.token
    };
};


export default connect(mapStatetoProps, mapAllOrganizationsDispatchToProps)(ViewPlots);
