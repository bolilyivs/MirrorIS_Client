import React from 'react';
import {Grid, Button, Input, Dropdown, Form, Select, GridColumn} from 'semantic-ui-react';
import axios from 'axios';
import { Redirect } from 'react-router'
import Query from '../config.js'

const options = [
    { key: 'false', text: 'Inactive', value: 'false' },
    { key: 'true', text: 'Active', value: 'true' }
  ]
const type = [
    { key: '0', text: 'rsync', value: '0' },
    { key: '1', text: 'yum repo', value: '1' }
  ]

class CreateRepositoryPage extends React.Component{
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

        this.state = { name: '', mirror_url: '', schedule_status: '', schedule_run: false,
        mirror_location: '', schedule_number: '', mirror_type: '', 'mirror_zpool':'', 'pool_data' : '', 'mirror_args':'-vaHz',
        schedule_minute: '', schedule_hour: '', schedule_day: '', schedule_month: '', schedule_year: '', redirect: false
        }
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        var { name, mirror_url, mirror_location, mirror_type, mirror_zpool, mirror_args, schedule_status, schedule_run,  schedule_number, 
            schedule_minute, schedule_hour, schedule_day, schedule_month, schedule_year} = this.state
        if(!this.state.schedule_number) { schedule_number = 1 }
        if(!this.state.schedule_minute) { schedule_minute = 0 }
        if(!this.state.schedule_hour) { schedule_hour = 0 }
        if(!this.state.schedule_day) { schedule_day = 0 }
        if(!this.state.schedule_month) { schedule_month = 0 }
        if(!this.state.schedule_year) { schedule_year = 0 }
        console.log(JSON.stringify({ name, mirror_url, mirror_location, mirror_type, mirror_zpool, mirror_args, schedule_status,  schedule_number, 
            schedule_minute, schedule_hour, schedule_day, schedule_month, schedule_year }, null, 11));

        axios.post(Query.createRepositoryPOST, JSON.stringify({ name, mirror_url, mirror_location, mirror_type, mirror_zpool, mirror_args, schedule_status, schedule_run, schedule_number, 
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

    render(){
        const { name, mirror_url, mirror_location, mirror_type, mirror_zpool, mirror_args, schedule_status,  schedule_number, 
            schedule_minute, schedule_hour, schedule_day, schedule_month, schedule_year, redirect} = this.state
        
        if (redirect) {
            return <Redirect to='/'/>;
        }

        return <Grid centered stackable columns={3}>
            <Grid.Row>
                <Grid.Column></Grid.Column>
                <Grid.Column><h1>Create Repository</h1></Grid.Column>
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
                            <Input label='Repository Name' placeholder='Name' name='name' value={name} onChange={this.handleChange}/>
                        </Form.Field>

                        <Form.Field
                            required
                            control={Select}
                            options={this.state.pool_data}
                            placeholder='Pool'
                            name='mirror_zpool'
                            value={this.state.mirror_zpool} 
                            onChange={this.handleChange}
                        />


                        <Form.Field required>
                            <Input label='MirrorLocation' placeholder='URL' name='mirror_location' value={mirror_location} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field required>
                            <Input label='MirrorURL' placeholder='URL' name='mirror_url' value={mirror_url} onChange={this.handleChange}/>
                        </Form.Field>

                        <Form.Field
                            required
                            control={Select}
                            options={type}
                            placeholder='Mirror Type'
                            name='mirror_type'
                            value={mirror_type} 
                            onChange={this.handleChange}
                        />
                        <Form.Field
                            required
                            control={Select}
                            options={options}
                            placeholder='Status'
                            name='schedule_status'
                            value={schedule_status} 
                            onChange={this.handleChange}
                        /> 

                        <Form.Field>
                            <Input label='Arguments' defaultValue={"-vaHz"} placeholder='Arguments' name='mirror_args' value={mirror_args} onChange={this.handleChange}/>
                        </Form.Field>

                        <Form.Field>
                            <label>Shedule: </label>
                        </Form.Field> 

                         <Form.Field>
                            <Input label='Number of snapshots' placeholder='Number' name='schedule_number' value={schedule_number} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <Input label='Minutes' placeholder='Minutes' name='schedule_minute' value={schedule_minute} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <Input label='Hours' placeholder='Hours' name='schedule_hour' value={schedule_hour} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <Input label='Days' placeholder='Days' name='schedule_day' value={schedule_day} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <Input label='Months' placeholder='Months' name='schedule_month' value={schedule_month} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <Input label='Years' placeholder='Years' name='schedule_year' value={schedule_year} onChange={this.handleChange}/>
                        </Form.Field> 
                       
                    </Form>                         
                    </Grid.Column> 
            <Grid.Column>  
            </Grid.Column>

            <Button style={{width: "200px"}} primary size="big" content='Create' onClick={this.handleSubmit}   
            disabled={ !this.state.name || !this.state.mirror_url || !this.state.mirror_location || !this.state.mirror_type || !this.state.schedule_status}/>
        </Grid>
       
    }
}

export default CreateRepositoryPage;