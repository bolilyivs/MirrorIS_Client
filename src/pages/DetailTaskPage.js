import React from 'react';
import {Grid, Segment, Label} from 'semantic-ui-react';
import axios from 'axios';
import Query from '../config.js'
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router'

class DetailTaskPage extends React.Component{
    constructor(props){
        super(props)
        this.id = this.props.id;
        this.state = {data: [], redirectFail: false}
    }

    componentDidMount() {
        axios.get(
            Query.taskDetailGET(this.id),
            {   headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Basic ' + btoa(new Cookies().get('username') + ":" + new Cookies().get('password')),
                    }
                }
                )
                .then((response) => {
                    var data = response.data;
                    this.setState({ data });
                },
                (error) => {
                    this.setState({ redirectFail: true});
                    console.log(error.data);
                }
            );
      }
    render(){
        console.log(this.state.data)

        if (this.state.redirectFail) {
            return <Redirect to='/login'/>;
        }

        return <Grid centered stackable columns={2}>
                    <Grid.Row>
                        <Grid.Column>
                            <Segment padded='very'>
                                <p style = {{fontSize: 20}}>
                                    <Label size="big" horizontal>
                                        Repository name:                          
                                    </Label>
                                    {this.state.data.repository}
                                </p>   
                                <p style = {{fontSize: 20}}>
                                    <Label size="big" horizontal>
                                        User:                        
                                    </Label>
                                    {this.state.data.user}
                                </p>
                                <p style = {{fontSize: 20}}>
                                    <Label size="big" horizontal>
                                        Date:                        
                                    </Label>
                                    {this.state.data.date}
                                </p>
                                <p class='message' style = {{fontSize: 20}}>
                                    <Label size="big" horizontal>
                                        Message:                         
                                    </Label>
                                    {this.state.data.message}
                                </p>
                            </Segment>                                      
                        </Grid.Column>    
                    </Grid.Row>
                </Grid>
    }
}

export default DetailTaskPage;