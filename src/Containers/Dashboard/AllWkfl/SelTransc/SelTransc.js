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
           
            roles: {
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
                elementType: 'dropdown',
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
        if(controlName=="MainPermi"){ 
        
        const updatedControls = {
        ...createMainPermiForm,
        [controlName]: {
            ...createMainPermiForm[controlName],
            value: (parseInt(event.target.value)),
            valid: checkValidity(event.target.value, createMainPermiForm[controlName].validation),
            touched: true
        }
    };
    setCreateMainPermiForm(updatedControls);
    }else if(controlName=="SrcSt"){
        const updatedControls = {
            ...createSrcStForm,
            [controlName]: {
                ...createSrcStForm[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, createSrcStForm[controlName].validation),
                touched: true
            }
        };
        setCreateSrcStForm(updatedControls);
    }else if(controlName=="DestSt"){
        const updatedControls = {
            ...createDestStForm,
            [controlName]: {
                ...createDestStForm[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, createDestStForm[controlName].validation),
                touched: true
            }
        };
        setCreateDestStForm(updatedControls);
    }else if(controlName=="permi"){
        const updatedControls = {
            ...createpermiForm,
            [controlName]: {
                ...createpermiForm[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, createpermiForm[controlName].validation),
                touched: true
            }
        };
        setCreatepermiForm(updatedControls);
    }else if(controlName=="roles"){
        const updatedControls = {
            ...createRolesForm,
            [controlName]: {
                ...createRolesForm[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, createRolesForm[controlName].validation),
                touched: true
            }
        }
        setCreateRolesForm(updatedControls);
    }else if(controlName=="users"){
        const updatedControls = {
            ...createusersForm,
            [controlName]: {
                ...createusersForm[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, createusersForm[controlName].validation),
                touched: true
            }
        };
        setCreateusersForm(updatedControls);
    }
    
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

        //MAIN PERMISSION
        let m_perm= null;
        if(props.Ploading==false){
            console.log("props.loading",props.loading)
        const formElementsArray = []; //array for input elements
            for ( let key in createMainPermiForm ) {  // render input elements from array
                formElementsArray.push( {
                    id: key,
                    config: createMainPermiForm[key]
                });
            }
        console.log("formElementsArray",formElementsArray)
        m_perm = formElementsArray.map( formElement => (
                <Input
                    label={formElement.config.label}
                    key={formElement.id}
                    className={formElement.config.className}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={props.AllPermissions[0].id}
                    options = {props.AllPermissions}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={( event ) => inputChangedHandler( event, formElement.id )} />
            ) );
            }


            //DESTINATION STATE
            let dst_st= null;
            if(props.S_sloading==false){
                console.log("props.loading",props.loading)
            const formElementsArray = []; //array for input elements
                for ( let key in createDestStForm ) {  // render input elements from array
                    formElementsArray.push( {
                        id: key,
                        config: createDestStForm[key]
                    });
                }
            console.log("formElementsArray",formElementsArray)
            dst_st = formElementsArray.map( formElement => (
                <Input
                    label={formElement.config.label}
                    key={formElement.id}
                    className={formElement.config.className}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={props.States[0].id}
                    options = {props.States}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={( event ) => inputChangedHandler( event, formElement.id )} />
            ) );
            }

            //SOURCE STATE
            let src_st= null;
            if(props.S_sloading==false){
                console.log("props.loading",props.loading)
            const formElementsArray = []; //array for input elements
                for ( let key in createSrcStForm ) {  // render input elements from array
                    formElementsArray.push( {
                        id: key,
                        config: createSrcStForm[key]
                    });
                }
            console.log("formElementsArray",formElementsArray)
            console.log("PROP STATES",props.States[0].id)
            src_st = formElementsArray.map( formElement => (
                <Input
                    label={formElement.config.label}
                    key={formElement.id}
                    className={formElement.config.className}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={props.States[0].id}
                    options = {props.States}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={( event ) => inputChangedHandler( event, formElement.id )} />
            ) );
            }

            //PERMISSIONS
            let permi= null;
            if(props.Ploading==false){
                console.log("props.loading",props.loading)
            const formElementsArray = []; //array for input elements
                for ( let key in createpermiForm ) {  // render input elements from array
                    formElementsArray.push( {
                        id: key,
                        config: createpermiForm[key]
                    });
                }
            console.log("formElementsArray",formElementsArray)
    
            permi = formElementsArray.map( formElement => (
                <Input
                    label={formElement.config.label}
                    key={formElement.id}
                    className={formElement.config.className}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={props.AllPermissions[0].id}
                    options = {props.AllPermissions}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={( event ) => inputChangedHandler( event, formElement.id )} />
            ) );
            }

            //ROLES
            let rolesfrm= null;
            if(props.Rloading==false){
                console.log("props.loading",props.loading)
            const formElementsArray = []; //array for input elements
                for ( let key in createRolesForm) {  // render input elements from array
                    formElementsArray.push( {
                        id: key,
                        config: createRolesForm[key]
                    });
                }
            console.log("formElementsArray",formElementsArray)
                console.log(props.AllRoles[0].id)
            rolesfrm = formElementsArray.map( formElement => (
                <Input
                    label={formElement.config.label}
                    key={formElement.id}
                    className={formElement.config.className}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={props.AllRoles[0].id}
                    options = {props.AllRoles}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={( event ) => inputChangedHandler( event, formElement.id )} />
            ) );
            }
            //
            let usersfrm= null;
            if(props.Uloading==false){
                console.log("props.loading",props.loading)
            const formElementsArray = []; //array for input elements
                for ( let key in createusersForm) {  // render input elements from array
                    formElementsArray.push( {
                        id: key,
                        config: createusersForm[key]
                    });
                }
            console.log("formElementsArray",formElementsArray)
    
            usersfrm = formElementsArray.map( formElement => (
                <Input
                    label={formElement.config.label}
                    key={formElement.id}
                    className={formElement.config.className}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={props.AllUsers[0].id}
                    options = {props.AllUsers}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={( event ) => inputChangedHandler( event, formElement.id )} />
            ) );
            }


     //SUBMIT HANLDER
        let roleNewMessage=null;    
     const CreateStateSubmitHandler= (event) => {
        console.log("While submitting",event);
        //console.log("permission:",createStateForm.permission_loaded.value)
            let token = localStorage.getItem('token')
            event.preventDefault();
            if(createSrcStForm.SrcSt.value!==createDestStForm.DestSt.value){
            roleNewMessage=null;
            console.log('SENT DATA1',createMainPermiForm.MainPermi.value)
            console.log('SENT DATA2',createSrcStForm.SrcSt.value) 
            console.log('SENT DATA3',createDestStForm.DestSt.value)
            console.log('SENT DATA4',createpermiForm.permi.value)
            console.log('SENT DATA5',createRolesForm.roles.value)
            console.log('SENT DATA6',createusersForm.users.value)
            props.onCreateTransaction(createMainPermiForm.MainPermi.value,createSrcStForm.SrcSt.value, createDestStForm.DestSt.value,createpermiForm.permi.value,createRolesForm.roles.value, createusersForm.users.value,token)
        
        }else{
            roleNewMessage=(
                <p className="SignUp-error">SOURCE STATE CAN NOT BE EQUAL TO DESTINATION STATE, TRY AGAIN!</p>
            )
        }
        
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
                        {m_perm}
                        {src_st}
                        {dst_st}
                        {permi}
                        {rolesfrm}
                        {usersfrm}
                    <button onClick={CreateStateSubmitHandler}>SUBMIT</button>
                </form>
                {roleMessage}
                {TokenExpRedirect}
                {roleNewMessage}
        </div>)
    
        }
        

    

    

