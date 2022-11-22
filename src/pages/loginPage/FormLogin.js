import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUrl } from '../../lib/constant';
import ButtonPrimary from '../../components/button/ButtonPrimary';

import VBMLogo from '../../assets/images/VBM-Logo.svg';
import { FiEye } from 'react-icons/fi';

export default function FormLogin() {
  const [login, setLogin] = useState({
    email: '',
    password: '',
    isLoggedIn: false,
  });
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const _handleSubmitLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    axios({
      method: 'post',
      url: loginUrl,
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(login),
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
          localStorage.setItem('token', access_token);
          setLogin({ isLoggedIn: true });
          history.push('/dashboard');
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
    setLogin({ email: '', password: '' });
  };
  const _handleUpdateData = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="right-side">
      <div className="row">
        <div className="col">
          <div className="vbm-logo">
            <img src={VBMLogo} alt="Logo" />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h2 className="fw-semibold welcome-title">
            <span>Welcome to</span>
            <span>PROPERTY</span> Admin Panel
          </h2>
        </div>
      </div>
      <div className="row mt-3 form-login">
        <div className="col-12">
          <h6 className="fw-normal mb-0">Sign in to your account below</h6>
        </div>
        <div className="col-12">
          <form method="post" onSubmit={_handleSubmitLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="fs-6 form-label mb-1">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={login.email}
                onChange={_handleUpdateData}
                aria-describedby="emailHelp"
                placeholder="Type your email here"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="fs-6 form-label mb-1">
                Password
              </label>
              <div className="input-password">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={login.password}
                  onChange={_handleUpdateData}
                  aria-describedby="passwordHelp"
                  placeholder="Type your password here"
                />
                <div className="eye-icon">
                  <FiEye size="24" />
                </div>
              </div>
            </div>
            <div className="btn-login-container">
              <ButtonPrimary>
                {loading ? 'Loading...' : 'Sign in'}
              </ButtonPrimary>
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col version">
          <p className="d-flex justify-content-center">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
}
