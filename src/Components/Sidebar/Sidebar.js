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
            <li><a href="/crtwkfl">CREATE WORKFLOW</a></li><br/><br/>
            <li><a href="/crtstate">CREATE STATE</a></li><br/><br/>
            <li><a href="/selwkfl">CREATE TRANSACTION</a></li><br/><br/>
            <li><a href="/crtfarmer">CREATE FARMER</a></li><br/><br/>
            <li><a href="/appvgetfarmer">APPROVE FARMER</a></li><br/><br/>
            <li><a href="/crtplot">CREATE PLOT</a></li><br/><br/>
            <li><a href="/appvgetplot">APPROVE PLOT</a></li><br/><br/>
        </ul>
        </nav>
    </div> 
        );
    } ;


export default Sidebar;