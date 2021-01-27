import * as actionTypes from '../Actions/ActionTypes/actionTypesAllGetUsers';
import { updateObject } from '../../shared/utility';
const initialState={
    AllUsers:[],
    loading:false,
}

const fetchAllUsersStart = ( state, action ) => {
    console.log("IT HAS STARTEDDD");
    return updateObject( state, {loading: true} );
};

const fetchAllUsersSuccess = ( state, action ) => {
    console.log('SUCCESSSSS',action.AllRoles);
    return updateObject( state, {
        AllUsers:action.AllUsers,
        loading: false
    });
   
};

const fetchAllUsersFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer =(state = initialState, action )=>{
    switch(action.type){
        case actionTypes.GET_ALL_USERS_START: return fetchAllUsersStart( state, action );
        case actionTypes.GET_ALL_USERS_SUCCESS: return fetchAllUsersSuccess( state, action );
        case actionTypes.GET_ALL_USERS_FAIL: return fetchAllUsersFail( state, action );
        default: return state;
    }
}
export default reducer;
