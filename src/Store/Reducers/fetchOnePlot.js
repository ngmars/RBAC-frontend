import * as actionTypes from '../Actions/ActionTypes/actionTypesCreatePlot';
import { updateObject } from '../../shared/utility';
const initialState={
    OnePlotForApprovals:[],
    loading:null,
}

const fetchOnePlotForApprovalStart = ( state, action ) => {
    console.log("IT HAS STARTEDDD");
    return updateObject( state, {loading: true} );
};

const fetchOnePlotForApprovalSuccess = ( state, action ) => {
    console.log('SUCCESSSSS',action.OnePlotForApprovals);
    return updateObject( state, {
        OnePlotForApprovals:action.OnePlotForApprovals,
        loading: false
    } );
   
};

const fetchOnePlotForApprovalFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer =(state = initialState, action )=>{
    switch(action.type){
        case actionTypes.FETCH_ONE_PLOT_APPV_START: return fetchOnePlotForApprovalStart( state, action );
        case actionTypes.FETCH_ONE_PLOT_APPV_SUCCESS: return fetchOnePlotForApprovalSuccess( state, action );
        case actionTypes.FETCH_ONE_PLOT_APPV_FAIL: return fetchOnePlotForApprovalFail( state, action );
        default: return state;
    }
}
export default reducer;
