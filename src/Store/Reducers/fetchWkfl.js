import * as actionTypes from '../Actions/ActionTypes/actionTypesCreateWorkflow';
import { updateObject } from '../../shared/utility';
const initialState={
    AllWorkflows:[],
    loading:false,
}

const fetchAllWorkflowsStart = ( state, action ) => {
    console.log("IT HAS STARTEDDD");
    return updateObject( state, {loading: true} );
};

const fetchAllWorkflowsSuccess = ( state, action ) => {
    console.log('SUCCESSSSS',action.AllWorkflows);
    return updateObject( state, {
        AllWorkflows:action.AllWorkflows,
        loading: false
    } );
   
};

const fetchAllWorkflowsFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer =(state = initialState, action )=>{
    switch(action.type){
        case actionTypes.CREATE_GET_WORKFLOW_START: return fetchAllWorkflowsStart( state, action );
        case actionTypes.CREATE_GET_WORKFLOW_SUCCESS: return fetchAllWorkflowsSuccess( state, action );
        case actionTypes.CREATE_GET_WORKFLOW_FAIL: return fetchAllWorkflowsFail( state, action );
        default: return state;
    }
}
export default reducer;
