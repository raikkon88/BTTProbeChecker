import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Header extends Component {

  constructor(props){
    super(props)
  }

  render(){
    return (
      <nav className="navbar navbar-collapse navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">BTT Enginyers</Link>
          </div>
          { this.props.isAuthenticated &&
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="navbar-item">
              <Link to="/server" className="nav-link">Servers</Link>
            </li>
          </ul>
          }
          { this.props.isAuthenticated &&
          <ul className="nav navbar-nav">
            <li className="navbar-item">
              <a onClick={ event => { localStorage.removeItem('token'); window.location = "/"} } className="nav-link">Logout</a>
            </li>
          </ul>
          }
          { !this.props.isAuthenticated && 
          <ul className="nav navbar-nav navbar-right">
            <li className="navbar-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
          </ul>
          }
        </div>
      </nav>
    )
  }
}
