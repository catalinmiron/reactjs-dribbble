'use strict';

var React = require('react/addons');

var Shot = require('./Shot');

var dribbble = require('../lib/dribbble.js');
var _ = require('lodash');
var $ = require('jquery');

require('../../styles/Popular.less');

var Popular = React.createClass({
  getInitialState: function() {
    return {
      data: [],
      page: null,
      loading: true
    }
  },
  componentWillMount: function() {
    this.getShots();
  },

  componentDidMount: function() {
    this.setState({
      loading: false
    });
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
    $(window).scroll(_.throttle(this.check, 1000));
  },

  getShots: function() {
    dribbble.get({
      url: 'https://api.dribbble.com/shots/popular/?page=' + this.state.page,
      success: function (response) {
        this.setPopularShots(response);
      }.bind(this)
    });
  },

  setPopularShots: function(shots) {
    var allShots = this.state.data.concat(shots.shots);
    this.setState({
      data: allShots,
      pages: shots.page
    });
  },

  render: function() {
    return <div className='popular-shots'>
      <h1>Popular</h1>
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

module.exports = Popular;

