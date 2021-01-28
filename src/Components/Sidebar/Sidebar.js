import React from 'react';
import classes from './SideBar.css';




const Sidebar =()=>{

        return (
            <div class="sidebar">
        <nav class="sidenav">
        <ul class="sidebar-list" >
            <li><a href="/vworg">VIEW ORGANIZATIONS</a></li><br/><br/>
            
            <li><a href="/crtorg">CREATE ORGANIZATIONS</a></li><br/><br/>
            <li><a href="/crtrole">CREATE ROLES</a></li><br/><br/>
        </ul>
        </nav>
    </div> 
        );
    } ;


export default Sidebar;