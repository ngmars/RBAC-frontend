//TO GET ALL ORGANIZATIONS
import * as actionTypes from './ActionTypes/actionTypesCreateTransaction';
import axios from 'axios';
export const createTransactionSuccess =(createTransaction) =>{
    return {
        type: actionTypes.CREATE_TRANSACTION_SUCCESS,
        createTransaction: createTransaction
    };
};

export const createTransactionFail =(error) =>{
    return {
        type: actionTypes.CREATE_TRANSACTION_FAIL,
        error:error
    };
}

export const createTransactionStart =()=>{
    return {
        type: actionTypes.CREATE_TRANSACTION_START
    };
}

export const createTransaction =(main_permi,source_state,des_state,permissions,roles,users,token)=>{
    return dispatch=>{
        dispatch(createTransactionStart());
        let organization= localStorage.getItem('eventId');
        let workflow = localStorage.getItem('wkfl');
        console.log('GOT DATA');
        console.log(token)
        let data = new FormData();
            data.append("main_permi", main_permi);
            data.append("organization", organization);
            data.append("workflow", workflow);
            data.append("source_state", source_state);
            data.append("des_state", des_state);
            data.append("permissions", permissions);
            data.append("roles", roles);
            data.append("users", users);
        /*
        let body=JSON.stringify({
            "name": name,
            "description":description,
            "organization" : organization
        })
        let config = {
            headers: {
                'Authorization': 'Token ' + token,
                'content-type':'multipart/form-data;',
            },
           
          }*/

        //console.log('SEnt DATA:',body);
        var config = {
            method: 'post',
            url: 'http://127.0.0.1:8000/approvals/createtransaction/',
            headers: { 
              'Authorization': 'Token '+token
            },
            data : data
          };
        axios(config)
        .then(res=>{
         console.log("NEWWW RESPONSE",res.data)
            dispatch(createTransactionSuccess(res.data));
            console.log("FETCHED EVENTS",res.data); 
        })
        .catch(err=>{
            dispatch(createTransactionFail(err));
        })
    }
}