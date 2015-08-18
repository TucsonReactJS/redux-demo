let React = require('react');
let Router = require('react-router');
let Immutable = require('immutable');
let { MenuItem, LeftNav, Styles } = require('material-ui');
let { Colors, Spacing, Typography } = Styles;
var connect = require('../../decorators/connect');
var Spinner = require('./Spinner');
var ModelStates = require('../../constants/ModelStates');

module.exports = connect(function(getState, props){
    return {
      lists: getState('lists.all')
    }
  },
  React.createClass({
    displayName: 'AppLeftNav',

    mixins: [Router.Navigation, Router.State],

    propTypes: {
      lists: React.PropTypes.instanceOf(Immutable.Map).isRequired
    },

    getStyles() {
      return {
        cursor: 'pointer',
        //.mui-font-style-headline
        fontSize: '24px',
        color: Typography.textFullWhite,
        lineHeight: Spacing.desktopKeylineIncrement + 'px',
        fontWeight: Typography.fontWeightLight,
        backgroundColor: Colors.cyan500,
        paddingLeft: Spacing.desktopGutter,
        paddingTop: '0px',
        marginBottom: '8px'
      };
    },

    getMenuItems() {
      return [
        { type: MenuItem.Types.SUBHEADER, text: 'Resources' },
        { type: MenuItem.Types.LINK, payload: 'https://github.com/TucsonReactJS/redux-demo', text: 'GitHub' },
        { type: MenuItem.Types.LINK, payload: 'https://www.google.com/design/spec/material-design', text: 'Material Design' },
        { type: MenuItem.Types.LINK, payload: 'https://github.com/callemall/material-ui', text: 'Material UI' },
        { type: MenuItem.Types.LINK, payload: 'https://github.com/rackt/redux', text: 'Redux' },
        { type: MenuItem.Types.LINK, payload: 'https://github.com/rackt/react-router', text: 'React Router' },
        { type: MenuItem.Types.LINK, payload: 'https://github.com/facebook/immutable-js', text: 'Immutable' }
      ];
    },

    render() {
      var lists = this.props.lists;
      var menuItems = null;

      let header = (
        <div style={this.getStyles()} onTouchTap={this._onHeaderClick}>
          reactjs
        </div>
      );

      if(lists.get('state') === ModelStates.FETCHING){
        menuItems = this.getMenuItems();
      }else {
        menuItems = lists.get('data').map(function(list){
          return {
            route: `/lists/${list.get('id')}`,
            text: list.get('data').get('title')
          }
        }).toJSON().concat(this.getMenuItems());
      }

      return (
        <LeftNav
          ref="leftNav"
          docked={false}
          isInitiallyOpen={false}
          header={header}
          menuItems={menuItems}
          selectedIndex={this._getSelectedIndex(menuItems)}
          onChange={this._onLeftNavChange} />
      );
    },

    toggle() {
      this.refs.leftNav.toggle();
    },

    _getSelectedIndex(menuItems) {
      let currentItem;

      for (let i = menuItems.length - 1; i >= 0; i--) {
        currentItem = menuItems[i];
        if (currentItem.route && this.isActive(currentItem.route)) return i;
      }
    },

    _onLeftNavChange(e, key, payload) {
      this.transitionTo(payload.route);
    },

    _onHeaderClick() {
      this.transitionTo('/');
      this.refs.leftNav.close();
    }

  })
);
