import * as actions from '../../../Store/Actions/Index'; 
import {Redirect} from 'react-router-dom';
import Navbar from '../../../Components/Navbar/Navbar';
import Sidebar from '../../../Components/Sidebar/Sidebar';
import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import FormData from 'form-data'; 
import MyOrgs from '../../../Components/MyOrg/MyOrgs';
import classes from './ViewOrg.css';
const ViewOrgs = props =>{
   
    useEffect (()=>{
        let token = localStorage.getItem('token')
        props.onFetchOrganizations(token);
    },[]);
    
    
       
    const redirectHandler= (event)=> {
        console.log('EVENTTTT',event)
        //this.props.onFetchOneEvents(event);
        localStorage.setItem('eventId',event)
        props.history.push('/oneRole');
    }
    let TokenExpRedirect = null;
    if (!localStorage.getItem('token')){
        TokenExpRedirect =<Redirect to ='/'/>
    }
    let sidebar = <Sidebar/>;
    let navbar =  <Navbar name ={localStorage.getItem('name')}/>;
    let count = 0;
    let orgzs=  <Sidebar/>;
    let zeroOrg= null;
    if(props.loading==false){
        if(!props.organizations.length){
//zeroOrg= <Redirect to='/crtorg'  />
            console.log("WHATT")
            props.history.push('/crtorg' );
        }
        else{
        orgzs= props.organizations.map(event =>(
        <div class="reposition">
        <button name="componentButton" value={event} onClick={()=>redirectHandler(event.id)}>
        <MyOrgs
            name={event.name}
            owner={event.owner}
            orgId = {event.id}
                />
        </button>
        </div>
            ))
        }
    }
    
    return(
        <div>
            <h1>SELECT YOUR ORGANIZATION</h1>
            <div class="fund-pics row">
            <div>{orgzs}</div>
            </div>
            {TokenExpRedirect}
           
    </div>)

    }
            

        
    
   
    

const mapAllOrganizationsDispatchToProps =dispatch => {
  
    return{
        onFetchOrganizations:(token) =>dispatch(actions.fetchOrganizations(token)),
        //onFetchOneEvents:(OrganizationId)=>dispatch(actions.fetchOneOrganizations(fundId))
    };
}


//to access the errors and loading state 
const mapStatetoProps = state =>{
    console.log('main page vworg',state.organizations.organizations)
    return {
    organizations: state.organizations.organizations,
    loading:state.organizations.loading,
    token:state.auth.token
    };
};


export default connect(mapStatetoProps, mapAllOrganizationsDispatchToProps)(ViewOrgs);
