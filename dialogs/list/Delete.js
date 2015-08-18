var React = require('react');
var mui = require('material-ui');
var MuiThemeMixin = require('../../mixins/MuiThemeMixin');

module.exports = React.createClass({
  displayName: 'DeleteListDialog',

  mixins: [MuiThemeMixin],

  propTypes: {
    onSubmit: React.PropTypes.func,
    openImmediately: React.PropTypes.bool
  },

  getDefaultProps: function(){
    return {
      onSubmit: function(){}
    }
  },

  show: function(){
    this.refs.dialog.show();
  },

  _onSubmit: function(e){
    this.props.onSubmit();
    this.refs.dialog.dismiss();
  },

  _onCancel: function(e){
    this.refs.dialog.dismiss();
  },

  render: function () {
    var dialogActions = [
      { text: 'CANCEL', onClick: this._onCancel  },
      { text: 'DELETE', onClick: this._onSubmit }
    ];

    return (
      <mui.Dialog
        ref="dialog"
        title="Delete List"
        actions={dialogActions}
        contentClassName="reactjs-compact-dialog" >
        <p>{"Are you sure you want to delete this list?"}</p>
      </mui.Dialog>
    );
  }

});
