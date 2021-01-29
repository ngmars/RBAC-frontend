import { render } from '@testing-library/react';
import React from 'react';
import classes from './MyPlots.css'
import newImg from './newimg.jpg'
const MyPlot=(props) =>{
    

    return (
        
        <div className="col-md-6 col-lg-4 col-xl-3">
        <figure className="snip1527">
          <div className="image"><img src={newImg} /></div>
          <figcaption>
          <h3>V Name: {props.vname}</h3><br/>
            <h3>S Name: {props.sname}</h3><br/>
            <h3>Area: {props.area}</h3><br/>
          </figcaption>
          <a ></a>
        </figure>
      </div>
    )}

export default MyPlot;