import React, { Component } from 'react'
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import {getOrders} from "../../actions/orders";
import BaseTable, {Column} from "react-base-table";
import 'react-base-table/styles.css'
import {AutoResizer} from "react-base-table";

class OrdersTable extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        orders: PropTypes.array.isRequired,
        getOrders: PropTypes.func.isRequired
    };

    componentDidMount() {
        if (this.props.find!==false){
            getOrders(this.props.find)
        }else{
            getOrders()
        }
    }

    render() {
        const orders = this.props.orders;
        const user = this.props.user;
        // 1-st - we want to get all open orders (find = false, user = exe)
        let finalOrders = [];
        if (user.user_type==='exe' && this.props.find===false){
                finalOrders = orders.filter(order => {
                    return order.status==='open'
                })
            }else if(user.user_type==='exe' && this.props.find!==false)
            {
                finalOrders = orders.filter(order => {
                    if (order.executor!==null){
                        return order.executor.toString() === user.id.toString();
                    }else{
                        return false
                    }
                })
            }else{
            finalOrders = orders.filter(order=>{
                if (order.creator!==null){
                    return order.creator.toString() === user.id.toString();
                }else{
                    return false
                }
            })
        }
        if (user.user_type==='system'){
            finalOrders = orders
        }


        return (
            <div className={'container'}>
            <BaseTable width={900} height={50} data={finalOrders}>
                <Column width={300} dataKey={'id'} key={'id'} title={'ID'}/>
                <Column width={300} dataKey={'price'} key={'price'} title={'price'}/>
                <Column width={300} dataKey={'status'} key={'status'} title={'status'}/>
            </BaseTable>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    orders: state.orders.orders,
    user: state.auth.user
});

export default connect(mapStateToProps,{getOrders})(OrdersTable);