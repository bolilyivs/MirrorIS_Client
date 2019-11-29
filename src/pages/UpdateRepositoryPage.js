import React from 'react';
import {Grid, Button, Input, Modal, Form, Select, Dropdown} from 'semantic-ui-react';
import axios from 'axios';
import { Redirect } from 'react-router'
import Query from '../config.js'

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
        axios.get(Query.poolGET(), {   headers: {
            'Content-Type': 'application/json',
            'authorization': 'Basic ' + btoa('root' + ":" + '123'),
            }
    }).then(res => {     
            var data = res.data.map((pool, index) => ( { key: index, text: pool, value: pool }));
            this.setState({ pool_data:  data});
            console.log(res.data);
      })


        this.id = this.props.id;
        this.state = { data:[], name: '', mirror_zpool: '', mirror_url: '', schedule_status: '', schedule_run: false,
        mirror_location: '', schedule_number: '', mirror_type: '', mirror_args: '',
        schedule_minute: '', schedule_hour: '', schedule_day: '', schedule_month: '', schedule_year: '', 
        redirect: false, openDel: false, openUpdt: false, openRun: false, openReset: false
        }

        axios.get(
            Query.repositoryInfoGET(this.id),
            {   headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Basic ' + btoa('root' + ":" + '123'),
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
                },
                (error) => {
                    console.log(error.data);
                }
            );          

    }

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
                'authorization': 'Basic ' + btoa('root' + ":" + '123'),
                }
            }
        ).then(res => {
            if(res.data === "ok"){
                this.setState({ redirect: true })
            }    
            console.log(res.data);
      })
    }

    handleDelete = () => {
        axios.delete(Query.repositoryDeleteDELETE(this.id),{
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Basic ' + btoa('root' + ":" + '123'),
                }
            }
        ).then(res => {     
            if(res.data === "ok"){
                this.setState({ redirect: true })
            }    
            console.log(res.data);
      })
    }
    
    handleRun = () => {
        axios.get(
            Query.repositoryRunGET(this.id),
            {   headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Basic ' + btoa('root' + ":" + '123'),
                    }
                }
                )
                .then((res) => {
                    if(res.data === "ok"){
                        this.setState({ redirect: true })
                    }    
                    console.log(res.data);
                },
                (error) => {
                    console.log(error.data);
                }
            );          
    }

    handleReset = () => { 
        axios.get(
        Query.repositoryResetGET(this.id),
        {   headers: {
                'Content-Type': 'application/json',
                'authorization': 'Basic ' + btoa('root' + ":" + '123'),
                }
            }
            )
            .then((res) => {
                if(res.data === "ok"){
                    this.setState({ redirect: true })
                }    
                console.log(res.data);
            },
            (error) => {
                console.log(error.data);
            }
        );          
    }

    render(){
        const { name, mirror_zpool, mirror_url, mirror_location, mirror_type,mirror_args, schedule_status,  schedule_number, 
            schedule_minute, schedule_hour, schedule_day, schedule_month, schedule_year, 
            redirect, openDel, openUpdt, openRun, openReset} = this.state
        
        if (redirect) {
            return <Redirect to='/'/>;
        }

        return <Grid centered stackable columns={3}>
            <Grid.Row>
                <Grid.Column></Grid.Column>
                     <Grid.Column><h1>Update Repository</h1></Grid.Column>
                <Grid.Column></Grid.Column>
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
                            <Input defaultValue={schedule_number} label='Number of snapshots' placeholder='Number' name='schedule_number' value={schedule_number} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <Input defaultValue={schedule_minute} label='Minutes' placeholder='Minutes' name='schedule_minute' value={schedule_minute} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <Input defaultValue={schedule_hour} label='Hours' placeholder='Hours' name='schedule_hour' value={schedule_hour} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <Input defaultValue={schedule_day} label='Days' placeholder='Days' name='schedule_day' value={schedule_day} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <Input defaultValue={schedule_month} label='Months' placeholder='Months' name='schedule_month' value={schedule_month} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <Input defaultValue={schedule_year} label='Years' placeholder='Years' name='schedule_year' value={schedule_year} onChange={this.handleChange}/>
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