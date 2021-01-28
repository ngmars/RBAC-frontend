//TO GET ALL ORGANIZATIONS
import * as actionTypes from './ActionTypes/actionTypesAllRoles';
import axios from 'axios';
export const fetchAllRoleSuccess =(AllRoles) =>{
    return {
        type: actionTypes.ALL_ROLES_GET_SUCCESS,
        AllRoles: AllRoles
    };
};

export const fetchAllRoleFail =(error) =>{
    return {
        type: actionTypes.ALL_ROLES_GET_FAIL,
        error:error
    };
}

export const fetchAllRoleStart =()=>{
    return {
        type: actionTypes.ALL_ROLES_GET_START
    };
}

export const fetchAllRole =(token)=>{
    return dispatch=>{
        dispatch(fetchAllRoleStart());
        console.log('GOT DATA');
        let config = {
            headers: {
                'Authorization': 'Token ' + token
            }
          }
        axios.get('http://localhost:8000/router/getrole/',config)
        .then(res=>{
         console.log("NEWWW RESPONSE",res.data)
                const fetchedRoles = [];
                for ( let key in res.data) {
                    //console.log(res.data.fundraiser[key],key)
                    fetchedRoles.push( {
                        ...res.data[key],
                        id: res.data[key].id
                    } );
                }
            dispatch(fetchAllRoleSuccess(fetchedRoles));
            console.log("FETCHED EVENTS",fetchedRoles); 
        })
        .catch(err=>{
            dispatch(fetchAllRoleFail(err));
        })
    }
}