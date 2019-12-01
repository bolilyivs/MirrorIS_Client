import React from 'react';
import {Grid, Button, Input, Segment, Form, Select, Message} from 'semantic-ui-react';
import { Redirect } from 'react-router'
import axios from 'axios';
import Query from '../config.js'
import Cookies from 'universal-cookie';

class LoginPage extends React.Component{
    constructor(props){
        super(props)
        this.state = { username: '', password: '', redirect: false
        }
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        var { username, password} = this.state
        console.log(JSON.stringify({ username, password}, null, 11));
        this.setState({redirect: true});
        new Cookies().set('username', username, { path: '/' });
        new Cookies().set('password', password, { path: '/' });
    }

    render(){
        const { username, password, redirect} = this.state
        
        if (redirect) {
            return <Redirect to='/repository'/>;
        }

        return <Grid centered stackable columns={3}>
            <Grid.Row><h1>Login</h1></Grid.Row>
            <Grid.Row> 
            {/* { this.state.check && (
               <Message size="big" color="red">
                    <Message.Header>Passwords do not match</Message.Header>
                </Message>
                )} */}
            </Grid.Row>
            <Grid.Column>

            </Grid.Column>
                <Grid.Column>
                    <Form size='big'>       
                        <Form.Field required>
                            <Input label={{icon: "user", content: "User Name"}} placeholder='Name' name='username' value={username} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field required>
                            <Input label={{icon: "key", content: "Password"}} type="password" placeholder='Password' name='password' value={password} onChange={this.handleChange}/>
                        </Form.Field>

                    </Form>                         
                    </Grid.Column> 
            <Grid.Column>  
            </Grid.Column>

            <Button primary size="big" content='Login' onClick={this.handleSubmit}  
            disabled={ !this.state.username || !this.state.password }/>  
 
        </Grid>
      
    }
}

export default LoginPage;