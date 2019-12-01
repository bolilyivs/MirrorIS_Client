import React from 'react';
import {Grid, Segment, Button} from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Query from '../config.js'

class DetailTaskPage extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return <Grid centered stackable columns={2}>
                    <Grid.Row>
                        <Grid.Column>
                            <Segment padded='very'>
                                    <h1>HELLO</h1>
                                <Link to="/login">
                                    <Button primary centered size="big" style={{width: "200px"}}>Login</Button>
                                </Link> 
                            </Segment>                                      
                        </Grid.Column>    
                    </Grid.Row>
                </Grid>
    }
}

export default DetailTaskPage;