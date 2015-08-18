var React = require('react');
var Immutable = require('immutable');
var { AppBar } = require('material-ui');
var AppLeftNav = require('./common/AppLeftNav');
var connect = require('../decorators/connect');
var ModelStates = require('../constants/ModelStates');

module.exports = connect(function(getState, props){
    var listId = props.params.listId;

    if(!listId) return { list: null };

    return {
      list: getState('lists.byId', {
        listId: listId
      })
    }
  },
  React.createClass({
    displayName: 'Header',

    propTypes: {
      children: React.PropTypes.any,
      list: React.PropTypes.instanceOf(Immutable.Map)
    },

    _onLeftIconButtonTouchTap: function() {
      // for alternative approach (that would work with arbitrary number of decorators)
      // see: https://github.com/gaearon/redux/issues/183#issuecomment-115988937
      this.refs.leftNav.refs.connector.refs.decoratedComponent.toggle();
    },

    render: function() {
      var list = this.props.list;
      var title = "ReactJS";

      if(list){
        if(list.get('state') === ModelStates.FETCHING){
          title = "Loading..."
        }else{
          title = list.get('data').get('title');
        }
      }

      return (
        <div>
          <AppBar
            title={title}
            onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap} />
          <AppLeftNav ref="leftNav" />
        </div>
      );
    }
  })
);
