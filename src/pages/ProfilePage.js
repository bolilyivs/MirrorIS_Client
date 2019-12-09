import React from 'react';
import {Grid, Button, Input, Modal, Icon, Form, Select, Message, Dropdown} from 'semantic-ui-react';
import { Redirect } from 'react-router'
import axios from 'axios';
import Query from '../config.js'
import Cookies from 'universal-cookie';
import {history} from "../config"

class ProfilePage extends React.Component{

    constructor(props){
        super(props)
        this.state = { data: [], id: -1, username: '', password: '', password2: '', group: '', check: false, 
        redirect: false, redirectFail: false, openDel: false, openUpdt: false
        }
        
        axios.get(
            Query.userGetGroupGET,
            {   headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Basic ' + btoa(new Cookies().get('username') + ":" + new Cookies().get('password')),
                    }
                }
                )
                .then((response) => {
                    var data = response.data;
                    this.setState({ data });
                    this.setState({ id: data.id, username: data.username, group: data.group});
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
        var { username, password, group} = this.state
       
        axios.put(Query.userUpdatePUT(this.state.id), JSON.stringify({ username, password, group }, null, 2), {
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Basic ' + btoa(new Cookies().get('username') + ":" + new Cookies().get('password')),
                }
            }
        ).then(res => {     
            if(res.data === "ok"){
                new Cookies().set('username', username, { path: '/' });
                if(password != null){
                    new Cookies().set('password', password, { path: '/' });
                }
                history.push("/repository");
                history.go(); 
                //this.setState({ redirect: true})
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
        const {username, password, password2, redirect, openDel, openUpdt} = this.state

        // if (redirect) {
        //     return <Redirect to='/users'/>;
        // }
        
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
                    </Form>                         
                </Grid.Column> 
            <Grid.Column>  
            </Grid.Column>

            <Button primary size="big" content='Udpate' onClick={this.handleOpenUdpt}  
                disabled={ !this.state.username }/>  
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

export default ProfilePage;