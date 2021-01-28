//TO GET ALL ORGANIZATIONS
import * as actionTypes from './ActionTypes/actionTypesAllOrganization';
import axios from 'axios';
export const fetchOrganizationsSuccess =(organizations) =>{
    return {
        type: actionTypes.FETCH_ORGANIZATIONS_SUCCESS,
        organizations: organizations
    };
};

export const fetchOrganizationsFail =(error) =>{
    return {
        type: actionTypes.FETCH_ORGANIZATIONS_FAILED,
        error:error
    };
}

export const fetchOrganizationsStart =()=>{
    return {
        type: actionTypes.FETCH_ORGANIZATIONS_START
    };
}

export const fetchOrganizations =(token)=>{
     token = localStorage.getItem('token')
    return dispatch=>{
        dispatch(fetchOrganizationsStart());
        console.log('GOT DATA');
        let config = {
            headers: {
                'Authorization': 'Token ' + token
            }
          }
        axios.get('http://127.0.0.1:8000/getorganization/',config)
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
            dispatch(fetchOrganizationsSuccess(fetchedOrganizations));
            console.log("FETCHED EVENTS",fetchedOrganizations);  
        })
        .catch(err=>{
            dispatch(fetchOrganizationsFail(err));
        })
    }
}