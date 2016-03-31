/**
 * Created by caoshuai on 2015/12/15.
 */

(function(React,Router,Reflux,Components,TuanEvaluation){
    var Route = Router.Route;
    var DefaultRoute = Router.DefaultRoute;
    var NotFoundRoute = Router.NotFoundRoute;
    var RouteHandler = Router.RouteHandler;
    var Link = Router.Link;

    //function hasLogin(){
    //    return $CONF$['id'] != "";
    //}
    //
    //function requireAuth(nextState, replaceState) {
    //    if (!hasLogin()) {
    //        //replaceState({ nextPathname: nextState.location.pathname }, '/signIn');
    //        location.href = "/customer/login";
    //    }
    //}

    var App = React.createClass({
        render: function(){
            return(
                <RouteHandler />
            )
        }
    });

    var routes = (
        <Route handler={App} path="/">
            <DefaultRoute handler={Components.CateringIndex}/>
            <Route name="restaurant" path="restaurant/:resId" handler={Components.CaterRestaurant}></Route>
            <NotFoundRoute handler={Components.Page404}/>

        </Route>
    );

    Router.run(routes, function(Handler) {
        React.render(<Handler />, document.getElementById('pcCater'));
    });
}(window.React, window.ReactRouter, window.Reflux, window.components,window.tuanEvaluation));