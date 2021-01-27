import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Input from '../../Components/UI/Input/input';
import {Redirect} from 'react-router-dom';
import classes from './Auth.css';
import * as actions from '../../Store/Actions/Index';
const Auth = props => {
    
        //Configure input fields for sign-in form
        const[signInForm, setSignInForm] =  useState({
            email: {
                elementType: 'input',
                elementConfig: {
                    className:'formcontrol',
                    type: 'text',
                    placeholder: 'Username'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: false
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    className:'formcontrol',
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8
                },
                valid: false,
                touched: false
            
            }
        });
        //Configure input fields for sign-up form
        const[signUpForm, setSignUpForm] =  useState({
            email: {
                elementType: 'input',
                elementConfig: {
                    className:'formcontrol',
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
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
            password: {
                elementType: 'input',
                elementConfig: {
                    className:'formcontrol',
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8
                },
                valid: false,
                touched: false
            
            },
            Confpassword: {
                elementType: 'input',
                elementConfig: {
                    className:'formcontrol',
                    type: 'password',
                    placeholder: 'Password(repeat)'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8
                },
                valid: false,
                touched: false
            
            }
        });
        const [isSignIn, setIsSignIn]= useState(true);
   
    
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
        
        if(isSignIn){
            const updatedControls = {
                ...signInForm,
                [controlName]: {
                    ...signInForm[controlName],
                    value: event.target.value,
                    valid: checkValidity(event.target.value, signInForm[controlName].validation),
                    touched: true
                }
            };
            setSignInForm(updatedControls);
        }else{
            const updatedControls = {
                ...signUpForm,
                [controlName]: {
                    ...signUpForm[controlName],
                    value: event.target.value,
                    valid: checkValidity(event.target.value, signUpForm[controlName].validation),
                    touched: true
                }
            };
            setSignUpForm(updatedControls);

        }
    }
    //saves the input in the state and passes it on as props
    const submitHandler = (event) => {
        if(isSignIn){
            event.preventDefault();
            props.onAuth(signInForm.email.value, signInForm.password.value);
        }
        else{
            event.preventDefault();
            props.onSignUp(signUpForm.email.value, signUpForm.name.value, signUpForm.password.value);
        }
    }

    //switch between sigin and signup(To add forgot password)
    const switchAuthHandler =()=>{
        setIsSignIn(!isSignIn);
    };
   



        
        const formElementsArray = []; //array for input elements
        if(isSignIn){
        for ( let key in signInForm ) {  // render input elements from array
            formElementsArray.push( {
                id: key,
                config: signInForm[key]
            });
        }
        }else{

            for ( let key in signUpForm ) {
                formElementsArray.push( {
                    id: key,
                    config: signUpForm[key]
                } );
            }
        }
        let authRedirect = null;
        if (props.isAuthenticated){
            authRedirect =<Redirect to ='/vworg'/>
        }
        //mapping configurations of input elements 
        let form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                className={formElement.config.className}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => inputChangedHandler( event, formElement.id )} />
        ) );

        //configuring loading...
        

        //configuring success message for signup state onlue
        let successMessage;
        if(!isSignIn){
            if(props.success_signup){
                successMessage=(
                <p className="SignUp-success">{props.success_signup}</p>
            )
        }
    }

        //configuring error message based on if sigin or signup is the state
        let errorMessage = null;
        if(isSignIn){
            if(props.error_auth){
             console.log("in main page",props.error_auth)
                errorMessage=(
                <p className="SignIn-error">{props.error_auth.message}</p>
                );
         }
        }else{
            if(props.error_signup){
                console.log("in main page",props.error_signup)
                   errorMessage=(
                   <p className="SignIn-error">{props.error_signup.message}</p>
                   );
         }
        }


        //configuring submit button based on if sigin or signup is the state
       let button=  (
            <button className='SignIn-button'>{isSignIn ? 'Log In': 'Sign Up'}</button>
        );
        
        //returning HTML jsx 
        return (
            <div className="logindark">
                <form className="signin-form" onSubmit={submitHandler}>
                
                    {form}
                    {button}
              
                    {successMessage}
                    {errorMessage}
                    <a className="forgot" >Forgot your password?</a>
                     <button 
                     onClick={switchAuthHandler}
                     className="forgot-btn ">{isSignIn ? 'New user?Click here to sign up': 'Already have an account? Click Here'}</button>
                </form>
                {authRedirect}
            </div>
        );
        
        

    
}
    

//To access the props sent 
const mapSignInDispatchToProps =dispatch => {
  
    return{
        
        onAuth: (email, password) => dispatch(actions.auth(email, password)),
        onSignUp:(email,name,password,confpassword)=>dispatch(actions.SignUp(email,name,password,confpassword))
    };
}


//to access the errors and loading state 
const mapStatetoProps = state =>{
    console.log('main page',state)
    return {
        error_auth:  state.auth.error,
        loading_signup: state.signup.loading,
        error_signup:state.signup.error, 
        success_signup: state.signup.success,
        isAuthenticated: state.auth.token !==null
    };
};


export default connect(mapStatetoProps, mapSignInDispatchToProps)(Auth);

