import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import {Switch, Route} from 'react-router-dom';
import MainMenu from "./modules/MainMenu";
import RepositoryPage from "./pages/RepositoryPage";
import MyRepositoryPage from "./pages/MyRepositoryPage";
import ProfilePage from "./pages/ProfilePage";
import CreateRepositoryPage from "./pages/CreateRepositoryPage";
import UsersPage from "./pages/UsersPage";
import UpdateUsersPage from "./pages/UpdateUsersPage";
import TasksPage from "./pages/TasksPage";
import CreateUsersPage from './pages/CreateUsersPage';
import UpdateRepositoryPage from './pages/UpdateRepositoryPage';
import DetailTaskPage from './pages/DetailTaskPage';
import './App.css';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage'


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showMenu: true,
      hits: []
    };
  }

  render(){
    return (
      <div className="App">
          <MainMenu />  
          <Switch>            
              <Route exact path="/" render = { props => <HomePage />}/>  
              <Route exact path="/repository" render = { props => <RepositoryPage />}/>  
              <Route exact path="/my_repository" render = { props => <MyRepositoryPage />}/>  
              <Route exact path="/login" render = { props => <LoginPage />}/>  
              <Route exact path="/profile" render = { props => <ProfilePage />}/>  
              <Route exact path="/create_repository" render = { props => <CreateRepositoryPage />}/>  
              <Route exact path="/update_repository/:id" render = { props => <UpdateRepositoryPage id={props.match.params.id}/>}/>  
              <Route exact path="/users" render = { props => <UsersPage />}/>  
              <Route exact path="/update_users/:id" render = { props => <UpdateUsersPage id={props.match.params.id}/>}/>  
              <Route exact path="/tasks" render = { props => <TasksPage />}/>  
              <Route exact path="/detail_task/:id" render = { props => <DetailTaskPage id={props.match.params.id}/>}/>  
              <Route exact path="/create_users" render = { props => <CreateUsersPage />}/>  
          </Switch>    
      </div>
    );
  }
  
  
}

export default App;
