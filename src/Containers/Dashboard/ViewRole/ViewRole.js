import * as actions from '../../../Store/Actions/Index'; 
import {Redirect} from 'react-router-dom';
import Navbar from '../../../Components/Navbar/Navbar';
import Sidebar from '../../../Components/Sidebar/Sidebar';
import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import FormData from 'form-data'; 
import OneRole from '../../../Components/OneRole/OneRole';
import classes from './ViewRole.css';
const ViewOrgs = props =>{
   
    useEffect (()=>{
        let token = localStorage.getItem('token')
        props.onFetchAllRole(token);
    },[]);

    let sidebar = <Sidebar/>;
    let navbar =  <Navbar name ={localStorage.getItem('name')}/>;
    let count = 0;
    let rolesElement=  <Sidebar/>;
    let TokenExpRedirect = null;
    if (!localStorage.getItem('token')){
        TokenExpRedirect =<Redirect to ='/'/>
    }
    
    if(!props.loading){

        rolesElement= props.AllRoles.map(event =>(
        <div class="reposition">
        <button name="componentButton" value={event}>
        <OneRole 
            name={event.name}
            permission={event.permissions}
            roleId = {event.id}
              />
              {console.log(event.permissions)}
        </button>
        </div>
           ))
    }
    return(
        <div>
            {navbar}
            {sidebar}
            <div class="fund-pics row">
                {rolesElement}
            </div>
            {TokenExpRedirect}
    </div>)

    }
    
    

const mapAllOrganizationsDispatchToProps =dispatch => {
  
    return{
        onFetchAllRole:(token) =>dispatch(actions.fetchAllRole(token)),
        //onFetchOneEvents:(OrganizationId)=>dispatch(actions.fetchOneOrganizations(fundId))
    };
}


//to access the errors and loading state 
const mapStatetoProps = state =>{
    console.log('main page vwrole',state)
    return {
    AllRoles: state.AllRoles.AllRoles,
    loading:state.organizations.loading,
    token:state.auth.token
    };
};


export default connect(mapStatetoProps, mapAllOrganizationsDispatchToProps)(ViewOrgs);
