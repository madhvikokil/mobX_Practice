import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import LoginStore  from './store/loginStore';
import Crud from './store/crud';
import { Provider } from 'mobx-react';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Provider LoginStore={LoginStore} Crud={Crud}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));
window.store = LoginStore;
window.s = Crud;
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
