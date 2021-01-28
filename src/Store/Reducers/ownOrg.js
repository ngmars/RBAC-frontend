import * as actionTypes from '../Actions/ActionTypes/actionTypesAllOrganization';
import { updateObject } from '../../shared/utility';
const initialState={
    ownOrganizations:[],
    loading:false,
}

const fetchOwnOrganizationsStart = ( state, action ) => {
    console.log("IT HAS STARTEDDD");
    return updateObject( state, {loading: true} );
};

const fetchOwnOrganizationsSuccess = ( state, action ) => {
    console.log('SUCCESSSSS',action.ownOrganizations);
    return updateObject( state, {
        ownOrganizations:action.ownOrganizations,
        loading: false
    } );
   
};

const fetchOwnOrganizationsFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer =(state = initialState, action )=>{
    switch(action.type){
        case actionTypes.FETCH_OWN_ORG_START: return fetchOwnOrganizationsStart( state, action );
        case actionTypes.FETCH_OWN_ORG_SUCCESS: return fetchOwnOrganizationsSuccess( state, action );
        case actionTypes.FETCH_OWN_ORG_FAIL: return fetchOwnOrganizationsFail( state, action );
        default: return state;
    }
}
export default reducer;
