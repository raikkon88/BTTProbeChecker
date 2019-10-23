import React, {Component} from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";

import CreateServerScreen from "./screens/createServer.screen";
import EditServerScreen from "./screens/editServer.screen";
import ServerListScreen from "./screens/servers.screen";
import Index from "./screens/index.screen";
import Login from "./components/login.component";
import ServerScreen from './screens/server.screen';
import CreateProbeScreen from './screens/createProbe.screen';
import ConfigureServerScreen from './screens/configureServer.screen';
import GridScreen from './screens/grid.screen';
import LectureListScreen from './screens/lectureList.screen';

const PrivateRoute = ({ component: Component, ...rest }) => (
  
  <Route {...rest} render={(props) => (  
    localStorage.getItem('token') ? (
      <Component {...props} />
    ) : (
      <Redirect to='/login' />
    )
  )} />
)

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
        isAuthenticated: null
    }
  }

  componentWillMount() {
    this.setState({
      isAuthenticated: localStorage.getItem('token') ? true : false
    })
  }

  render(){
    const { isAuthenticated } = this.state;
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/login" exact component={Login} />
          <PrivateRoute path="/server" exact component={ServerListScreen} />
          <PrivateRoute path="/server/create" exact component={CreateServerScreen} />
          <PrivateRoute path="/server/:id" exact component={ServerScreen} />
          <PrivateRoute path="/server/:id/create" exact component={CreateProbeScreen} />
          <PrivateRoute path="/server/edit/:id" exact component={EditServerScreen} />
          <PrivateRoute path="/server/:id/configure" exact component={ConfigureServerScreen}/>
          <PrivateRoute path="/server/grid/:id" exact component={GridScreen}/>
          <PrivateRoute path="/probe/:id" exact component={LectureListScreen}/>
        </Switch>
      </Router>
    );

  }
}
