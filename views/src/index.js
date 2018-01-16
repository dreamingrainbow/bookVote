// Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ReduxPromise from 'redux-promise';

// Components / Redux / CSS
import App from './App';
import reducers from './reducers';
import './index.css';
const storeWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
    <Provider  store={storeWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())} >
        <Router >
            <App />
        </Router>
    </Provider>, document.getElementById('root'));


