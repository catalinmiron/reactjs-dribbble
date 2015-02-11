var $ = require('jquery'),
    _ = require('lodash');

var defaultAjaxOptions = {
  dataType: 'jsonp'
};

module.exports = {
  /**
   * Makes a call to $.ajax after appending all the apropriate request options
   *
   * @param {Object} options XHR request parameters such as uri, data, etc.
   * @param {String} type The type of XHR request to be made
   */
  _xhrRequest: function(options, type) {
    var optionsClone = _.cloneDeep(options);

    if (optionsClone.data && typeof optionsClone.data !== 'string') {
      optionsClone.data = JSON.stringify(optionsClone.data);
    }

    return $.ajax(_.extend(optionsClone, defaultAjaxOptions, {type: type}));
  },

  put: function(options) {
    return this._xhrRequest(options, 'PUT');
  },

  patch: function(options) {
    return this._xhrRequest(options, 'PATCH');
  },

  delete: function(options) {
    return this._xhrRequest(options, 'DELETE');
  },

  get: function(options) {
    return this._xhrRequest(options, 'GET');
  },

  post: function(options) {
    return this._xhrRequest(options, 'POST');
  },
};
