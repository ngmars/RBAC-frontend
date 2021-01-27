import { render } from '@testing-library/react';
import React from 'react';
import classes from './OneRole.css'
import newImg from './newimg.jpg'
const oneRole=(props) =>{
    let name=  props.name;
    let permission=  props.permission;
    let roleId = props.roleId;
    let permdiv = (<div></div>);
    console.log("permissions",props.permission);
    if(props.permission.length>0){
    permdiv = props.permission.map(event =>(
        <div>
            <h3>{event}</h3><br/>
        </div>
    ))
    }
    return (
        
        <div className="col-md-6 col-lg-4 col-xl-3">
        <figure className="snip1527">
          <div className="image"><img src={newImg} /></div>
          <figcaption>
          <h3>Name: {props.name}</h3><br/>
          <h3>Role ID :{props.roleId}</h3><br/>
          <h3>Permissions</h3>
          <div>
            {permdiv }
          </div>
          </figcaption>
          <a ></a>
        </figure>
      </div>
    )}

export default oneRole;