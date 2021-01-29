import * as actionTypes from '../Actions/ActionTypes/actionTypesApproveFarmer';
import { updateObject } from '../../shared/utility';
const initialState={
    FarmerForApprovals:[],
    loading:false,
}

const fetchFarmerForApprovalStart = ( state, action ) => {
    console.log("IT HAS STARTEDDD");
    return updateObject( state, {loading: true} );
};

const fetchFarmerForApprovalSuccess = ( state, action ) => {
    console.log('SUCCESSSSS',action.FarmerForApprovals);
    return updateObject( state, {
        FarmerForApprovals:action.FarmerForApprovals,
        loading: false
    } );
   
};

const fetchFarmerForApprovalFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer =(state = initialState, action )=>{
    switch(action.type){
        case actionTypes.FETCH_FARMER_APPRV_START: return fetchFarmerForApprovalStart( state, action );
        case actionTypes.FETCH_FARMER_APPRV_SUCCESS: return fetchFarmerForApprovalSuccess( state, action );
        case actionTypes.FETCH_FARMER_APPRV_FAIL: return fetchFarmerForApprovalFail( state, action );
        default: return state;
    }
}
export default reducer;
