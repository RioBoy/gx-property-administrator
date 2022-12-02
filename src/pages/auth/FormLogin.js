import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import { withAuth } from '../../context/Auth';

import { Buttons } from '../../components/button/Buttons';

import VBMLogo from '../../assets/images/VBM-Logo.svg';
import Spinner from '../../components/spinner/Spinner';

const FormLogin = (props) => {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [passwordShown, setPasswordShown] = useState(false);

  const _handleSubmitLogin = (e) => {
    e.preventDefault();
    props.login(login);
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
                {props.isLoading ? (
                  <Spinner isInButton>Sign in</Spinner>
                ) : (
                  'Sign in'
                )}
              </Buttons>
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col version">
          <p className="text-center text-secondary-gray">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default withAuth(FormLogin);
