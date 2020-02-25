import React, {Component} from 'react'
import { Input, Button} from "@n3/kit";
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import {login} from "../../actions/auth";
import { Redirect } from 'react-router-dom';
import { Modal } from '@n3/kit';
import Alerts from "../layout/Alerts";
import {Provider as AlertProvider} from "react-alert";

export class Login extends Component {
    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    };

    state = {
        username: "",
        password: "",
        isOpened: true,
    };

    onSubmit = e => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password)
    };
    render () {
        if (this.props.isAuthenticated){
            return <Redirect to='/'/>
        }
        const { username,  password, isOpened } = this.state;
        const toggleOpened = () => {
        this.setState({
            isOpened: this.state.isOpened
        })

    };
        const setUsernameValue = (event) => {
            event.preventDefault();
            this.setState({
                username: event.target.value
            })
        };

        const setPasswordValue = (event) => {
            this.setState({
                password: event.target.value,
            })
        };

        return (
            <>

                <Modal show={isOpened} onHide={toggleOpened} hasCloseButton={false}>


                    <Modal.Body>
                        <h3>Зарегистрируйтесь</h3>
                        <input type="email" className="form-control"  onChange={setUsernameValue}
                               placeholder="Введите логин"/>
                    <hr/>
                        <input type="password" className="form-control"  onChange={setPasswordValue}
                               placeholder="Введите пароль"/>
                        <hr/>
                    <hr/>
                    <Button onClick={this.onSubmit}> Войти </Button>
                    </Modal.Body>
                </Modal>
                        </>

        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login)