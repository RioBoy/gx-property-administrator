import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUrl, logoutUrl } from '../lib/constant';
import { LS_AUTH } from '../config/localStorage';
import * as path from '../routes/path';

const axiosReq = axios.create();
const AuthContext = React.createContext();

class Auth extends Component {
  state = {
    token: localStorage.getItem(LS_AUTH) || '',
    isLoading: false,
    isLoggedIn: localStorage.getItem(LS_AUTH) === null ? false : true,
  };

  login = (credentials) => {
    this.setState({ isLoading: true });
    return axiosReq({
      method: 'post',
      url: loginUrl,
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(credentials),
    })
      .then((response) => {
        const { status } = response.data;
        if (status === 'error') {
          toast(response.data.error.internalMsg, {
            autoClose: 3000,
          });
          toast(response.data.error.msg, {
            delay: 3000,
            autoClose: 5000,
          });
        } else {
          const { access_token } = response.data.results;
          localStorage.setItem(LS_AUTH, access_token);

          this.setState({
            token: access_token,
            isLoggedIn: true,
          });
          this.props.history.push(path.URLDashboard);

          return response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  logout = () => {
    return axiosReq({
      method: 'post',
      url: logoutUrl,
      headers: { Authorization: `Bearer ${this.state.token}` },
    })
      .then((response) => {
        const { success, status } = response.data;
        if (status === 'success') {
          localStorage.removeItem(LS_AUTH);
          this.setState({
            isLoggedIn: false,
          });
          toast(success.msg, {
            autoClose: 3000,
          });
          this.props.history.push(path.URLLogin);
        }

        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          login: this.login,
          logout: this.logout,
          ...this.state,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export const withAuth = (WrapperComponent) => {
  return class WithAuth extends Component {
    render() {
      return (
        <AuthContext.Consumer>
          {(context) => <WrapperComponent {...this.props} {...context} />}
        </AuthContext.Consumer>
      );
    }
  };
};

export default withRouter(Auth);
