import React from 'react';
import {Grid, Button, Input, Segment, Form, Select, Message} from 'semantic-ui-react';
import { Redirect } from 'react-router'
import axios from 'axios';
import Query from '../config.js'
import Cookies from 'universal-cookie';

const type = [
    { key: '0', text: 'User', value: '0' },
    { key: '1', text: 'Admin', value: '1' }
  ]

class CreateUsersPage extends React.Component{
    constructor(props){
        super(props)
        this.state = { username: '', password: '', password2: '', group: '', check: false, redirect: false, redirectFail: false
        }
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        if(this.state.password2 !== this.state.password){          
            this.setState({check: true});
            return
        }else{
            this.setState({check: false});
        }
        var { username, password, group } = this.state
        console.log(JSON.stringify({ username, password, group }, null, 11));

        axios.post(Query.createUserPOST, JSON.stringify({ username, password, group }, null, 3), {
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Basic ' + btoa(new Cookies().get('username') + ":" + new Cookies().get('password')),
                }
            }
        ).then(res => {     
            if(res.data === "ok"){
                this.setState({ redirect: true })
            }    
            console.log(res.data);
        },(error) => {
            this.setState({ redirectFail: true});
            console.log(error.data);
      })

    }

    render(){
        const { username, password, password2, group, redirect} = this.state
        
        if (redirect) {
            return <Redirect to='/users'/>;
        }

        if (this.state.redirectFail) {
            return <Redirect to='/login'/>;
        }

        return <Grid centered stackable columns={3}>
            <Grid.Row><h1>Create User</h1></Grid.Row>
            <Grid.Row> 
            { this.state.check && (
               <Message size="big" color="red">
                    <Message.Header>Passwords do not match</Message.Header>
                </Message>
                )}
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
                        <Form.Field required>
                            <Input label={{icon: "key", content: "Confirm password"}} type="password" placeholder='Password' name='password2' value={password2} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field
                            required
                            control={Select}
                            options={type}
                            placeholder='Group'
                            name='group'
                            value={group} 
                            onChange={this.handleChange}
                        />

                    </Form>                         
                    </Grid.Column> 
            <Grid.Column>  
            </Grid.Column>

            <Button primary size="big" content='Save' onClick={this.handleSubmit}  
            disabled={ !this.state.username || !this.state.password || !this.state.password2 || !this.state.group}/>  
 
        </Grid>
      
    }
}

export default CreateUsersPage;