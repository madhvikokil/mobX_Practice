import React from 'react';
import Login from './component/login';
import Dashboard from './component/dashboard';
import { Route, Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/dashboard/:id"  component={Dashboard} /> 
        <Route path="/dashboard"  component={Dashboard}/>
        <Route path="/" exact component={Login} />
      </Switch>
  
    </div>
  );
}

export default App;