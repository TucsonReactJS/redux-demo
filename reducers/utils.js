var Immutable = require('immutable');
var states = require('../constants/ModelStates');

var utils = {

  byId: function(models) {
    var modelsById = {};
    models = models.toJSON();

    models.data.forEach(function (model) {
      if (model.id) {
        modelsById[model.id] = model;
      }
    });

    return Immutable.fromJS(modelsById);
  },

  byCid: function(models) {
    var modelsByCid = {};
    models = models.toJSON();

    models.data.forEach(function (model) {
      if (model.cid) {
        modelsByCid[model.cid] = model;
      }
    });

    return Immutable.fromJS(modelsByCid);
  },

  byCustomField: function(fieldName, models){
    var modelsByCustomField = {};
    models = models.toJSON();

    models.data.forEach(function (model) {
      if (model[fieldName]) {
        modelsByCustomField[model[fieldName]] = model;
      }
    });

    return Immutable.fromJS(modelsByCustomField);
  },

  getIndex: function(state, model){
    return state.get('data').findIndex(function(m){
      if (m.get('id') && model.get('id')){
        return m.get('id') === model.get('id')
      } else{
        return m.get('cid') === model.get('cid');
      }
    });
  },

  addOrUpdateModel: function(state, model){
    return state.update('data', function(data){
      var index = utils.getIndex(state, model);
      if (index < 0) {
        return data.push(model);
      } else {
        return data.update(index, () => model);
      }
    });
  },

  updateModel: function(state, model){
    var index = utils.getIndex(state, model);
    if(index < 0) throw new Error('index < 0');
    return state.update('data', function(data){
      return data.update(index, () => model);
    });
  },

  removeModel: function(state, model){
    var index = utils.getIndex(state, model);
    if(index < 0) throw new Error('index < 0');
    return state.update('data', function(data){
      return data.delete(index);
    });
  },

  mergeListIntoState: function(state, list){
    list.get('data').forEach(function(model){
      state = utils.addOrUpdateModel(state, model);
    });
    return state;
  },

  customDictionaryHelpers: {

    removePayloadFromDictionaryUnderKeyIfActionMatchesType: function(actionType, dictionary, keyName, action){
      if (action.type === actionType) {
        var model = action.payload;
        var key = model.get('data').get(keyName);
        if(!key) throw new Error(`missing model.data.${keyName}`);

        return dictionary.update(key, function(collection){
          try {
            return utils.removeModel(collection, model);
          } catch(err) {
            return collection;
          }
        });
      }

      return dictionary;
    },

    insertModelsFromListIntoDictionaryUnderKey: function(dictionary, keyName, collection){
      dictionary = dictionary.toJSON();
      collection = collection.toJSON().data;

      collection.forEach(function(model){
        var key = model.data[keyName];
        if (!dictionary[key]) {
          dictionary[key] = {
            state: states.EXISTS,
            data: []
          }
        }
        dictionary[key].data.push(model);
      });

      return Immutable.fromJS(dictionary);
    },

    addKeysFromPreviousDictionaryIfNotInCurrent: function(previousDictionary, dictionary){
      dictionary = dictionary.toJSON();

      Object.keys(previousDictionary.toJSON()).forEach(function(key){
        if (!dictionary[key]){
          dictionary[key] = previousDictionary.get(key).toJSON();
        }
      });

      return Immutable.fromJS(dictionary);
    },

    insertPayloadIntoDictionaryUnderKeyIfActionMatchesType: function(actionType, dictionary, keyName, action){
      dictionary = dictionary.toJSON();
      var key = action[keyName];

      if (action.type === actionType) {
        if(!key) throw new Error(`missing action.${keyName}`);
        dictionary[key] = action.payload.toJSON();
      }

      return Immutable.fromJS(dictionary);
    }

  }

};

module.exports = utils;
