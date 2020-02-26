import axios from 'axios'
import {returnErrors} from "./messages";
import {tokenConfig} from "./auth";
import {
    PUT_ORDER,
    GET_ORDERS,
    DELETE_ORDER,
    CREATE_ORDER, FIND_ORDERS
} from "./types";

export const getOrders = (value) => (dispatch, getState) => {
    axios.get('/api/order/', tokenConfig(getState)).then(res => {
            if (value) {
                dispatch({
                    type: FIND_ORDERS,
                    payload: value
                })
            } else {
                dispatch({
                    type: GET_ORDERS,
                    payload: res.data
                })
            }
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

export const putOrder = (data) => (dispatch, getState) => {
    const url = '/api/order/' + data.id.toString()+'/';
    axios.put(url, data, tokenConfig(getState)).then(res => {
        dispatch({
            type: PUT_ORDER,
            payload: res.data,
            target: data.id
        })
    })
};

export const createOrder = (data) => (dispatch, getState) => {
    const url = '/api/order/';
    axios.post(url, data, tokenConfig(getState)).then(res=>{
        dispatch({
            type: CREATE_ORDER,
            payload: res.data
        })
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
};






/*
export const jobSDone = (data) => (dispatch, getState) => {
    const urlOrder = '/api/order/'+data.id.toString()+'/';  // этот заказ отработан
    let executor = data.executor; // айди выполнившего работу (current user)
    let owner = data.creator; // тот, кто создал заказ
    // что нужно сделать 1) найти систем юзера 2) изменить баланс исполнителя и заказчика
    // перевести заказ в выполненные
    const urlExec = '/api/user/'+executor.toString()+'/';
    const urlOwner = '/api/user/'+owner.toString()+'/';
    // метод кувалды
    let execBalance = 0;
    executor = {};
    owner = {};
    axios.get(urlExec, tokenConfig(getState)).then(res => {
                console.log('EXECUTOR');

        executor = res.data;
        execBalance = res.data.balance
    });
    let workBalance = 0;
    axios.get(urlOwner, tokenConfig(getState)).then(res => {
        console.log('URLOWNER');
        owner = res.data;
        workBalance = res.data.balance
    });
    const urlSystem = '/api/system/';
    let systemBalance = 0;
    let systemUser = {};
    axios.get(urlSystem, tokenConfig(getState)).then(res=>{
        systemUser = res.data[0];
        systemBalance = systemUser.balance
    });
    const rewardSystem = data.price*0.15;
    const rewardWorker = data.price*0.85;
    systemBalance+=rewardSystem;
    execBalance+=rewardWorker;
    workBalance+=rewardWorker;

    const ownerData = {
        id: owner.id,
        username: owner.username,
        email: owner.email,
        first_name: owner.first_name,
        last_name: owner.last_name,
        balance: workBalance,
        user_type: owner.user_type
    };
    const exeData = {
        id: executor.id,
        username: executor.username,
        email: executor.email,
        first_name: executor.first_name,
        last_name: executor.last_name,
        balance: execBalance,
        user_type: executor.user_type
    };
    const systemData = {
        id: systemUser.id,
        username: systemUser.username,
        email: systemUser.email,
        first_name: systemUser.first_name,
        last_name: systemUser.last_name,
        balance: systemBalance,
        user_type: systemUser.user_type
    };
    axios.put(urlOwner, ownerData, tokenConfig(getState)).then(res => {
        console.log(res)

    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
    axios.put(urlExec, exeData, tokenConfig(getState)).then(res => {
        console.log(res)
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
    axios.put(urlSystem, systemData, tokenConfig(getState)).then(res => {
        console.log(res)

    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
    axios.put(urlOrder, data, tokenConfig(getState)).then(res => {
        dispatch({
            type: PUT_ORDER,
            payload: res.data
        })
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

};
*/



export const completeOrder = (data) => (dispatch, getState) =>  {
    axios.post('/api/final_order', data, tokenConfig(getState)).then(res => {
        dispatch({
            type: DELETE_ORDER,
            payload: 22
        })

    });
};