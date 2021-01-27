import * as actionTypes from '../Actions/ActionTypes/actionTypesGetAllPermission';
import { updateObject } from '../../shared/utility';
const initialState={
    AllPermissions:[],
    loading:false,
}

const fetchAllPermissionsStart = ( state, action ) => {
    console.log("IT HAS STARTEDDD");
    return updateObject( state, {loading: true} );
};

const fetchAllPermissionsSuccess = ( state, action ) => {
    console.log('SUCCESSSSS',action.AllPermissions);
    return updateObject( state, {
        AllPermissions:action.AllPermissions,
        loading: false
    } );
   
};

const fetchAllPermissionsFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer =(state = initialState, action )=>{
    switch(action.type){
        case actionTypes.FETCH_ALL_PERMISSIONS_START: return fetchAllPermissionsStart( state, action );
        case actionTypes.FETCH_ALL_PERMISSIONS_SUCCESS: return fetchAllPermissionsSuccess( state, action );
        case actionTypes.FETCH_ALL_PERMISSIONS_FAIL: return fetchAllPermissionsFail( state, action );
        default: return state;
    }
}
export default reducer;
