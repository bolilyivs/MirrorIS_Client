import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import {Switch, Route} from 'react-router-dom';
import MainMenu from "./modules/MainMenu";
import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage";
import TasksPage from "./pages/TasksPage";
import './App.css';

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
              <Route exact path="/settings" render = { props => <SettingsPage />}/>  
              <Route exact path="/tasks" render = { props => <TasksPage />}/>  
          </Switch>    
      </div>
    );
  }
  
  
}

export default App;
