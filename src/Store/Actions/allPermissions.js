//TO GET ALL ORGANIZATIONS
import * as actionTypes from './ActionTypes/actionTypesGetAllPermission';
import axios from 'axios';
export const fetchAllPermissionsSuccess =(permissions) =>{
    return {
        type: actionTypes.FETCH_ALL_PERMISSIONS_SUCCESS,
        AllPermissions: permissions
    };
};

export const fetchAllPermissionsFail =(error) =>{
    return {
        type: actionTypes.FETCH_ALL_PERMISSIONS_FAIL,
        error:error
    };
}

export const fetchAllPermissionsStart =()=>{
    return {
        type: actionTypes.FETCH_ALL_PERMISSIONS_START
    };
}

export const fetchAllPermissions =(token)=>{
     token = localStorage.getItem('token')
    return dispatch=>{
        dispatch(fetchAllPermissionsStart());
        console.log('GOT DATA');
        let config = {
            headers: {
                'Authorization': 'Token ' + token
            }
          }
        axios.get('http://127.0.0.1:8000/permissions_roles/router/PermissionApi/',config)
        .then(res=>{
         console.log("NEWWW RESPONSE",res.data)
                const fetchedPermissions = [];
            
                for ( let key in res.data) {
                    //console.log(res.data.fundraiser[key],key)
                    fetchedPermissions.push( {
                        ...res.data[key],
                        id: res.data[key].id
                    } );
                }
            dispatch(fetchAllPermissionsSuccess(fetchedPermissions));
            console.log("FETCHED EVENTS",fetchedPermissions);  
        })
        .catch(err=>{
            dispatch(fetchAllPermissionsFail(err));
        })
    }
}