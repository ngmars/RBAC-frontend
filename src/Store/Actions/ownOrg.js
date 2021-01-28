//TO GET ALL ORGANIZATIONS
import * as actionTypes from './ActionTypes/actionTypesAllOrganization';
import axios from 'axios';
export const fetchOwnOrganizationsSuccess =(ownOrganizations) =>{
    return {
        type: actionTypes.FETCH_OWN_ORG_SUCCESS,
        ownOrganizations: ownOrganizations
    };
};

export const fetchOwnOrganizationsFail =(error) =>{
    return {
        type: actionTypes.FETCH_OWN_ORG_FAIL,
        error:error
    };
}

export const fetchOwnOrganizationsStart =()=>{
    return {
        type: actionTypes.FETCH_OWN_ORG_START
    };
}

export const fetchOwnOrganizations =(token)=>{
    console.log('HELLO')
     token = localStorage.getItem('token')
    return dispatch=>{
        dispatch(fetchOwnOrganizationsStart());
        console.log('GOT DATA');
        let config = {
            headers: {
                'Authorization': 'Token ' + token
            }
          }
        axios.get('http://127.0.0.1:8000/getownorg/',config)
        .then(res=>{
         console.log("NEWWW RESPONSE",res.data)
                const fetchedOrganizations = [];
            
                for ( let key in res.data) {
                    //console.log(res.data.fundraiser[key],key)
                    fetchedOrganizations.push( {
                        ...res.data[key],
                        id: res.data[key].id
                    } );
                }
            dispatch(fetchOwnOrganizationsSuccess(fetchedOrganizations));
            console.log("FETCHED EVENTS",fetchedOrganizations);  
        })
        .catch(err=>{
            dispatch(fetchOwnOrganizationsFail(err));
        })
    }
}