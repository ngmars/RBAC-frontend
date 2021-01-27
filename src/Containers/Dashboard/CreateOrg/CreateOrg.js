import * as actions from '../../../Store/Actions/Index'; 
import {Redirect} from 'react-router-dom';
import Input from '../../../Components/UI/Input/input';
import Navbar from '../../../Components/Navbar/Navbar';
import Sidebar from '../../../Components/Sidebar/Sidebar';
import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import FormData from 'form-data'; 
import OneRole from '../../../Components/OneRole/OneRole';
import classes from './CreateOrg.css';
const CreateOrgs = props =>{
    //Input Element States
    let newUserArr=[];
    const [selectedUsersArr,setSelectedUsersArr]=useState([])
    const [isPermLod,SetIsPermLod]= useState(true);
    const [createOrgForm,SetcreateOrgForm]= useState({
    name: {
        elementType: 'input',
        elementConfig: {
            className:'formcontrol',
            type: 'text',
            placeholder: 'Organization Name'
        },
        value: '',
        validation: {
            required: true,
        },
        valid: false,
        touched: false
    },
    email: {
        elementType: 'input',
        elementConfig: {
            className:'formcontrol',
            type: 'text',
            placeholder: 'Email ID'
        },
        value: '',
        validation: {
            required: true,
            isEmail: true
        },
        valid: false,
        touched: false
    },
    Owner: {
        label:'Owner',
        elementType: 'dropdown',
        elementConfig: {
            className:'formcontrol',
            
        },
        options:'',
        value: 0,
        valid: false,
        touched: false
    },
    Users: {
        label:'Users',
        elementType: 'select-multiple',
        elementConfig: {
            className:'formcontrol',
            options:[]
        },
        options:'',
        value: [],
        valid: false,
        touched: false
    },
    permisson_loaded:{
        label: 'Permission Loaded',
        elementType: 'check-box',
        value: isPermLod
    }
   })

   //To load users
    useEffect (()=>{
        let token = localStorage.getItem('token')
        props.onFetchAllUsers(token);
    },[]);

    //To check Validity
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

    //Input Change Handler
    const inputChangedHandler = (event, controlName) => {
        console.log('Change Handler',controlName)
        if(controlName=="permisson_loaded"){
            console.log('ENtere permlod')
            SetIsPermLod(!isPermLod);
            const updatedControls = {
                ...createOrgForm,
                [controlName]: {
                    ...createOrgForm[controlName],
                    value: isPermLod,
                }
            };
            
            SetcreateOrgForm(updatedControls);

        }
        else if(controlName=="Users"){
        console.log('User')
        if(!selectedUsersArr.includes(parseInt(event.target.value))){
            console.log("This is the includes array",selectedUsersArr.includes(parseInt(event.target.value)));
            setSelectedUsersArr([...selectedUsersArr,(parseInt(event.target.value)+1)])
            console.log('full User array',selectedUsersArr)
            newUserArr.push(...selectedUsersArr);
            newUserArr.push((parseInt(event.target.value))+1);
            console.log('newUSerArr',newUserArr);
            const updatedControls = {
            ...createOrgForm,
            [controlName]: {
                ...createOrgForm[controlName],
                value: newUserArr,
                valid: checkValidity(event.target.value, createOrgForm[controlName].validation),
                touched: true
            }  
        };
        SetcreateOrgForm(updatedControls);
        }
    }else if(controlName=="Owner"){ 
        
        const updatedControls = {
        ...createOrgForm,
        [controlName]: {
            ...createOrgForm[controlName],
            value: ((parseInt(event.target.value))+1),
            valid: checkValidity(event.target.value, createOrgForm[controlName].validation),
            touched: true
        }
    };
    SetcreateOrgForm(updatedControls);}
    else{
        const updatedControls = {
            ...createOrgForm,
            [controlName]: {
                ...createOrgForm[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, createOrgForm[controlName].validation),
                touched: true
            }
        };
        SetcreateOrgForm(updatedControls);
    }
    console.log("THIS IS STATE VAR",isPermLod);
       console.log("After submit",createOrgForm);
    }

    let sidebar = <Sidebar/>;
    let form = <Sidebar/>;
    let navbar =  <Navbar name ={localStorage.getItem('name')}/>;
    let count = 0;
    const CreateOrgsubmitHandler= (event) => {
        console.log("While submitting",event);
        console.log("name:",createOrgForm);
        console.log("email:",createOrgForm.email.value);
        console.log("owner:",createOrgForm.Owner.value);
        console.log("users:",createOrgForm.Users.value);
        console.log("perm:",createOrgForm.permisson_loaded.value);
        
            let token = localStorage.getItem('token')
            event.preventDefault();
            props.onCreateOrg(createOrgForm.name.value,createOrgForm.email.value, createOrgForm.Owner.value,createOrgForm.Users.value,createOrgForm.permisson_loaded.value,token);
        
    }

    if(!props.loading){
        console.log("props.loading",props.loading)
    const formElementsArray = []; //array for input elements
        for ( let key in createOrgForm ) {  // render input elements from array
            formElementsArray.push( {
                id: key,
                config: createOrgForm[key]
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
                options = {props.AllUsers}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => inputChangedHandler( event, formElement.id )} />
        ) );
        }
    
    return(
        <div>
            {navbar}
            {sidebar}
            <form className="CrtOrgForm" >
                {form}
                <button onClick={CreateOrgsubmitHandler}>SUBMIT</button>
            </form>
    </div>)

    }
    
    

const mapAllOrganizationsDispatchToProps =dispatch => {
  
    return{
        onFetchAllUsers:(token) =>dispatch(actions.fetchAllUsers(token)),
        onCreateOrg:(name,email,owner,users,permissions_loaded,token)=>dispatch(actions.createOrg(name,email,owner,users,permissions_loaded,token))
    };
}


//to access the errors and loading state 
const mapStatetoProps = state =>{
    console.log('main page crtorg',state)
    return {
    AllUsers: state.AllUsers.AllUsers,
    loading:state.AllUsers.loading,
    token:state.auth.token
    };
};


export default connect(mapStatetoProps, mapAllOrganizationsDispatchToProps)(CreateOrgs);
