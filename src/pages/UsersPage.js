import React from 'react';
import {Grid, Table, Menu, Icon, Button, Header, Image} from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Query from '../config.js'
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router'

class UsersPage extends React.Component{
    constructor(props){
        super(props)
        this.state = { data: [], redirectFail: false };
    }
    componentDidMount() {
        axios.get(
            Query.userGET,
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
        console.log(this.state.data);

        if (this.state.redirectFail) {
            return <Redirect to='/login'/>;
        }

        return <Grid centered stackable columns={2}>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            <h1>Users</h1>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Link to="/create_users">
                                <Button primary floated="right" size="big" style={{width: "200px"}}>Add</Button>
                            </Link>                           
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
                                                User Name
                                            </Header.Content>
                                        </Header>     
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        <Header as='h3'>
                                            <Header.Content>
                                                Group
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
                                                <Header as='h4' image>
                                                    <Image src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1024px-User_icon_2.svg.png' rounded size='mini' />
                                                    <Header.Content>                                           
                                                        <Link to={`/update_users/${item.id}`}> { item.username } </Link>                             
                                                    </Header.Content>
                                                </Header>                  
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Header as='h4'>
                                                    <Header.Content>
                                                    {(() => {
                                                        switch (item.group) {
                                                            case 0:     return "User";
                                                            case 1:     return "Admin";
                                                            default:    return "User";
                                                        }
                                                    })()}
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

export default UsersPage;
