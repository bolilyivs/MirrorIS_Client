import React from 'react';
import {Menu, Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { Link } from 'react-router-dom'

function url() {
    return window.location.href.replace(/(.+\w\/)(.+)/,"/$2");
}

class MainMenu extends React.Component{
    constructor(props){
        super(props);

    }
    state = { activeItem: '' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    componentWillUpdate(){
        
    }

    render(){
        const { activeItem } = this.state
        console.log(url())
        

        return  <Segment inverted>
                    <Menu inverted pointing secondary size="massive">
                    <Menu.Item header>WeMirror</Menu.Item>
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
                        <Menu.Item
                            name='tasks'
                            active={url() === "/tasks"}
                            onClick={this.handleItemClick}
                            as={Link} to="/tasks"
                        />
                        
                        <Menu.Menu position='right'>
                            <Menu.Item
                                name='authorize'
                                active={activeItem === 'authorize'}
                                onClick={this.handleItemClick}
                            />
                        </Menu.Menu>
                    </Menu>  
                </Segment>
    }
}

export default MainMenu;