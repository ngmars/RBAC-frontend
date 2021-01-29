//TO GET ALL ORGANIZATIONS
import * as actionTypes from './ActionTypes/actionTypesApproveFarmer';
import axios from 'axios';
export const FarmerApprovalSuccess =(OneFarmerApprovals) =>{
    return {
        type: actionTypes.FARMER_APPRV_SUCCESS,
        OneFarmerApprovals: OneFarmerApprovals
    };
};

export const FarmerApprovalFail =(error) =>{
    return {
        type: actionTypes.FARMER_APPRV_FAIL,
        error:error
    };
}

export const FarmerApprovalStart =()=>{
    return {
        type: actionTypes.FARMER_APPRV_START
    };
}

export const farmerApproval =(token)=>{
    return dispatch=>{
        dispatch(FarmerApprovalStart());
        let farmer_id= localStorage.getItem('farmer');
        console.log('GOT DATA');
        let config = {
            headers: {
                'Authorization': 'Basic YWRtaW5fMToxMjM0'
            }
          }
        axios.post('http://127.0.0.1:8000/example/reqfarmer/'+farmer_id+'/',config)
        .then(res=>{
         console.log("NEWWW RESPONSE",res.data)
            dispatch(FarmerApprovalSuccess(res.data));
            console.log("FETCHED EVENTS",res.data); 
        })
        .catch(err=>{
            dispatch(FarmerApprovalFail(err));
        })
    }
}