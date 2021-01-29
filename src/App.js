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
import Logout from './Containers/Auth/Logout/Logout';
import CreateWkfl from './Containers/Dashboard/CreateWorkflow/CreateWkfl';
import StateCreation from './Containers/Dashboard/CreateState/CreateState';
import AllWkfl from './Containers/Dashboard/AllWkfl/AllWkfl';
import createTransc from './Containers/Dashboard/AllWkfl/SelTransc/SelTransc';
import CreateFarmer from './Containers/Dashboard/CreateFarmer/CreateFarmer';
import ViewFarmers from './Containers/Dashboard/ApproveFarmer/GetFarmers/GetFarmers';
import AppvFarmer from './Containers/Dashboard/ApproveFarmer/ApproveFarmer';
import CreatePlot from './Containers/Dashboard/CreatePlot/CreatePlot';
import fetchPlot from './Containers/Dashboard/ApprovePlot/FetchPlot/FetchPlot';
import AppvPlot from './Containers/Dashboard/ApprovePlot/ApprovePlot';
class App extends Component {
  render () {
  return (
    <div className="App">
    <Router>
    <Switch>
        <Route path="/logout" exact component={Logout}/>
    </Switch>
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
    <Switch>
        <Route path="/crtwkfl" exact component={CreateWkfl}/>
    </Switch>
    <Switch>
        <Route path="/crtstate" exact component={StateCreation}/>
    </Switch>
    <Switch>
        <Route path="/selwkfl" exact component={AllWkfl }/>
        <Switch>
        <Route path="/selwkfl/seltransc" exact component={createTransc}/>
        </Switch>
    </Switch>
    <Switch>
        <Route path="/crtfarmer" exact component={CreateFarmer}/>
    </Switch>
    <Switch>
        <Route path="/appvgetfarmer" exact component={ViewFarmers }/>
        <Switch>
        <Route path="/appvgetfarmer/appv" exact component={AppvFarmer}/>
        </Switch>
    </Switch>
    <Switch>
        <Route path="/crtplot" exact component={CreatePlot}/>
    </Switch>
    <Switch>
        <Route path="/appvgetplot" exact component={fetchPlot}/>
        <Switch>
        <Route path="/appvgetplot/appv" exact component={AppvPlot}/>
    </Switch>
    </Switch>
    </Router>
     

    </div>
  );
};
}

export default App;


