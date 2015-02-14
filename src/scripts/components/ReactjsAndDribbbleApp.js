'use strict';

var React = require('react/addons'),
    Router = require('react-router');
var {RouteHandler, Link } = Router;


// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;
(window !== window.top ? window.top : window).Router = Router;

// CSS
require('../../styles/normalize.css');
require('../../styles/main.css');

var listType = ['popular', 'everyone', 'debuts'];

var ReactjsAndDribbbleApp = React.createClass({
  render: function() {
    return (
      <div className='main'>
        <ul className='navigation'>
          {listType.map(function(type) {
            return <li>
              <Link to='shots' params={{ type: type}}>
                {type}
              </Link>
            </li>;
          })}
        </ul>
        <div className="main-content">
          <RouteHandler {...this.props}/>
        </div>
      </div>
    );
  }
});

module.exports = ReactjsAndDribbbleApp;
