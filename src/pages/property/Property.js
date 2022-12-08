import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Route, Switch, useRouteMatch, useHistory } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { FiFilter } from 'react-icons/fi';
import { filterPropertyByStatus, getAllProperty } from '../../lib/constant';
import { LS_AUTH } from '../../config/localStorage';

import Layout from '../../components/templates/Layout';
import { Buttons } from '../../components/button/Buttons';
import DetailProperty from '../property/DetailProperty';
import PropertyTable from './PropertyTable';

const Property = () => {
  const [show, setShow] = useState(false);
  const { path, url } = useRouteMatch();
  const [propertyList, setPropertyList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmptyFiltered, setIsEmptyFiltered] = useState(false);
  const [isFullHeight, setIsFullHeight] = useState(false);
  const history = useHistory();
  const token = localStorage.getItem(LS_AUTH);

  const objectData = (label, value) => {
    return {
      label,
      value,
    };
  };

  const statusList = [
    objectData('All Status', ''),
    objectData('Pending', 'pending'),
    objectData('Approved', 'approved'),
    objectData('Publish', 'publish'),
    objectData('Draft', 'draft'),
    objectData('Cancel', 'cancel'),
    objectData('On Sale', 'sale'),
    objectData('Not Completed Yet', 'uncompleted'),
    objectData('Sold Out', 'sold'),
    objectData('Rejected', 'rejected'),
    objectData('Rented', 'rented'),
  ];
  const [selectedOption, setSelectedOption] = useState(statusList[0].value);

  const _handleClose = () => setShow(false);
  const _handleShow = () => setShow(true);

  const _handleOnSelectChange = (e) => {
    setSelectedOption(e.target.value);
    setIsLoading(true);
    axios({
      method: 'get',
      url: filterPropertyByStatus(1, e.target.value),
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        const { results } = response.data;
        if (results.properties.length <= 0) {
          setIsEmptyFiltered(true);
          setIsFullHeight(true);
          setPropertyList([]);
        } else if (results.properties.length <= 1) {
          setIsEmptyFiltered(false);
          setIsFullHeight(true);
          setPropertyList(results.properties);
        } else if (results.properties.length > 1) {
          setIsEmptyFiltered(false);
          setIsFullHeight(false);
          setPropertyList(results.properties);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const _handleOnSelectChangeAdvance = (e) => {
    console.log(e);
  };

  const _handleToDetail = (id, latitude, longitude) => {
    history.push({
      pathname: `${url}/${id}`,
      state: {
        propertyId: id,
        propertyList,
        url,
        latitude,
        longitude,
      },
    });
  };

  const dataFromDetail = history.location.state?.propertyList;

  const _getDataProperties = useCallback(() => {
    if (!dataFromDetail) {
      const token = localStorage.getItem(LS_AUTH);
      setIsLoading(true);
      axios({
        method: 'get',
        url: getAllProperty,
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          const { results } = response.data;
          setPropertyList(results.properties);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setPropertyList(dataFromDetail);
    }
  }, [dataFromDetail]);

  useEffect(() => {
    _getDataProperties();
  }, [_getDataProperties]);

  return (
    <Switch>
      <Route path={`${path}/:id`} component={DetailProperty} />
      <Route path={path}>
        <Layout title="Property Management">
          <main
            className={[
              'property-content py-4',
              isFullHeight ? 'min-vh-100' : '',
            ].join(' ')}
          >
            <div className="property-page-content">
              <h5 className="fs-8 fw-medium p-2">Property List</h5>
              <div className="main-content">
                <div className="row mb-3">
                  <div className="col-12 col-md-10 col-lg-8 col-xl-4">
                    <div className="row gap-3 gap-md-0">
                      <div className="col-12 col-md-6 px-2">
                        <select
                          onChange={_handleOnSelectChange}
                          value={selectedOption}
                          name="filterStatus"
                          className="fs-9 fw-medium form-select filter-status"
                          id="filterStatus"
                        >
                          {statusList.map((status, index) => (
                            <option value={status.value} key={index}>
                              {status.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-12 col-md-6 px-2">
                        <Button
                          variant="transparent"
                          onClick={_handleShow}
                          className="fs-9 fw-medium filter-property"
                        >
                          <FiFilter size="24" />
                          Advance Filter
                        </Button>
                        <Modal
                          size="lg"
                          aria-labelledby="contained-modal-title-vcenter"
                          centered
                          show={show}
                          onHide={_handleClose}
                          className="border-0 modal-advance-filter"
                        >
                          <Modal.Header closeButton className="border-bottom-0">
                            <Modal.Title
                              id="contained-modal-title-vcenter"
                              className="h5 fw-semibold text-secondary-black"
                            >
                              Advance Search
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <div className="row mb-3">
                              <div className="col-4">
                                <label
                                  htmlFor="advancedFilterStatus"
                                  className="fs-9 fw-medium col-form-label"
                                >
                                  Status
                                </label>
                                <select
                                  onChange={_handleOnSelectChangeAdvance}
                                  value={selectedOption}
                                  name="advancedFilterStatus"
                                  className="fs-9 fw-medium form-select filter-status"
                                  id="advancedFilterStatus"
                                >
                                  {statusList.map((status, index) => (
                                    <option value={status.value} key={index}>
                                      {status.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="col-4">
                                <label
                                  htmlFor="advancedPropertyOwnerType"
                                  className="fs-9 fw-medium col-form-label"
                                >
                                  Property Owner Type
                                </label>
                                <select
                                  name="advancedPropertyOwnerType"
                                  className="fs-9 fw-medium form-select filter-status"
                                  id="advancedPropertyOwnerType"
                                >
                                  <option value="">Select Option</option>
                                </select>
                              </div>
                              <div className="col-4">
                                <label
                                  htmlFor="advancedPropertyType"
                                  className="fs-9 fw-medium col-form-label"
                                >
                                  Property Type
                                </label>
                                <select
                                  name="advancedPropertyType"
                                  className="fs-9 fw-medium form-select filter-status"
                                  id="advancedPropertyType"
                                >
                                  <option value="">Select Option</option>
                                </select>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-4">
                                <label
                                  htmlFor="advancedPropertyReferences"
                                  className="fs-9 fw-medium col-form-label"
                                >
                                  Property References
                                </label>
                                <input
                                  name="advancedPropertyReferences"
                                  type="text"
                                  id="advancedPropertyReferences"
                                  className="form-control rounded-2"
                                  placeholder="e.g VL0001"
                                />
                              </div>
                              <div className="col-4">
                                <label
                                  htmlFor="advancedContact"
                                  className="fs-9 fw-medium col-form-label"
                                >
                                  Contact
                                </label>
                                <input
                                  name="advancedContact"
                                  type="text"
                                  id="advancedContact"
                                  className="form-control rounded-2"
                                  placeholder="e.g Jhon Doe"
                                />
                              </div>
                              <div className="col-4">
                                <label
                                  htmlFor="advancedContactType"
                                  className="fs-9 fw-medium col-form-label"
                                >
                                  Contact Type
                                </label>
                                <select
                                  name="advancedContactType"
                                  className="fs-9 fw-medium form-select filter-status"
                                  id="advancedContactType"
                                >
                                  <option value="">Select Option</option>
                                </select>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-4">
                                <label
                                  htmlFor="advancedEntriesBy"
                                  className="fs-9 fw-medium col-form-label"
                                >
                                  Entries By
                                </label>
                                <input
                                  name="advancedEntriesBy"
                                  type="text"
                                  id="advancedEntriesBy"
                                  className="form-control rounded-2"
                                  placeholder="e.g Selena Doe"
                                />
                              </div>
                            </div>
                          </Modal.Body>
                          <Modal.Footer className="justify-content-start border-top-0">
                            <Buttons
                              type="button"
                              className="btn btn-bg-white border text-primary-black fw-medium py-2"
                              onClick={_handleClose}
                            >
                              Cancel
                            </Buttons>
                            <Buttons
                              type="button"
                              isPrimary
                              isMedium
                              className="p-2 text-white"
                              onClick={_handleClose}
                            >
                              Apply Search
                            </Buttons>
                          </Modal.Footer>
                        </Modal>
                      </div>
                    </div>
                  </div>
                </div>
                <PropertyTable
                  isLoading={isLoading}
                  _handleToDetail={_handleToDetail}
                  propertyList={propertyList}
                  isEmptyFilter={isEmptyFiltered}
                  isFullHeight={isFullHeight}
                />
              </div>
            </div>
          </main>
        </Layout>
      </Route>
    </Switch>
  );
};

export default Property;
