import React, { Component } from 'react'
import {connect} from "react-redux";
import PropTypes from 'prop-types'


class OrderCard extends Component {
    static PropTypes = {
        items: PropTypes.array.isRequired,
        order: PropTypes.array.isRequired,
        user: PropTypes.object.isRequired
    };
    state = {
        items: [],
        price: 0,
        creator: '',
        executor: '',
    };
    // что тут должно быть: если ты работник - все серое, кнопка взять заказ, если он уже им взят, то кнопка выполнить
    // если ты работодатель, который открыл заказ - возможность его закрыть, изменить items в заказе
    // если за него кто-то взялся - будет видно кто
    // если юзер - система, скорее всего просто все серое?
    render () {
        const user = this.props.user;
        let items = [];
        const order = this.props.orders.filter(
            order => {
                if (order.id===this.props.target){
                    return true
                }
            }
        );
        if (order!==null && order!==undefined){
            this.setState({
                items: order.items
            })
        }
        let userType = '';
        if (user!==undefined){
           userType = user.user_type
        }// endif
        switch (userType) {
            case 'exe':

        }

    }

}

const mapStateToProps = state => ({
    user: state.auth.user
    orders: state.orders.orders,
    items: state.items.items
});

export default connect(mapStateToProps)(OrderCard)