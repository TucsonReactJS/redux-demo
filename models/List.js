var Backbone = require('backbone');
var AppSettings = require('../constants/AppSettings');
var moment = require('moment');

module.exports = Backbone.Model.extend({
  urlRoot: AppSettings.API_ROOT + '/todos',

  idAttribute: '_id',

  parse: function(attributes){
    if(attributes.data) attributes = attributes.data;
    attributes.createdAt = moment(attributes.createdAt);
    attributes.updatedAt = moment(attributes.updatedAt);
    return attributes;
  }

});
