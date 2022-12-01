import React, { useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Dropdown, Modal, Button } from 'react-bootstrap';
import { FiFilter } from 'react-icons/fi';

import Layout from '../../components/templates/Layout';
import DetailProperty from '../property/DetailProperty';
import PropertyTable from './PropertyTable';

const Property = () => {
  const [show, setShow] = useState(false);
  const { path } = useRouteMatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Switch>
      <Route path={`${path}/:id`} component={DetailProperty} />
      <Route path={path}>
        <Layout title="Property Management">
          <main className="h-100 property-content py-4">
            <div className="property-page-content">
              <h5 className="fs-8 fw-medium p-2">Property List</h5>
              <div className="main-content">
                <div className="row mb-3">
                  <div className="col-12 col-md-10 col-lg-8 col-xl-4">
                    <div className="row gap-3 gap-md-0">
                      <div className="col-12 col-md-6 px-2">
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="transparent"
                            id="dropdown-basic"
                            className="fs-9 fw-medium"
                          >
                            Filter Status
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">
                              All Status
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-2">
                              Pending
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-3">
                              Approved
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-3">
                              Publish
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-3">
                              Draft
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-3">
                              Cancel
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-3">
                              On Sale
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-3">
                              Not Completed Yet
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-3">
                              Sold Out
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-3">
                              Rejected
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-3">
                              Rented
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <div className="col-12 col-md-6 px-2">
                        <Button
                          variant="transparent"
                          onClick={handleShow}
                          className="fs-9 fw-medium filter-property"
                        >
                          <FiFilter size="24" />
                          Advance Filter
                        </Button>

                        <Modal
                          size="md"
                          aria-labelledby="contained-modal-title-vcenter"
                          centered
                          show={show}
                          onHide={handleClose}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title
                              id="contained-modal-title-vcenter"
                              className="h5 fw-semibold"
                            >
                              Advance Search
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <div className="row">
                              <div className="col-4">
                                <Dropdown className="border">
                                  <Dropdown.Toggle
                                    variant="transparent"
                                    id="dropdown-basic"
                                    className="fs-9 fw-medium"
                                  >
                                    Filter Status
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">
                                      All Status
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">
                                      Pending
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">
                                      Approved
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">
                                      Publish
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">
                                      Draft
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">
                                      Cancel
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">
                                      On Sale
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">
                                      Not Completed Yet
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">
                                      Sold Out
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">
                                      Rejected
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">
                                      Rented
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </div>
                            </div>
                          </Modal.Body>
                          <Modal.Footer className="justify-content-start">
                            <Button variant="secondary" onClick={handleClose}>
                              Cancel
                            </Button>
                            <Button variant="primary" onClick={handleClose}>
                              Apply Search
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                    </div>
                  </div>
                </div>
                <PropertyTable />
              </div>
            </div>
          </main>
        </Layout>
      </Route>
    </Switch>
  );
};

export default Property;
