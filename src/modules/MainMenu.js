import React from 'react';
import {Menu, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { Link } from 'react-router-dom'

class MainMenu extends React.Component{
    constructor(props){
        super(props);
    }
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render(){
        const { activeItem } = this.state
        return <Menu attached="bottom" stackable  color="black"  inverted size="massive" >
                    <Menu.Item header>WeMirror</Menu.Item>
                    <Menu.Item
                        name='home'
                        active={activeItem === 'home'}
                        onClick={this.handleItemClick}
                        as={Link} to="/"
                    />
                    <Menu.Item
                        name='tasks'
                        active={activeItem === 'tasks'}
                        onClick={this.handleItemClick}
                        as={Link} to="/tasks"
                    />
                    <Menu.Item
                        name='settings'
                        active={activeItem === 'Settings'}
                        onClick={this.handleItemClick}
                        as={Link} to="/settings"
                    />
                    <Menu.Menu position='right'>
                        <Menu.Item
                            name='authorize'
                            active={activeItem === 'authorize'}
                            onClick={this.handleItemClick}
                        />
                    </Menu.Menu>
            </Menu>  
    }
}

export default MainMenu;