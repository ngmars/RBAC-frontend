import * as actionTypes from '../Actions/ActionTypes/actionTypesCreateFarmer';
import { updateObject } from '../../shared/utility';
const initialState={
    successMessage: null,
    errorMessage: null,
    loading:false,
}

const createFarmerStart = ( state, action ) => {
    console.log("IT HAS STARTEDDD");
    return updateObject( state, {loading: true} );
};

const createFarmerSuccess = ( state, action ) => {
    console.log('SUCCESSSSS',action);
    return updateObject( state, {
        successMessage:"Success! New farmer sent for approval!!",
        loading: false
    } );
   
};

const createFarmerFail = ( state, action ) => {
    return updateObject( state, {
    errorMessage:"New farmer not created!",
    loading: false } );
};

const reducer =(state = initialState, action )=>{
    switch(action.type){
        case actionTypes.CREATE_FARMER_START: return createFarmerStart( state, action );
        case actionTypes.CREATE_FARMER_SUCCESS: return createFarmerSuccess( state, action );
        case actionTypes.CREATE_FARMER_FAIL: return createFarmerFail( state, action );
        default: return state;
    }
}
export default reducer;
