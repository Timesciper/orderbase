import React, { Component } from 'react';
import Header from '@n3/kit/es/header';
import '@n3/kit/dist/n3kit.css';
import { connect } from 'react-redux';
import { logout } from "../../actions/auth";
import {getOrders} from '../../actions/orders'
import PropTypes from 'prop-types'

class HeaderConstructed extends Component {
    static propTypes= {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    };
    componentDidMount() {
        this.props.getOrders()
    }

    render() {
        const logo = {
            img: null,
            title: 'Заказы'
        };

        let user='None';
        if (this.props.auth.isAuthenticated){
            if (this.props.user!==null){
            user = this.props.auth.user.username;

            }else{
                user = 'Login'
            }
        }else{
            user = 'Login'
        }
        const dropDownOptions = [

            {
                component: 'button',
                onClick: this.props.logout,
                label: 'Выйти'
            }
        ];
         const menu =
           [

               {
                   type: 'link',
                   payload: {
                       text: 'Заказы',
                       url: '/orders'
                   }
               },
               {
                   type: 'link',
                   payload: {
                       text: 'Мои заказы',
                       url: '/myorders'
                   }
               },
               {
                   type: 'link',
                   payload: {
                       text: 'Профиль',
                       url: '/profile'
                   }
               }
               ];


        return (<>

            <Header
                menu={menu}
                withPusher={true}
                collapsible={false}
                logo={logo}
                userName={user}
                dropdownOptions={dropDownOptions}

            />
            </>

        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    orders: state.orders.orders
});
export default connect(mapStateToProps, {logout, getOrders})(HeaderConstructed);