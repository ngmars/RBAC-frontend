import * as actions from '../../../Store/Actions/Index'; 
import {Redirect} from 'react-router-dom';
import Navbar from '../../../Components/Navbar/Navbar';
import classes from './OneRole.css';
import Sidebar from '../../../Components/Sidebar/Sidebar';
import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import FormData from 'form-data'; 
import OneRole from '../../../Components/OneRole/OneRole';
const ViewRoleByOrgs = props =>{
   
    useEffect (()=>{
        let organizationId = localStorage.getItem('eventId');
        let token = localStorage.getItem('token');
        props.onFetchRolebyOrg(organizationId , token);
    },[]);

    let sidebar = <Sidebar/>;
    let navbar =  <Navbar name ={localStorage.getItem('name')}/>;
    let rolesElement=  <Sidebar/>;
    
    if(!props.loading){
        if(props.RoleByOrganization==0){
            rolesElement=(
                <h1>NO ASSOCIATED ROLES TO SHOW</h1>
            )
        }else{
        rolesElement= props.RoleByOrganization.map(event =>(
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
    }
    let TokenExpRedirect = null;
    if (!localStorage.getItem('token')){
        TokenExpRedirect =<Redirect to ='/'/>
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
    
    

const mapAllRoleByOrgDispatchToProps =dispatch => {
  
    return{
        onFetchRolebyOrg:(organizationId,token ) =>dispatch(actions.fetchOrgRole(organizationId,token )),
        //onFetchOneEvents:(OrganizationId)=>dispatch(actions.fetchOneOrganizations(fundId))
    };
}


//to access the errors and loading state 
const mapStatetoProps = state =>{
    console.log('main page oneRole',state)
    return {

    RoleByOrganization:state.RoleByOrganization.RoleByOrganization,
    loading:state.organizations.loading,
    token:state.auth.token
    };
};


export default connect(mapStatetoProps, mapAllRoleByOrgDispatchToProps)(ViewRoleByOrgs);
