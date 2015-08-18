var React = require('react/addons');
let ReactTransitionGroup = React.addons.TransitionGroup;
let Router = require('react-router');
var Immutable = require('immutable');
let { FloatingActionButton } = require('material-ui');
var AddIcon = require('material-ui/src/svg-icons/content/add');
var ListCard = require('./lists/ListCard');
var MuiThemeMixin = require('../mixins/MuiThemeMixin');
var connect = require('../decorators/connectAndSubscribe');
var actions = require('../actions');
var dialogUtils = require('../dialogs/utils');
var CreateListDialog = require('../dialogs/list/Create');
var ModelStates = require('../constants/ModelStates');
var Spinner = require('../pages/common/Spinner');

module.exports = connect(function(getState, props){
  return {
    lists: getState('lists.all')
  }
},
React.createClass({
  displayName: 'Lists',

  mixins: [MuiThemeMixin],

  propTypes: {
    lists: React.PropTypes.instanceOf(Immutable.Map).isRequired
  },

  getStyles: function(){
    return {
      lists: {
        padding: 64
      },
      floatingActionButton: {
        top: 32,
        right: 64,
        position: 'fixed',
        zIndex: 5
      }
    }
  },

  _handleFloatingActionButtonTouchTap: function(){
    dialogUtils.launchModal(function(){
      return (
        <CreateListDialog
          onSubmit={function(params) {
            actions.addList(params);
          }} />
      );
    });
  },

  _renderListCard: function(list){
    return (
      <ListCard
        key={list.get('cid')}
        list={list} />
    );
  },

  render: function() {
    var styles = this.getStyles();
    var lists = this.props.lists;
    var content = null;

    if(lists.get('state') === ModelStates.FETCHING){
      content = <Spinner/>;
    }else {
      content = lists.get('data').map(this._renderListCard);
    }

    return (
      <div>
        <div style={styles.lists}>
          <div className="row">
            <ReactTransitionGroup>
              {content}
            </ReactTransitionGroup>
          </div>
        </div>
        <FloatingActionButton
          style={styles.floatingActionButton}
          onTouchTap={this._handleFloatingActionButtonTouchTap} >
          <AddIcon />
        </FloatingActionButton>
      </div>
    );
  }

}));
