import * as actions from '../../../Store/Actions/Index'; 
import {Redirect} from 'react-router-dom';
import Navbar from '../../../Components/Navbar/Navbar';
import Sidebar from '../../../Components/Sidebar/Sidebar';
import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import FormData from 'form-data'; 
import MyWkfl from '../../../Components/MyWkfls/MyWkfls';
import classes from './AllWkfl.css';
const AllWklf = props =>{
   
    useEffect (()=>{
        let token = localStorage.getItem('token')
        props.onFetchWkflByOrg(token);
    },[]);

    let sidebar = <Sidebar/>;
    let navbar =  <Navbar name ={localStorage.getItem('name')}/>;
    let count = 0;
    let WkflElement=  null;
    let TokenExpRedirect = null;
    const redirectHandler= (event)=> {
        console.log('EVENTTTT',event)
        //this.props.onFetchOneEvents(event);
        localStorage.setItem('wkfl',event)
        props.history.push('/selwkfl/seltransc');
    }
    if (!localStorage.getItem('token')){
        TokenExpRedirect =<Redirect to ='/'/>
    }
    
    if(!props.loading){

        WkflElement= props.WkflByOrg.map(event =>(
        <div class="reposition">
        <button name="componentButton" value={event} onClick={()=>redirectHandler(event.id)}>
        <MyWkfl 
            name={event.name}
            description={event.description}
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
                {WkflElement}
            </div>
            {TokenExpRedirect}
    </div>)

    }
    
    

const mapAllWkflByOrgDispatchToProps =dispatch => {
  
    return{
        onFetchWkflByOrg:(token) =>dispatch(actions.fetchWkflByOrg(token)),
        //onFetchOneEvents:(OrganizationId)=>dispatch(actions.fetchOneOrganizations(fundId))
    };
}


//to access the errors and loading state 
const mapStatetoProps = state =>{
    console.log('main page vwrole',state)
    return {
    WkflByOrg: state.WkflByOrg.WkflByOrg,
    loading:state.WkflByOrg.loading
    };
};

export default connect(mapStatetoProps, mapAllWkflByOrgDispatchToProps)(AllWklf);
