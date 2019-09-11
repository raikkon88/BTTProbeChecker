import React, {Component} from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";

import CreateServer from "./components/create-server.component";
import EditServer from "./components/edit-server.component";
import ServerList from "./components/server-list.component";
import Index from "./screens/index.screen";
import Login from "./components/login.component";
import ProbeList from './components/probe-list.component';
import CreateProbe from './components/create-probe.component';
import ConfigureServer from './components/configure-server.component';
import ProbeGrid from './components/probe-grid.component';
import LectureListScreen from './components/LectureListScreen.component';

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
          <PrivateRoute path="/server" exact component={ServerList} />
          <PrivateRoute path="/server/create" exact component={CreateServer} />
          <PrivateRoute path="/server/:id" exact component={ProbeList} />
          <PrivateRoute path="/server/:id/create" exact component={CreateProbe} />
          <PrivateRoute path="/server/edit/:id" exact component={EditServer} />
          <PrivateRoute path="/server/:id/configure" exact component={ConfigureServer}/>
          <PrivateRoute path="/server/grid/:id" exact component={ProbeGrid}/>
          <PrivateRoute path="/probe/:id" exact component={LectureListScreen}/>
        </Switch>
      </Router>
    );

  }
}
