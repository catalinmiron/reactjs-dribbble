'use strict';

describe('Popular', function () {
  var React = require('react/addons');
  var Popular, component;

  beforeEach(function () {
    Popular = require('../../../src/scripts/components/Popular.js');
    component = React.createElement(Popular);
  });

  it('should create a new instance of Popular', function () {
    expect(component).toBeDefined();
  });
});
