import axios from 'axios';
import { returnErrors } from "./messages";
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL, LOGOUT_SUCCESS
} from "./types";


export const tokenConfig = getState => {
    // Получаем токен из state
    const token = getState().auth.token;
    // Устанавливаем хедер для запроса
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    // Если токен есть, то добавляем в конфиг
    if (token){
        config.headers['Authorization'] = 'Token ' + token.toString();
    }
    return config;
};


export const loadUser = () => (dispatch, getState) => {
    // user loading
    dispatch({
        type: USER_LOADING
    });


    axios.get('/api/auth/user', tokenConfig(getState)).then(res => {
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type: AUTH_ERROR
        })
    })

};


export const login = (username, password) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    // request body
    const body = JSON.stringify({username, password});


    axios.post('/api/auth/login', body, config).then(res => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
    }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type: LOGIN_FAIL
        })
    })

};

export const logout = () => (dispatch, getState) => {

    axios.post('/api/auth/logout/', null, tokenConfig(getState)).then(res => {
        dispatch({
            type: LOGOUT_SUCCESS,
        });
    }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));

    })

};