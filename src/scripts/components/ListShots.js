'use strict';

var React = require('react/addons'),
    Router = require('react-router');

var Shot = require('./Shot');

var jribbble = require('../lib/jribbble.js');
var _ = require('lodash');
var $ = require('jquery');

require('../../styles/ListShots.less');

var ListShots = React.createClass({
  mixins: [Router.State],

  getInitialState: function() {
    return {
      data: [],
      page: 0
    }
  },

  componentWillMount: function() {
    this.getShots();
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      data: [],
      page: 0
    });
    this.getShots();
  },

  componentDidMount: function() {
    this.scrollChecking();
  },

  check: function(){
    var oldPage = this.state.page;
    var window_height = $(document).height(),
        document_height = $(window).height(),
        scroll_position = $(window).scrollTop();

    if (window_height - (document_height + scroll_position) < 4000) {
      this.setState({
        page: oldPage + 1
      });
      this.getShots();
    }
  },

  scrollChecking: function(){
    $(window).on('scroll', _.throttle(this.check, 1000));
  },

  componentWillUnmount: function() {
    $(window).off('scroll');
  },

  getShots: function() {
    jribbble.getShotsByList(this.getParams().type, this.setListShots, {
      page: this.state.page,
      per_page: 10
    });
  },

  setListShots: function(shots) {
    var allShots = this.state.data.concat(shots.shots);
    this.setState({
      data: allShots
    });
  },

  render: function() {
    return <div className='list-shots'>
      {this.renderShot()}
    </div>
  },

  renderShot: function () {
    return <ul>
      {this.state.data.map(function(shot){
        return Shot(shot);
      })}
    </ul>;
  },

  goToNextPage: function() {
    this.setState({
      page: this.state.page + 1
    });

  }
});

module.exports = ListShots;

