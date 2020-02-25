import axios from 'axios'
import {createMessage, returnErrors} from "./messages";
import {tokenConfig} from "./auth";
import {GET_ITEMS} from "./types";

export const getItems = () => (dispatch, getState) => {
    axios.get('/api/item/', tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_ITEMS,
            payload: res.data
        })
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
