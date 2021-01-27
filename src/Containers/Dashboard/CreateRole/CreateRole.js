import * as actions from '../../../Store/Actions/Index'; 
import {Redirect} from 'react-router-dom';
import Input from '../../../Components/UI/Input/input';
import Navbar from '../../../Components/Navbar/Navbar';
import Sidebar from '../../../Components/Sidebar/Sidebar';
import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import FormData from 'form-data'; 
import OneRole from '../../../Components/OneRole/OneRole';
import classes from './CreateRole.css';
const CreateRole = props =>{
    let newUserArr=[];
    //USE EFFECT COMPONENTS
    useEffect (()=>{
        let token = localStorage.getItem('token')
        props.onFetchOrganizations(token);
        props.onFetchAllPermissions(token);
    },[]);

    //USE STATE COMPONENTS
    const [selectedPermissionsArr,setSelectedPermissionsArr]=useState([])
    const [isPermLod,SetIsPermLod]= useState(true);
    const [createRoleForm,SetCreateRoleForm]= useState({
        name: {
            elementType: 'input',
            elementConfig: {
                className:'formcontrol',
                type: 'text',
                placeholder: 'Role Name'
            },
            value: '',
            validation: {
                required: true,
            },
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
        permisson_loaded:{
            label: 'Permission Loaded',
            elementType: 'check-box',
            value: isPermLod
        }
       })
    const [permissionForm, setPermissionForm]= useState({
        permissions: {
            label:'Permissions',
            elementType: 'select-multiple2',
            elementConfig: {
                className:'formcontrol',
                options:[]
            },
            options:'',
            value: [],
            valid: false,
            touched: false
        },
    })
    //VALIDITY HANDLER
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

    //INPUT HANDLER
    const inputChangedHandler = (event, controlName) => {
        console.log('Change Handler',controlName)
        if(controlName=="permisson_loaded"){
            console.log('ENtere permlod')
            SetIsPermLod(!isPermLod);
            const updatedControls = {
                ...createRoleForm,
                [controlName]: {
                    ...createRoleForm[controlName],
                    value: isPermLod,
                }
            };
            
            SetCreateRoleForm(updatedControls);

        }
        else if(controlName=="permissions"){
        console.log('User')
        if(!selectedPermissionsArr.includes(parseInt(event.target.value))){
            console.log("This is the includes array",selectedPermissionsArr.includes(parseInt(event.target.value)));
            setSelectedPermissionsArr([...selectedPermissionsArr,(parseInt(event.target.value))])
            console.log('full User array',selectedPermissionsArr)
            newUserArr.push(...selectedPermissionsArr);
            newUserArr.push((parseInt(event.target.value)));
            console.log('newUSerArr',newUserArr);
            const updatedControls = {
            ...createRoleForm,
            [controlName]: {
                ...createRoleForm[controlName],
                value: newUserArr,
                valid: true,
                touched: true
            }  
        };
        SetCreateRoleForm(updatedControls);
        }
    }else if(controlName=="organization"){ 
        
        const updatedControls = {
        ...createRoleForm,
        [controlName]: {
            ...createRoleForm[controlName],
            value: (parseInt(event.target.value)),
            valid: checkValidity(event.target.value, createRoleForm[controlName].validation),
            touched: true
        }
    };
    SetCreateRoleForm(updatedControls);
    }else{
        const updatedControls = {
            ...createRoleForm,
            [controlName]: {
                ...createRoleForm[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, createRoleForm[controlName].validation),
                touched: true
            }
        };
        SetCreateRoleForm(updatedControls);
    }
    console.log("THIS IS STATE VAR",isPermLod);
       console.log("After submit",createRoleForm);
}


    //RENDERING UI ELEMENTS
    let TokenExpRedirect = null;
    if (!localStorage.getItem('token')){
        TokenExpRedirect =<Redirect to ='/'/>
    }
    let roleMessage=null;
    let roleErrorMessage=null;
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
    let form=  <Sidebar/>;
    let perm= <Sidebar/>;
    if(!props.loading){
        console.log("props.loading",props.loading)
    const formElementsArray = []; //array for input elements
        for ( let key in createRoleForm ) {  // render input elements from array
            formElementsArray.push( {
                id: key,
                config: createRoleForm[key]
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
                options = {props.organizations}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => inputChangedHandler( event, formElement.id )} />
        ) );
        }

        if(!props.loading){
            console.log("props.loading",props.loading)
        const formElementsArray = []; //array for input elements
            for ( let key in permissionForm ) {  // render input elements from array
                formElementsArray.push( {
                    id: key,
                    config: permissionForm[key]
                });
            }
        console.log("formElementsArray",formElementsArray)
                perm= formElementsArray.map( formElement => (
                <Input
                    label={formElement.config.label}
                    key={formElement.id}
                    className={formElement.config.className}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    options = {props.AllPermissions}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={( event ) => inputChangedHandler( event, formElement.id )} />
            ) );
            }
    
    //SUBMIT HANLDER
    const CreateRolesubmitHandler= (event) => {
        console.log("While submitting",event);
        console.log("form:",createRoleForm);
        //console.log("permission:",createRoleForm.permission_loaded.value)
            let token = localStorage.getItem('token')
            event.preventDefault();
            props.onCreateRole(createRoleForm.name.value,createRoleForm.organization.value, createRoleForm.permissions.value,createRoleForm.permisson_loaded.value,token);
        
    }

    //UI COMPONENTS
    let sidebar = <Sidebar/>;
    let navbar =  <Navbar name ={localStorage.getItem('name')}/>;
    let count = 0;
   
    
    return(
        <div>
            {navbar}
            {sidebar}
            <form className="CrtRoleForm" >
                {form}
                {perm}
                <button onClick={CreateRolesubmitHandler}>SUBMIT</button>
            </form>
            {roleMessage}
            {TokenExpRedirect}
    </div>)

    }
    
    

const mapAllOrganizationsDispatchToProps =dispatch => {
  
    return{
        onFetchOrganizations:(token) =>dispatch(actions.fetchOrganizations(token)),
        onFetchAllPermissions:(token) =>dispatch(actions.fetchAllPermissions(token)),
        onCreateRole:(name,organization,permissions,permisson_loaded,token)=>dispatch(actions.createRole(name,organization,permissions,permisson_loaded,token))
    };
}


//to access the errors and loading state 
const mapStatetoProps = state =>{
    console.log('main page crtrole',state)
    return {
    organizations: state.organizations.organizations,
    AllPermissions: state.AllPermissions.AllPermissions,
    loading:state.AllPermissions.loading,
    errorMessage:state.CreateRole.errorMessage,
    successMessage:state.CreateRole.successMessage,

    token:state.auth.token
    };
};


export default connect(mapStatetoProps, mapAllOrganizationsDispatchToProps)(CreateRole);
