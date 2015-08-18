var React = require('react');
var Immutable = require('immutable');
var mui = require('material-ui');
var { IconButton } = mui;
var EditorFormatListBulleted = require('material-ui/src/svg-icons/editor/format-list-bulleted');
var ModelStates = require('../../constants/ModelStates');

module.exports = React.createClass({
  displayName: 'TodoCount',

  getStyles: function(){
    return {
      button: {
        padding: '0px'
      },
      icon: {
        fill: 'rgba(0, 0, 0, .54)',
        height: 20,
        width: 20,
        marginBottom: -3
      },
      value: {
        color: 'rgba(0, 0, 0, .54)',
        paddingLeft: 4,
        fontSize: 20,
        lineHeight: '48px'
      },
      stat: {
        display: 'inline-block',
        width: '25%',
        fontSize: 20,
        position: 'relative',
        height: '48px'
      }
    }
  },

  render: function () {
    var styles = this.getStyles();

    return (
      <div style={styles.stat}>
        {
          <IconButton
            tooltip="Todo Count"
            tooltipPosition="top-center"
            style={styles.button} >
            <EditorFormatListBulleted style={styles.icon} />
            <span style={styles.value}>{0}</span>
          </IconButton>
        }
        {
          //<EditorFormatListBulleted style={styles.icon}/>
          //<span style={styles.value}>{0}</span>
        }
      </div>
    );
  }

});
