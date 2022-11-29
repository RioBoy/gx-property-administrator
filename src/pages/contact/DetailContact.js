import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Buttons } from '../../components/button/Buttons';
import Spinner from '../../components/spinner/Spinner';
import IdentityFile from '../../assets/images/identityFile.jpg';

import Layout from '../../components/templates/Layout';
import { getAllContacts } from '../../lib/constant';

const DetailContact = () => {
  const history = useHistory();
  const idContact = +history.location.pathname.split('/')[2];

  const [dataContact, setDataContact] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios({
      method: 'get',
      url: getAllContacts,
    })
      .then((response) => {
        const { results } = response.data;
        setDataContact(results);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredContactById = dataContact.contacts?.filter(
    (contact) => contact?.id === idContact,
  )?.[0];

  return (
    <Layout title="Contact Management">
      <main className="h-100 contact-detail-content">
        <div className="row gap-3 gap-md-0">
          <div className="col-12 col-md-6 order-1 order-md-0">
            <h3 className="fw-semibold text-black-primary">Contact Detail</h3>
          </div>
          <div className="col-12 col-md-6 d-md-flex align-items-center justify-content-end">
            <div className="d-flex gap-3">
              <Buttons
                type="link"
                href="/contact"
                className="fs-9 fw-semibold px-3 py-2 btn btn-secondary-green text-white"
              >
                Back
              </Buttons>
              <Buttons
                type="link"
                href="/"
                className="fs-9 fw-semibold px-3 py-2 btn btn-primary-blue text-white"
              >
                Edit
              </Buttons>
              <Buttons
                type="link"
                href="/"
                className="fs-9 fw-semibold px-3 py-2 btn btn-secondary-red text-white"
              >
                Delete
              </Buttons>
            </div>
          </div>
        </div>
        {isLoading === true ? (
          <Spinner height="min-vh-50" />
        ) : (
          <>
            <div className="row contact-detail-role">
              <div className="col">
                <div className="card">
                  <div className="row">
                    <div className="col-12 col-md-9">
                      <h4 className="fs-7 fw-semibold mb-0">
                        {filteredContactById?.name}
                      </h4>
                      <p className="fw-normal text-secondary-gray mb-0">
                        {filteredContactById?.email}
                      </p>
                    </div>
                    <div className="col-12 col-md-3 d-md-flex align-items-center justify-content-center">
                      <span className="badge text-bg-third-green fs-10 fw-semibold text-white py-2 px-5 rounded-3">
                        {filteredContactById?.type.display}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row contact-full-detail mt-4">
              <div className="col-12 col-lg-6 personal-data mt-3">
                <div className="row">
                  <div className="col">
                    <div className="card border-0 bg-white rounded-2 p-3 mb-0">
                      <h5 className="fs-8 font-medium text-secondary-black mb-4">
                        Personal Data
                      </h5>
                      <div className="mb-3">
                        <label
                          htmlFor="fullname"
                          className="fs-9 fw-normal text-secondary-gray mb-2"
                        >
                          Full Name
                        </label>
                        <p className="fw-normal text-primary-black">
                          {filteredContactById?.name}
                        </p>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="statuSalutation"
                          className="fs-9 fw-normal text-secondary-gray mb-2"
                        >
                          Status Salutation
                        </label>
                        <p className="fw-normal text-primary-black">
                          {filteredContactById?.salutation}
                        </p>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="phoneNumber"
                          className="fs-9 fw-normal text-secondary-gray mb-2"
                        >
                          Phone Number
                        </label>
                        <p className="fw-normal text-primary-black">
                          {filteredContactById?.phoneNumber === null
                            ? '-'
                            : filteredContactById?.phoneNumber}
                        </p>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="identityNumber"
                          className="fs-9 fw-normal text-secondary-gray mb-2"
                        >
                          Identity Number
                        </label>
                        <p className="fw-normal text-primary-black">
                          {filteredContactById?.identityNumber}
                        </p>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="identityNumberFile"
                          className="fs-9 fw-normal text-secondary-gray mb-2"
                        >
                          Identity Number File
                        </label>
                        <img
                          src={IdentityFile}
                          alt="Identity File"
                          className="h-100 w-100"
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="address"
                          className="fs-9 fw-normal text-secondary-gray mb-2"
                        >
                          Address
                        </label>
                        <p className="fw-normal text-primary-black">
                          Jl. Gunung Sanghyang No. 83, Kerobokan Kaja, Denpasar
                          Barat, Denpasar Kota, Bali
                        </p>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="createdBy"
                          className="fs-9 fw-normal text-secondary-gray mb-2"
                        >
                          Created By
                        </label>
                        <p className="fw-normal text-primary-black">
                          {filteredContactById?.createdBy === null
                            ? '-'
                            : filteredContactById?.createdBy.name}
                        </p>
                        <p className="mb-0 mt-2 fs-10">
                          {filteredContactById?.createdAt}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col contact-company-detail">
                    <div className="card border-0 bg-white rounded-2 p-3 mb-0">
                      <h5 className="fs-8 font-medium text-secondary-black mb-4">
                        Company Data
                      </h5>
                      <div className="mb-3">
                        <label
                          htmlFor="companyName"
                          className="fs-9 fw-normal text-secondary-gray mb-2"
                        >
                          Company Name
                        </label>
                        <p className="fw-normal text-primary-black">
                          {filteredContactById?.companyName === null
                            ? '-'
                            : filteredContactById?.companyName}
                        </p>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="companyName"
                          className="fs-9 fw-normal text-secondary-gray mb-2"
                        >
                          Company Tax Number
                        </label>
                        <p className="fw-normal text-primary-black">
                          {filteredContactById?.companyNPWP === null
                            ? '-'
                            : filteredContactById?.companyNPWP}
                        </p>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="companyName"
                          className="fs-9 fw-normal text-secondary-gray mb-2"
                        >
                          Company Address
                        </label>
                        <p className="fw-normal text-primary-black">
                          {filteredContactById?.companyAddress === null
                            ? '-'
                            : filteredContactById?.companyAddress}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6 mt-3">
                <div className="row other-data">
                  <div className="col">
                    <div className="card border-0 bg-white rounded-2 p-3 mb-0">
                      <h5 className="fs-8 font-medium text-secondary-black mb-4">
                        Other Data
                      </h5>
                      <div className="mb-3">
                        <label
                          htmlFor="taxNumber"
                          className="fs-9 fw-normal text-secondary-gray mb-2"
                        >
                          Owner tax number
                        </label>
                        <p className="fw-normal text-primary-black">
                          {filteredContactById?.ownerTaxNumber.display}
                        </p>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="contactPreferences"
                          className="fs-9 fw-normal text-secondary-gray mb-2"
                        >
                          Contact Preferences
                        </label>
                        {filteredContactById?.contactPreferences.length > 1 ? (
                          filteredContactById?.contactPreferences.map(
                            (contact, i) => (
                              <p
                                className="fw-normal text-primary-black mb-0"
                                key={i}
                              >
                                {contact.display}
                              </p>
                            ),
                          )
                        ) : (
                          <p className="fw-normal text-primary-black">
                            {filteredContactById?.contactPreferences[0].display}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="originContact"
                          className="fs-9 fw-normal text-secondary-gray mb-2"
                        >
                          Origin Contacts
                        </label>
                        {filteredContactById?.originContacts.length > 1 ? (
                          filteredContactById?.originContacts.map(
                            (origin, i) => (
                              <p
                                className="fw-normal text-primary-black mb-0"
                                key={i}
                              >
                                {origin.display}
                              </p>
                            ),
                          )
                        ) : (
                          <p className="fw-normal text-primary-black">
                            {filteredContactById?.originContacts[0].display}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="associateTo"
                          className="fs-9 fw-normal text-secondary-gray mb-2"
                        >
                          Associate To
                        </label>
                        <p className="fw-normal text-primary-black">
                          {filteredContactById?.associateTo === null
                            ? '-'
                            : filteredContactById?.associateTo}
                        </p>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="email"
                          className="fs-9 fw-normal text-secondary-gray mb-2"
                        >
                          Commission
                        </label>
                        <p className="fw-normal text-primary-black">
                          {filteredContactById?.commission}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-4 contact-account">
                  <div className="col">
                    <div className="card border-0 bg-white rounded-2 p-3 mb-0">
                      <h5 className="fs-8 font-medium text-secondary-black mb-4">
                        Contact Account
                      </h5>
                      <div className="mb-3">
                        <label
                          htmlFor="contactType"
                          className="fs-9 fw-normal text-secondary-gray mb-2"
                        >
                          Contact Type
                        </label>
                        <p className="fw-normal text-primary-black">
                          {filteredContactById?.type.display}
                        </p>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="email"
                          className="fs-9 fw-normal text-secondary-gray mb-2"
                        >
                          Email Address
                        </label>
                        <p className="fw-normal text-primary-black">
                          {filteredContactById?.email}
                        </p>
                      </div>
                      <div className="mb-3">
                        <div className="row align-items-center">
                          <div className="col-6 col-lg-7">
                            <label
                              htmlFor="password"
                              className="fs-9 fw-normal text-secondary-gray mb-2"
                            >
                              Current Password
                            </label>
                            <p className="fw-normal text-primary-black">
                              •••••••••
                            </p>
                          </div>
                          <div className="col-6 col-lg-5 d-flex justify-content-end">
                            <button className="fw-medium text-primary-blue border-0 bg-transparent">
                              Change Password
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </Layout>
  );
};

export default DetailContact;
