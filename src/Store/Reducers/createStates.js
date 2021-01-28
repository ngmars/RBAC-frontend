import * as actionTypes from '../Actions/ActionTypes/actionTypesCreateWorkflow';
import { updateObject } from '../../shared/utility';
const initialState={
    CreateStates:[],
    successMessage: null,
    errorMessage: null,
    loading:false,
}

const createStatesStart = ( state, action ) => {
    console.log("IT HAS STARTEDDD");
    return updateObject( state, {loading: true} );
};

const createStatesSuccess = ( state, action ) => {
    console.log('SUCCESSSSS',action);
    return updateObject( state, {
        errorMessage:null,
        successMessage:"Success! You have created a new States!!",
        loading: false
    } );
   
};

const createStatesFail = ( state, action ) => {
    return updateObject( state, {
    errorMessage:"New States not created!",
    successMessage:null,
    loading: false } );
};

const reducer =(state = initialState, action )=>{
    switch(action.type){
        case actionTypes.CREATE_STATES_START: return createStatesStart( state, action );
        case actionTypes.CREATE_STATES_SUCCESS: return createStatesSuccess( state, action );
        case actionTypes.CREATE_STATES_FAIL: return createStatesFail( state, action );
        default: return state;
    }
}
export default reducer;
