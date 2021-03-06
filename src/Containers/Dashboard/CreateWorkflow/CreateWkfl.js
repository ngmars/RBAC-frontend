import * as actions from '../../../Store/Actions/Index'; 
import {Redirect} from 'react-router-dom';
import Input from '../../../Components/UI/Input/input';
import Navbar from '../../../Components/Navbar/Navbar';
import Sidebar from '../../../Components/Sidebar/Sidebar';
import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import FormData from 'form-data'; 
import OneRole from '../../../Components/OneRole/OneRole';
import classes from './CreateWkfl.css';
const Wkfl = props => {
    useEffect (()=>{
        let token = localStorage.getItem('token')
        props.onFetchOwnOrganizations(token);
    },[]);
        //Configure input fields for sign-up form
        const[createWorkflowForm, setCreateWorkflowForm] =  useState({
            name:{
                elementType:'input',
                elementConfig: {
                    className:'formcontrol',
                    type: 'text',
                    placeholder: 'Name'
                },
                value: '',
                valid: false,
                touched: false
            },
            description:{
                elementType:'input',
                elementConfig: {
                    className:'formcontrol',
                    type: 'text',
                    placeholder: 'Description'
                },
                value: '',
                valid: false,
                touched: false
            },
            organization: {
                label:'Organization',
                elementType: 'dropdown2',
                elementConfig: {
                    className:'formcontrol',
                    
                },
                options:'',
                value: 0,
                valid: false,
                touched: false
            },

        });
        
   
    
    //Validates all inputs
    const checkValidity=(value, rules) =>{
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    //Checks if an input has been entered in the text box
    const inputChangedHandler = (event, controlName) => {
        console.log('Change Handler',controlName)
        if(controlName=="organization"){ 
        
        const updatedControls = {
        ...createWorkflowForm,
        [controlName]: {
            ...createWorkflowForm[controlName],
            value: (parseInt(event.target.value)),
            valid: checkValidity(event.target.value, createWorkflowForm[controlName].validation),
            touched: true
        }
    };
    setCreateWorkflowForm(updatedControls);
    }else{
        const updatedControls = {
            ...createWorkflowForm,
            [controlName]: {
                ...createWorkflowForm[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, createWorkflowForm[controlName].validation),
                touched: true
            }
        };
        setCreateWorkflowForm(updatedControls);
    }
       console.log("After submit",createWorkflowForm);
}

    
    //switch between sigin and signup(To add forgot password)
        //RENDERING UI ELEMENTS
        let TokenExpRedirect = null;
        if (!localStorage.getItem('token')){
            TokenExpRedirect =<Redirect to ='/'/>
        }
        let roleMessage=null;
        if(!props.loading){
    
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



        let form= <Sidebar/>;
        if(!props.loading){
            console.log("props.loading",props.loading)
        const formElementsArray = []; //array for input elements
            for ( let key in createWorkflowForm ) {  // render input elements from array
                formElementsArray.push( {
                    id: key,
                    config: createWorkflowForm[key]
                });
            }
        console.log("formElementsArray",formElementsArray)
             form = formElementsArray.map( formElement => (
                <Input
                    label={formElement.config.label}
                    key={formElement.id}
                    className={formElement.config.className}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    options = {props.ownOrganizations}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={( event ) => inputChangedHandler( event, formElement.id )} />
            ) );
            }
     //SUBMIT HANLDER
     const CreateWorkflowSubmitHandler= (event) => {
        console.log("While submitting",event);
        console.log("form:",createWorkflowForm);
        //console.log("permission:",createWorkflowForm.permission_loaded.value)
            let token = localStorage.getItem('token')
            event.preventDefault();
            props.onCreateWorkflow(createWorkflowForm.name.value,createWorkflowForm.organization.value, createWorkflowForm.description.value,token);
        
    }

   
        //returning HTML JSX
        let sidebar = <Sidebar/>;
        let navbar =  <Navbar name ={localStorage.getItem('name')}/>;
        let count = 0;
       
        
        return(
            <div>
                {navbar}
                {sidebar}
                <form className="CrtRoleForm" >
                    {form}
                    <button onClick={CreateWorkflowSubmitHandler}>SUBMIT</button>
                </form>
                {roleMessage}
                {TokenExpRedirect}
        </div>)
    
        }
        

    

    

//To access the props sent 
const mapCreateWkflDispatchToProps =dispatch => {
  
    return{
        
        onFetchOwnOrganizations:(token) =>dispatch(actions.fetchOwnOrganizations(token)),
        onCreateWorkflow:(name,description,organization,token)=>dispatch(actions.createWorkflow(name,description,organization,token))
    };
}


//to access the errors and loading state 
const mapStatetoProps = state =>{
    console.log('main page',state)
    return {
        error_auth:  state.auth.error,
        ownOrganizations:state.ownOrganizations.ownOrganizations,
        loading_signup: state.ownOrganizations.loading,
        error_signup:state.signup.error, 
        success_signup: state.signup.success,
        isAuthenticated: state.auth.token !==null
    };
};


export default connect(mapStatetoProps, mapCreateWkflDispatchToProps)(Wkfl);

