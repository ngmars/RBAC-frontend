//TO GET ALL ORGANIZATIONS
import * as actionTypes from './ActionTypes/actionTypesCreateTransaction';
import axios from 'axios';
export const fetchWkflByOrgSuccess =(WkflByOrgs) =>{
    return {
        type: actionTypes.FETCH_WKFL_BY_ORG_SUCCESS,
        WkflByOrgs: WkflByOrgs
    };
};

export const fetchWkflByOrgFail =(error) =>{
    return {
        type: actionTypes.FETCH_WKFL_BY_ORG_FAIL,
        error:error
    };
}

export const fetchWkflByOrgStart =()=>{
    return {
        type: actionTypes.FETCH_WKFL_BY_ORG_START
    };
}

export const fetchWkflByOrg =(token)=>{
    return dispatch=>{
        dispatch(fetchWkflByOrgStart());
        console.log('GOT DATA');
        console.log(token)
        let organization= localStorage.getItem('eventId')
        let data = new FormData();
            data.append("organization",organization);
        var config = {
            method: 'post',
            url: 'http://127.0.0.1:8000/approvals/workflowsByOrg/',
            headers: { 
              'Authorization': 'Token '+token
            },
            data : data
          };
        axios(config).then(res=>{
         console.log("NEWWW RESPONSE",res.data)
                const fetchedWkfls = [];
                for ( let key in res.data) {
                    //console.log(res.data.fundraiser[key],key)
                    fetchedWkfls.push( {
                        ...res.data[key],
                        id: res.data[key].id
                    } );
                }
            dispatch(fetchWkflByOrgSuccess(fetchedWkfls));
            console.log("FETCHED EVENTS",fetchedWkfls); 
        })
        .catch(err=>{
            dispatch(fetchWkflByOrgFail(err));
        })
    }
}