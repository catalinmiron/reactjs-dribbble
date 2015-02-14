'use strict';

describe('ShotDetails', function () {
  var React = require('react/addons');
  var ShotDetails, component;

  beforeEach(function () {
    ShotDetails = require('../../../src/scripts/components/ShotDetails.js');
    component = React.createElement(ShotDetails);
  });

  it('should create a new instance of ShotDetails', function () {
    expect(component).toBeDefined();
  });
});
