import * as actionTypes from '../Actions/ActionTypes/actionTypesApproveFarmer';
import { updateObject } from '../../shared/utility';
const initialState={
    FarmerApprovals:[],
    successMessage: null,
    errorMessage: null,
    loading:null,
}

const FarmerApprovalStart = ( state, action ) => {
    console.log("IT HAS STARTEDDD");
    return updateObject( state, {loading: true} );
};

const FarmerApprovalSuccess = ( state, action ) => {
    console.log('SUCCESSSSS',action.FarmerApprovals);
    return updateObject( state, {
        successMessage:"Success! You have Approved Farmer!",
        errorMessage:null,
        loading: false
    } );
   
};

const FarmerApprovalFail = ( state, action ) => {
    return updateObject( state, { 
        loading: false,
        errorMessage:"Farmer could not be approved, try again.",
        successMessage:null,
     } );
};

const reducer =(state = initialState, action )=>{
    switch(action.type){
        case actionTypes.FARMER_APPRV_START: return FarmerApprovalStart( state, action );
        case actionTypes.FARMER_APPRV_SUCCESS: return FarmerApprovalSuccess( state, action );
        case actionTypes.FARMER_APPRV_FAIL: return FarmerApprovalFail( state, action );
        default: return state;
    }
}
export default reducer;
