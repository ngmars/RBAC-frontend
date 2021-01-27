import * as actionTypes from '../Actions/ActionTypes/actionTypesAllRoles';
import { updateObject } from '../../shared/utility';
const initialState={
    AllRoles:[],
    loading:false,
}

const fetchAllRoleStart = ( state, action ) => {
    console.log("IT HAS STARTEDDD");
    return updateObject( state, {loading: true} );
};

const fetchAllRoleSuccess = ( state, action ) => {
    console.log('SUCCESSSSS',action.AllRoles);
    return updateObject( state, {
        AllRoles:action.AllRoles,
        loading: false
    } );
   
};

const fetchAllRoleFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer =(state = initialState, action )=>{
    switch(action.type){
        case actionTypes.ALL_ROLES_GET_START: return fetchAllRoleStart( state, action );
        case actionTypes.ALL_ROLES_GET_SUCCESS: return fetchAllRoleSuccess( state, action );
        case actionTypes.ALL_ROLES_GET_FAIL: return fetchAllRoleFail( state, action );
        default: return state;
    }
}
export default reducer;
