import React from 'react';
import {Grid, Button, Input, Modal, Form, Select, Dropdown, Message} from 'semantic-ui-react';
import axios from 'axios';
import { Redirect } from 'react-router'
import Query from '../config.js'
import Cookies from 'universal-cookie';
import NumberInput from 'semantic-ui-react-numberinput';

const options = [
    { key: false, text: 'Inactive', value: false },
    { key: true, text: 'Active', value: true }
  ]
const type = [
    { key: 0, text: 'rsync', value: 0 },
    { key: 1, text: 'yum repo', value: 1 }
  ]

class UpdateRepositoryPage extends React.Component{
    constructor(props){
        super(props)

        this.id = this.props.id;
        this.state = { data:[], name: '', mirror_zpool: '', mirror_url: '', schedule_status: '', schedule_run: false,
        mirror_location: '', schedule_number: '1', mirror_type: '', mirror_args: '',
        schedule_minute: '0', schedule_hour: '0', schedule_day: '0', schedule_month: '0', schedule_year: '0', 
        redirect: false, redirectFail: false, openDel: false, openUpdt: false, openRun: false, openReset: false,
        check_name: false, check_url: false
        }

        axios.get(Query.poolGET(), {   
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Basic ' + btoa(new Cookies().get('username') + ":" + new Cookies().get('password')),
                }
            }).then(res => {     
                var data = res.data.map((pool, index) => ( { key: index, text: pool, value: pool }));
                this.setState({ pool_data:  data});
                console.log(res.data);
            },(error) => {
                this.setState({ redirectFail: true});
                console.log(error.data);
        })

