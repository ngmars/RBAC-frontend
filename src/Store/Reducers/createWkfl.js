import * as actionTypes from '../Actions/ActionTypes/actionTypesCreateWorkflow';
import { updateObject } from '../../shared/utility';
const initialState={
    CreateRole:[],
    successMessage: null,
    errorMessage: null,
    loading:false,
}

const createWorkflowStart = ( state, action ) => {
    console.log("IT HAS STARTEDDD");
    return updateObject( state, {loading: true} );
};

const createWorkflowSuccess = ( state, action ) => {
    console.log('SUCCESSSSS',action);
    return updateObject( state, {
        successMessage:"Success! You have created a new workflow!!",
        loading: false
    } );
   
};

const createWorkflowFail = ( state, action ) => {
    return updateObject( state, {
    errorMessage:"New workflow not created!",
    loading: false } );
};

const reducer =(state = initialState, action )=>{
    switch(action.type){
        case actionTypes.CREATE_WORKFLOW_START: return createWorkflowStart( state, action );
        case actionTypes.CREATE_WORKFLOW_SUCCESS: return createWorkflowSuccess( state, action );
        case actionTypes.CREATE_WORKFLOW_FAIL: return createWorkflowFail( state, action );
        default: return state;
    }
}
export default reducer;
