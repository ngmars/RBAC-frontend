//TO GET ALL ORGANIZATIONS
import * as actionTypes from './ActionTypes/actionTypesCreatePlot';
import axios from 'axios';
export const fetchOnePlotForApprovalSuccess =(OnePlotForApprovals) =>{
    return {
        type: actionTypes.FETCH_ONE_PLOT_APPV_SUCCESS,
        OnePlotForApprovals: OnePlotForApprovals
    };
};

export const fetchOnePlotForApprovalFail =(error) =>{
    return {
        type: actionTypes.FETCH_ONE_PLOT_APPV_FAIL,
        error:error
    };
}

export const fetchOnePlotForApprovalStart =()=>{
    return {
        type: actionTypes.FETCH_ONE_PLOT_APPV_START
    };
}

export const fetchOnePlotForApproval =(token)=>{
    return dispatch=>{
        dispatch(fetchOnePlotForApprovalStart());
        let Plot_id= localStorage.getItem('Plot');
        console.log('GOT DATA');
        let config = {
            headers: {
                'Authorization': 'Basic ZmllbGRfbW9uaXRlcl8xOjEyMzQ='
            }
          }
        axios.get('http://127.0.0.1:8000/example/reqplot/'+Plot_id+'/',config)
        .then(res=>{
         console.log("NEWWW RESPONSE",res.data)
                
            dispatch(fetchOnePlotForApprovalSuccess(res.data));
            console.log("FETCHED EVENTS",res.data); 
        })
        .catch(err=>{
            dispatch(fetchOnePlotForApprovalFail(err));
        })
    }
}