        axios.get(
            Query.repositoryInfoGET(this.id),
            {   headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Basic ' + btoa(new Cookies().get('username') + ":" + new Cookies().get('password')),
                    }
                }
                )
                .then((response) => {
                    var data = response.data;
                    this.setState({ data });
                    this.setState({ 
                        name: data.name, 
                        mirror_zpool: data.mirror_zpool,
                        mirror_location: data.mirror_location, 
                        mirror_url: data.mirror_url,
                        mirror_type: data.mirror_type, 
                        mirror_args: data.mirror_args,
                        schedule_status: data.schedule_status,
                        schedule_number: data.schedule_number,
                        schedule_minute: data.schedule_minute, 
                        schedule_hour: data.schedule_hour, 
                        schedule_day: data.schedule_day, 
                        schedule_month: data.schedule_month, 
                        schedule_year: data.schedule_year,   
                    });
                    console.log(response.data);
                },(error) => {
                    this.setState({ redirectFail: true});
                    console.log(error.data);
                }
            );          

    }
    handleChangeNumber = (name, value) => this.setState({ [name]: value })

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleOpenDel = () => {this.setState({ openDel: true })}

    handleOpenUdpt = () => {this.setState({ openUpdt: true })}

    handleOpenRun = () => {this.setState({ openRun: true })}

    handleOpenReset = () => {this.setState({ openReset: true })}

    handleCancel = () => {this.setState({ openDel: false, openUpdt: false, openRun: false, openReset: false })}

    handleUpdate= () => {
        var { name, mirror_url, mirror_zpool, mirror_location, mirror_type, mirror_args, schedule_status, schedule_run,  schedule_number, 
            schedule_minute, schedule_hour, schedule_day, schedule_month, schedule_year} = this.state
        if(!this.state.schedule_number) { schedule_number = 1 }
        if(!this.state.schedule_minute) { schedule_minute = 0 }
        if(!this.state.schedule_hour) { schedule_hour = 0 }
        if(!this.state.schedule_day) { schedule_day = 0 }
        if(!this.state.schedule_month) { schedule_month = 0 }
        if(!this.state.schedule_year) { schedule_year = 0 }
        console.log(JSON.stringify({ name, mirror_url, mirror_zpool, mirror_location, mirror_type, mirror_args, schedule_status,  schedule_number, 
            schedule_minute, schedule_hour, schedule_day, schedule_month, schedule_year }, null, 11));

        axios.put(Query.repositoryUpdatePUT(this.id), JSON.stringify({ name, mirror_zpool, mirror_url, mirror_location, mirror_type, mirror_args, schedule_status, schedule_run, schedule_number, 
                                                                            schedule_minute, schedule_hour, schedule_day, schedule_month, schedule_year }, null, 11), {
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Basic ' + btoa(new Cookies().get('username') + ":" + new Cookies().get('password')),
                }
            }
            ).then(res => {
                if(res.data === "ok"){
                    this.setState({ redirect: true })
                }  
                if(res.data === "-1"){
                    this.setState({ check_name: true })
                } 
                if(res.data === "-2"){
                    this.setState({ check_url: true })
                }        
                console.log(res.data);
            },(error) => {
                this.setState({ redirectFail: true});
                console.log(error.data);
        })
    }

    handleDelete = () => {
        axios.delete(Query.repositoryDeleteDELETE(this.id),{
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
    
    handleRun = () => {
        axios.get(
            Query.repositoryRunGET(this.id),
            {   headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Basic ' + btoa(new Cookies().get('username') + ":" + new Cookies().get('password')),
                    }
                }
                )
                .then((res) => {
                    if(res.data === "ok"){
                        this.setState({ redirect: true })
                    }    
                    console.log(res.data);
                },(error) => {
                    this.setState({ redirectFail: true});
                    console.log(error.data);
                }
            );          
    }

    handleReset = () => { 
        axios.get(
        Query.repositoryResetGET(this.id),
        {   headers: {
                'Content-Type': 'application/json',
                'authorization': 'Basic ' + btoa(new Cookies().get('username') + ":" + new Cookies().get('password')),
                }
            }
            )
            .then((res) => {
                if(res.data === "ok"){
                    this.setState({ redirect: true })
                }    
                console.log(res.data);
            },(error) => {
                this.setState({ redirectFail: true});
                console.log(error.data);
            }
        );          
    }

    render(){
        const { name, mirror_zpool, mirror_url, mirror_location, mirror_type,mirror_args, schedule_status,  schedule_number, 
            schedule_minute, schedule_hour, schedule_day, schedule_month, schedule_year, 
            redirect, openDel, openUpdt, openRun, openReset} = this.state
        
        if (redirect) {
            return <Redirect to='/repository'/>;
        }

        if (this.state.redirectFail) {
            return <Redirect to='/login'/>;
        }

        return <Grid centered stackable columns={3}>
            <Grid.Row>
                <Grid.Column></Grid.Column>
                     <Grid.Column><h1>Update Repository</h1></Grid.Column>
                <Grid.Column></Grid.Column>
            </Grid.Row>
            <Grid.Row>
                { this.state.check_name && (
               <Message size="big" color="red">
                    <Message.Header>Name exists</Message.Header>
                </Message>
                )}
                { this.state.check_url && (
               <Message size="big" color="red">
                    <Message.Header>Wrong Url!</Message.Header>
                </Message>
                )}
            </Grid.Row>
            <Grid.Column>
            </Grid.Column>           
                <Grid.Column>
                    <Form size='big'>       
                        <Form.Field required>
                            <label>Main: </label>
                        </Form.Field>  
                        <Form.Field required>
                            <Input defaultValue={name} label='Repository Name' placeholder='Name' name='name' value={name} onChange={this.handleChange}/>
                        </Form.Field>

                        <Form.Field
                            required
                            control={Select}
                            options={this.state.pool_data}
                            placeholder='Pool'
                            name='mirror_zpool'
                            value={mirror_zpool} 
                            onChange={this.handleChange}
                        />


                        <Form.Field required>
                            <Input defaultValue={mirror_location} label='MirrorLocation' placeholder='URL' name='mirror_location' value={mirror_location} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field required>
                            <Input defaultValue={mirror_url} label='MirrorURL' placeholder='URL' name='mirror_url' value={mirror_url} onChange={this.handleChange}/>
                        </Form.Field>

                        <Form.Field required>
                            <Dropdown 
                                    options={type}  
                                    selection
                                    placeholder='Mirror Type'
                                    name='mirror_type'
                                    value={mirror_type} 
                                    onChange={this.handleChange}
                                />
                        </Form.Field>
                            
                        <Form.Field required>
                            <Dropdown 
                                options={options}  
                                selection
                                placeholder='Status'
                                name='schedule_status'
                                value={schedule_status} 
                                onChange={this.handleChange}
                            />
                        </Form.Field>

                        <Form.Field>
                            <Input label='Arguments' defaultValue={"-vaHz"} placeholder='Arguments' name='mirror_args' value={mirror_args} onChange={this.handleChange}/>
                        </Form.Field>


                        <Form.Field>
                            <label>Shedule: </label>
                        </Form.Field> 

                        <Form.Field>
                            <label>Number of snapshots</label>
                            <NumberInput  type="number" placeholder='Number'
                             name='schedule_number' value={schedule_number} 
                             onChange={(value) => this.handleChangeNumber("schedule_number", value)}  minValue={1}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Minutes</label>
                            <NumberInput allowEmptyValue placeholder='Minutes' name='schedule_minute' value={schedule_minute} 
                            onChange={(value) => this.handleChangeNumber("schedule_minute", value)} minValue={0}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Hours</label>
                            <NumberInput allowEmptyValue placeholder='Hours' name='schedule_hour' value={schedule_hour} 
                            onChange={(value) => this.handleChangeNumber("schedule_hour", value)} minValue={0}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Days</label>
                            <NumberInput allowEmptyValue placeholder='Days' name='schedule_day' value={schedule_day}
                             onChange={(value) => this.handleChangeNumber("schedule_day", value)} minValue={0}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Months</label>
                            <NumberInput allowEmptyValue  placeholder='Months' name='schedule_month' value={schedule_month}
                             onChange={(value) => this.handleChangeNumber("schedule_month", value)} minValue={0}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Years</label>
                            <NumberInput allowEmptyValue placeholder='Years' name='schedule_year' value={schedule_year}
                             onChange={(value) => this.handleChangeNumber("schedule_year", value)} minValue={0}/>
                        </Form.Field> 
                       
                    </Form>                         
                    </Grid.Column> 
            <Grid.Column>  
            </Grid.Column>

            <Button style={{width: "150px"}} primary size="big" content='Update' onClick={this.handleOpenUdpt}   
            disabled={ !this.state.name || !this.state.mirror_url || !this.state.mirror_location}/>
            <Modal open={openUpdt} size='mini'>
                <Modal.Content>
                    <p style = {{fontSize: 20}}>
                        Update this repository?            
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

            <Button style={{width: "150px"}} primary size="big" content='Run' onClick={this.handleOpenRun}
            disabled={ !this.state.name || !this.state.mirror_url || !this.state.mirror_location}/>
            <Modal open={openRun} size='mini'>
                <Modal.Content>
                    <p style = {{fontSize: 20}}>
                        Run this repository?            
                    </p>   
                </Modal.Content>
                <Modal.Actions>
                <Button negative onClick={this.handleCancel}>No</Button>
                <Button
                    positive
                    icon='checkmark'
                    labelPosition='right'
                    content='Yes'
                    onClick={this.handleRun}
                />
                </Modal.Actions>
            </Modal>   

            <Button style={{width: "150px"}} negative size="big" content='Delete' onClick={this.handleOpenDel}/>
            <Modal open={openDel} size='mini'>
                <Modal.Content>
                    <p style = {{fontSize: 20}}>
                        Delete this repository?            
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

            <Button style={{width: "150px"}} negative size="big" content='Reset' onClick={this.handleOpenReset}/>       
            <Modal open={openReset} size='mini'>
                <Modal.Content>
                    <p style = {{fontSize: 20}}>
                        Reset this repository?            
                    </p>   
                </Modal.Content>
                <Modal.Actions>
                <Button negative onClick={this.handleCancel}>No</Button>
                <Button
                    positive
                    icon='checkmark'
                    labelPosition='right'
                    content='Yes'
                    onClick={this.handleReset}
                />
                </Modal.Actions>
            </Modal>   

        </Grid>
    }
}

export default UpdateRepositoryPage;