//TO GET ALL ORGANIZATIONS
import * as actionTypes from './ActionTypes/actionTypesCreateOrg';
import axios from 'axios';
export const createOrgSuccess =(CreateOrg) =>{
    return {
        type: actionTypes.CREATE_ORG_SUCCESS,
        CreateOrg: CreateOrg
    };
};

export const createOrgFail =(error) =>{
    return {
        type: actionTypes.CREATE_ORG_FAIL,
        error:error
    };
}

export const createOrgStart =()=>{
    return {
        type: actionTypes.CREATE_ORG_START
    };
}

export const createOrg =(name,email,owner,users,permissions_loaded,token)=>{
    return dispatch=>{
        dispatch(createOrgStart());
        console.log('GOT DATA');
        console.log(token)
        let body=JSON.stringify({
            "name": name,
            "email":email,
            "logo" : null,
            "owner":owner,
            "users": users,
            "permissions_loaded":permissions_loaded
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
            url: 'http://127.0.0.1:8000/organization/router/OrganizationApi/',
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': 'Token 8a8b34981c36fb2067428e90acfd6a816de7a7bd'
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
            dispatch(createOrgSuccess(fetchedRoles));
            console.log("FETCHED EVENTS",fetchedRoles); */
        })
        .catch(err=>{
            dispatch(createOrgFail(err));
        })
    }
}