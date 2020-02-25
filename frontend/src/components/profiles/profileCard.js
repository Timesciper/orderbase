import React, { Component } from 'react'
import {connect} from "react-redux";
import PropTypes from 'prop-types'

class ProfileCard extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired
    };
    state = {
        username: this.props.user.username,
        email: this.props.user.email,
        firstName: this.props.user.first_name,
        lastName: this.props.user.last_name,
        balance: this.props.user.balance,
        userType: this.props.user.user_type
    };

    render() {
        const {username, email, firstName, lastName, balance, userType} = this.state;
        let balanceStr = '';
        let kostil = '';
        if (firstName!==''){
            kostil = firstName+' '
        }
        if (userType === 'exe') {
            balanceStr = 'Вы заработали ' + balance.toString()
        } else {
            if (userType === 'system') {
                balanceStr = 'Площадка заработала ' + balance.toString()
            } else {
                balanceStr = 'Вы потратили на заказы' + balance.toString()
            }
        }


        return (<>
                <div className="card">
                    <div className="card-header">
                        <h2>{kostil} {lastName} ( {username} )</h2>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{balanceStr}</h5>
                    </div>
                </div>
            </>
        )

    }
}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps,)(ProfileCard);