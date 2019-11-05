import React from 'react';
import {Grid, Table, Menu, Icon, Button, Header, Image} from 'semantic-ui-react';

var str = '[ { "id": 1, "taskName": "task1", "message": "msg", "username": "Jack01", "date": "29-10-2019"}, { "id": 2, "taskName": "task2", "message": "msg", "username": "Tom01", "date": "29-10-2019"}, { "id": 3,  "taskName": "task3", "message": "msg",  "username": "Ben01", "date": "29-10-2019"} ]';

class HomePage extends React.Component{
    constructor(props){
        super(props)
        this.state = { data: JSON.parse(str) };
    }

    render(){
        console.log(this.state.data);
        return <Grid centered stackable columns={2}>
            <Grid.Row>
            </Grid.Row>
          
            <Grid.Row>
                <Grid.Column width={10}>
                    <Table singleLine>
                        <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>
                                <Header as='h3'>
                                    <Header.Content>
                                        Task Name
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
                                                    {item.taskName}
                                                </Header.Content>
                                            </Header>     
                                        </Table.Cell>
                                        
                                        <Table.Cell>
                                            <Header as='h4'>
                                                <Header.Content>
                                                    {item.message}
                                                </Header.Content>
                                            </Header>         
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Header as='h4' image>
                                                <Image src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1024px-User_icon_2.svg.png' rounded size='mini' />
                                                <Header.Content>
                                                    {item.username}
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

export default HomePage;