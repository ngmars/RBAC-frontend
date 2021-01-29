import * as actions from '../../../../Store/Actions/Index'; 
import {Redirect} from 'react-router-dom';
import Navbar from '../../../../Components/Navbar/Navbar';
import Sidebar from '../../../../Components/Sidebar/Sidebar';
import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import FormData from 'form-data'; 
import MyFarmer from '../../../../Components/MyFarmers/MyFarmers';
const ViewFarmers = props =>{
   
    useEffect (()=>{
        let token = localStorage.getItem('token')
        props.onFetchFarmerForApproval(token);
    },[]);

    let sidebar = <Sidebar/>;
    let navbar =  <Navbar name ={localStorage.getItem('name')}/>;
    let count = 0;
    
    let farmerElement= null;
    let TokenExpRedirect = null;
    if (!localStorage.getItem('token')){
        TokenExpRedirect =<Redirect to ='/'/>
    }
    
    const redirectHandler= (event)=> {
        console.log('EVENTTTT',event)
        //this.props.onFetchOneEvents(event);
        localStorage.setItem('farmer',event)
        props.history.push('/appvgetfarmer/appv');
    }
    if(!props.loading){

        farmerElement= props.FarmerForApprovals.map(event =>(
        <div class="reposition">
        <button name="componentButton" value={event} onClick= {()=>redirectHandler(event.id)}>
        <MyFarmer
            name={event.name}
            age={event.age}
            phone={event.phoneNumber}
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
                    {farmerElement}     
            </div>
         
    </div>)

    }
    
    

const mapAllOrganizationsDispatchToProps =dispatch => {
  
    return{
        onFetchFarmerForApproval:(token) =>dispatch(actions.fetchFarmerForApproval(token)),
        //onFetchOneEvents:(OrganizationId)=>dispatch(actions.fetchOneOrganizations(fundId))
    };
}


//to access the errors and loading state 
const mapStatetoProps = state =>{
    console.log('main page vwrole',state)
    return {
    FarmerForApprovals: state.FarmerForApprovals.FarmerForApprovals,
    loading:state.FarmerForApprovals.loading,
    token:state.auth.token
    };
};


export default connect(mapStatetoProps, mapAllOrganizationsDispatchToProps)(ViewFarmers);
