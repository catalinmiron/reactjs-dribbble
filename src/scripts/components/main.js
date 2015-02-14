var ReactjsAndDribbbleApp = require('./ReactjsAndDribbbleApp');
var NotFound = require('./NotFound');
var ListShots = require('./ListShots');
var ShotDetails = require('./ShotDetails');

var React = require('react/addons'),
    Router = require('react-router');
var { Route, DefaultRoute, NotFoundRoute, RouteHandler, Link, Redirect } = Router;

var content = document.getElementById('content');

var routes = (
  <Route handler={ReactjsAndDribbbleApp}>
    <Route name="shots" path="shots/:type" handler={ListShots}/>
    <Route name="shot" path="shot/:id" handler={ShotDetails}/>
    <NotFoundRoute handler={NotFound}/>
    <Redirect from="/" to="shots" params={{ type: 'popular'}} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, content);
});
