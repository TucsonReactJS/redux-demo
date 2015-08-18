var React = require('react');
var mui = require('material-ui');
var Immutable = require('immutable');
var Router = require('react-router');
var Link = Router.Link;
var cx = require('classnames');
var { Card, CardTitle, IconMenu, IconMenu, IconButton } = mui;
var { AutoPrefix, Transitions } = mui.Styles;
var MenuItem = require('material-ui/lib/menus/menu-item');
var MoreVertIcon = require('material-ui/src/svg-icons/navigation/more-vert');
var ModelStates = require('../../constants/ModelStates');
var actions = require('../../actions');
var UpdateListDialog = require('../../dialogs/list/Update');
var DeleteListDialog = require('../../dialogs/list/Delete');
var dialogUtils = require('../../dialogs/utils');
var TodoCount = require('./TodoCount');

module.exports = React.createClass({
  displayName: 'ListCard',

  mixins: [Router.Navigation],

  propTypes: {
    list: React.PropTypes.instanceOf(Immutable.Map).isRequired
  },

  getStyles: function(state) {
    var backgroundColor = state === 'ERROR_CREATING' ? 'red' : '#fafafa';
    var cardOpacity = state === ModelStates.CREATING || state === ModelStates.DELETING ? '0.7' : '1.0';

    return {
      card: {
        marginBottom: 32,
        opacity: cardOpacity,
        cursor: 'pointer'
      },
      cardTitle: {
        height: 150,
        backgroundColor: backgroundColor
      },
      iconMenu: {
        position: 'absolute',
        top: 0,
        right: '16px'
      },
      menu: {
        top: 36,
        right: 28
      },
      subtitleLink: {
        color: 'rgba(0, 0, 0, 0.54)'
      },
      cardStats: {
        height: 48,
        paddingLeft: 16,
        paddingRight: 16
      }
    };
  },

  componentWillLeave: function(callback){
    var rootStyle = React.findDOMNode(this).style;

    AutoPrefix.set(rootStyle, 'transition', Transitions.easeOut('250ms', ['opacity', 'transform']));
    AutoPrefix.set(rootStyle, 'transform', 'translate3d(0,-8px,0)');
    rootStyle.opacity = 0;

    setTimeout(callback, 250);
  },

  _handleMenuSelection: function(e, value){
    var list = this.props.list;

    dialogUtils.launchModal(function(){
      if(value.ref === 'edit'){
        return (
          <UpdateListDialog
            list={list}
            onSubmit={function(params){
              actions.updateList(list, params);
            }} />
        );
      }else if(value.ref === 'delete'){
        return (
          <DeleteListDialog
            onSubmit={function(){
              actions.destroyList(list);
            }} />
        );
      }
    });
  },

  _handleCardClick: function(e){
    // cancel navigation if the user clicks on the options dropdown
    var optionsNode = this.getDOMNode().getElementsByClassName('list-options')[0];
    return !optionsNode.contains(e.target);
  },

  render: function () {
    var list = this.props.list;
    var listTitle = list.get('data').get('title');
    var styles = this.getStyles(list.get('state'));
    var iconButtonElement = <IconButton/>;
    var classes = cx({
      "col-lg-3": true,
      "col-md-4": true,
      "col-sm-6": true,
      "col-xs-12": true
    });
    var content = null;

    if(list.get('state') === ModelStates.EXISTS){
      iconButtonElement = (
        <IconButton tooltip="Options">
          <MoreVertIcon/>
        </IconButton>
      );

      content = (
        <div>
          <TodoCount list={list}/>
        </div>
      )
    }

    return (
      <div className={classes} >
        <Link to={`/lists/${this.props.list.get('id')}`} style={styles.card} onClick={this._handleCardClick} >
          <Card>
            <CardTitle
              title={listTitle}
              subtitle='A list of todos'
              style={styles.cardTitle} />
            <div style={styles.cardStats} >
              {content}
            </div>
            <div className="list-options" style={styles.iconMenu} >
              <IconMenu
                iconButtonElement={iconButtonElement}
                onItemTouchTap={this._handleMenuSelection}
                desktop={true}
                menuStyle={styles.menu} >
                <MenuItem ref="edit" primaryText="Edit" />
                <MenuItem ref="delete" primaryText="Delete" />
              </IconMenu>
            </div>
          </Card>
        </Link>
      </div>
    );
  }

});
