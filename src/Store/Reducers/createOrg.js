import * as actionTypes from '../Actions/ActionTypes/actionTypesCreateOrg';
import { updateObject } from '../../shared/utility';
const initialState={
    CreateOrg:[],
    loading:false,
}

const createOrgStart = ( state, action ) => {
    console.log("IT HAS STARTEDDD");
    return updateObject( state, {loading: true} );
};

const createOrgSuccess = ( state, action ) => {
    console.log('SUCCESSSSS',action.AllRoles);
    return updateObject( state, {
        CreateOrg:action.AllRoles,
        loading: false
    } );
   
};

const createOrgFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer =(state = initialState, action )=>{
    switch(action.type){
        case actionTypes.CREATE_ORG_START: return createOrgStart( state, action );
        case actionTypes.CREATE_ORG_SUCCESS: return createOrgSuccess( state, action );
        case actionTypes.CREATE_ORG_FAIL: return createOrgFail( state, action );
        default: return state;
    }
}
export default reducer;
