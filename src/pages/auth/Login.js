import React from 'react';
import { Redirect } from 'react-router-dom';
import { withAuth } from '../../context/Auth';
import LoginForm from './LoginForm';
import * as path from '../../routes/path';

const Login = (props) => {
  if (props.isLoggedIn) {
    return <Redirect push to={path.URLDashboard} />;
  }

  return (
    <div className="container-login">
      <div className="left-side">
        <div className="bg-image-login"></div>
        <div className="tagline">
          <div className="mx-7">
            <h3 className="fs-1 fw-normal text-white">
              "Without hard work, nothing grows but weeds."
            </h3>
            <h6 className="fw-semibold text-brand-anti-flash">
              Gordon B. Hinckley
            </h6>
          </div>
        </div>
      </div>
      <LoginForm />
    </div>
  );
};

export default withAuth(Login);
