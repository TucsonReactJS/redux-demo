import React from 'react';
var injectTapEventPlugin = require("react-tap-event-plugin");
import BrowserHistory from 'react-router/lib/BrowserHistory'
import HashHistory from 'react-router/lib/HashHistory'
import Root from './Root'
var $ = require('jquery');

// Configure jQuery to add the authorization token
// to all AJAX requests
$.ajaxSetup({
  headers: {
    "Authorization": "Bearer " + localStorage.userToken
  }
});

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// Use hash location for Github Pages
// but switch to HTML5 history locally.
const history = process.env.NODE_ENV === 'production' ?
  new HashHistory() :
  new BrowserHistory();

React.render(<Root history={history} />, document.getElementById('root'));
