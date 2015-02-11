'use strict';

describe('Main', function () {
  var React = require('react/addons');
  var ReactjsAndDribbbleApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    ReactjsAndDribbbleApp = require('../../../src/scripts/components/ReactjsAndDribbbleApp.js');
    component = React.createElement(ReactjsAndDribbbleApp);
  });

  it('should create a new instance of ReactjsAndDribbbleApp', function () {
    expect(component).toBeDefined();
  });
});
