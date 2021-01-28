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

export const createOrg =(name,email,users,permission_loaded,token)=>{
    return dispatch=>{
        dispatch(createOrgStart());
        console.log('GOT DATA');
        console.log(token)
        
        var data = JSON.stringify({
            "name":name,
            "email":email,
            "logo":null,
            "owner":parseInt(localStorage.getItem('id')),
            "users":users,
            "permission_loaded":permission_loaded});
            console.log('SENTDATA',data)

var config = {
  method: 'post',
  url: 'http://127.0.0.1:8000/organization/router/OrganizationApi/',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': 'Token '+token
  },
  data : data
};

axios(config)
        .then(res=>{
         console.log("NEWWW RESPONSE",res.data)
         
            dispatch(createOrgSuccess(res.data));
            console.log("FETCHED EVENTS",res.data); 
        })
        .catch(err=>{
            dispatch(createOrgFail(err));
        })
    }
}