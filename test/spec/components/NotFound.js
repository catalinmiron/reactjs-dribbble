'use strict';

describe('NotFound', function () {
  var React = require('react/addons');
  var NotFound, component;

  beforeEach(function () {
    NotFound = require('../../../src/scripts/components/NotFound.js');
    component = React.createElement(NotFound);
  });

  it('should create a new instance of NotFound', function () {
    expect(component).toBeDefined();
  });
});
