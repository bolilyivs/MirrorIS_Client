import React from 'react';
import {Grid, Button, Input, Dropdown, Form, Select, GridColumn} from 'semantic-ui-react';
import { Link } from 'react-router-dom'

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
        this.state = { taskName: '', mirrorURL: '', status: '', 
        mirrorLocation: '', numberSnapshots: '', mirrorType: '',
        minutes: '', hours: '', days: '', months: '', years: ''
        }
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        var { taskName, mirrorURL, mirrorLocation, mirrorType, status, numberSnapshots, minutes, hours, days, months, years} = this.state
        if(!this.state.numberSnapshots) { numberSnapshots = 1 }
        if(!this.state.minutes) { minutes = 0 }
        if(!this.state.hours) { hours = 0 }
        if(!this.state.days) { days = 0 }
        if(!this.state.months) { months = 0 }
        if(!this.state.years) { years = 0 }
        console.log(JSON.stringify({ taskName, mirrorURL, mirrorLocation, mirrorType, status, numberSnapshots, minutes, hours, days, months, years }, null, 11));
    }

    render(){
        const { taskName, mirrorURL, mirrorLocation, mirrorType, status, numberSnapshots, minutes, hours, days, months, years} = this.state

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
                            <Input label='Repository Name' placeholder='Name' name='taskName' value={taskName} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field required>
                            <Input label='MirrorLocation' placeholder='URL' name='mirrorLocation' value={mirrorLocation} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field required>
                            <Input label='MirrorURL' placeholder='URL' name='mirrorURL' value={mirrorURL} onChange={this.handleChange}/>
                        </Form.Field>

                        <Form.Field
                            required
                            control={Select}
                            options={type}
                            placeholder='Mirror Type'
                            name='mirrorType'
                            value={mirrorType} 
                            onChange={this.handleChange}
                        />
                        <Form.Field
                            required
                            control={Select}
                            options={options}
                            placeholder='Status'
                            name='status'
                            value={status} 
                            onChange={this.handleChange}
                        /> 

                        <Form.Field>
                            <label>Shedule: </label>
                        </Form.Field> 

                         <Form.Field>
                            <Input label='Number of snapshots' placeholder='Number' name='numberSnapshots' value={numberSnapshots} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <Input label='Minutes' placeholder='Minutes' name='minutes' value={minutes} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <Input label='Hours' placeholder='Hours' name='hours' value={hours} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <Input label='Days' placeholder='Days' name='days' value={days} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <Input label='Months' placeholder='Months' name='months' value={months} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <Input label='Years' placeholder='Years' name='years' value={years} onChange={this.handleChange}/>
                        </Form.Field> 
                       
                    </Form>                         
                    </Grid.Column> 
            <Grid.Column>  
            </Grid.Column>

            <Button primary size="big" content='Save' onClick={this.handleSubmit}  
            disabled={ !this.state.taskName || !this.state.mirrorURL || !this.state.mirrorLocation || !this.state.mirrorType || !this.state.status}/>
            <Button primary size="big" content='Run task' onClick={this.handleSubmit}/>
            <Button negative size="big" content='Remove task' onClick={this.handleSubmit}/>
            <Button negative size="big" content='Reset' onClick={this.handleSubmit}/>       
        </Grid>
       
    }
}

export default CreateRepositoryPage;