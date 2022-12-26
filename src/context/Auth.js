import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUrl, logoutUrl } from '../lib/constant';
import { LS_AUTH, LS_THEME } from '../config/localStorage';
import * as path from '../routes/path';

const axiosReq = axios.create();
const AuthContext = React.createContext();

class Auth extends Component {
  state = {
    token: localStorage.getItem(LS_AUTH) || '',
    isLoading: false,
    isLoggedIn: localStorage.getItem(LS_AUTH) === null ? false : true,
    isDarkMode:
      localStorage.getItem(LS_THEME) === null ||
      localStorage.getItem(LS_THEME) === 'false'
        ? false
        : true,
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
            type: 'error',
          });
          toast(response.data.error.msg, {
            delay: 3000,
            autoClose: 5000,
            type: 'error',
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
    this.setState({ isLoading: true });
    return axiosReq({
      method: 'post',
      url: logoutUrl,
      headers: { Authorization: `Bearer ${this.state.token}` },
    })
      .then((response) => {
        const { success, status } = response.data;
        if (status === 'success') {
          localStorage.removeItem(LS_AUTH);
          localStorage.removeItem(LS_THEME);
          this.setState({
            isLoggedIn: false,
            isDarkMode: false,
          });
          document.documentElement.setAttribute(
            'data-theme',
            localStorage.getItem(LS_THEME) === 'true' ? 'dark' : 'light',
          );
          toast(success.msg, {
            autoClose: 3000,
            type: 'success',
          });
          this.props.history.push(path.URLLogin);
        }

        return response.data;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  _handleChangeTheme = () => {
    const { isDarkMode } = this.state;
    this.setState({ isDarkMode: !isDarkMode });
    localStorage.setItem(LS_THEME, !isDarkMode);
    document.documentElement.setAttribute(
      'data-theme',
      !isDarkMode ? 'dark' : 'light',
    );
    document.documentElement.classList.toggle('transition');
  };

  componentDidMount() {
    document.documentElement.setAttribute(
      'data-theme',
      localStorage.getItem(LS_THEME) === 'true' ? 'dark' : 'light',
    );
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          login: this.login,
          logout: this.logout,
          _handleChangeTheme: this._handleChangeTheme,
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
