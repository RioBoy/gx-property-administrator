import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { adminProfile } from '../../lib/constant';
import { LS_AUTH } from '../../config/localStorage';

import Layout from '../../components/templates/Layout';

const Dashboard = () => {
  const [profile, setProfile] = useState({});
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
    <>
      <Layout>
        {isLoading === true ? (
          <div className="d-flex justify-content-center align-items-center h-100">
            <div class="spinner-border text-primary-orange" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <main className="h-100 dashboard-content">
            <h3 className="text-4xl fw-normal">
              Welcome again,{' '}
              <span className="fw-semibold">{profile.nickName}!</span>
            </h3>
            <h6 className="text-base fw-normal font-secondary mt-3">
              Hi {profile.nickName}, don't forget to control every activity that
              exist
            </h6>
          </main>
        )}
      </Layout>
    </>
  );
};

export default Dashboard;
