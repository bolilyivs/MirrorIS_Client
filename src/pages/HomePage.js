import React from 'react';
import {Grid, Table, Menu, Icon, Button, Header, Image} from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import isObject from 'isobject';



var str = '[ { "id": 1, "lastUpdate": "29-10-2019", "name": "Ubuntu1", "status": 0, "user": { "group": 0, "id": 1, "username": "Jack01" } }, { "id": 2, "lastUpdate": "29-10-2019", "name": "OpenSuse", "status": 1, "user": { "group": 0, "id": 2, "username": "john02" } }, { "id": 3, "lastUpdate": "29-10-2019", "name": "CentOS", "status": 2, "user": { "group": 0, "id": 3, "username": "Bred03" } } ]';
var obj = JSON.parse(str);


class TableRow extends React.Component{
    render(){
        return ;
    }
}


class HomePage extends React.Component{
    constructor(props){
        super(props)
        this.state = { data: JSON.parse(str) };
    }

    // componentWillMount() {
    //     this.setState({
    //         data: JSON.parse(str)
    //     });
    //   }

    render(){
        console.log(this.state.data);
        return <Grid centered stackable columns={2}>
            <Grid.Row>
                <Grid.Column width={10}>
                    <Button primary floated="right" size="big" style={{width: "200px"}}>Add</Button>
                </Grid.Column>    
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
                                        Master
                                    </Header.Content>
                                </Header>   
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <Header as='h3'>
                                    <Header.Content>
                                        Active
                                    </Header.Content>
                                </Header>   
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <Header as='h3'>
                                    <Header.Content>
                                        Last Run Date
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
                                                    {item.name}
                                                </Header.Content>
                                            </Header>     
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Header as='h4' image>
                                                <Image src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1024px-User_icon_2.svg.png' rounded size='mini' />
                                                <Header.Content>
                                                    {item.user.username}
                                                </Header.Content>
                                            </Header>                  
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Header as='h4'>
                                                <Header.Content>
                                                {(() => {
                                                    switch (item.status) {
                                                        case 0:   return "Inactive";
                                                        case 1: return "Active";
                                                        case 2:  return "Run";
                                                        default:      return "Inactive";
                                                    }
                                                })()}
                                                </Header.Content>
                                            </Header>         
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Header as='h4'>
                                                <Header.Content>
                                                    {item.lastUpdate}
                                                </Header.Content>
                                            </Header>                         
                                        </Table.Cell>
                                    </Table.Row>
                                    
                                ))
                            }
                            {/* <Table.Row>
                                <Table.Cell>OpenSuseRepo</Table.Cell>
                                <Table.Cell> 
                                    <Header as='h4' image>
                                        <Image src='https://react.semantic-ui.com/images/avatar/small/matthew.png' rounded size='mini' />
                                        <Header.Content>
                                            John Boo
                                        </Header.Content>
                                    </Header>
                                </Table.Cell>
                                <Table.Cell>
                                    <Header as='h4' image>
                                        <Header.Content>
                                            Run
                                        <Header.Subheader>80%</Header.Subheader>
                                        </Header.Content>
                                    </Header>
                                </Table.Cell>
                                <Table.Cell>
                                    <Header as='h4' image>
                                        <Header.Content>
                                        15 Sep, 8:56 AM
                                        <Header.Subheader>(2013)</Header.Subheader>
                                        </Header.Content>
                                    </Header>
                                </Table.Cell>
                            </Table.Row>*/}
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