//To access the props sent 
const mapCreateWkflDispatchToProps =dispatch => {
  
    return{
        onFetchAllPermissions:(token) =>dispatch(actions.fetchAllPermissions(token)),   
        onFetchAllRole:(token) =>dispatch(actions.fetchAllRole(token)),
        onFetchAllUsers:(token) =>dispatch(actions.fetchAllUsers(token)),
        onFetchStateByWkfl:(token)=>dispatch(actions.fetchStateByWkfl(token)),
        onCreateTransaction:(main_permi,source_state,des_state,permissions,roles,users,token)=>dispatch(actions.createTransaction(main_permi,source_state,des_state,permissions,roles,users,token))
    };
}


//to access the errors and loading state 
const mapStatetoProps = state =>{
    console.log('main page',state)
    return {
        
        AllPermissions:state.AllPermissions.AllPermissions,
        Ploading: state.AllPermissions.loading,
        S_sloading:state.StatebyWkfls.loading,
        States:state.StatebyWkfls.StateByWkfls,
        AllRoles:state.AllRoles.AllRoles,
        Rloading: state.AllRoles.loading,
        AllUsers:state.AllUsers.AllUsers,
        Uloading: state.AllUsers.loading,
        errorMessage:state.createTransaction.errorMessage,
        successMessage:state.createTransaction.successMessage

    };
};


export default connect(mapStatetoProps, mapCreateWkflDispatchToProps)(CreateTransaction );

