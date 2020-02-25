import axios from 'axios'
import {createMessage, returnErrors} from "./messages";
import {tokenConfig} from "./auth";
import {
    PUT_ORDER,
    GET_ORDERS,
    FIND_ORDERS,
    DELETE_ORDER,
    CREATE_ORDER
} from "./types";

export const getOrders = (value) => (dispatch, getState) => {
    axios.get('/api/order/', tokenConfig(getState)).then(res => {


            dispatch({
                type: GET_ORDERS,
                payload: res.data
            })
        }


    ).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};


export const deleteOrder = (value) => (dispatch, getState) => {
    const url = '/api/order/' + value.toString() + '/';
    axios.delete(url, tokenConfig(getState)).then(res=>{
        dispatch({
            type: DELETE_ORDER,
            payload: value
        })
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
};