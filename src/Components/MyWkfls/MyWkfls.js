import { render } from '@testing-library/react';
import React from 'react';
import classes from './MyWkfl.css'
import newImg from './newimg.jpg'
const myWkfl=(props) =>{
    let name=  props.name;
    let description=  props.description;
   

    return (
        
        <div className="col-md-6 col-lg-4 col-xl-3">
        <figure className="snip1527">
          <div className="image"><img src={newImg} /></div>
          <figcaption>
          <h3>Name: {props.name}</h3><br/>
            <h3>Description: {props.description}</h3><br/>
           
          </figcaption>
          <a ></a>
        </figure>
      </div>
    )}

export default myWkfl;