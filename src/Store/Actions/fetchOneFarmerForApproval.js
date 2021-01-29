//TO GET ALL ORGANIZATIONS
import * as actionTypes from './ActionTypes/actionTypesApproveFarmer';
import axios from 'axios';
export const fetchOneFarmerForApprovalSuccess =(OneFarmerForApprovals) =>{
    return {
        type: actionTypes.FETCH_ONE_FARMER_APPRV_SUCCESS,
        OneFarmerForApprovals: OneFarmerForApprovals
    };
};

export const fetchOneFarmerForApprovalFail =(error) =>{
    return {
        type: actionTypes.FETCH_ONE_FARMER_APPRV_FAIL,
        error:error
    };
}

export const fetchOneFarmerForApprovalStart =()=>{
    return {
        type: actionTypes.FETCH_ONE_FARMER_APPRV_START
    };
}

export const fetchOneFarmerForApproval =(token)=>{
    return dispatch=>{
        dispatch(fetchOneFarmerForApprovalStart());
        let farmer_id= localStorage.getItem('farmer');
        console.log('GOT DATA');
        let config = {
            headers: {
                'Authorization': 'Basic YWRtaW5fMToxMjM0'
            }
          }
        axios.get('http://127.0.0.1:8000/example/reqfarmer/'+farmer_id,config)
        .then(res=>{
         console.log("NEWWW RESPONSE",res.data)
                const fetchedFarmers = [];
                for ( let key in res.data) {
                    //console.log(res.data.fundraiser[key],key)
                    fetchedFarmers.push( {
                        ...res.data[key],
                        id: res.data[key].id
                    } );
                }
            dispatch(fetchOneFarmerForApprovalSuccess(res.data));
            console.log("FETCHED EVENTS",res.data); 
        })
        .catch(err=>{
            dispatch(fetchOneFarmerForApprovalFail(err));
        })
    }
}