import React, { Component } from 'react';
var Connector = require('./Connector');
import getDisplayName from 'react-redux/lib/utils/getDisplayName';
var getState = require('./_getState');

export default function connect(select, DecoratedComponent) {
  var ConnectorDecorator = React.createClass({
    displayName: `Connector(${getDisplayName(DecoratedComponent)})`,

    _selectProxy: function(state, props){
      return select(getState.bind(null, state), props);
    },

    render: function() {
      return (
        <Connector ref="connector" select={state => this._selectProxy(state, this.props)}>
          {
            function(stuff){
              return <DecoratedComponent ref="decoratedComponent" {...stuff} {...this.props} />
            }.bind(this)
          }
        </Connector>
      );
    }
  });

  return ConnectorDecorator;
};
