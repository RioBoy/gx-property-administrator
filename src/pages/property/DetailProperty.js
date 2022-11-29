import React from 'react';
import { Buttons } from '../../components/button/Buttons';

import DetailPropertyCard from './DetailPropertyCard';
import Layout from '../../components/templates/Layout';

const DetailProperty = () => {
  return (
    <Layout title="Property Management">
      <main className="h-100 detail-property-content">
        <div className="row gap-3 gap-md-0 section-1">
          <div className="col-12 col-md-8 order-1 order-md-0">
            <h3 className="fw-semibold property-detail-title">
              Property Detail
            </h3>
          </div>
          <div className="col-12 col-md-4 d-md-flex align-items-center justify-content-end">
            <div className="d-flex gap-3">
              <Buttons
                type="link"
                href="/property"
                className="fs-9 btn py-2 p-3 btn-primary-blue text-uppercase"
              >
                Back
              </Buttons>
            </div>
          </div>
        </div>
        <DetailPropertyCard />
      </main>
    </Layout>
  );
};

export default DetailProperty;
