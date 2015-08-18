var types = require('../../constants/ActionTypes');
var states = require('../../constants/ModelStates');
var Immutable = require('immutable');
import { payload, payloadCollection } from '../utils';
var List = require('../../models/List');

/*
 * Fetch a specific List
 */
module.exports = function(listId) {
  return function(dispatch){
    var proxyList = new List({
      _id: listId
    });

    proxyList.fetch().done(function(){
      dispatch({
        type: types.UPDATE_LIST,
        listId: listId,
        payload: Immutable.fromJS(payload(proxyList, states.EXISTS))
      })
    }).fail(function(response){
      var error = response.responseJSON;
      dispatch({
        type: types.UPDATE_LIST,
        listId: listId,
        payload: Immutable.fromJS(payload(proxyList, states.ERROR_FETCHING, error))
      })
    });

    return dispatch({
      type: types.ADD_LIST,
      listId: listId,
      payload: Immutable.fromJS(payload(proxyList, states.FETCHING))
    });
  }
};
