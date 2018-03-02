import React from 'react';
import Login from './components/Login/Login.js';
import Dashboard from './components/Dashboard/Dashboard.js';
import Profile from './components/Profile/Profile.js';
import Search from './components/Search/Search.js';
import { HashRouter as Router, Route } from 'react-router-dom';

export default(

           <Router>
               <div>
                   <Route component={Login} exact path='/' />
                   <Route component={Dashboard} path='/dashboard'/>
                   <Route component={Profile} path='/profile'/>
                   <Route component={Search} path='/search'/>    
               </div>
           </Router>
)