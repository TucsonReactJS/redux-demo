var React = require('react');
var PropTypes = React.PropTypes;
var { Link, RouteHandler } = require('react-router');
var { AppCanvas, Styles } = require('material-ui');
var { Spacing } = Styles;
var Header = require('./Header');
var MuiThemeMixin = require('../mixins/MuiThemeMixin');
require('../assets/main.less');

module.exports = React.createClass({
  displayName: 'Master',

  mixins: [MuiThemeMixin],

  propTypes: {
    children: PropTypes.any
  },

  contextTypes: {
    store: React.PropTypes.object.isRequired
  },

  componentDidMount: function() {
    this.unsubscribe = this.context.store.subscribe(function(){
      this.setState({});
    }.bind(this));
  },

  componentWillUnmount: function(){
    this.unsubscribe();
  },

  getStyles: function() {
    return {
      content: {
        paddingTop: Spacing.desktopKeylineIncrement,
        paddingBottom: Spacing.desktopKeylineIncrement
      }
    };
  },

  render: function() {
    let styles = this.getStyles();
    let title = "ReactJS";

    return (
      <AppCanvas>
        <Header params={this.props.params} />
        <div style={styles.content}>
          {this.props.children}
        </div>
      </AppCanvas>
    );
  }
});
