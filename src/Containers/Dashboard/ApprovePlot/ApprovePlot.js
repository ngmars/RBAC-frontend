import * as actions from '../../../Store/Actions/Index'; 
import {Redirect} from 'react-router-dom';
import Input from '../../../Components/UI/Input/input';
import Navbar from '../../../Components/Navbar/Navbar';
import Sidebar from '../../../Components/Sidebar/Sidebar';
import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import FormData from 'form-data'; 

const AppvPlot= props =>{
    let newUserArr=[];
    //USE EFFECT COMPONENTS
    useEffect (()=>{
        let token = localStorage.getItem('token')
        props.onFetchOnePlotForApproval(token);
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
    const ApprovePlotSubmitHandler= (event) => {
       let token=localStorage.getItem('token');
        //console.log("While submitting",Plot);
        event.preventDefault();
        props.onPlotApproval(token)
        //console.log("form:",createRoleForm);
        //console.log("permission:",createRoleForm.permission_loaded.value)
    }
  
    //UI COMPONENTS
    let sidebar = <Sidebar/>;
    let navbar =  <Navbar name ={localStorage.getItem('name')}/>;
    let count = 0;
    let newForm = null;
    if(props.loading==false){
      newForm  =(<div className="PlotAppv-form">

                <h3>Do you wish to Approve Plot {props.PlotData.vname}</h3><br/>
                <h4>S Name:{props.PlotData.sname} </h4><br/>
                <h4>Area:{props.PlotData.area}</h4><br/><br/>
            </div>)
    }
    
    return(
        <div>
            {navbar}
            {sidebar}
            <form className="CrtRoleForm" >
                {newForm}
                <button onClick={ApprovePlotSubmitHandler}>SUBMIT</button>
            </form>
            {roleMessage}

    </div>)

    }
    
    

const mapAllOrganizationsDispatchToProps =dispatch => {
  
    return{
        onFetchOnePlotForApproval:(token) =>dispatch(actions.fetchOnePlotForApproval(token)),
        onPlotApproval:(token)=>dispatch(actions.PlotApproval(token))
    };
}


//to access the errors and loading state 
const mapStatetoProps = state =>{
    console.log('main page plot approval',state)
    return {
    loading:state.OnePlotForApproval.loading,
    errorMessage:state.PlotApproval.errorMessage,
    successMessage:state.PlotApproval.successMessage,
    PlotData:state.OnePlotForApproval.OnePlotForApprovals

    };
};


export default connect(mapStatetoProps, mapAllOrganizationsDispatchToProps)(AppvPlot);
