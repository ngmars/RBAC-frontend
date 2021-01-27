import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import {BrowserRouter as Router,Switch, Route} from "react-router-dom";
//ROUTES
import Auth from'./Containers/Auth/Auth';
import viewOrgs from './Containers/Dashboard/ViewOrg/ViewOrg';
import oneRole from './Containers/Dashboard/OneRole/OneRole';
import viewRole from './Containers/Dashboard/ViewRole/ViewRole';
import CreateOrgs from './Containers/Dashboard/CreateOrg/CreateOrg';
import CreateRole from './Containers/Dashboard/CreateRole/CreateRole';
class App extends Component {
  render () {
  return (
    <div className="App">
    <Router>
    <Switch>
        <Route path="/" exact component={Auth}/>
    </Switch>
    <Switch>
        <Route path="/vworg" exact component={viewOrgs}/>
    </Switch>
    <Switch>
        <Route path="/oneRole" exact component={oneRole}/>
    </Switch>
    <Switch>
        <Route path="/vwrole" exact component={viewRole}/>
    </Switch>
    <Switch>
        <Route path="/crtorg" exact component={CreateOrgs}/>
    </Switch>
    <Switch>
        <Route path="/crtrole" exact component={CreateRole}/>
    </Switch>
    </Router>
    

    </div>
  );
};
}

export default App;


