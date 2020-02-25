import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import store from '../store';
import '@n3/react-full-table/dist/n3-react-full-table.css';
import HeaderConstructed from './layout/Header';
import { HashRouter as Router,Route } from "react-router-dom";
import PrivateRoute from './common/PrivateRoute'
import Login from "./accounts/login";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Alerts from './layout/Alerts'
import {loadUser} from "../actions/auth";
import ProfileCard from "./profiles/profileCard";
import OrdersTable from "./orders/OrdersTable";



const alertOptions = {
    timeout: 3000,
    position: "top left"
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
                        <Route component={Login} path={'/login'}/>
                        <Route component={ProfileCard} path={'/profile'}/>
                        <Route component={OrdersTable} path={'/orders'}/>
                    </Router>
                </AlertProvider>
            </Provider>
        )

    }
}

ReactDom.render(<App />, document.getElementById('app'));