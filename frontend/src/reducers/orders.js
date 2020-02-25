import { GET_ORDERS, CREATE_ORDER, DELETE_ORDER, FIND_ORDERS, PUT_ORDER } from "../actions/types";

const initialState = {
    orders: []
};
export default function (state=initialState, action) {
    switch (action.type) {
        case GET_ORDERS:
            return {
                ...state,
                orders: action.payload
            };
        case FIND_ORDERS: // find all orders of given exe or work
            return {
                ...state,
                orders: state.orders.filter(order => {
                    return (order.executor.toString()===state.auth.user.id.toString() || order.creator.toString()===state.auth.user.id.toString())
                })
            };
        default:
            return {
                ...state
            }
    }
}