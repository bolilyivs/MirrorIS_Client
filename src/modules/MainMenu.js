import React from 'react';
import {Menu, Segment, Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Cookies from 'universal-cookie';
import {history} from "../config"
import Query from '../config.js'

function url() {
    return window.location.href.replace(/(.+\w\/)(.+)/,"/$2");
}

class MainMenu extends React.Component{
    constructor(props){
        super(props);
        this.state = { activeItem: '',
         redirect: true,
         "group" : 1
        }
        this.getUserGroup()
    }
    

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    handleLogout = () => { 
        new Cookies().remove('username');
        new Cookies().remove('password');
        history.push("/login");
        history.go(); 
      }

    getUsername(){
        let username = new Cookies().get('username');
        username += (this.state.group == 0)? " (admin)": "";
        return username
    }

    getUserGroup = () =>{
        axios.get(
            Query.userGetGroupGET,
            {   headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Basic ' + btoa(new Cookies().get('username') + ":" + new Cookies().get('password')),
                    }
            })
            .then((response) => {
                var data = response.data;
                this.setState({ "group" : data.group });
            },
            (error) => {
                this.setState({ redirectFail: true});
                console.log(error.data);
            }
        );
    }

    getMenu(){
        let username = this.getUsername()
        let logout = (<Dropdown.Item text="Logout"  as={Link} to="/login" onClick={this.handleLogout}/>);
        let profile = (<Dropdown.Item text="Profile" as={Link} to="/profile" name='profile'
        active={url() === "/profile"} onClick={this.handleItemClick}/>);

        return <Dropdown item text={`${username}`}>
            <Dropdown.Menu>
                {profile}
                {logout}
            </Dropdown.Menu>
        </Dropdown>
    }

    getAdminItems = () => {
        if(this.state.group !== 0) 
            return ""
        return <React.Fragment>
        <Menu.Item
        name='Repositories'
        active={url() === "/repository"}
        onClick={this.handleItemClick}
        as={Link} to="/repository"
    />
    <Menu.Item
        name='users'
        active={url() === "/users"}
        onClick={this.handleItemClick}
        as={Link} to="/users"
    />
    </React.Fragment> 
    }

    render(){
        const { activeItem } = this.state

        console.log(url())
        
        return  <Segment inverted>
                    <Menu inverted pointing secondary size="massive">
                    <Menu.Item header>WeMirror</Menu.Item>
                        <Menu.Item
                            name='My repositories'
                            active={url() === "/my_repository"}
                            onClick={this.handleItemClick}
                            as={Link} to="/my_repository"
                        />
                        {this.getAdminItems() }

                        
                        <Menu.Item
                            name='tasks'
                            active={url() === "/tasks"}
                            onClick={this.handleItemClick}
                            as={Link} to="/tasks"
                        />
                        
                        {this.getUsername() != null && 
                        <Menu.Menu 
                            position='right'
                        >
                            {this.getMenu()}
                        </Menu.Menu>}
                        
                    </Menu>  
                </Segment>
    }
}

export default MainMenu;