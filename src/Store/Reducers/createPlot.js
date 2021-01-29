import * as actionTypes from '../Actions/ActionTypes/actionTypesCreatePlot';
import { updateObject } from '../../shared/utility';
const initialState={
    successMessage: null,
    errorMessage: null,
    loading:false,
}

const createPlotStart = ( state, action ) => {
    console.log("IT HAS STARTEDDD");
    return updateObject( state, {loading: true} );
};

const createPlotSuccess = ( state, action ) => {
    console.log('SUCCESSSSS',action);
    return updateObject( state, {
        successMessage:"Success! New Plot sent for approval!!",
        loading: false
    } );
   
};

const createPlotFail = ( state, action ) => {
    return updateObject( state, {
    errorMessage:"New Plot not created!",
    loading: false } );
};

const reducer =(state = initialState, action )=>{
    switch(action.type){
        case actionTypes.CREATE_PLOT_START: return createPlotStart( state, action );
        case actionTypes.CREATE_PLOT_SUCCESS: return createPlotSuccess( state, action );
        case actionTypes.CREATE_PLOT_FAIL: return createPlotFail( state, action );
        default: return state;
    }
}
export default reducer;
