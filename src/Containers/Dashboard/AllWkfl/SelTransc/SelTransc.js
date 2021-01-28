import * as actions from '../../../../Store/Actions/Index'; 
import {Redirect} from 'react-router-dom';
import Input from '../../../../Components/UI/Input/input';
import Navbar from '../../../../Components/Navbar/Navbar';
import Sidebar from '../../../../Components/Sidebar/Sidebar';
import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import FormData from 'form-data'; 


const CreateTransaction = props => {

    useEffect (()=>{
        let token = localStorage.getItem('token')
        props.onFetchAllPermissions(token);
        props.onFetchAllRole(token);
        props.onFetchAllUsers(token);
        props.onFetchStateByWkfl(token);
    },[]);
        //MAIN PERMI
        const[createMainPermiForm, setCreateMainPermiForm] =  useState({
           
            MainPermi: {
                label:'Main Permission',
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
        //SOURCE STATE
        const[createSrcStForm, setCreateSrcStForm] =  useState({
           
            SrcSt: {
                label:'Source State',
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
        //DEST STATE
        const[createDestStForm, setCreateDestStForm] =  useState({
           
            DestSt: {
                label:'Destination State',
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
        //PERMISSION
        const[createpermiForm, setCreatepermiForm] =  useState({
           
            permi: {
                label:'Permission',
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
        //ROLES
        const[createRolesForm, setCreateRolesForm] =  useState({
           
            Roles: {
                label:'Roles',
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
        //USERS
        const[createusersForm, setCreateusersForm] =  useState({
           
            users: {
                label:'Users',
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
/*
    //Checks if an input has been entered in the text box
    const inputChangedHandler = (event, controlName) => {
        console.log('Change Handler',controlName)
        if(controlName=="workflow"){ 
        
        const updatedControls = {
        ...createStateForm,
        [controlName]: {
            ...createStateForm[controlName],
            value: (parseInt(event.target.value)),
            valid: checkValidity(event.target.value, createStateForm[controlName].validation),
            touched: true
        }
    };
    setCreateStateForm(updatedControls);
    }else{
        const updatedControls = {
            ...createStateForm,
            [controlName]: {
                ...createStateForm[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, createStateForm[controlName].validation),
                touched: true
            }
        };
        setCreateStateForm(updatedControls);
    }
       console.log("After submit",createStateForm);
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
            for ( let key in createStateForm ) {  // render input elements from array
                formElementsArray.push( {
                    id: key,
                    config: createStateForm[key]
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
                    options = {props.allWorkflows}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={( event ) => inputChangedHandler( event, formElement.id )} />
            ) );
            }
     //SUBMIT HANLDER
     const CreateStateSubmitHandler= (event) => {
        console.log("While submitting",event);
        console.log("form:",createStateForm);
        //console.log("permission:",createStateForm.permission_loaded.value)
            let token = localStorage.getItem('token')
            event.preventDefault();
            props.onCreateStates(createStateForm.name.value,createStateForm.workflow.value, createStateForm.description.value,token);
        
    }*/

  
        //returning HTML JSX
        let sidebar = <Sidebar/>;
        let navbar =  <Navbar name ={localStorage.getItem('name')}/>;
        let count = 0;
       
        
        return(
            <div>
                {navbar}
                {sidebar}
                <form className="CrtRoleForm" >
       
                    <button>SUBMIT</button>
                </form>
                
        </div>)
    
        }
        

    

    

//To access the props sent 
const mapCreateWkflDispatchToProps =dispatch => {
  
    return{
        onFetchAllPermissions:(token) =>dispatch(actions.fetchAllPermissions(token)),   
        onFetchAllRole:(token) =>dispatch(actions.fetchAllRole(token)),
        onFetchAllUsers:(token) =>dispatch(actions.fetchAllUsers(token)),
        onFetchStateByWkfl:(token)=>dispatch(actions.fetchStateByWkfl(token))
    };
}


//to access the errors and loading state 
const mapStatetoProps = state =>{
    console.log('main page',state)
    return {
        error_auth:  state.auth.error,
        allWorkflows:state.fetchAllWorkflows.AllWorkflows,
        loading: state.fetchAllWorkflows.loading,
        errorMessage:state.fetchAllWorkflows.errorMessage,
        successMessage:state.fetchAllWorkflows.successMessage

    };
};


export default connect(mapStatetoProps, mapCreateWkflDispatchToProps)(CreateTransaction );

