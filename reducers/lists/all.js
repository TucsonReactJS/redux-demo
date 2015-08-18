var types = require('../../constants/ActionTypes');
var states = require('../../constants/ModelStates');
var Immutable = require('immutable');
var utils = require('../utils');

var initialState = Immutable.fromJS({
  state: states.INITIAL_STATE,
  data: []
});

module.exports = function(state, action) {
  state = state || initialState;

  switch (action.type) {
    case types.ADD_LIST:
      return utils.addOrUpdateModel(state, action.payload);

    case types.UPDATE_LIST:
      return utils.updateModel(state, action.payload);

    case types.REMOVE_LIST:
      return utils.removeModel(state, action.payload);

    case types.FETCH_LISTS:
      return state.merge(action.payload);

    default:
      return state;
  }
};
