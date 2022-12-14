import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import PropertyDetailCard from './PropertyDetailCard';
import Layout from '../../components/templates/Layout';

const PropertyDetail = () => {
  const history = useHistory();
  const { propertyList, url, isFullHeight } = history.location.state;

  return (
    <Layout title="Property Management">
      <main className="detail-property-content">
        <div className="row gap-3 gap-md-0 section-1">
          <div className="col-12 col-md-8 order-1 order-md-0">
            <h3 className="fw-semibold property-detail-title">
              Property Detail
            </h3>
          </div>
          <div className="col-12 col-md-4 d-md-flex align-items-center justify-content-end">
            <div className="d-flex gap-3">
              <Link
                to={{
                  pathname: `${url}`,
                  state: {
                    propertyList,
                    isFullHeight,
                  },
                }}
                className="fs-9 btn py-2 p-3 btn-brand-celtic text-uppercase"
              >
                Back
              </Link>
            </div>
          </div>
        </div>
        <PropertyDetailCard />
      </main>
    </Layout>
  );
};

export default PropertyDetail;
