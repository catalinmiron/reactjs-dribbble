var ReactjsAndDribbbleApp = require('./ReactjsAndDribbbleApp');
var NotFound = require('./NotFound');
var Popular = require('./Popular');

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

var NewContact = React.createClass({
  render: function () {
    return <h2>new contact</h2>;
  }
});

var Contact = React.createClass({
  mixins: [ Router.State],

  render: function () {
    return <div>
      <h2>Id of the contact is {this.getParams().id}</h2>
      <h2>{this.getPath()}</h2>
      <h2>{this.getPathname()}</h2>
      <h2>{this.getQuery}</h2>
      <h2>{this.getRoutes()}</h2>
    </div>
  }
});

var routes = (
  <Route handler={ReactjsAndDribbbleApp}>
    <DefaultRoute handler={Popular}/>
    <Route name="new" path="contact/new" handler={NewContact}/>
    <Route name="contact" path="contact/:id" handler={Contact}/>
    <NotFoundRoute handler={NotFound}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, content);
});
