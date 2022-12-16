import React from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import * as path from '../../routes/path';

import PropertyDetailCard from './PropertyDetailCard';
import Layout from '../../components/templates/Layout';

const PropertyDetail = () => {
  const history = useHistory();
  if (
    !history.location.state?.propertyList ||
    history.location.state?.propertyList === undefined
  ) {
    return (
      <Redirect
        push
        to={{
          pathname: path.URLProperty,
          state: {
            message: 'Property not found',
          },
        }}
      />
    );
  }

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
                  pathname: `${history.location.state?.url}`,
                  state: {
                    propertyList: history.location.state?.propertyList,
                    isFullHeight: history.location.state?.isFullHeight,
                    selectedOption: history.location.state?.selectedOption,
                    advanceFilterStatus:
                      history.location.state?.advanceFilterStatus,
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
