import * as actionTypes from './ActionTypes/actionTypesSignIn';
import axios from 'axios';
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token,userId,role,name) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        name:name,
        userId:userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout =()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    localStorage.removeItem('id')
    localStorage.removeItem('email')
    localStorage.removeItem('eventId')
    return{
        
        type:actionTypes.AUTH_LOGOUT
    };
};
export const checkAuthTimeout =()=>{
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logout());
        },3600*1000)// token dies after an hour
    }
}
export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData ={
            username:email,
            password:password,
        }
        console.log('SENT data:',authData);
        let url= 'http://127.0.0.1:8000/loginapi/'
        axios.post(url,authData)
 
        .then(response=>{
            console.log('Data came back!');
            console.log(response);
            const ExpirationDate = new Date(new Date().getTime()+ 3600000)
            
            var config = {
                method: 'get',
                url: 'http://127.0.0.1:8000/profiledeet/',
                headers: { 
                  'Content-Type': 'application/json', 
                  'Authorization': 'Token '+response.data.token
                }
              };
            axios(config).then(res=>{
                console.log('RES DATAAA',res.data[0])
                localStorage.setItem('token',response.data.token)
                localStorage.setItem('name',authData.username)
                localStorage.setItem('id',res.data[0].id)
                localStorage.setItem('email',res.data[0].email)
                localStorage.setItem('group',res.data[0].groups[0])
                dispatch(authSuccess(response.data.token,res.data[0].username))
            })
            
        })
        .catch(err=>{
            console.log(err.response.data);
            dispatch(authFail(err.response.data))
        })
    };
};