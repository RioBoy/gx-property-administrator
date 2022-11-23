import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { adminProfile } from '../lib/constant';
import { LS_AUTH } from '../config/localStorage';

import Layout from '../templates/Layout';

const DashboardPage = () => {
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(LS_AUTH);
    // axios({
    //   method: 'post',
    //   url: adminProfile,
    //   headers: { Authorization: `Bearer ${token}` },
    // })
    //   .then((response) => {
    //     setProfile(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    (async () => {
      const response = await axios({
        method: 'post',
        url: adminProfile,
        headers: { Authorization: `Bearer ${token}` },
      });

      const { results } = await response.data;
      setProfile(results.profile);
    })();
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading === true ? (
        <p className="d-flex justify-content-center align-items-center text-primary-orange fs-2 min-vh-100">
          Loding...
        </p>
      ) : (
        <Layout>
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
        </Layout>
      )}
    </>
  );
};

export default DashboardPage;
