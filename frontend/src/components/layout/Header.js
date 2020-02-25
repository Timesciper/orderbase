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
            title: 'Outsource'
        };



        const dropDownOptions = [
            {
                component: 'button',
                onClick: this.props.logout,
                label: 'Выйти'
            }
        ];

        let user='None';
        if (this.props.auth.isAuthenticated){
            if (this.props.user!==null){
            user = this.props.auth.user.username
            }else{
                user = 'Login'
            }
        }else{
            user = 'Login'
        }
         const menu =
           [
               {
                   type: 'link',
                   payload: {
                       text: 'Аутсорсеры',
                       url: '/out'
                   }
               },
               {
                   type: 'link',
                   payload: {
                       text: 'Компании',
                       url: '/companies'
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