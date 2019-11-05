import React from 'react';
import {Grid, Button, Input, Segment, Form, Select, Message} from 'semantic-ui-react';
import { Link } from 'react-router-dom'

const type = [
    { key: '0', text: 'User', value: '0' },
    { key: '1', text: 'Admin', value: '1' }
  ]

class CreateUsersPage extends React.Component{
    constructor(props){
        super(props)
        this.state = { userName: '', password: '', password2: '', group: '', check: false
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
        
        var { userName, password, group } = this.state
        console.log(JSON.stringify({ userName, password, group }, null, 11));
    }

    render(){
        const { userName, password, password2, group} = this.state
        
       

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
                            <Input label={{icon: "user", content: "User Name"}} placeholder='Name' name='userName' value={userName} onChange={this.handleChange}/>
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
            disabled={ !this.state.userName || !this.state.password || !this.state.password2 || !this.state.group}/>  
            
            
        </Grid>
       
    }
}

export default CreateUsersPage;