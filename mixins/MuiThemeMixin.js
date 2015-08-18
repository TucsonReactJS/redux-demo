var React = require('react');
var { Styles } = require('material-ui');
var ThemeManager = new Styles.ThemeManager();

module.exports =  {

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function(){
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  }

};
