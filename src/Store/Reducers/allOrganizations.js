import * as actionTypes from '../Actions/ActionTypes/actionTypesAllOrganization';
import { updateObject } from '../../shared/utility';
const initialState={
    organizations:[],
    loading:null,
}

const fetchOrganizationsStart = ( state, action ) => {
    console.log("IT HAS STARTEDDD");
    return updateObject( state, {loading: true} );
};

const fetchOrganizationsSuccess = ( state, action ) => {
    console.log('SUCCESSSSS',action.organizations);
    return updateObject( state, {
        organizations:action.organizations,
        loading: false
    } );
   
};

const fetchOrganizationsFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer =(state = initialState, action )=>{
    switch(action.type){
        case actionTypes.FETCH_ORGANIZATIONS_START: return fetchOrganizationsStart( state, action );
        case actionTypes.FETCH_ORGANIZATIONS_SUCCESS: return fetchOrganizationsSuccess( state, action );
        case actionTypes.FETCH_ORGANIZATIONS_FAILED: return fetchOrganizationsFail( state, action );
        default: return state;
    }
}
export default reducer;
