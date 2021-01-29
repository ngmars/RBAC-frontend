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
import './index.css';
import App from './App';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth:authReducer,signup:SignUpReducer, organizations: allOrganizationsReducers,RoleByOrganization:fetchRoleByOrgReducer,
    AllRoles:fetchAllRolesReducer, CreateOrg: createOrgReducer, AllUsers: AllUsersReducer, AllPermissions:AllPermissionsReducer,
    CreateRole:CreateRoleReducer, ownOrganizations:fetchOwnOrgReducer, createWorkflow:createWorkflowReducer, fetchAllWorkflows:getallWorkflowReducer,
    CreateStates:createStatesReducer, WkflByOrg:WfklByOrgReducer,StatebyWkfls:StatebyWkflReducer, createTransaction:CreateTransactionReducer
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

