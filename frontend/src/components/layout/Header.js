import React, { Component } from 'react';
import Header from '@n3/kit/es/header';
import '@n3/kit/dist/n3kit.css';
import { connect } from 'react-redux';
import { logout } from "../../actions/auth";
import { getItems } from "../../actions/items";
import {getOrders} from '../../actions/orders'
import PropTypes from 'prop-types'

class HeaderConstructed extends Component {
    static propTypes= {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    };
    componentDidMount() {
        this.props.getOrders();
        this.props.getItems();
    }

    render() {
        const logo = {
            img: null,
            title: 'Orders'
        };
        // если юзер - исполнитель, то ему доступны все заказы, свои заказы, профиль
        // если юзер - работодатель, то ему доступна кнопка создать заказ, мои заказы, профиль
        // если system - все заказы, профиль
        let user='None';
        let menu = [];

        if (this.props.auth.isAuthenticated){
            if (this.props.auth.user){
            user = this.props.auth.user.username;
            if (this.props.auth.user.user_type==='exe'){
                menu =
           [

               {
                   type: 'link',
                   payload: {
                       text: 'Открытые заказы',
                       url: '/orders'
                   }
               },
               {
                   type: 'link',
                   payload: {
                       text: 'Мои заказы',
                       url: '/myorders/'+this.props.auth.user.id.toString()+'/'
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
            }else if(this.props.auth.user.user_type==='work'){
                menu = [
                    {
                        type: 'link',
                        payload: {
                            text: 'Мои заказы',
                            url: '/myorders/'+this.props.auth.user.id.toString()+'/'
                        }
                    },
                    {
                        type: 'link',
                        payload: {
                            text: 'Созддать заказ',
                            url: '/create'
                        }
                    },
                    {
                        type: 'link',
                        payload: {
                            text: 'Профиль',
                            url: '/profile'
                        }
                    },

                ]
            }else if(this.props.auth.user.user_type==='system'){
                menu = [
                    {
                        type: 'link',
                        payload: {
                            text: 'Все заказы',
                            url: '/orders'
                        }
                    },
                    {
                        type: 'link',
                        payload: {
                            text: 'Профиль',
                            url: '/myprofile'
                        }
                    }
                ]
            }

            }else{
                user = 'Login';
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
    orders: state.orders.orders,
    items: state.items.items
});
export default connect(mapStateToProps, {logout, getOrders, getItems})(HeaderConstructed);