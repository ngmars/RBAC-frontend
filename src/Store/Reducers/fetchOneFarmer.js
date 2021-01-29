import * as actionTypes from '../Actions/ActionTypes/actionTypesApproveFarmer';
import { updateObject } from '../../shared/utility';
const initialState={
    OneFarmerForApprovals:[],
    loading:null,
}

const fetchOneFarmerForApprovalStart = ( state, action ) => {
    console.log("IT HAS STARTEDDD");
    return updateObject( state, {loading: true} );
};

const fetchOneFarmerForApprovalSuccess = ( state, action ) => {
    console.log('SUCCESSSSS',action.OneFarmerForApprovals);
    return updateObject( state, {
        OneFarmerForApprovals:action.OneFarmerForApprovals,
        loading: false
    } );
   
};

const fetchOneFarmerForApprovalFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer =(state = initialState, action )=>{
    switch(action.type){
        case actionTypes.FETCH_ONE_FARMER_APPRV_START: return fetchOneFarmerForApprovalStart( state, action );
        case actionTypes.FETCH_ONE_FARMER_APPRV_SUCCESS: return fetchOneFarmerForApprovalSuccess( state, action );
        case actionTypes.FETCH_ONE_FARMER_APPRV_FAIL: return fetchOneFarmerForApprovalFail( state, action );
        default: return state;
    }
}
export default reducer;
