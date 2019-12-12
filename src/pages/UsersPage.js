import React from 'react';
import {Grid, Table, Menu, Icon, Button, Header, Image} from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Query from '../config.js'
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router'
import { Pagination } from 'semantic-ui-react'

class UsersPage extends React.Component{
    constructor(props){
        super(props)
        this.state = { data: [],
            redirectFail: false,
            activePage: 1,
            totalPages: 1
            };
    }

    updateUserList = (page=1) => {
        axios.get(
            Query.userListGet((page-1) * 15, 15),
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

    componentDidMount() {
        this.updateUserList()
        axios.get(
                Query.userTotalPages(),
                {   headers: {
                        'Content-Type': 'application/json',
                        'authorization': 'Basic ' + btoa(new Cookies().get('username') + ":" + new Cookies().get('password')),
                        }
                })
                .then((response) => {
                    var data = response.data;
                    this.setState({ totalPages: data });
                },
                (error) => {
                    this.setState({ redirectFail: true});
                    console.log(error.data);
                }
        ); 
      }

      changePage = (e, { activePage }) => {
        this.setState({ activePage })
        this.updateUserList(activePage) 
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
                                                            case 0:     return "Admin";
                                                            case 1:     return "User";
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
                                        <Pagination defaultActivePage={1} totalPages={Math.ceil(this.state.totalPages/15)} onPageChange={this.changePage}/>
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
