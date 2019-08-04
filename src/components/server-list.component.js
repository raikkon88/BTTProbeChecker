import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MdModeEdit } from "react-icons/md";
import { MdRemoveRedEye } from "react-icons/md";

const Server = props => (
    <tr>
        <td>{props.server.server_name}</td>
        <td>{props.server.server_url}</td>
        <td>{props.server.server_user}</td>
        <td>{props.server.server_password}</td>
        <td>{props.server.server_port}</td>
        <td>
            <Link to={"/server/"+props.server._id}><MdRemoveRedEye /></Link>
            <Link to={"/server/edit/"+props.server._id}><MdModeEdit /></Link>
        </td>
    </tr>
)

export default class ServerList extends Component {

    constructor(props) {
        super(props);
        this.state = {servers: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/server/',  { 
            headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
        }).then(response => {
                this.setState({ servers: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    ServerList() {
        return this.state.servers.map(function(currentServer, i){
            return <Server server={currentServer} key={i}/>;
        })
    }

    render() {
        return (
            <div>
                <h3>Servers List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Url</th>
                            <th>User</th>
                            <th>Password</th>
                            <th>Port</th>
                            <th><Link to="/server/create" className="nav-link">New</Link></th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.ServerList() }
                    </tbody>
                </table>
            </div>
        )
    }
}