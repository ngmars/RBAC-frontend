import { render } from '@testing-library/react';
import React from 'react';
import classes from './MyOrg.css'
import newImg from './newimg.jpg'
const myOrgs=(props) =>{
    let name=  props.name;
    let owner=  props.owner;
    let orgId = props.orgId;

    return (
        
        <div className="col-md-6 col-lg-4 col-xl-3">
        <figure className="snip1527">
          <div className="image"><img src={newImg} /></div>
          <figcaption>
          <h3>Name: {props.name}</h3><br/>
            <h3>Owner: {props.owner}</h3><br/>
            <h3>Organization ID :{props.orgId}</h3><br/>
          </figcaption>
          <a ></a>
        </figure>
      </div>
    )}

export default myOrgs;