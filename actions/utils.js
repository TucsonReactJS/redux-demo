var utils = {

  payload: function(model, state, error){
    //if (model instanceof Backbone.Collection) {
    //  return {
    //    state: state,
    //    error: error,
    //    data: model.map(function(m){
    //      return payload(m, state, error);
    //    })
    //  }
    //}

    return {
      id: model.id,
      cid: model.cid,
      state: state,
      error: error || {},
      data: model.toJSON()
    }
  },

  payloadCollection: function(collection, state, error){
    return {
      state: state,
      error: error || {},
      data: collection.map(function(model){
        return utils.payload(model, state, error);
      })
    }
  }

};

module.exports = utils;