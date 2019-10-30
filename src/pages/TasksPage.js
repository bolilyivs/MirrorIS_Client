import React from 'react';
import {Grid, Button} from 'semantic-ui-react';
import { Link } from 'react-router-dom'

class TasksPage extends React.Component{
    constructor(props){
        super(props)

    }

    render(){
        return <Grid centered stackable columns={2}>
            <Grid.Row>
                <Grid.Column>
                <h1>TasksPage</h1>
                </Grid.Column>    
            </Grid.Row>
        </Grid>
    }
}

export default TasksPage;