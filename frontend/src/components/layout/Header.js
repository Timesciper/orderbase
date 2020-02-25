import React, { Component } from 'react';
import Header from '@n3/kit/es/header';
import '@n3/kit/dist/n3kit.css';
import { connect } from 'react-redux';
import { logout } from "../../actions/auth";
import PropTypes from 'prop-types'

class HeaderConstructed extends Component {
    static propTypes= {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    };
    render() {
        const logo = {
            img: null,
            title: 'Заказы'
        };


    // need to make a different header for 2 user types - executor and


        let user='None';
        let userBalance = '0.0';
        if (this.props.auth.isAuthenticated){
            if (this.props.user!==null){
            user = this.props.auth.user.username;
            userBalance = this.props.auth.user.balance;
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
                       text: 'Баланс',
                       url: '/mybalance'
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
    auth: state.auth
});
export default connect(mapStateToProps, {logout})(HeaderConstructed);