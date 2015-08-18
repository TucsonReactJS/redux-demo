var React = require('react');
var mui = require('material-ui');
var MuiThemeMixin = require('../../mixins/MuiThemeMixin');
var Immutable = require('immutable');

module.exports = React.createClass({
  displayName: 'UpdateListDialog',

  mixins: [MuiThemeMixin],

  propTypes: {
    list: React.PropTypes.instanceOf(Immutable.Map).isRequired,
    onSubmit: React.PropTypes.func
  },

  getDefaultProps: function(){
    return {
      onSubmit: function(){},
      openImmediately: false
    }
  },

  _focus: function(){
    setTimeout(function() {
      if (this.isMounted()) {
        this.refs.textfield.focus();
      }
    }.bind(this), 300);
  },

  getInitialState: function(){
    var list = this.props.list.toJSON();
    return {
      title: list.data.title
    }
  },

  show: function(){
    this.refs.dialog.show();
    this._focus();
  },

  _onSubmit: function(e){
    this.props.onSubmit({
      title: this.state.title
    });
    this.refs.dialog.dismiss();
  },

  _onCancel: function(e){
    this.refs.dialog.dismiss();
  },

  _onKeyPress: function(e){
    if(e.keyCode === 13) {
      this._onSubmit(null)
    }
  },

  _onChangeTitle: function(e){
    var title = e.target.value.trim();
    this.setState({title: title});
  },

  render: function () {
    var dialogActions = [
      { text: 'CANCEL', onClick: this._onCancel  },
      { text: 'SUBMIT', onClick: this._onSubmit }
    ];

    var error = this.state.title ? null : "Required";

    return (
      <mui.Dialog
        ref="dialog"
        title="Update List"
        openImmediately={this.props.openImmediately}
        actions={dialogActions}
        contentClassName="reactjs-compact-dialog" >
        <p>What would you like to rename your list to?</p>
        <mui.TextField
          ref='textfield'
          value={this.state.title}
          errorText={"This field is required"}
          floatingLabelText="Title"
          onChange={this._onChangeTitle}
          onKeyDown={this._onKeyPress} />
      </mui.Dialog>
    );
  }

});
