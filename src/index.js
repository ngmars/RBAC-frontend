import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
//REDUCERS IMPORT 
import authReducer from './Store/Reducers/auth';
import allOrganizationsReducers from './Store/Reducers/allOrganizations';
import SignUpReducer from './Store/Reducers/signup';
import fetchRoleByOrgReducer from './Store/Reducers/getRoleByOrganization';
import fetchAllRolesReducer from './Store/Reducers/getAllRoles';
import createOrgReducer from './Store/Reducers/createOrg';
import AllUsersReducer from './Store/Reducers/getAllUsers';
import AllPermissionsReducer from './Store/Reducers/getAllPermissions';
import CreateRoleReducer from './Store/Reducers/createRole';
import fetchOwnOrgReducer from './Store/Reducers/ownOrg';
import createWorkflowReducer from './Store/Reducers/createWkfl';
import getallWorkflowReducer from './Store/Reducers/fetchWkfl';
import createStatesReducer from './Store/Reducers/createStates';
import WfklByOrgReducer from './Store/Reducers/fetchWkflByOrg';
import StatebyWkflReducer from './Store/Reducers/fetchStateByWkfl';
import CreateTransactionReducer from './Store/Reducers/createTransaction';
import CreateFarmerReducer from './Store/Reducers/createFarmer';
import FarmerForApprovalsReducer from './Store/Reducers/fetchFarmerForApprovals';
import OneFarmerForApprovalReducer from './Store/Reducers/fetchOneFarmer';
import FarmerApprovalReducer from './Store/Reducers/approveFarmer';
import CreatePlotReducer from './Store/Reducers/createPlot';
import PlotForApprovalsReducer from './Store/Reducers/fetchPlotForApproval';
import OnePlotForApprovalReducer from './Store/Reducers/fetchOnePlot';
import PlotApprovalReducer from './Store/Reducers/approvePlot';
import './index.css';
import App from './App';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth:authReducer,signup:SignUpReducer, organizations: allOrganizationsReducers,RoleByOrganization:fetchRoleByOrgReducer,
    AllRoles:fetchAllRolesReducer, CreateOrg: createOrgReducer, AllUsers: AllUsersReducer, AllPermissions:AllPermissionsReducer,
    CreateRole:CreateRoleReducer, ownOrganizations:fetchOwnOrgReducer, createWorkflow:createWorkflowReducer, fetchAllWorkflows:getallWorkflowReducer,
    CreateStates:createStatesReducer, WkflByOrg:WfklByOrgReducer,StatebyWkfls:StatebyWkflReducer, createTransaction:CreateTransactionReducer,
    CreateFarmer: CreateFarmerReducer,FarmerForApprovals:FarmerForApprovalsReducer,OneFarmerForApproval:OneFarmerForApprovalReducer,
    FarmerApproval:FarmerApprovalReducer, CreatePlot:CreatePlotReducer, PlotForApprovals:PlotForApprovalsReducer,OnePlotForApproval:OnePlotForApprovalReducer,
    PlotApproval:PlotApprovalReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
  <Provider store={store}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </Provider>
);

ReactDOM.render( app, document.getElementById( 'root' ) );
registerServiceWorker();

