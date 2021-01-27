//TO GET ALL ORGANIZATIONS
import * as actionTypes from './ActionTypes/actionTypesAllOrganization';
import axios from 'axios';
export const fetchOrgRoleSuccess =(organizations) =>{
    return {
        type: actionTypes.FETCH_ORGnROLES_SUCCESS,
        RoleByOrganization: organizations
    };
};

export const fetchOrgRoleFail =(error) =>{
    return {
        type: actionTypes.FETCH_ORGnROLES_FAILED,
        error:error
    };
}

export const fetchOrgRoleStart =()=>{
    return {
        type: actionTypes.FETCH_ORGnROLES_START
    };
}

export const fetchOrgRole =(organizationId,token)=>{
    return dispatch=>{
        dispatch(fetchOrgRoleStart());
        console.log('GOT DATA');
        let config = {
            headers: {
                'Authorization': 'Token ' + token
            }
          }
        axios.get('http://localhost:8000/router/getrolebyorg/?org='+organizationId,config)
        .then(res=>{
         console.log("NEWWW RESPONSE",res.data)
                const fetchedRoles = [];

                for ( let key in res.data) {
                    //console.log(res.data.fundraiser[key],key)
                    fetchedRoles.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
            dispatch(fetchOrgRoleSuccess(fetchedRoles));
            console.log("FETCHED EVENTS",fetchedRoles); 
        })
        .catch(err=>{
            dispatch(fetchOrgRoleFail(err));
        })
    }
}