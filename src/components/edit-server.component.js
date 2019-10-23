import React, { Component } from 'react';
import axios from 'axios';


export default class EditServer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            _id: '',
            server_name: '',
            server_url: '',
            server_user: '',
            server_password: '',
            server_port: 0
        }

        this.onChangeServerName = this.onChangeServerName.bind(this);
        this.onChangeServerUrl = this.onChangeServerUrl.bind(this);
        this.onChangeServerUser = this.onChangeServerUser.bind(this);
        this.onChangeServerPort = this.onChangeServerPort.bind(this);
        this.onChangeServerPassword = this.onChangeServerPassword.bind(this);
        this.onConfigureButtonClicked = this.onConfigureButtonClicked.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/server/'+this.props.serverId, 
        { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
            .then(response => {
                this.setState({
                    _id: response.data._id,
                    server_name: response.data.server_name,
                    server_url: response.data.server_url,
                    server_user: response.data.server_user,
                    server_password: response.data.server_password,
                    server_port: response.data.server_port
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeServerName(e) {
        this.setState({
            server_name: e.target.value
        });
    }

    onChangeServerUrl(e) {
        this.setState({
            server_url: e.target.value
        });
    }

    onChangeServerUser(e) {
        this.setState({
            server_user: e.target.value
        });
    }

    onChangeServerPassword(e) {
        this.setState({
            server_password: e.target.value
        });
    }

    onChangeServerPort(e) {
        this.setState({
            server_port: e.target.value
        });
    }

    onConfigureButtonClicked(){
        window.location = "/server/" + this.state._id + "/configure";
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            server_name: this.state.server_name,
            server_url: this.state.server_url,
            server_user: this.state.server_user,
            server_password: this.state.server_password,
            server_port: this.state.server_port
        };
        console.log(obj);
        axios.post('http://localhost:4000/server/update/'+this.props.serverId, obj, 
        { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
            .then(res => console.log(res.data));
        
        this.props.history.push('/server');
    }

    render() {
        return (
            <div>
                <div className="title-container">
                    <h3 className="col-xs-10">{this.state.server_name}</h3>
                    <button type="button" className="btn btn-outline-primary" onClick={this.onConfigureButtonClicked}>Configure</button>
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Server Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.server_name}
                                onChange={this.onChangeServerName}
                                required
                                />
                    </div>
                    <div className="form-group">
                        <label>Server Url: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.server_url}
                                onChange={this.onChangeServerUrl}
                                required
                                />
                    </div>
                    <div className="form-group">
                        <label>Server User: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.server_user}
                                onChange={this.onChangeServerUser}
                                required
                                />
                    </div>
                    <div className="form-group">
                        <label>Server Password: </label>
                        <input 
                                type="password" 
                                className="form-control"
                                value={this.state.server_password}
                                onChange={this.onChangeServerPassword}
                                required
                                />
                    </div>
                    <div className="form-group">
                        <label>Server Port: </label>
                        <input 
                                type="number" 
                                className="form-control"
                                value={this.state.server_port}
                                onChange={this.onChangeServerPort}
                                required
                                />
                    </div>

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Update Server" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}