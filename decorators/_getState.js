var actions = require('../actions');
var States = require('../constants/ModelStates');

var stateMap = {
  'lists.all': function(state, params){
    var lists = state.lists.all;
    if(!lists || lists.get('state') === States.INITIAL_STATE){
      lists = actions.fetchLists().payload;
    }
    return lists;
  },

  'lists.byId': function(state, params){
    var listId = params.listId;
    if(!listId) throw new Error('missing listId');
    var list = state.lists.byId.get(listId);
    if(!list || list.get('state') === States.INITIAL_STATE){
      list = actions.fetchList(listId).payload;
    }
    return list;
  }

};

module.exports = function(state, stateKey, params){
  var getState = stateMap[stateKey];
  if(!getState) {
    throw new Error(`no getState function found for ${stateKey}. Did you mean ${Object.keys(stateMap).join(", ")}?`);
  }
  return getState(state, params);
};
