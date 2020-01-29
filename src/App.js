import React from 'react';
import Login from './component/login';
import Dashboard from './component/dashboard';
import { Route } from 'react-router-dom';
// import Edit from './component/edit';
import './App.css';

function App() {
  return (
    <div className="App">
      <Route path="/dashboard/:id" exact component={Dashboard} /> 
      <Route path="/dashboard" exact component={Dashboard}/>
      <Route path="/" exact component={Login} />
    </div>
  );
}

export default App;