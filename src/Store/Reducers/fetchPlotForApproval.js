import * as actionTypes from '../Actions/ActionTypes/actionTypesCreatePlot';
import { updateObject } from '../../shared/utility';
const initialState={
    PlotForApprovals:[],
    loading:false,
}

const fetchPlotForApprovalStart = ( state, action ) => {
    console.log("IT HAS STARTEDDD");
    return updateObject( state, {loading: true} );
};

const fetchPlotForApprovalSuccess = ( state, action ) => {
    console.log('SUCCESSSSS',action.PlotForApprovals);
    return updateObject( state, {
        PlotForApprovals:action.PlotForApprovals,
        loading: false
    } );
   
};

const fetchPlotForApprovalFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer =(state = initialState, action )=>{
    switch(action.type){
        case actionTypes.FETCH_PLOT_APPV_START: return fetchPlotForApprovalStart( state, action );
        case actionTypes.FETCH_PLOT_APPV_SUCCESS: return fetchPlotForApprovalSuccess( state, action );
        case actionTypes.FETCH_PLOT_APPV_FAIL: return fetchPlotForApprovalFail( state, action );
        default: return state;
    }
}
export default reducer;
