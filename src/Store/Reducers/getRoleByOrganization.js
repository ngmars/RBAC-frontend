import * as actionTypes from '../Actions/ActionTypes/actionTypesAllOrganization';
import { updateObject } from '../../shared/utility';
const initialState={
    RoleByOrganization:[],
    loading:false,
}

const fetchOrgRoleStart = ( state, action ) => {
    console.log("IT HAS STARTEDDD");
    return updateObject( state, {loading: true} );
};

const fetchOrgRoleSuccess = ( state, action ) => {
    console.log('SUCCESSSSS',action.RoleByOrganization);
    return updateObject( state, {
        RoleByOrganization:action.RoleByOrganization,
        loading: false
    } );
   
};

const fetchOrgRoleFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer =(state = initialState, action )=>{
    switch(action.type){
        case actionTypes.FETCH_ORGnROLES_START: return fetchOrgRoleStart( state, action );
        case actionTypes.FETCH_ORGnROLES_SUCCESS: return fetchOrgRoleSuccess( state, action );
        case actionTypes.FETCH_ORGnROLES_FAILED: return fetchOrgRoleFail( state, action );
        default: return state;
    }
}
export default reducer;
