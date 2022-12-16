import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { FiFilter } from 'react-icons/fi';
import { toast } from 'react-toastify';
import {
  filterPropertyByStatus,
  getAllProperty,
  filterAdvanceProperty,
} from '../../lib/constant';
import { LS_AUTH } from '../../config/localStorage';
import * as path from '../../routes/path';

import Layout from '../../components/templates/Layout';
import { Buttons } from '../../components/button/Buttons';
import PropertyTable from './PropertyTable';
import { useCancelToken } from '../../config/useCancelToken';

const Property = () => {
  const [show, setShow] = useState(false);
  const [propertyList, setPropertyList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmptyFiltered, setIsEmptyFiltered] = useState(false);
  const history = useHistory();
  const [isFullHeight, setIsFullHeight] = useState(
    history.location.state?.isFullHeight || false,
  );
  const token = localStorage.getItem(LS_AUTH);

  const objectData = (label, value) => {
    return {
      label,
      value,
    };
  };

  const statusList = useMemo(() => {
    return [
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
  }, []);

  const [advanceFilterStatus, setAdvanceFilterStatus] = useState({
    page: 1, //default
    status:
      history.location.state?.advanceFilterStatus?.status ||
      statusList[0].value,
    ownershipStatus:
      history.location.state?.advanceFilterStatus?.ownershipStatus || '',
    type: history.location.state?.advanceFilterStatus?.type || '',
    number: history.location.state?.advanceFilterStatus?.number || '',
    contact: history.location.state?.advanceFilterStatus?.contact || '',
    contactType: history.location.state?.advanceFilterStatus?.contactType || '',
    createdBy: history.location.state?.advanceFilterStatus?.createdBy || '',
  });

  const [selectedOption, setSelectedOption] = useState(
    history.location.state?.selectedOption || statusList[0].value,
  );

  const ownershipStatusList = [
    objectData('Leasehold', 'leasehold'),
    objectData('Freehold', 'freehold'),
    objectData('Yearly Rental', 'yearly_rental'),
  ];

  const propertyTypeList = [
    objectData('Villa', 'villa'),
    objectData('Land', 'land'),
  ];

  const contactTypeList = [
    objectData('Testing', 'Test'),
    objectData('Coba', 'Coba'),
    objectData('Coba Saja', 'Cobasaja'),
  ];

  const _handleClose = () => setShow(false);
  const _handleShow = () => setShow(true);

  const _handleOnSelectChange = (e) => {
    setSelectedOption(e.target.value);
    setIsLoading(true);
    setPropertyList([]);
    axios({
      method: 'get',
      url: filterPropertyByStatus(1, e.target.value),
      headers: { Authorization: `Bearer ${token}` },
      ...useCancelToken('canceled-request'),
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
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const _handleOnChange = (event) => {
    setAdvanceFilterStatus((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const _handleSubmitAdvanceFilter = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setPropertyList([]);
    setShow(false);
    axios({
      method: 'get',
      url: filterAdvanceProperty(
        1,
        advanceFilterStatus.status,
        advanceFilterStatus.ownershipStatus,
        advanceFilterStatus.type,
        advanceFilterStatus.number,
        advanceFilterStatus.contact,
        advanceFilterStatus.contactType,
        advanceFilterStatus.createdBy,
      ),
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        const { results } = response.data;
        if (results.properties.length <= 0) {
          setIsEmptyFiltered(true);
          setIsFullHeight(true);
          setSelectedOption(advanceFilterStatus.status);
        } else if (results.properties.length <= 7) {
          setIsEmptyFiltered(false);
          setIsFullHeight(true);
          setSelectedOption(advanceFilterStatus.status);
          setPropertyList(results.properties);
        } else if (results.properties.length > 7) {
          setIsEmptyFiltered(false);
          setIsFullHeight(false);
          setSelectedOption(advanceFilterStatus.status);
          setPropertyList(results.properties);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const _handleToDetail = (id, latitude, longitude) => {
    history.push({
      pathname: `${path.URLPropertyDetail(id)}`,
      state: {
        propertyId: id,
        propertyList,
        url: path.URLProperty,
        latitude,
        longitude,
        isFullHeight,
        selectedOption,
        advanceFilterStatus,
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
    if (history.location.state?.message) {
      toast(history.location.state?.message, {
        autoClose: 3000,
      });
    }
    _getDataProperties();
  }, [_getDataProperties, history.location.state]);

  return (
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
                <div className="row gap-3 gap-md-0 flex-wrap flex-md-nowrap">
                  <div className="col-12 col-md-4 col-lg-auto px-2">
                    <select
                      onChange={_handleOnSelectChange}
                      value={selectedOption}
                      name="filterStatus"
                      className="fs-9 fw-medium form-select h-100"
                      id="filterStatus"
                    >
                      {statusList.map((status, index) => (
                        <option value={status.value} key={index}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-12 col-md-4 col-lg-auto px-2">
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
                      <form onSubmit={_handleSubmitAdvanceFilter}>
                        <Modal.Header closeButton className="border-bottom-0">
                          <Modal.Title
                            id="contained-modal-title-vcenter"
                            className="h5 fw-semibold text-brand-space-cadet"
                          >
                            Advance Search
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <div className="row mb-0 mb-lg-3">
                            <div className="col-12 col-lg-4 mb-2 mb-lg-0">
                              <label
                                htmlFor="status"
                                className="fs-9 fw-medium col-form-label"
                              >
                                Status
                              </label>
                              <select
                                onChange={_handleOnChange}
                                value={advanceFilterStatus.status}
                                name="status"
                                className="fs-9 fw-medium form-select filter-status"
                                id="status"
                              >
                                {statusList.map((status) => (
                                  <option
                                    value={status.value}
                                    key={status.value}
                                  >
                                    {status.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="col-12 col-lg-4 mb-2 mb-lg-0">
                              <label
                                htmlFor="ownershipStatus"
                                className="fs-9 fw-medium col-form-label"
                              >
                                Property Owner Type
                              </label>
                              <select
                                onChange={_handleOnChange}
                                value={advanceFilterStatus.ownershipStatus}
                                name="ownershipStatus"
                                className="fs-9 fw-medium form-select filter-status"
                                id="ownershipStatus"
                              >
                                <option value="">Select Option</option>
                                {ownershipStatusList.map((owenership) => (
                                  <option
                                    value={owenership.value}
                                    key={owenership.value}
                                  >
                                    {owenership.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="col-12 col-lg-4 mb-2 mb-lg-0">
                              <label
                                htmlFor="type"
                                className="fs-9 fw-medium col-form-label"
                              >
                                Property Type
                              </label>
                              <select
                                onChange={_handleOnChange}
                                value={advanceFilterStatus.type}
                                name="type"
                                className="fs-9 fw-medium form-select filter-status"
                                id="type"
                              >
                                <option value="">Select Option</option>
                                {propertyTypeList.map((propertyType) => (
                                  <option
                                    value={propertyType.value}
                                    key={propertyType.value}
                                  >
                                    {propertyType.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="row mb-0 mb-lg-3">
                            <div className="col-12 col-lg-4 mb-2 mb-lg-0">
                              <label
                                htmlFor="number"
                                className="fs-9 fw-medium col-form-label"
                              >
                                Property References
                              </label>
                              <input
                                onChange={_handleOnChange}
                                value={advanceFilterStatus.number}
                                name="number"
                                type="text"
                                id="number"
                                className="form-control rounded-2"
                                placeholder="e.g VL0001"
                              />
                            </div>
                            <div className="col-12 col-lg-4 mb-2 mb-lg-0">
                              <label
                                htmlFor="contact"
                                className="fs-9 fw-medium col-form-label"
                              >
                                Contact
                              </label>
                              <input
                                onChange={_handleOnChange}
                                value={advanceFilterStatus.contact}
                                name="contact"
                                type="text"
                                id="contact"
                                className="form-control rounded-2"
                                placeholder="e.g Jhon Doe"
                              />
                            </div>
                            <div className="col-12 col-lg-4 mb-2 mb-lg-0">
                              <label
                                htmlFor="contactType"
                                className="fs-9 fw-medium col-form-label"
                              >
                                Contact Type
                              </label>
                              <select
                                onChange={_handleOnChange}
                                value={advanceFilterStatus.contactType}
                                name="contactType"
                                className="fs-9 fw-medium form-select filter-status"
                                id="contactType"
                              >
                                <option value="">Select Option</option>
                                {contactTypeList.map((contactType) => (
                                  <option
                                    value={contactType.value}
                                    key={contactType.value}
                                  >
                                    {contactType.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="row mb-0 mb-lg-3">
                            <div className="col-12 col-lg-4">
                              <label
                                htmlFor="createdBy"
                                className="fs-9 fw-medium col-form-label"
                              >
                                Entries By
                              </label>
                              <input
                                onChange={_handleOnChange}
                                value={advanceFilterStatus.createdBy}
                                name="createdBy"
                                type="text"
                                id="createdBy"
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
                            type="submit"
                            isPrimary
                            isMedium
                            className="p-2 text-white"
                          >
                            Apply Search
                          </Buttons>
                        </Modal.Footer>
                      </form>
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
  );
};

export default Property;
