'use strict';

var React = require('react/addons'),
    Router = require('react-router');
var {
      RouteHandler,
      Link
    } = Router;


// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;

// CSS
require('../../styles/normalize.css');
require('../../styles/main.css');

var ReactjsAndDribbbleApp = React.createClass({
  render: function() {
    return (
      <div className='main'>
        <div className="main-content">
          <RouteHandler/>
        </div>
      </div>
    );
  }
});

module.exports = ReactjsAndDribbbleApp;
