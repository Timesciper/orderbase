import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import store from '../store';
import '@n3/react-full-table/dist/n3-react-full-table.css';
import HeaderConstructed from './layout/Header';
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import TableCollector from "./outsource/TableCollector";
import PrivateRoute from './common/PrivateRoute'
import Login from "./accounts/login";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Alerts from './layout/Alerts'
import {loadUser} from "../actions/auth";



const alertOptions = {
    timeout: 3000,
    position: "top right"
};


class App extends Component {
    componentDidMount(){
        store.dispatch(loadUser())
    }
    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Alerts/>
                    <Router >
                        <HeaderConstructed/>
                        <PrivateRoute component={TableCollector} path={'/out'}/>
                        <Route component={Login} path={'/login'}/>
                    </Router>
                </AlertProvider>
            </Provider>
        )

    }
}

ReactDom.render(<App />, document.getElementById('app'));