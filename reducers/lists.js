var all = require('./lists/all');
var utils = require('./utils');

var initialState = {
  all: undefined,
  byId: undefined,
  byCid: undefined
};

module.exports = function(state, action) {
  state = state || initialState;

  var allLists = all(state.all, action);

  return {
    all: allLists,
    byId: utils.byId(allLists),
    byCid: utils.byCid(allLists)
  };
};
