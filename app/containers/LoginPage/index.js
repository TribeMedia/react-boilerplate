/**
 * Created by gqadonis on 5/21/16.
 */
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import shouldPureComponentUpdate from 'react-pure-render/function'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';

import { createSelector } from 'reselect';

import styles from './styles.css';

const style = {
  margin: 12,
};

import {
  selectCurrentUser,
  selectLoading,
  selectError,
} from 'containers/App/selectors';

import {
  selectLogin,
  selectUsername,
  selectPassword,
} from './selectors';

import { changeUsername, changePassword } from './actions';
import { loginUser } from '../App/actions';

export class LoginPage extends React.Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  /**
   * Changes the route
   *
   * @param  {string} route The route we want to go to
   */
  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  componentDidUpdate() {
    if (this.props.user) {
      this.openRoute('/');
    }
  }

  render() {

    return (
      <div>
        <AppBar title="Login"
        />
        <form onSubmit={this.props.onSubmitForm} >
          <TextField name="username"
                     onChange = {this.props.onChangeUsername}
                     value = { this.props.username }
            hintText="User name" /><br/>
          <TextField name="password" type="password"
                     onChange = {this.props.onChangePassword}
                     value = { this.props.password }
            hintText="Password" /><br/>
          <RaisedButton label="Log In" primary={true} style={style} onMouseUp={this.props.onSubmitForm} />
        </form>
      </div>
    );
  }
}

LoginPage.propTypes = {
  changeRoute: React.PropTypes.func,
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  user: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  onSubmitForm: React.PropTypes.func,
  username: React.PropTypes.string,
  password: React.PropTypes.string,
  onChangeUsername: React.PropTypes.func,
  onChangePassword: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
    onChangePassword: (evt) => dispatch(changePassword(evt.target.value)),
    changeRoute: (url) => dispatch(push(url)),
    onSubmitForm: (evt) => {
      evt.preventDefault();
      dispatch(loginUser(selectUsername(), selectPassword()));
    },

    dispatch,
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(createSelector(
  selectCurrentUser(),
  selectUsername(),
  selectPassword(),
  selectLoading(),
  selectError(),
  (user, username, password, loading, error) => ({ user, username, password, loading, error })
), mapDispatchToProps)(LoginPage);
