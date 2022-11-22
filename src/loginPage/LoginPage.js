import React from 'react';
import FormLogin from './FormLogin';

export default function LoginPage() {
  return (
    <div className="container-login">
      <div className="left-side">
        <div className="bg-image-login"></div>
        <div className="tagline">
          <div className="mx-7">
            <h3 className="fs-1 fw-normal text-white">
              "Without hard work, nothing grows but weeds."
            </h3>
            <h6 className="fw-semibold text-primary-gray">
              Gordon B. Hinckley
            </h6>
          </div>
        </div>
      </div>
      <FormLogin />
    </div>
  );
}
