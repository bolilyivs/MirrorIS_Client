import React from 'react';
import {Grid, Table, Menu, Icon, Button, Header, Image} from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Query from '../config.js'

var str = '[ { "id": 1, "repository": "task1", "message": "msg4234444444gdfgdfgdddddddddddddddddddfkgjdfgbdfgbhdfgbdfgbdfgdbgbdfghdfhgh4444444444444444444444444444444444423423423423nb4b23jh4bh23b4jh23b4h2b3jh4b23h4bh23b4hb234b23bh4h23jb4h23b4", "user": "Jack01", "date": "29-10-2019"}, { "id": 2, "repository": "task2", "message": "msg", "username": "Tom01", "date": "29-10-2019"}, { "id": 3,  "taskName": "task3", "message": "msg",  "username": "Ben01", "date": "29-10-2019"} ]';

class TasksPage extends React.Component{
    constructor(props){
        super(props)
        //this.state = { data: JSON.parse(str) };
        this.state = {data: []}
    }

    componentDidMount() {
        axios.get(
            Query.taskGET,
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
        console.log(this.state.data);
        return <Grid centered stackable columns={2}>
            <Grid.Row>
                <Grid.Column width={10}>
                    <h1>Tasks</h1>
                </Grid.Column>
            </Grid.Row>
          
            <Grid.Row>
                <Grid.Column width={10}>
                    <Table singleLine fixed>
                        <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>
                                <Header as='h3'>
                                    <Header.Content>
                                        Repository Name
                                    </Header.Content>
                                </Header>     
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <Header as='h3'>
                                    <Header.Content>
                                        Message
                                    </Header.Content>
                                </Header>   
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <Header as='h3'>
                                    <Header.Content>
                                        User Name
                                    </Header.Content>
                                </Header>   
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <Header as='h3'>
                                    <Header.Content>
                                        Date
                                    </Header.Content>
                                </Header>   
                            </Table.HeaderCell>
                        </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {
                                this.state.data.map(item =>(
                                    <Table.Row key={item.id}>
                                        <Table.Cell>
                                            <Header as='h4'>
                                                <Header.Content>
                                                    <Link to={`/detail_task/${item.id}`}> { item.repository } </Link>                                      
                                                </Header.Content>
                                            </Header>     
                                        </Table.Cell>
                                        
                                        <Table.Cell>         
                                            <Header as='h4'>
                                                <Header.Content>
                                                    <span class='table'>
                                                        {item.message}      
                                                    </span>                 
                                                </Header.Content>
                                            </Header>         
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Header as='h4' image>
                                                <Image src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1024px-User_icon_2.svg.png' rounded size='mini' />
                                                <Header.Content>
                                                    {item.user}
                                                </Header.Content>
                                            </Header>                  
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Header as='h4'>
                                                <Header.Content>
                                                    {item.date}
                                                </Header.Content>
                                            </Header>                         
                                        </Table.Cell>
                                    </Table.Row>
                                    
                                ))
                            }                  
                        </Table.Body>

                        <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan='4'>
                            <Menu floated='right' pagination>
                                <Menu.Item as='a' icon>
                                <Icon name='chevron left' />
                                </Menu.Item>
                                <Menu.Item as='a'>1</Menu.Item>
                                <Menu.Item as='a'>2</Menu.Item>
                                <Menu.Item as='a'>3</Menu.Item>
                                <Menu.Item as='a'>4</Menu.Item>
                                <Menu.Item as='a' icon>
                                <Icon name='chevron right' />
                                </Menu.Item>
                            </Menu>
                            </Table.HeaderCell>
                        </Table.Row>
                        </Table.Footer>
                    </Table>  
                </Grid.Column>   
            </Grid.Row>    
        </Grid>
    }
}

export default TasksPage;