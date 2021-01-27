//TO GET ALL ORGANIZATIONS
import * as actionTypes from './ActionTypes/actionTypesAllGetUsers';
import axios from 'axios';
export const fetchAllUsersSuccess =(AllUsers) =>{
    return {
        type: actionTypes.GET_ALL_USERS_SUCCESS,
        AllUsers: AllUsers
    };
};

export const fetchAllUsersFail =(error) =>{
    return {
        type: actionTypes.GET_ALL_USERS_FAIL,
        error:error
    };
}

export const fetchAllUsersStart =()=>{
    return {
        type: actionTypes.GET_ALL_USERS_START
    };
}

export const fetchAllUsers =(token)=>{
    return dispatch=>{
        dispatch(fetchAllUsersStart());
        console.log('GOT DATA');
        let config = {
            headers: {
                'Authorization': 'Token ' + token
            }
          }
        axios.get('http://localhost:8000/router/profile/',config)
        .then(res=>{
         console.log("NEWWW RESPONSE",res.data)
                const fetchedUsers = [];
                
                for ( let key in res.data) {
                    //console.log(res.data.fundraiser[key],key)
                    fetchedUsers.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
            dispatch(fetchAllUsersSuccess(fetchedUsers));
            console.log("FETCHED EVENTS",fetchedUsers); 
        })
        .catch(err=>{
            dispatch(fetchAllUsersFail(err));
        })
    }
}