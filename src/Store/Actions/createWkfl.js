//TO GET ALL ORGANIZATIONS
import * as actionTypes from './ActionTypes/actionTypesCreateWorkflow';
import axios from 'axios';
export const createWorkflowSuccess =(CreateWorkflow) =>{
    return {
        type: actionTypes. CREATE_WORKFLOW_SUCCESS,
        CreateWorkflow: CreateWorkflow
    };
};

export const createWorkflowFail =(error) =>{
    return {
        type: actionTypes. CREATE_WORKFLOW_FAIL,
        error:error
    };
}

export const createWorkflowStart =()=>{
    return {
        type: actionTypes. CREATE_WORKFLOW_START
    };
}

export const createWorkflow =(name,organization,description,token)=>{
    return dispatch=>{
        dispatch(createWorkflowStart());
        console.log('GOT DATA');
        console.log(token)
        let data = new FormData();
            data.append("name", name);
            data.append("description", description);
            data.append("organization", organization);
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
            url: 'http://127.0.0.1:8000/approvals/createworkflow/',
            headers: { 
              'Authorization': 'Token '+token
            },
            data : data
          };
        axios(config)
        .then(res=>{
         console.log("NEWWW RESPONSE",res.data)
            dispatch(createWorkflowSuccess(res.data));
            console.log("FETCHED EVENTS",res.data); 
        })
        .catch(err=>{
            dispatch(createWorkflowFail(err));
        })
    }
}