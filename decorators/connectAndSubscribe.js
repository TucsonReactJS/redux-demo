import React, { Component } from 'react';
var Connector = require('./Connector');
import getDisplayName from 'react-redux/lib/utils/getDisplayName';
var getState = require('./_getState');

export default function connectAndSubscribe(select, DecoratedComponent) {
  var ConnectorDecorator = React.createClass({
    displayName: `Connector(${getDisplayName(DecoratedComponent)})`,

    contextTypes: {
      store: React.PropTypes.object.isRequired
    },

    componentDidMount: function() {
      this.unsubscribe = this.context.store.subscribe(function(){
        if(this.isMounted()){
          this.setState({});
        }
      }.bind(this));
    },

    componentDidUnmount: function(){
      this.unsubscribe();
    },

    _selectProxy: function(state, props){
      return select(getState.bind(null, state), props);
    },

    render: function() {
      return (
        <Connector ref="connector" select={state => this._selectProxy(state, this.props)}>
          {
            function(stuff){
              return <DecoratedComponent ref="decoratedComponent" {...stuff} {...this.props} />;
            }.bind(this)
          }
        </Connector>
      );
    }
  });

  return ConnectorDecorator;
};
