//TO GET ALL ORGANIZATIONS
import * as actionTypes from './ActionTypes/actionTypesCreateFarmer';
import axios from 'axios';
export const createFarmerSuccess =(createFarmer) =>{
    return {
        type: actionTypes. CREATE_FARMER_SUCCESS,
        createFarmer: createFarmer
    };
};

export const createFarmerFail =(error) =>{
    return {
        type: actionTypes. CREATE_FARMER_FAIL,
        error:error
    };
}

export const createFarmerStart =()=>{
    return {
        type: actionTypes. CREATE_FARMER_START
    };
}

export const createFarmer =(name,age,phone,token)=>{
    return dispatch=>{
        dispatch(createFarmerStart());
        console.log('GOT DATA');
        console.log(token)
        let data = new FormData();
            data.append("name", name);
            data.append("age", age);
            data.append("phone", phone);
        var config = {
            method: 'post',
            url: 'http://127.0.0.1:8000/example/addfarmer/',
            headers: { 
              'Authorization': 'Token '+token
            },
            data : data
          };
        axios(config)
        .then(res=>{
         console.log("NEWWW RESPONSE",res.data)
            dispatch(createFarmerSuccess(res.data));
            console.log("FETCHED EVENTS",res.data); 
        })
        .catch(err=>{
            dispatch(createFarmerFail(err));
        })
    }
}