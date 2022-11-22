import React from 'react';
import VBMLogo from '../../assets/images/VBM-Logo.svg';
import { FiEye } from 'react-icons/fi';
import ButtonPrimary from '../../components/button/ButtonPrimary';

export default function FormLogin() {
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
          <form method="post">
            <div className="mb-3">
              <label htmlFor="email" className="fs-6 form-label mb-1">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
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
                  aria-describedby="passwordHelp"
                  placeholder="Type your password here"
                />
                <div className="eye-icon">
                  <FiEye size="24" />
                </div>
              </div>
            </div>
            <div className="btn-login-container">
              <ButtonPrimary>Sign in</ButtonPrimary>
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
