//TO GET ALL ORGANIZATIONS
import * as actionTypes from './ActionTypes/actionTypesCreatePlot';
import axios from 'axios';
export const fetchPlotForApprovalSuccess =(PlotForApprovals) =>{
    return {
        type: actionTypes.FETCH_PLOT_APPV_SUCCESS,
        PlotForApprovals: PlotForApprovals
    };
};

export const fetchPlotForApprovalFail =(error) =>{
    return {
        type: actionTypes.FETCH_PLOT_APPV_FAIL,
        error:error
    };
}

export const fetchPlotForApprovalStart =()=>{
    return {
        type: actionTypes.FETCH_PLOT_APPV_START
    };
}

export const fetchPlotForApproval =(token)=>{
    return dispatch=>{
        dispatch(fetchPlotForApprovalStart());
        console.log('GOT DATA');
        let config = {
            headers: {
                'Authorization': 'Basic ZmllbGRfbW9uaXRlcl8xOjEyMzQ='
            }
          }
        axios.get('http://127.0.0.1:8000/example/reqplot/',config)
        .then(res=>{
         console.log("NEWWW RESPONSE",res.data)
                const fetchedPlots = [];
                for ( let key in res.data) {
                    //console.log(res.data.fundraiser[key],key)
                    fetchedPlots.push( {
                        ...res.data[key],
                        id: res.data[key].id
                    } );
                }
            dispatch(fetchPlotForApprovalSuccess(fetchedPlots));
            console.log("FETCHED EVENTS",fetchedPlots); 
        })
        .catch(err=>{
            dispatch(fetchPlotForApprovalFail(err));
        })
    }
}