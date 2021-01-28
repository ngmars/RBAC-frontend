import * as actionTypes from '../Actions/ActionTypes/actionTypesCreateTransaction';
import { updateObject } from '../../shared/utility';
const initialState={
    StateByWkfls:[],
    loading:false,
}

const fetchStateByWkflStart = ( state, action ) => {
    console.log("IT HAS STARTEDDD");
    return updateObject( state, {loading: true} );
};

const fetchStateByWkflSuccess = ( state, action ) => {
    console.log('SUCCESSSSS',action.StateByWkfls);
    return updateObject( state, {
        StateByWkfls:action.StateByWkfls,
        loading: false
    } );
   
};

const fetchStateByWkflFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer =(state = initialState, action )=>{
    switch(action.type){
        case actionTypes.FETCH_ST_BY_WKFL_START: return fetchStateByWkflStart( state, action );
        case actionTypes.FETCH_ST_BY_WKFL_SUCCESS: return fetchStateByWkflSuccess( state, action );
        case actionTypes.FETCH_ST_BY_WKFL_FAIL: return fetchStateByWkflFail( state, action );
        default: return state;
    }
}
export default reducer;
