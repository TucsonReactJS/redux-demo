var types = require('../../constants/ActionTypes');
var states = require('../../constants/ModelStates');
var Immutable = require('immutable');
import { payload, payloadCollection } from '../utils';
var List = require('../../models/List');

/*
 * Delete a List
 */
module.exports = function(list) {
  return function(dispatch){
    var proxyList = new List(list.toJSON().data);

    proxyList.destroy().done(function(){
      dispatch({
        type: types.REMOVE_LIST,
        payload: list.merge({
          state: states.NONEXISTENT
        })
      })
    }).fail(function(response){
      var error = response.responseJSON;
      dispatch({
        type: types.UPDATE_LIST,
        payload: list.merge({
          state: states.ERROR_DELETING,
          error: error
        })
      })
    });

    return dispatch({
      type: types.UPDATE_LIST,
      payload: list.merge({
        state: states.DELETING
      })
    });
  };
};
