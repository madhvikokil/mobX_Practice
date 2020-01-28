import React from 'react';
import Login from './component/login';
import Dashboard from './dashboard';
import { Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Route path="/dashboard" component={Dashboard}/>
      <Route path="/" exact component={Login} />
    </div>
  );
}

export default App;