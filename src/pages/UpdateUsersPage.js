import React from 'react';
import {Grid, Button, Input, Modal, Icon, Form, Select, Message, Dropdown} from 'semantic-ui-react';
import { Redirect } from 'react-router'
import axios from 'axios';
import Query from '../config.js'
import Cookies from 'universal-cookie';

const type = [
    { key: 0, text: 'User', value: 0 },
    { key: 1, text: 'Admin', value:  1 }
  ]

class UpdateUsersPage extends React.Component{

    constructor(props){
        super(props)
        this.id = this.props.id;
        this.state = { data: [], username: '', password: '', password2: '', group: '', check: false, 
        redirect: false, redirectFail: false, openDel: false, openUpdt: false
        }
        
        axios.get(
            Query.userInfoGET(this.id),
            {   headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Basic ' + btoa(new Cookies().get('username') + ":" + new Cookies().get('password')),
                    }
                }
                )
                .then((response) => {
                    var data = response.data;
                    this.setState({ data });
                    this.setState({ username: data.username, group: data.group})
                    console.log(response.data);
                },(error) => {
                    this.setState({ redirectFail: true});
                    console.log(error.data);
                }
            );           
    }

    handleOpenDel = () => {this.setState({ openDel: true })}

    handleOpenUdpt = () => {this.setState({ openUpdt: true })}

    handleCancel = () => {this.setState({ openDel: false, openUpdt: false })}

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleUpdate = () => {
        if(this.state.password2 !== this.state.password){          
            this.setState({check: true, openUpdt: false});
            return
        }else{
            this.setState({check: false});
        }
        var { username, password, group } = this.state
        console.log(JSON.stringify({ username, password, group }, null, 11));

        axios.put(Query.userUpdatePUT(this.id), JSON.stringify({ username, password, group }, null, 3), {
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Basic ' + btoa(new Cookies().get('username') + ":" + new Cookies().get('password')),
                }
            }
        ).then(res => {     
            if(res.data === "ok"){
                this.setState({ redirect: true})
            }
            console.log(res.data);
        },(error) => {
            this.setState({ redirectFail: true});
            console.log(error.data);
      })

    }

    handleDelete = () => {
        axios.delete(Query.userDeleteDELETE(this.id),{
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
        const {username, password, password2, group, redirect, openDel, openUpdt} = this.state

        console.log(group)

        if (redirect) {
            return <Redirect to='/users'/>;
        }
        
        if (this.state.redirectFail) {
            return <Redirect to='/login'/>;
        }
        
        return <Grid centered stackable columns={3}>
            <Grid.Row><h1>Update User</h1></Grid.Row>
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
                            <Input defaultValue={username} label={{icon: "user", content: "User Name"}} placeholder='Name' name='username' value={username} onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field required>
                            <Input label={{icon: "key", content: "Password"}} type="password" placeholder='Password' name='password' value={password} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field required>
                            <Input label={{icon: "key", content: "Confirm password"}} type="password" placeholder='Password' name='password2' value={password2} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field required>
                            <Dropdown 
                                options={type}  
                                selection
                                placeholder='Group'
                                name='group'  
                                value={group} 
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                    </Form>                         
                </Grid.Column> 
            <Grid.Column>  
            </Grid.Column>

            <Button primary size="big" content='Udpate' onClick={this.handleOpenUdpt}  
                disabled={ !this.state.username || !this.state.password || !this.state.password2}/>  
            <Modal open={openUpdt} size='mini'>
                <Modal.Content>
                    <p style = {{fontSize: 20}}>
                        Update this user?            
                    </p>   
                </Modal.Content>
                <Modal.Actions>
                <Button negative onClick={this.handleCancel}>No</Button>
                <Button
                    positive
                    icon='checkmark'
                    labelPosition='right'
                    content='Yes'
                    onClick={this.handleUpdate} 
                />
                </Modal.Actions>
            </Modal>              
            <Button negative size="big" content='Delete' onClick={this.handleOpenDel}/> 
            <Modal open={openDel} size='mini'>
                <Modal.Content>
                    <p style = {{fontSize: 20}}>
                        Delete this user?            
                    </p>   
                </Modal.Content>
                <Modal.Actions>
                <Button negative onClick={this.handleCancel}>No</Button>
                <Button
                    positive
                    icon='checkmark'
                    labelPosition='right'
                    content='Yes'
                    onClick={this.handleDelete}
                />
                </Modal.Actions>
            </Modal>              
        </Grid>
       
    }
}

export default UpdateUsersPage;