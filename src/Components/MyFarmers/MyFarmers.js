import { render } from '@testing-library/react';
import React from 'react';
import classes from './MyFarmers.css'
import newImg from './newimg.jpg'
const MyFarmer=(props) =>{
    let name=  props.name;
    let age=  props.age;
    let phone = props.phone
   

    return (
        
        <div className="col-md-6 col-lg-4 col-xl-3">
        <figure className="snip1527">
          <div className="image"><img src={newImg} /></div>
          <figcaption>
          <h3>Name: {props.name}</h3><br/>
            <h3>Age: {props.age}</h3><br/>
            <h3>Phone Number: {props.phone}</h3><br/>
          </figcaption>
          <a ></a>
        </figure>
      </div>
    )}

export default MyFarmer;