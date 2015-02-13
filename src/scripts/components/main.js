var ReactjsAndDribbbleApp = require('./ReactjsAndDribbbleApp');
var NotFound = require('./NotFound');
var ListShots = require('./ListShots');

var React = require('react/addons'),
    Router = require('react-router');
var {
      Route,
      DefaultRoute,
      NotFoundRoute,
      RouteHandler,
      Link
    } = Router;

var content = document.getElementById('content');

var routes = (
  <Route handler={ReactjsAndDribbbleApp}>
    <Route name="shots" path="shots/:type" handler={ListShots}/>
    <NotFoundRoute handler={NotFound}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, content);
});
