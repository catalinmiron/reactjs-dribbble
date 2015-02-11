'use strict';

var React = require('react/addons');

require('../../styles/Shot.less');

/*
  Response:

  {
    id: 1926297,
    title: "90° The Last Appventure",
    description: "<p>Recently, I visited Alaska for this first time and saw mt. McKinley. That mountain is huge. During my vacation Fabio Basile joined our Articulate design team, I’m super excited for the things we’ll create together.</p>",
    height: 600,
    width: 800,
    likes_count: 446,
    comments_count: 27,
    rebounds_count: 0,
    url: "https://dribbble.com/shots/1926297-90-The-Last-Appventure",
    short_url: "http://drbl.in/nKuj",
    views_count: 3700,
    rebound_source_id: null,
    image_url: "https://d13yacurqjgara.cloudfront.net/users/96387/screenshots/1926297/2.gif",
    image_teaser_url: "https://d13yacurqjgara.cloudfront.net/users/96387/screenshots/1926297/2_teaser.gif",
    image_400_url: "https://d13yacurqjgara.cloudfront.net/users/96387/screenshots/1926297/2_1x.gif",
    player: {
      id: 96387,
      name: "Victor Erixon",
      location: "New York, NY",
      followers_count: 23425,
      draftees_count: 14,
      likes_count: 846,
      likes_received_count: 52809,
      comments_count: 831,
      comments_received_count: 2812,
      rebounds_count: 3,
      rebounds_received_count: 24,
      url: "https://dribbble.com/victorerixon",
      avatar_url: "https://d13yacurqjgara.cloudfront.net/users/96387/avatars/normal/2ace6ddd2965bb3ce30b6c9ab1d58d54.png?1414162523",
      username: "victorerixon",
      twitter_screen_name: "victorerixon",
      website_url: "http://www.victorerixon.com",
      drafted_by_player_id: 2775,
      shots_count: 72,
      following_count: 78,
      created_at: "2012/01/27 02:13:08 -0500"
    },
    created_at: "2015/02/11 09:13:38 -0500"
    }
*/

var Shot = React.createClass({
  render: function () {
    // <p dangerouslySetInnerHTML={{__html: this.props.description}} />
    return <li className='shot' key={this.props.id}>
      <figure>
        <img src={this.props.image_400_url ? this.props.image_400_url : this.props.image_url} />
        <figcaption className='shot-detail'>
          <a href={this.props.url} target='_blank'>
            {this.props.title}
          </a>
          <p>by {this.props.player.name}</p>
        </figcaption>
      </figure>
    </li>;
  }
});

module.exports = Shot;

