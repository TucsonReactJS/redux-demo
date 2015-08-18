import React, { PropTypes } from 'react';
import Router, { Route, DefaultRoute, Redirect, NotFoundRoute } from 'react-router';

import { Provider } from 'react-redux';
import { createStore, combineReducers, compose, applyMiddleware, bindActionCreators } from 'redux';
import thunk from 'redux-thunk'
import * as reducers from './reducers'

import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

//
// Pages
//
var Master = require('./pages/Master');
var Lists = require('./pages/Lists');
var List = require('./pages/List');

//
// Setup Redux
//
const finalCreateStore = compose(
  //devTools(),
  //persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
  createStore
);
let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

/*
 * bind all actions to the store's dispatch method
 */

var actions = require('./actions');


Object.keys(actions).forEach(function(actionName){
  var action = actions[actionName];
  // todo: once Redux v1 comes out, we can just pass in the function directly
  var tempObj = {};
  tempObj[actionName] = action;
  actions[actionName] = bindActionCreators(tempObj, store.dispatch)[actionName];
});


/*
 * Setup the routes
 */

function renderRoutes (history) {
  return (
    <Router history={history}>
      <Route component={Master} >
        <Route path="lists" component={Lists} />
        <Route path="lists/:listId" component={List} />
        <Redirect from="/" to="/lists" />
      </Route>
    </Router>
  )
}

var Root = React.createClass({

  propTypes: {
    history: PropTypes.object.isRequired
  },

  render: function() {
    const { history } = this.props;
    return (
      <Provider store={store}>
        {renderRoutes.bind(null, history)}
      </Provider>
    );

    //return (
    //  <div>
    //    <Provider store={store}>
    //      {renderRoutes.bind(null, history)}
    //    </Provider>
    //    <DebugPanel top right bottom>
    //      <DevTools store={store}
    //                monitor={LogMonitor} />
    //    </DebugPanel>
    //  </div>
    //);
  }
});

module.exports = Root;
