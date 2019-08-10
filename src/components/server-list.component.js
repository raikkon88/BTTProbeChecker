import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MdModeEdit } from "react-icons/md";
import { MdRemoveRedEye } from "react-icons/md";
import { IoMdGrid } from "react-icons/io";

const Server = props => (
    <tr>
        <td>{props.server.server_name}</td>
        <td>{props.server.server_url}</td>
        <td>{props.server.server_user}</td>
        <td>{props.server.server_password}</td>
        <td>{props.server.server_port}</td>
        <td>
            <Link className="btn" to={"/server/"+props.server._id}><MdRemoveRedEye /></Link>
            <Link className="btn" to={"/server/grid/"+props.server._id}><IoMdGrid /></Link>
            <Link className="btn" to={"/server/edit/"+props.server._id}><MdModeEdit /></Link>
        </td>
    </tr>
)

export default class ServerList extends Component {

    constructor(props) {
        super(props);
        this.state = {servers: []};
        this.onNewButtonClicked = this.onNewButtonClicked.bind(this);
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

    onNewButtonClicked(){
        window.location = "/server/create";
    }

    render() {
        return (
            <div>
                <div className="title-container">
                    <h3>Servers List</h3>
                    <button type="button" className="btn btn-outline-primary" onClick={this.onNewButtonClicked}>New</button>
                </div>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Url</th>
                            <th>User</th>
                            <th>Password</th>
                            <th>Port</th>
                            <th></th>
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