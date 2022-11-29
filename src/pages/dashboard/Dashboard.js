import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { adminProfile } from '../../lib/constant';
import { LS_AUTH } from '../../config/localStorage';

import Layout from '../../components/templates/Layout';
import Spinner from '../../components/spinner/Spinner';

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
    <Layout title="Dashboard">
      <main className="h-100 dashboard-content">
        {isLoading === true ? (
          <Spinner height="h-100" />
        ) : (
          <>
            <h3 className="fw-normal">
              Welcome again,{' '}
              <span className="fw-semibold">{profile.nickName}!</span>
            </h3>
            <h6 className="fw-normal text-secondary-gray mt-3">
              Hi {profile.nickName}, don't forget to control every activity that
              exist
            </h6>
          </>
        )}
      </main>
    </Layout>
  );
};

export default Dashboard;
