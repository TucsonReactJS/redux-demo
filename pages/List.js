var React = require('react');
var Immutable = require('immutable');
var Spinner = require('./common/Spinner');
var connect = require('../decorators/connectAndSubscribe');
var ModelStates = require('../constants/ModelStates');
var actions = require('../actions');

module.exports = connect(function(getState, props){
    return {
      list: getState('lists.byId', {
        listId: props.params.listId
      })
    }
  },
  React.createClass({
    displayName: 'ListHome',

    propTypes: {
      list: React.PropTypes.instanceOf(Immutable.Map)
    },

    getStyles: function(){
      return {
        content: {
          paddingTop: '64px'
        },
        title: {
          textAlign: 'center',
          fontSize: '45px',
          lineHeight: '48px',
          marginBottom: '11px',
          letterSpacing: -1,
          fontWeight: 400,
          color: 'rgba(0, 0, 0, 0.87)'
        },
        subTitle: {
          textAlign: 'center',
          fontSize: '24px',
          lineHeight: '32px',
          paddingTop: '16px',
          marginBottom: '12px',
          letterSpacing: '0',
          fontWeight: '400',
          color: 'rgba(0, 0, 0, 0.54)'
        }
      }
    },

    render: function() {
      var list = this.props.list;
      var styles = this.getStyles();
      var content = null;

      if(list.get('state') === ModelStates.FETCHING) {
        content = <Spinner/>;
      } else {
        content = (
          <div>
            <h1 style={styles.title}>
              Welcome to {list.get('data').get('title')}!
            </h1>
            <h2 style={styles.subTitle}>
              One day, there might be a list of things to do here.
            </h2>
          </div>
        );
      }

      return (
        <div style={styles.content}>
          <div className="row">
            {content}
          </div>
        </div>
      );
    }

  })
);
