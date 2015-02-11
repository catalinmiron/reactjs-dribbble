'use strict';

describe('Shot', function () {
  var React = require('react/addons');
  var Shot, component;

  beforeEach(function () {
    Shot = require('../../../src/scripts/components/Shot.js');
    component = React.createElement(Shot);
  });

  it('should create a new instance of Shot', function () {
    expect(component).toBeDefined();
  });
});
