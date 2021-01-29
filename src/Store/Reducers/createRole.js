import * as actionTypes from '../Actions/ActionTypes/actionTypesCreateRole';
import { updateObject } from '../../shared/utility';
const initialState={
    CreateRole:[],
    successMessage: null,
    errorMessage: null,
    loading:false,
}

const createRoleStart = ( state, action ) => {
    console.log("IT HAS STARTEDDD");
    return updateObject( state, {loading: true} );
};

const createRoleSuccess = ( state, action ) => {
    console.log('SUCCESSSSS',action.AllRoles);
    return updateObject( state, {
        successMessage:"Success! You have created a new role!",
        errorMessage:null,
        loading: false
    } );
   
};

const createRoleFail = ( state, action ) => {
    return updateObject( state, {
    errorMessage:"New role not created!",
    loading: false ,
    successMessage:null,} );
};

const reducer =(state = initialState, action )=>{
    switch(action.type){
        case actionTypes.CREATE_ROLES_GET_START: return createRoleStart( state, action );
        case actionTypes.CREATE_ROLES_GET_SUCCESS: return createRoleSuccess( state, action );
        case actionTypes.CREATE_ROLES_GET_FAIL: return createRoleFail( state, action );
        default: return state;
    }
}
export default reducer;
