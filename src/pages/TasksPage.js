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
class TasksPage extends React.Component{
    constructor(props){
        super(props)

    }

    state = { taskName: '', mirrorURL: '', status: '', 
    mirrorLocation: '', numberSnapshots: '', mirrorType: '',
    minutes: '', hours: '', days: '', months: '', years: ''
}

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        const { taskName, mirrorURL } = this.state

        this.setState({ submittedName: taskName, submittedURL: mirrorURL })
    }

    render(){

        const { taskName, mirrorURL, mirrorLocation, mirrorType, status, numberSnapshots, minutes, hours, days, months, years, submittedName, submittedURL } = this.state
        console.log(JSON.stringify({ taskName, mirrorURL, mirrorLocation, mirrorType, status, minutes, hours, days, months, years }, null, 6));
        return <Grid centered stackable columns={3}>
            <Grid.Row></Grid.Row>
            <Grid.Column>

            </Grid.Column>
                <Grid.Column>
                    <Form size='big' onClick={this.handleSubmit}>       
                        <Form.Field required>
                            <label>Main: </label>
                        </Form.Field>  
                        <Form.Field required>
                            <Input label='Task Name' placeholder='Name' name='taskName' value={taskName} onChange={this.handleChange}/>
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
            <Button primary size="big" content='Save' onClick={this.handleSubmit}/>
            <Button primary size="big" content='Run task' onClick={this.handleSubmit}/>
            <Button negative size="big" content='Remove task' onClick={this.handleSubmit}/>
            <Button negative size="big" content='Reset' onClick={this.handleSubmit}/>       
        </Grid>
       
    }
}

export default TasksPage;