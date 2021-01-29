import * as actionTypes from '../Actions/ActionTypes/actionTypesCreateTransaction';
import { updateObject } from '../../shared/utility';
const initialState={
    CreateRole:[],
   successMessage: null,
    errorMessage: null,
    loading:false,
}

const createTransactionStart = ( state, action ) => {
    console.log("IT HAS STARTEDDD");
    return updateObject( state, {loading: true} );
};

const createTransactionSuccess = ( state, action ) => {
    console.log('SUCCESSSSS',action);
    return updateObject( state, {
        successMessage:"Success! You have created a new transaction!!",
        errorMessage:null,
        loading: false
    } );
   
};

const createTransactionFail = ( state, action ) => {
    return updateObject( state, {
    errorMessage:"New transaction not created!",
    successMessage:null,
    loading: false } );
};

const reducer =(state = initialState, action )=>{
    switch(action.type){
        case actionTypes.CREATE_TRANSACTION_START: return createTransactionStart( state, action );
        case actionTypes.CREATE_TRANSACTION_SUCCESS: return createTransactionSuccess( state, action );
        case actionTypes.CREATE_TRANSACTION_FAIL: return createTransactionFail( state, action );
        default: return state;
    }
}
export default reducer;
