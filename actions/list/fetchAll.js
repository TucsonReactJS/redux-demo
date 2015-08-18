var types = require('../../constants/ActionTypes');
var states = require('../../constants/ModelStates');
var Immutable = require('immutable');
import { payload, payloadCollection } from '../utils';
var ListCollection = require('../../collections/ListCollection');

/*
 * Fetch all Lists
 */
module.exports = function() {
  return function(dispatch){
    var lists = new ListCollection();

    lists.fetch().done(function(){
      dispatch({
        type: types.FETCH_LISTS,
        payload: Immutable.fromJS(payloadCollection(lists, states.EXISTS))
      })
    }).fail(function(response){
      var error = response.responseJSON;
      dispatch({
        type: types.FETCH_LISTS,
        payload: Immutable.fromJS(payload(lists, states.ERROR_FETCHING, error))
      })
    });

    // todo: add ERROR_FETCHING state

    return dispatch({
      type: types.FETCH_LISTS,
      payload: Immutable.fromJS(payloadCollection(lists, states.FETCHING))
    })
  }
};
