import React, {Component, Fragment} from 'react';
import { withAlert } from 'react-alert';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';


export class Alerts extends Component{

   static propTypes = {
       error: PropTypes.object.isRequired,
       message: PropTypes.object.isRequired,

   };

  componentDidUpdate(prevProps){
      const {error, alert, message} = this.props; // this.props.error is from mapStateToProps
      if(error !== prevProps.error){
          if(error.msg.name) alert.error('Name: '+ error.msg.name.toString());
          if(error.msg.position) alert.error('Position: '+ error.msg.position.toString());
          if(error.msg.email) alert.error('Email: '+ error.msg.email.toString());
          if(error.msg.username) alert.error('Username: '+ error.msg.username.toString());
          if(error.msg.password) alert.error('Password: '+ error.msg.password.toString());
          if (error.msg.non_field_errors)
        alert.error(error.msg.non_field_errors.join());
      }
      if (message !== prevProps.message){
          if(message.putOutsourcer) alert.success(message.putOutsourcer)
      }
  }

    render() {
        return (
            <Fragment/>
            );
    }
}
const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages
});


export default connect(mapStateToProps)(withAlert()(Alerts));