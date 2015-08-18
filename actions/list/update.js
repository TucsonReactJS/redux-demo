var types = require('../../constants/ActionTypes');
var states = require('../../constants/ModelStates');
var Immutable = require('immutable');
import { payload, payloadCollection } from '../utils';
var List = require('../../models/List');

/*
 * Update a List
 */
module.exports = function(list, params) {
  return function(dispatch){
    var listProxy = new List(list.get('data').toJSON());
    listProxy.set(params);

    listProxy.save().done(function(){
      dispatch({
        type: types.UPDATE_LIST,
        payload: list.mergeDeep({
          data: listProxy.toJSON(),
          state: states.EXISTS
        })
      })
    }).fail(function(response){
      var error = response.responseJSON;
      dispatch({
        type: types.UPDATE_LIST,
        payload: list.mergeDeep({
          data: listProxy.toJSON(),
          state: states.ERROR_UPDATING,
          error: error
        })
      })
    });

    return dispatch({
      type: types.UPDATE_LIST,
      payload: list.mergeDeep({
        data: listProxy.toJSON(),
        state: states.UPDATING
      })
    })
  };
};
