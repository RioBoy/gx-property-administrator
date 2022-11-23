import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAllProperty } from '../../lib/constant';
import { Dropdown, Modal, Button } from 'react-bootstrap';
import { FiFilter } from 'react-icons/fi';
import { LS_AUTH } from '../../config/localStorage';

import Layout from '../../components/templates/Layout';
import PropertyTable from './PropertyTable';

const Property = () => {
  const [show, setShow] = useState(false);
  const [propertyList, setPropertyList] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const token = localStorage.getItem(LS_AUTH);
    setIsLoading(true);
    axios({
      method: 'get',
      url: getAllProperty,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        const { results } = response.data;
        setPropertyList(results);
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
      {isLoading === true ? (
        <p className="d-flex justify-content-center align-items-center text-primary-orange fs-2 min-vh-100">
          Loding...
        </p>
      ) : (
        <Layout>
          <main className="h-100 property-content py-4">
            <div className="property-page-content">
              <h5 className="fs-7 fw-medium p-2">Property List</h5>
              <div className="main-content">
                <div className="row mb-3">
                  <div className="col-12 col-md-10 col-lg-8 col-xl-5">
                    <div className="row gap-3 gap-md-0">
                      <div className="col-12 col-md-6">
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="transparent"
                            id="dropdown-basic"
                            className="text-sm font-medium"
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
                      <div className="col-12 col-md-6">
                        <Button
                          variant="transparent"
                          onClick={handleShow}
                          className="text-sm font-medium filter-property"
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
                                    className="text-sm font-medium"
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
                <PropertyTable propertyList={propertyList} />
              </div>
            </div>
          </main>
        </Layout>
      )}
    </>
  );
};

export default Property;
