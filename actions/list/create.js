var types = require('../../constants/ActionTypes');
var states = require('../../constants/ModelStates');
var Immutable = require('immutable');
import { payload, payloadCollection } from '../utils';
var List = require('../../models/List');

/*
 * Create a Todo List
 */
module.exports = function(params) {
  return function(dispatch){
    var list = new List(params);

    list.save().done(function(){
      dispatch({
        type: types.UPDATE_LIST,
        payload: Immutable.fromJS(payload(list, states.EXISTS))
      })
    }).fail(function(response){
      var error = response.responseJSON;
      dispatch({
        type: types.UPDATE_LIST,
        payload: Immutable.fromJS(payload(list, states.ERROR_CREATING, error))
      })
    });

    return dispatch({
      type: types.ADD_LIST,
      payload: Immutable.fromJS(payload(list, states.CREATING))
    });
  };
};
