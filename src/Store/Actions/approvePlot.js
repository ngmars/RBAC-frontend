//TO GET ALL ORGANIZATIONS
import * as actionTypes from './ActionTypes/actionTypesCreatePlot';
import axios from 'axios';
export const PlotApprovalSuccess =(OnePlotApprovals) =>{
    return {
        type: actionTypes.APPV_PLOT_SUCCESS,
        OnePlotApprovals: OnePlotApprovals
    };
};

export const PlotApprovalFail =(error) =>{
    return {
        type: actionTypes.APPV_PLOT_FAIL,
        error:error
    };
}

export const PlotApprovalStart =()=>{
    return {
        type: actionTypes.APPV_PLOT_START
    };
}

export const PlotApproval =(token)=>{
    return dispatch=>{
        dispatch(PlotApprovalStart());
        let Plot_id= localStorage.getItem('Plot');
        console.log('GOT DATA');
        let config = {
            headers: {
                'Authorization': 'Basic ZmllbGRfbW9uaXRlcl8xOjEyMzQ='
            }
          }
        axios.post('http://127.0.0.1:8000/example/reqplot/'+Plot_id+'/',config)
        .then(res=>{
         console.log("NEWWW RESPONSE",res.data)
            dispatch(PlotApprovalSuccess(res.data));
            console.log("FETCHED EVENTS",res.data); 
        })
        .catch(err=>{
            dispatch(PlotApprovalFail(err));
        })
    }
}