import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUrl } from '../../lib/constant';
import { LS_AUTH } from '../../config/localStorage';

import { Buttons } from '../../components/button/Buttons';

import VBMLogo from '../../assets/images/VBM-Logo.svg';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Spinner from '../../components/spinner/Spinner';

const FormLogin = () => {
  const [login, setLogin] = useState({
    email: '',
    password: '',
    isLoggedIn: false,
  });
  const [loading, setLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
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
          localStorage.setItem(LS_AUTH, access_token);
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

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const isSubmitDisabled =
    Object.keys(login).filter((key) => {
      return login[key] === '';
    }).length < 1;

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
          <h2 className="fw-semibold welcome-title text-primary-black">
            <span>Welcome to</span>
            <span className="text-primary-orange text-uppercase">
              Property
            </span>{' '}
            Admin Panel
          </h2>
        </div>
      </div>
      <div className="row mt-3 form-login">
        <div className="col-12">
          <h6 className="fw-normal mb-0 text-dark-blue">
            Sign in to your account below
          </h6>
        </div>
        <div className="col-12">
          <form method="post" onSubmit={_handleSubmitLogin}>
            <div className="mb-3">
              <label
                htmlFor="email"
                className="fs-10 form-label mb-1 text-dark-blue"
              >
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
              <label
                htmlFor="password"
                className="fs-10 form-label mb-1 text-dark-blue"
              >
                Password
              </label>
              <div className="input-password">
                <input
                  type={passwordShown ? 'text' : 'password'}
                  className="form-control"
                  id="password"
                  name="password"
                  value={login.password}
                  onChange={_handleUpdateData}
                  aria-describedby="passwordHelp"
                  placeholder="Type your password here"
                />
                <div className="eye-icon">
                  <button
                    onClick={togglePassword}
                    type="button"
                    className="bg-transparent p-0 border-0"
                  >
                    {passwordShown ? (
                      <FiEyeOff size="24" />
                    ) : (
                      <FiEye size="24" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="btn-login-container">
              <Buttons
                className="px-5 py-2 text-white"
                type="submit"
                isPrimary
                isMedium
                isDisabled={!isSubmitDisabled}
              >
                {loading ? <Spinner isInButton>Sign in</Spinner> : 'Sign in'}
              </Buttons>
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col version">
          <p className="d-flex justify-content-center text-secondary-gray">
            Version 1.0.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;
