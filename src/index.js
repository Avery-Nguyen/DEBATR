import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Store from './Store'
import { BrowserRouter, Route, Switch } from 'react-router-dom';



ReactDOM.render(
  <BrowserRouter>
  <Store>
    <Switch>
    <Route exact path='/' component={App}/>
    <Route path='/login/github' component={() => { 
     window.location.href = 'https://github.com/login/oauth/authorize?client_id=ad0e34b6f513926763b6'; 
     return null;
}}/>
    </Switch>
  </Store>
  </BrowserRouter>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
