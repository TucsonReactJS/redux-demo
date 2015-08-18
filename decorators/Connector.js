import createStoreShape from 'react-redux/lib/utils/createStoreShape';
import shallowEqual from 'react-redux/lib/utils/shallowEqual';
import isPlainObject from 'react-redux/lib/utils/isPlainObject';
import invariant from 'invariant';
import React, { Component, PropTypes } from 'react';
const storeShape = createStoreShape(PropTypes);

module.exports = React.createClass({
  displayName: 'Connector',

  contextTypes: {
    store: storeShape.isRequired
  },

  propTypes: {
    children: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired
  },

  getInitialState: function(){
    return this.selectState(this.props, this.context);
  },

  componentWillReceiveProps(nextProps) {
    var nextState = this.selectState(nextProps, this.context);
    if(this.isMounted()){
      this.setState(nextState);
    }
  },

  selectState: function(props, context) {
    const state = context.store.getState();
    const slice = props.select(state);

    invariant(
      isPlainObject(slice),
      'The return value of `select` prop must be an object. Instead received %s.',
      slice
    );

    return {
      slice: slice
    };
  },

  render() {
    var children = this.props.children;
    var slice = this.state.slice;
    var dispatch = this.context.store.dispatch;

    return children({ dispatch, ...slice });
  }
});