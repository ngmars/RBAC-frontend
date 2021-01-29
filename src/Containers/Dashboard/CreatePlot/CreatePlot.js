import * as actions from '../../../Store/Actions/Index'; 
import {Redirect} from 'react-router-dom';
import Input from '../../../Components/UI/Input/input';
import Navbar from '../../../Components/Navbar/Navbar';
import Sidebar from '../../../Components/Sidebar/Sidebar';
import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import FormData from 'form-data'; 
import OneRole from '../../../Components/OneRole/OneRole';

const CrtPlot = props => {
        //Configure input fields for sign-up form
        const[createPlotForm, setCreatePlotForm] =  useState({
            vname:{
                elementType:'input',
                elementConfig: {
                    className:'formcontrol',
                    type: 'text',
                    placeholder: 'V Name'
                },
                value: '',
                valid: false,
                touched: false
            },
            sname:{
                elementType:'input',
                elementConfig: {
                    className:'formcontrol',
                    type: 'text',
                    placeholder: 'S Name'
                },
                value: '',
                valid: false,
                touched: false
            },
            area:{
                elementType:'input',
                elementConfig: {
                    className:'formcontrol',
                    type: 'text',
                    placeholder: 'Area'
                },
                value: '',
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
        
        const updatedControls = {
            ...createPlotForm,
            [controlName]: {
                ...createPlotForm[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, createPlotForm[controlName].validation),
                touched: true
            }
        };
        setCreatePlotForm(updatedControls);
    
       console.log("After submit",createPlotForm);
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
            for ( let key in createPlotForm ) {  // render input elements from array
                formElementsArray.push( {
                    id: key,
                    config: createPlotForm[key]
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
                    options ={formElement.config.options} 
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={( event ) => inputChangedHandler( event, formElement.id )} />
            ) );
            }
     //SUBMIT HANLDER
     const CreatePlotSubmitHandler= (event) => {
        console.log("While submitting",event);
        console.log("form:",createPlotForm);
        //console.log("permission:",createPlotForm.permission_loaded.value)
            let token = localStorage.getItem('token')
            event.preventDefault();
            props.onCreatePlot(createPlotForm.vname.value,createPlotForm.sname.value, createPlotForm.area.value,token);    
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
                    <button onClick={CreatePlotSubmitHandler}>SUBMIT</button>
                </form>
                {roleMessage}
                {TokenExpRedirect}
        </div>)
    
        }
        

    

    

//To access the props sent 
const mapCreatePlotDispatchToProps =dispatch => {
  
    return{
        onCreatePlot:(vname,sname,area,token)=>dispatch(actions.createPlot(vname,sname,area,token))
    };
}


//to access the errors and loading state 
const mapStatetoProps = state =>{
    console.log('main page',state)
    return {
        errorMessage:state.CreatePlot.errorMessage, 
        successMessage: state.CreatePlot.successMessage,
    };
};


export default connect(mapStatetoProps, mapCreatePlotDispatchToProps)(CrtPlot);

