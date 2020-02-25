import {combineReducers} from 'redux';
import auth from './auth'
import errors from './errors'
import messages from './messages'
import orders from './orders'
import items from './items'

export default combineReducers({
    auth, errors, messages, orders, items
});