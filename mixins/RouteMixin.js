let React = require('react');
var bindActionCreators = require('redux').bindActionCreators;
import shallowEqualScalar from 'react-redux/lib/utils/shallowEqualScalar'
var _ = require('lodash');

function mapParams (paramKeys, params) {
  return paramKeys.reduce((acc, key) => {
    return _.assign({}, acc, { [key]: params[key] })
  }, {})
}

module.exports = function(paramKeys, ActionCreators, fn){

  return {

    contextTypes: {
      store: React.PropTypes.object.isRequired
    },

    componentWillMount () {
      var actions = bindActionCreators(ActionCreators, this.context.store.dispatch);
      fn(mapParams(paramKeys, this.props.params), actions);
    },

    componentDidUpdate (prevProps) {
      const params = mapParams(paramKeys, this.props.params);
      const prevParams = mapParams(paramKeys, prevProps.params);
      var actions = bindActionCreators(ActionCreators, this.context.store.dispatch);

      if (!shallowEqualScalar(params, prevParams)) {
        fn(params, actions);
      }
    }

  }

};
