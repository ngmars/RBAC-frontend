import * as actionTypes from '../Actions/ActionTypes/actionTypesCreateTransaction';
import { updateObject } from '../../shared/utility';
const initialState={
    WkflByOrg:[],
    loading:false,
}

const fetchWkflByOrgStart = ( state, action ) => {
    console.log("IT HAS STARTEDDD");
    return updateObject( state, {loading: true} );
};

const fetchWkflByOrgSuccess = ( state, action ) => {
    console.log('SUCCESSSSS',action.WkflByOrgs);
    return updateObject( state, {
        WkflByOrg:action.WkflByOrgs,
        loading: false
    } );
   
};

const fetchWkflByOrgFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer =(state = initialState, action )=>{
    switch(action.type){
        case actionTypes.FETCH_WKFL_BY_ORG_START: return fetchWkflByOrgStart( state, action );
        case actionTypes.FETCH_WKFL_BY_ORG_SUCCESS: return fetchWkflByOrgSuccess( state, action );
        case actionTypes.FETCH_WKFL_BY_ORG_FAIL: return fetchWkflByOrgFail( state, action );
        default: return state;
    }
}
export default reducer;
