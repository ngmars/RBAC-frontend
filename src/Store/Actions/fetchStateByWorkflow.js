//TO GET ALL ORGANIZATIONS
import * as actionTypes from './ActionTypes/actionTypesCreateTransaction';
import axios from 'axios';
export const fetchStateByWkflSuccess =(StateByWkfls) =>{
    return {
        type: actionTypes.FETCH_ST_BY_WKFL_SUCCESS,
        StateByWkfls: StateByWkfls
    };
};

export const fetchStateByWkflFail =(error) =>{
    return {
        type: actionTypes.FETCH_ST_BY_WKFL_FAIL,
        error:error
    };
}

export const fetchStateByWkflStart =()=>{
    return {
        type: actionTypes.FETCH_ST_BY_WKFL_START
    };
}

export const fetchStateByWkfl =(token)=>{
    return dispatch=>{
        dispatch(fetchStateByWkflStart());
        console.log('GOT DATA');
        console.log(token)
        let wkfl= localStorage.getItem('wkfl')
        let data = new FormData();
            data.append("workflow",wkfl);
        var config = {
            method: 'post',
            url: 'http://127.0.0.1:8000/approvals/statesByWorkflow/',
            headers: { 
              'Authorization': 'Token '+token
            },
            data : data
          };
        axios(config)
        .then(res=>{
         console.log("NEWWW RESPONSE",res.data)
                const fetchedStates = [];
                for ( let key in res.data) {
                    //console.log(res.data.fundraiser[key],key)
                    fetchedStates.push( {
                        ...res.data[key],
                        id: res.data[key].id
                    } );
                }
            dispatch(fetchStateByWkflSuccess(fetchedStates));
            console.log("FETCHED EVENTS",fetchedStates); 
        })
        .catch(err=>{
            dispatch(fetchStateByWkflFail(err));
        })
    }
}