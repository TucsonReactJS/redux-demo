var Backbone = require('backbone');
var AppSettings = require('../constants/AppSettings');
var List = require('../models/List');

module.exports = Backbone.Collection.extend({
  model: List,

  url: function () {
    return AppSettings.API_ROOT + '/todos';
  },

  parse: function(attributes){
    if(attributes.data) attributes = attributes.data;
    return attributes;
  }

});
