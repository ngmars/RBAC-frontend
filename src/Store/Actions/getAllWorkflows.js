//TO GET ALL ORGANIZATIONS
import * as actionTypes from './ActionTypes/actionTypesCreateWorkflow';
import axios from 'axios';
export const fetchAllWorkflowsSuccess =(AllWorkflows) =>{
    return {
        type: actionTypes.CREATE_GET_WORKFLOW_SUCCESS,
        AllWorkflows: AllWorkflows
    };
};

export const fetchAllWorkflowsFail =(error) =>{
    return {
        type: actionTypes.CREATE_GET_WORKFLOW_FAIL,
        error:error
    };
}

export const fetchAllWorkflowsStart =()=>{
    return {
        type: actionTypes.CREATE_GET_WORKFLOW_START
    };
}

export const fetchAllWorkflows =(token)=>{
    return dispatch=>{
        dispatch(fetchAllWorkflowsStart());
        console.log('GOT DATA');
        let config = {
            headers: {
                'Authorization': 'Token ' + token
            }
          }
        axios.get('http://127.0.0.1:8000/approvals/workflowlist/',config)
        .then(res=>{
         console.log("NEWWW RESPONSE",res.data)
                const fetchedWorkflows = [];
                for ( let key in res.data) {
                    //console.log(res.data.fundraiser[key],key)
                    fetchedWorkflows.push( {
                        ...res.data[key],
                        id:res.data[key].id
                    } );
                }
            dispatch(fetchAllWorkflowsSuccess(fetchedWorkflows));
            console.log("FETCHED EVENTS",fetchedWorkflows); 
        })
        .catch(err=>{
            dispatch(fetchAllWorkflowsFail(err));
        })
    }
}