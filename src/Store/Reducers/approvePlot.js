import * as actionTypes from '../Actions/ActionTypes/actionTypesCreatePlot';
import { updateObject } from '../../shared/utility';
const initialState={
    PlotApprovals:[],
    successMessage: null,
    errorMessage: null,
    loading:null,
}

const PlotApprovalStart = ( state, action ) => {
    console.log("IT HAS STARTEDDD");
    return updateObject( state, {loading: true} );
};

const PlotApprovalSuccess = ( state, action ) => {
    console.log('SUCCESSSSS',action.PlotApprovals);
    return updateObject( state, {
        successMessage:"Success! You have Approved Plot!",
        errorMessage:null,
        loading: false
    } );
   
};

const PlotApprovalFail = ( state, action ) => {
    return updateObject( state, { 
        loading: false,
        errorMessage:"Plot could not be approved, try again.",
        successMessage:null,
     } );
};

const reducer =(state = initialState, action )=>{
    switch(action.type){
        case actionTypes.APPV_PLOT_START: return PlotApprovalStart( state, action );
        case actionTypes.APPV_PLOT_SUCCESS: return PlotApprovalSuccess( state, action );
        case actionTypes.APPV_PLOT_FAIL: return PlotApprovalFail( state, action );
        default: return state;
    }
}
export default reducer;
