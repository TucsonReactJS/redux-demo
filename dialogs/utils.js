var React = require('react');

module.exports = {

  launchModal: function(getDialog){
    var node = document.getElementById('modal');
    var dialog = getDialog();
    if(!dialog) throw new Error('getDialog() did not return a dialog');
    React.unmountComponentAtNode(node);
    React.render(dialog, node).show();
  }

};
