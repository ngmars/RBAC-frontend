//TO GET ALL ORGANIZATIONS
import * as actionTypes from './ActionTypes/actionTypesCreateRole';
import axios from 'axios';
export const createRoleSuccess =(CreateRole) =>{
    return {
        type: actionTypes. CREATE_ROLES_GET_SUCCESS,
        CreateRole: CreateRole
    };
};

export const createRoleFail =(error) =>{
    return {
        type: actionTypes. CREATE_ROLES_GET_FAIL,
        error:error
    };
}

export const createRoleStart =()=>{
    return {
        type: actionTypes. CREATE_ROLES_GET_START
    };
}

export const createRole =(name,organization,permissions,permission_loaded,token)=>{
    return dispatch=>{
        dispatch(createRoleStart());
        console.log('GOT DATA');
        console.log(token)
        let body=JSON.stringify({
            name: name,
            organization:organization,
            permissions : permissions,
            permission_loaded:permission_loaded
        })/*
        let config = {
            headers: {
                'Authorization': 'Token ' + token,
                'content-type':'multipart/form-data;',
            },
           
          }*/

        console.log('SEnt DATA:',body);
        var config = {
            method: 'post',
            url: 'http://127.0.0.1:8000/permissions_roles/router/RoleApi/',
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': 'Token '+token
            },
            data : body
          };
        axios(config)
        .then(res=>{
         console.log("NEWWW RESPONSE",res.data)
         /*
                const fetchedRoles = [];
                for ( let key in res.data) {
                    //console.log(res.data.fundraiser[key],key)
                    fetchedRoles.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
            dispatch(createRoleSuccess(fetchedRoles));
            console.log("FETCHED EVENTS",fetchedRoles); */
        })
        .catch(err=>{
            dispatch(createRoleFail(err));
        })
    }
}