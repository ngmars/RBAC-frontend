import React from 'react';
import classes from './Navbar.css';
const navbar =(props)=>{
let name= props.name;

return (


<nav class="topbar">
    <div class="dropdown">
        <button class="dropbtn">{name}</button>
        <div class="dropdown-content">
            <a href="/logout">Logout</a>
            <a href="">Change Password</a>
        </div>
    </div>
</nav>
)

}

export default navbar;