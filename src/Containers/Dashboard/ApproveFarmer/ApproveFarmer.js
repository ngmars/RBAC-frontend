import * as actions from '../../../Store/Actions/Index'; 
import {Redirect} from 'react-router-dom';
import Input from '../../../Components/UI/Input/input';
import Navbar from '../../../Components/Navbar/Navbar';
import Sidebar from '../../../Components/Sidebar/Sidebar';
import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import FormData from 'form-data'; 
import classes from './ApproveFarmer.css';
const AppvFarmer= props =>{
    let newUserArr=[];
    //USE EFFECT COMPONENTS
    useEffect (()=>{
        let token = localStorage.getItem('token')
        props.onFetchOneFarmerForApproval(token);
    },[]);
    //USE STATE COMPONENTS
   

    let roleMessage=null;
    if(props.loading==false){

    if(props.successMessage){
        roleMessage=(
        <p className="SignUp-success">{props.successMessage}</p>
    )
            }else{
        roleMessage=(
        <p className="SignUp-error">{props.errorMessage}</p>
    )
             }
    }
  
    //SUBMIT HANLDER
    const ApproveFarmerSubmitHandler= (event) => {
       let token=localStorage.getItem('token');
        //console.log("While submitting",farmer);
        event.preventDefault();
        props.onFarmerApproval(token)
        //console.log("form:",createRoleForm);
        //console.log("permission:",createRoleForm.permission_loaded.value)
    }

    //UI COMPONENTS
    let sidebar = <Sidebar/>;
    let navbar =  <Navbar name ={localStorage.getItem('name')}/>;
    let count = 0;
    let newForm = null;
    if(props.loading==false){
      newForm  =(<div className="farmerAppv-form">

                <h3>Do you wish to Approver Farmer {props.FarmerData.name}</h3><br/>
                <h4>Age:{props.FarmerData.age} </h4><br/>
                <h4>Phone Number:{props.FarmerData.phoneNumber}</h4><br/><br/>
            </div>)
    }
    
    return(
        <div>
            {navbar}
            {sidebar}
            <form className="CrtRoleForm" >
                {newForm}
                <button onClick={ApproveFarmerSubmitHandler}>SUBMIT</button>
            </form>
            {roleMessage}

    </div>)

    }
    
    

const mapAllOrganizationsDispatchToProps =dispatch => {
  
    return{
        onFetchOneFarmerForApproval:(token) =>dispatch(actions.fetchOneFarmerForApproval(token)),
        onFarmerApproval:(token)=>dispatch(actions.farmerApproval(token))
    };
}


//to access the errors and loading state 
const mapStatetoProps = state =>{
    console.log('main page crtrole',state)
    return {
    loading:state.OneFarmerForApproval.loading,
    errorMessage:state.FarmerApproval.errorMessage,
    successMessage:state.FarmerApproval.successMessage,
    FarmerData:state.OneFarmerForApproval.OneFarmerForApprovals

    };
};


export default connect(mapStatetoProps, mapAllOrganizationsDispatchToProps)(AppvFarmer);
