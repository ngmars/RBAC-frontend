//TO GET ALL ORGANIZATIONS
import * as actionTypes from './ActionTypes/actionTypesCreatePlot';
import axios from 'axios';
export const createPlotSuccess =(createPlot) =>{
    return {
        type: actionTypes.CREATE_PLOT_SUCCESS,
        createPlot: createPlot
    };
};

export const createPlotFail =(error) =>{
    return {
        type: actionTypes.CREATE_PLOT_FAIL,
        error:error
    };
}

export const createPlotStart =()=>{
    return {
        type: actionTypes.CREATE_PLOT_START
    };
}

export const createPlot =(vname,sname,area,token)=>{
    return dispatch=>{
        dispatch(createPlotStart());
        let id = localStorage.getItem('id');
        console.log('GOT DATA');
        console.log(token)
        let data = new FormData();
            data.append("vname", vname);
            data.append("sname", sname);
            data.append("area", area);
            data.append("farmer",id);

        var config = {
            method: 'post',
            url: 'http://127.0.0.1:8000/example/addplot/',
            headers: { 
              'Authorization': 'Token '+token
            },
            data : data
          };
        axios(config)
        .then(res=>{
         console.log("NEWWW RESPONSE",res.data)
            dispatch(createPlotSuccess(res.data));
            console.log("FETCHED EVENTS",res.data); 
        })
        .catch(err=>{
            dispatch(createPlotFail(err));
        })
    }
}