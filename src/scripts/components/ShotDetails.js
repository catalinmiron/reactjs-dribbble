'use strict';


var React = require('react/addons'),
    Router = require('react-router');

var Shot = require('./Shot');

var jribbble = require('../lib/jribbble.js');
var _ = require('lodash');
var $ = require('jquery');

require('../../styles/ShotDetails.less');

/*
  {
    id: 1930890,
    title: "#GoodPassport",
    description: "<p>Quick logo for the guys behind Good Passports, a series of promotional passports giving you access to dozens beer, whiskey &amp; cocktail specials in NY, Chicago &amp; Boston</p>",
    height: 300,
    width: 400,
    likes_count: 4,
    comments_count: 0,
    rebounds_count: 0,
    url: "https://dribbble.com/shots/1930890--GoodPassport",
    short_url: "http://drbl.in/nMeA",
    views_count: 19,
    rebound_source_id: null,
    image_url: "https://d13yacurqjgara.cloudfront.net/users/756729/screenshots/1930890/logo-gif3.gif",
    image_teaser_url: "https://d13yacurqjgara.cloudfront.net/users/756729/screenshots/1930890/logo-gif3_teaser.gif",
    player: {
      id: 756729,
      name: "Christopher Skae",
      location: "New York, NY",
      followers_count: 8,
      draftees_count: 0,
      likes_count: 0,
      likes_received_count: 9,
      comments_count: 1,
      comments_received_count: 0,
      rebounds_count: 0,
      rebounds_received_count: 0,
      url: "https://dribbble.com/Cskae",
      avatar_url: "https://d13yacurqjgara.cloudfront.net/users/756729/avatars/normal/b89dc0393a98a8b5693130e3e796790c.png?1423850865",
      username: "Cskae",
      twitter_screen_name: null,
      website_url: "https://www.behance.net/chrisskae",
      drafted_by_player_id: 492116,
      shots_count: 3,
      following_count: 6,
      created_at: "2015/02/08 14:09:21 -0500"
    },
    created_at: "2015/02/13 17:18:49 -0500"
  }
*/

var ShotDetails = React.createClass({
  mixins: [ Router.State ],

  getInitialState: function() {
    return {
      shot: {
        player: {}
      },
      page: 1,
      shots: []
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      shot: { player: {}},
      shots: []
    });
    this.getShot();
  },

  componentWillMount: function() {
    this.getShot();
  },

  getShot: function() {
    jribbble.getShotsByList(this.getParams().id, this._setShotDetails);
  },


  check: function(){
    var oldPage = this.state.page;
    var window_height = $(document).height(),
        document_height = $(window).height(),
        scroll_position = $(window).scrollTop();

    if (window_height - (document_height + scroll_position) < 1000) {
      this.setState({
        page: oldPage + 1
      });
      this.getPlayerShots();
    }
  },

  scrollChecking: function(){
    $(window).on('scroll', _.throttle(this.check, 1000));
  },

  componentWillUnmount: function() {
    $(window).off('scroll');
  },

  showPlayerShots: function(e) {
    e.preventDefault();
    e.stopPropagation();

    this.getPlayerShots();
    this.scrollChecking();
  },

  getPlayerShots: function() {
    console.log(this.state.shot.player.username);
    jribbble.getShotsByPlayerId(this.state.shot.player.username,
                                this._setPlayerShots, {
                                  page: this.state.page,
                                  per_page: 15
                                });
  },

  render: function () {
    var Shot = this.state.shot;
    return <div className="shot-details">
      <img src={Shot.image_url} />
      <h2><a href={Shot.url} target="_blank">{Shot.title}</a></h2>
      <hr />
      <ul>
        <li>
          <p>{"Views: " + Shot.views_count}</p>
        </li>
        <li>
          <p>{"Likes: " + Shot.likes_count}</p>
        </li>
        <li>
          <p>{"Comments: " + Shot.comments_count}</p>
        </li>
        <li>
          <p>{"Rebounds: " + Shot.rebounds_count}</p>
        </li>
      </ul>
      <hr />
      <div dangerouslySetInnerHTML={{__html: Shot.description}} />
      <a href="#"
         onClick={this.showPlayerShots}
         ref="showPlayerShots">View other shots by {Shot.player.username}</a>
      <div>{!_.isEmpty(this.state.shots) ? this.renderPlayerShots() : null}</div>
    </div>;
  },

  renderPlayerShots: function() {
    return <ul>
      {this.state.shots.map(function(shot){
        return Shot(shot);
      })}
    </ul>;
  },

  _setShotDetails: function(shot) {
    this.setState({
      shot: shot
    });
  },

  _setPlayerShots: function(shots) {
    var allShots = this.state.shots.concat(shots.shots);
    this.setState({
      shots: allShots
    });
  }
});

module.exports = ShotDetails;

