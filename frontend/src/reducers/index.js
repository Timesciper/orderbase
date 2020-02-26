import {combineReducers} from 'redux';
import auth from './auth'
import errors from './errors'
import messages from './messages'
import orders from './orders'
import items from './items'



const reducers = {
    auth: auth,
    errors: errors,
    messages: messages,
    orders: orders,
    items: items
};

export default combineReducers(
    {
        ...reducers,

    });