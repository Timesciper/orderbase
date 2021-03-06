import { GET_ORDERS, CREATE_ORDER, DELETE_ORDER, FIND_ORDERS, PUT_ORDER } from "../actions/types";

const initialState = {
    orders: []
};
export default function (state=initialState, action) {
    switch (action.type) {
        case GET_ORDERS:
            state.orders = [];
            return {
                ...state,
                orders: action.payload
            };
        case FIND_ORDERS: // find all orders of given exe or work
            return {
                ...state,
                orders: state.orders.filter(order => {
                    return (order.executor.toString()===action.payload || order.creator.toString()===action.payload || order.status===action.payload )
                })
            };
        case DELETE_ORDER:
            return{
                ...state,
                orders: state.orders.filter(order=>{
                    return order.id!==action.payload
                })
            };
        case CREATE_ORDER:
            state.orders.push(action.payload);
            return{
                ...state,
                orders: state.orders

            };
        case PUT_ORDER:
            return {
                ...state,
            };
        default:
            return {
                ...state
            }
    }
}