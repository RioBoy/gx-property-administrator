import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { adminProfile } from '../../lib/constant';
import { LS_AUTH } from '../../config/localStorage';
import ImageProfile from '../../assets/images/profile.png';

import Layout from '../../components/templates/Layout';
import Spinner from '../../components/spinner/Spinner';

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(LS_AUTH);
    setIsLoading(true);
    axios({
      method: 'post',
      url: adminProfile,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        const { results } = response.data;
        setProfile(results.profile);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Layout title="My Account">
      <main className="profile-content">
        {isLoading ? (
          <Spinner height="min-vh-50" />
        ) : (
          <>
            <section className="card border-0 bg-white rounded-2 section-1">
              <div className="d-flex align-items-center gap-3 my-4 mx-3">
                <div className="img-profile-wrapper">
                  <img
                    src={ImageProfile}
                    alt="Profile"
                    className="img-profile rounded-circle"
                  />
                </div>
                <div className="user-info-wrapper">
                  <h4 className="fs-7 fw-semibold text-brand-space-cadet mb-0">
                    {profile.name}
                  </h4>
                  <p className="fw-normal text-brand-rhythm mb-0">
                    {profile.nickName}
                  </p>
                </div>
              </div>
            </section>
            <section className="section-2 mt-3">
              <div className="row user-info-detail">
                <div className="col-12 col-lg-6 mt-3">
                  <div className="card border-0 bg-white p-3 rounded-2">
                    <h5 className="fs-8 fw-medium mb-4">Personal Data</h5>
                    <div className="mb-3">
                      <label
                        htmlFor="fullname"
                        className="fs-9 fw-normal text-brand-rhythm mb-2"
                      >
                        Full Name
                      </label>
                      <p className="fw-normal text-primary-black mb-0">
                        {profile.name}
                      </p>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="phoneNumber"
                        className="fs-9 fw-normal text-brand-rhythm mb-2"
                      >
                        Phone Number
                      </label>
                      <p className="fw-normal text-primary-black mb-0">
                        {profile.mobileNo}
                      </p>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="birthdate"
                        className="fs-9 fw-normal text-brand-rhythm mb-2"
                      >
                        Birth of Date
                      </label>
                      <p className="fw-normal text-primary-black mb-0">
                        {profile.birthDate}
                      </p>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="gender"
                        className="fs-9 fw-normal text-brand-rhythm mb-2"
                      >
                        Gender
                      </label>
                      <p className="fw-normal text-primary-black mb-0">
                        {profile.gender}
                      </p>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="address"
                        className="fs-9 fw-normal text-brand-rhythm mb-2"
                      >
                        Address
                      </label>
                      <p className="fw-normal text-primary-black mb-0">
                        {profile.address}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6 mt-3">
                  <div className="card border-0 bg-white p-3 rounded-2">
                    <h5 className="fs-8 fw-medium mb-4">Manage My Account</h5>
                    <div className="mb-3">
                      <label
                        htmlFor="email"
                        className="fs-9 fw-normal text-brand-rhythm mb-2"
                      >
                        Email Address
                      </label>
                      <p className="fw-normal text-primary-black mb-0">
                        {profile.email}
                      </p>
                    </div>
                    <div className="mb-3">
                      <div className="row align-items-center">
                        <div className="col-6 col-lg-7">
                          <label
                            htmlFor="password"
                            className="fs-9 fw-normal text-brand-rhythm mb-2"
                          >
                            Current Password
                          </label>
                          <p className="fw-normal text-primary-black mb-0">
                            •••••••••
                          </p>
                        </div>
                        <div className="col-6 col-lg-5">
                          <button className="fw-medium text-brand-united-nations border-0 bg-transparent">
                            Change Password
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </Layout>
  );
};

export default Profile;
