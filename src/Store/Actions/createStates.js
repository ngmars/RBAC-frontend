//TO GET ALL ORGANIZATIONS
import * as actionTypes from './ActionTypes/actionTypesCreateWorkflow';
import axios from 'axios';
export const createStatesSuccess =(CreateStates) =>{
    return {
        type: actionTypes.CREATE_STATES_SUCCESS,
        CreateStates: CreateStates
    };
};

export const createStatesFail =(error) =>{
    return {
        type: actionTypes.CREATE_STATES_FAIL,
        error:error
    };
}

export const createStatesStart =()=>{
    return {
        type: actionTypes.CREATE_STATES_START
    };
}

export const createStates =(name,workflow,description,token)=>{
    return dispatch=>{
        dispatch(createStatesStart());
        console.log('GOT DATA');
        console.log(token)
        let data = new FormData();
            data.append("name", name);
            data.append("description", description);
            data.append("workflow", workflow);
       

        //console.log('SEnt DATA:',body);
        var config = {
            method: 'post',
            url: 'http://127.0.0.1:8000/approvals/createstate/',
            headers: { 
              'Authorization': 'Token '+token
            },
            data : data
          };
        axios(config)
        .then(res=>{
         console.log("NEWWW RESPONSE",res.data)
            dispatch(createStatesSuccess(res.data));
            console.log("FETCHED EVENTS",res.data); 
        })
        .catch(err=>{
            dispatch(createStatesFail(err));
        })
    }
}