import React from 'react';
import {Grid, Segment, Label} from 'semantic-ui-react';
import axios from 'axios';
import Query from '../config.js'

var str = '[ { "id": 1, "repository": "task1", "message": "msg4234444444gdfgdfgdddddddddddddddddddfkgjdfgbdfgbhdfgbdfgbdfgdbgbdfghdfhgh4444444444444444444444444444444444423423423423nb4b23jh4bh23b4jh23b4h2b3jh4b23h4bh23b4hb234b23bh4h23jb4h23b4", "user": "Jack01", "date": "29-10-2019"} ]';

class DetailTaskPage extends React.Component{
    constructor(props){
        super(props)
        this.id = this.props.id;
        this.state = {data: []}
        //this.state = { data: JSON.parse(str) };
    }

    componentDidMount() {
        axios.get(
            Query.taskDetailGET(this.id),
            {   headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Basic ' + btoa('root' + ":" + '123'),
                    }
                }
                )
                .then((response) => {
                    var data = response.data;
                    this.setState({ data });
                },
                (error) => {
                    console.log(error.data);
                }
            );
      }
    render(){
        console.log(this.state.data)
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