import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Buttons } from '../../components/button/Buttons';

import Layout from '../../components/templates/Layout';
import ContactCard from './ContactCard';
import AddContact from './AddContact';
import EditContact from './EditContact';
import DetailContact from './DetailContact';

const Contact = () => {
  const { url, path } = useRouteMatch();

  return (
    <>
      <Switch>
        <Route path={`${path}/add`} component={AddContact} />
        <Route path={`${path}/edit/:id`} component={EditContact} />
        <Route path={`${path}/:id`} component={DetailContact} />
        <Route path={`${path}`}>
          <Layout title="Contact Management">
            <main className="h-100 contact-page-content">
              <div className="contact-list-content">
                <div className="row justify-content-between align-items-center gap-3 gap-md-0">
                  <div className="col-12 col-md-6 col-lg-8 col-xl-10">
                    <h5 className="fw-semibold">Manage Contact Management</h5>
                    <p className="fs-9 fw-normal text-secondary-gray mb-0">
                      Manage all contact management here
                    </p>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4 col-xl-2 d-flex justify-content-start justify-content-md-end">
                    <Buttons
                      className="text-decoration-none text-white py-2 px-4"
                      type="link"
                      isPrimary
                      href={`${url}/add`}
                    >
                      Add New
                    </Buttons>
                  </div>
                </div>
                <div className="row">
                  <ContactCard />
                </div>
              </div>
            </main>
          </Layout>
        </Route>
      </Switch>
    </>
  );
};

export default Contact;
