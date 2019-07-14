import React from 'react';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import CreateServer from "./components/create-server.component";
import EditServer from "./components/edit-server.component";
import ServerList from "./components/server-list.component";
import Index from "./components/index.component";
import ProbeList from './components/probe-list.component';
import CreateProbe from './components/create-probe.component';

function App() {
  return (
    <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="https://codingthesmartway.com" target="_blank">
              <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com" />
            </a>
            <Link to="/" className="navbar-brand">BTT Enginyers</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/server" className="nav-link">Servers</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={Index} />
          <Route path="/server" exact component={ServerList} />
          <Route path="/server/:id" exact component={ProbeList} />
          <Route path="/server/:id/create" exact component={CreateProbe} />
          <Route path="/server/edit/:id" component={EditServer} />
          <Route path="/server/create" component={CreateServer} />
        </div>
    </Router>
  );
}

export default App;
