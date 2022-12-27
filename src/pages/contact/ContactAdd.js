import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { addNewContact } from '../../lib/constant';
import { MdOutlinePhotoSizeSelectActual } from 'react-icons/md';
import { withAuth } from '../../context/Auth';
import * as path from '../../routes/path';

import Spinner from '../../components/spinner/Spinner';
import { Buttons } from '../../components/button/Buttons';
import Layout from '../../components/templates/Layout';

const ContactAdd = ({ isDarkMode }) => {
  const history = useHistory();
  const [addContact, setAddContact] = useState({
    name: '',
    salutation: '',
    email: '',
    password: '', // empty
    type: '',
    language: 'in', // default
    country: '',
    residence: '',
    phoneNumber: '',
    contactPreferences: [],
    ownerTaxNumber: '',
    NPWP: '',
    identityNumber: '',
    identityPhoto: '',
    originContacts: [],
    associateTo: '',
    commission: 15, // default
    companyName: '',
    companyNPWP: '',
    companyAddress: '',
    other: 'coba', // default
  });
  const fileRef = useRef(null);
  const [file, setFile] = useState('');
  const [filePreview, setFilePreview] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isError, setIsError] = useState('');
  const [isRadio, setIsRadio] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const _handleOnChange = (event) => {
    setAddContact((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const _handleImageUpload = (event) => {
    const fileUpload = event.target.files[0];
    setFile(fileUpload);
    setFilePreview(URL.createObjectURL(fileUpload));
  };

  const _handleMultipleValue = (value, action) => {
    setAddContact((state) => ({
      ...state,
      [action.name]: value,
    }));
  };

  const _handleIsChecked = () => {
    if (isChecked || isRadio === 'yes') {
      setAddContact((state) => ({
        ...state,
        companyName: '',
        companyNPWP: '',
        companyAddress: '',
      }));
    }
    setIsChecked((current) => !current);
  };

  const _handleRadioChange = (event) => {
    if (isRadio !== 'yes' || addContact.ownerTaxNumber !== 'yes') {
      setAddContact((state) => ({
        ...state,
        NPWP: '',
        associateTo: '',
        companyName: '',
        companyNPWP: '',
        companyAddress: '',
      }));
      setIsChecked(false);
    }
    setIsRadio(event.target.value);
  };

  const _handleSubmitContact = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios({
      method: 'post',
      url: addNewContact,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: {
        ...addContact,
        identityPhoto: file,
        originContacts: addContact.originContacts.map((origin) => origin.value),
        contactPreferences: addContact.contactPreferences.map(
          (preferences) => preferences.value,
        ),
        ownerTaxNumber: isRadio,
      },
    })
      .then((response) => {
        const { status, error, success } = response.data;
        if (status === 'error') {
          toast(error.msg, {
            autoClose: 3000,
            type: 'error',
          });
          setIsError((state) => ({
            ...state,
            errors: error?.validations ? error?.validations : [],
          }));
        } else {
          toast(success.msg, {
            autoClose: 3000,
            type: 'success',
          });
          history.push(path.URLContact);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const objectData = (id, value) => {
    return {
      id,
      value,
    };
  };

  const objectDataOption = (value, label) => {
    return {
      value,
      label,
    };
  };

  const salutationData = [
    objectData(1, 'Mr'),
    objectData(2, 'Mrs'),
    objectData(3, 'Ms'),
  ];

  const contactTypeData = [
    objectData('Test', 'Testing'),
    objectData('Coba', 'Coba'),
    objectData('Cobasaja', 'Coba Saja'),
  ];

  const countryData = [
    objectData('IN', 'India'),
    objectData('EN', 'English'),
    objectData('ID', 'Indonesia'),
  ];

  const contactPreferences = [
    objectDataOption('telephone', 'Telephone'),
    objectDataOption('email', 'Email'),
    objectDataOption('whatsapp', 'Whatsapp'),
  ];

  const originContacts = [
    objectDataOption('vbm_guest', 'VBM Guest'),
    objectDataOption('cari-cari', 'Cari-Cari'),
  ];

  const requiredParam = (name = '') =>
    isError !== ''
      ? isError?.errors.filter((value) => value.param === name)
      : '';

  return (
    <Layout title="Contact Management">
      <main className="h-auto add-contact-content">
        <form onSubmit={_handleSubmitContact} method="post">
          <section className="section-1">
            <div className="card bg-white border-0 rounded-2">
              <div className="card-header bg-white border-0 mb-2 py-3 px-3">
                <h5 className="fs-8 fw-medium text-brand-space-cadet mb-0">
                  Contact Account Information
                </h5>
              </div>
              <div className="card-body">
                <div className="row g-3 align-items-center">
                  <div className="col-12 col-lg-3 d-flex flex-row gap-2 align-items-center">
                    <label
                      htmlFor="name"
                      className="text-brand-yankees col-form-label fw-bold"
                    >
                      Fullname
                    </label>
                    <span className="fs-10 fw-normal text-brand-yankees badge text-bg-brand-anti-flash rounded-2 px-2">
                      Required
                    </span>
                  </div>
                  <div className="col-12 col-lg-9">
                    <input
                      onChange={_handleOnChange}
                      value={addContact.name}
                      name="name"
                      type="text"
                      id="name"
                      className="form-control rounded-2"
                      placeholder="Type fullname here"
                    />
                    {requiredParam('name').length > 0 &&
                    addContact.name === '' ? (
                      <span className="fs-9 text-brand-vivid d-block mt-2">
                        {requiredParam('name')[0]?.message}
                      </span>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="row g-3 align-items-center">
                  <div className="col-12 col-lg-3 d-flex flex-row gap-2 align-items-center">
                    <label
                      htmlFor="salutation"
                      className="text-brand-yankees col-form-label fw-bold"
                    >
                      Status Salutation
                    </label>
                    <span className="fs-10 fw-normal text-brand-yankees badge text-bg-brand-anti-flash rounded-2 px-2">
                      Required
                    </span>
                  </div>
                  <div className="col-12 col-lg-9">
                    <select
                      onChange={_handleOnChange}
                      value={addContact.salutation}
                      name="salutation"
                      className="form-select text-brand-yankees"
                      id="salutation"
                    >
                      <option value="">Select Status Salutation</option>
                      {salutationData.map((title) => (
                        <option value={title.value} key={title.id}>
                          {title.value}
                        </option>
                      ))}
                    </select>
                    {requiredParam('salutation').length > 0 &&
                    addContact.salutation === '' ? (
                      <span className="fs-9 text-brand-vivid d-block mt-2">
                        {requiredParam('salutation')[0]?.message}
                      </span>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="row g-3 align-items-center">
                  <div className="col-12 col-lg-3 d-flex flex-row gap-2 align-items-center">
                    <label
                      htmlFor="type"
                      className="text-brand-yankees col-form-label fw-bold"
                    >
                      Contact Type
                    </label>
                    <span className="fs-10 fw-normal text-brand-yankees badge text-bg-brand-anti-flash rounded-2 px-2">
                      Required
                    </span>
                  </div>
                  <div className="col-12 col-lg-9">
                    <select
                      onChange={_handleOnChange}
                      value={addContact.type}
                      name="type"
                      className="form-select text-brand-yankees"
                      id="type"
                    >
                      <option value="">Select Contact Type</option>
                      {contactTypeData.map((type) => (
                        <option value={type.id} key={type.id}>
                          {type.value}
                        </option>
                      ))}
                    </select>
                    {requiredParam('type').length > 0 &&
                    addContact.type === '' ? (
                      <span className="fs-9 text-brand-vivid d-block mt-2">
                        {requiredParam('type')[0]?.message}
                      </span>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="row g-3 align-items-center">
                  <div className="col-12 col-lg-3 d-flex flex-row gap-2 align-items-center">
                    <label
                      htmlFor="country"
                      className="text-brand-yankees col-form-label fw-bold"
                    >
                      Country
                    </label>
                  </div>
                  <div className="col-12 col-lg-9">
                    <select
                      onChange={_handleOnChange}
                      value={addContact.country}
                      name="country"
                      className="form-select text-brand-yankees"
                      id="country"
                    >
                      <option value="">Select Country</option>
                      {countryData.map((country) => (
                        <option value={country.id} key={country.id}>
                          {country.value}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row g-3 align-items-center">
                  <div className="col-12 col-lg-3 d-flex flex-row gap-2 align-items-center">
                    <label
                      htmlFor="residence"
                      className="text-brand-yankees col-form-label fw-bold"
                    >
                      Address
                    </label>
                  </div>
                  <div className="col-12 col-lg-9">
                    <textarea
                      onChange={_handleOnChange}
                      value={addContact.residence}
                      name="residence"
                      className="form-control"
                      id="residence"
                      rows="5"
                      placeholder="Type address here"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="section-2">
            <div className="card bg-white border-0 rounded-2">
              <div className="card-header bg-white border-0 mb-2 py-3 px-3">
                <h5 className="fs-8 fw-medium text-brand-space-cadet mb-0">
                  Contact Information
                </h5>
              </div>
              <div className="card-body">
                <div className="row g-3 align-items-center">
                  <div className="col-12 col-lg-3 d-flex flex-row gap-2 align-items-center">
                    <label
                      htmlFor="identityNumber"
                      className="text-brand-yankees col-form-label fw-bold"
                    >
                      Identity Number
                    </label>
                    <span className="fs-10 fw-normal text-brand-yankees badge text-bg-brand-anti-flash rounded-2 px-2">
                      Required
                    </span>
                  </div>
                  <div className="col-12 col-lg-9">
                    <input
                      onChange={_handleOnChange}
                      value={addContact.identityNumber}
                      name="identityNumber"
                      type="text"
                      id="identityNumber"
                      className="form-control rounded-2"
                      placeholder="e.g 5288252258888852"
                    />
                    {requiredParam('identityNumber').length > 0 && (
                      <span className="fs-9 text-brand-vivid d-block mt-2">
                        {requiredParam('identityNumber')[0]?.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row g-3 align-items-center">
                  <div className="col-12 col-lg-3 d-flex flex-column flex-md-row gap-2 align-self-start">
                    <label
                      htmlFor="identityPhoto"
                      className="text-brand-yankees col-form-label fw-bold"
                    >
                      Upload Identity Number
                    </label>
                  </div>
                  <div className="col-12 col-lg-9">
                    <div className="input-group input-file-upload">
                      <input
                        ref={fileRef}
                        accept="image/*"
                        onChange={(e) => _handleImageUpload(e)}
                        value={addContact.identityPhoto}
                        name="identityPhoto"
                        type="file"
                        id="identityPhoto"
                        className="d-none"
                      />
                      {file === '' && (
                        <label
                          htmlFor="identityPhoto"
                          className={
                            !isDarkMode ? 'text-brand-cadet-blue' : 'text-white'
                          }
                        >
                          <MdOutlinePhotoSizeSelectActual size="24" />
                          Upload File (Pdf, Png, Jpg)
                        </label>
                      )}
                      <input
                        type="button"
                        onClick={() => fileRef.current.click()}
                        defaultValue={file.name}
                        className="form-control rounded-2 text-start text-start"
                      />
                    </div>
                    {filePreview && (
                      <img
                        src={filePreview}
                        alt="Preview"
                        className="mt-2 image-preview"
                      />
                    )}
                  </div>
                </div>
                <div className="row g-3 align-items-center">
                  <div className="col-12 col-lg-3 d-flex flex-row gap-2 align-items-center">
                    <label
                      htmlFor="phoneNumber"
                      className="text-brand-yankees col-form-label fw-bold"
                    >
                      Phone Number
                    </label>
                    <span className="fs-10 fw-normal text-brand-yankees badge text-bg-brand-anti-flash rounded-2 px-2">
                      Required
                    </span>
                  </div>
                  <div className="col-12 col-lg-9">
                    <input
                      onChange={_handleOnChange}
                      value={addContact.phoneNumber}
                      name="phoneNumber"
                      type="text"
                      id="phoneNumber"
                      className="form-control rounded-2"
                      placeholder="e.g 082255569999"
                    />
                    {requiredParam('phoneNumber').length > 0 && (
                      <span className="fs-9 text-brand-vivid d-block mt-2">
                        {requiredParam('phoneNumber')[0]?.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row g-3 align-items-center">
                  <div className="col-12 col-lg-3 d-flex flex-row gap-2 align-items-center">
                    <label
                      htmlFor="email"
                      className="text-brand-yankees col-form-label fw-bold"
                    >
                      Email
                    </label>
                    <span className="fs-10 fw-normal text-brand-yankees badge text-bg-brand-anti-flash rounded-2 px-2">
                      Required
                    </span>
                  </div>
                  <div className="col-12 col-lg-9">
                    <input
                      onChange={_handleOnChange}
                      value={addContact.email}
                      name="email"
                      type="text"
                      id="email"
                      className="form-control rounded-2"
                      placeholder="e.g john@example.com"
                    />
                    {requiredParam('email').length > 0 && (
                      <span className="fs-9 text-brand-vivid d-block mt-2">
                        {requiredParam('email')[0]?.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row g-3 align-items-center">
                  <div className="col-12 col-lg-3 d-flex flex-row gap-2 align-items-center">
                    <label
                      htmlFor="contactPreferences"
                      className="text-brand-yankees col-form-label fw-bold"
                    >
                      Contact Preferences
                    </label>
                  </div>
                  <div className="col-12 col-lg-9">
                    <Select
                      name="contactPreferences"
                      id="contactPreferences"
                      value={addContact.contactPreferences}
                      options={contactPreferences.map((preferences) => {
                        return {
                          value: preferences.value,
                          label: preferences.label,
                        };
                      })}
                      onChange={_handleMultipleValue}
                      isMulti
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          backgroundColor: isDarkMode ? '#23282c' : '#fff',
                          height: '40px',
                          borderColor: state.isFocused ? '#ced4da' : '#ced4da',
                          boxShadow: state.isFocused ? null : null,
                          ':hover': {
                            borderColor: '#ced4da',
                          },
                        }),
                        valueContainer: (baseStyles, state) => ({
                          ...baseStyles,
                          height: '40px',
                          boxShadow: state.isFocused ? null : null,
                        }),
                        indicatorSeparator: (state) => ({
                          display: 'none',
                        }),
                        menu: (baseStyles, state) => ({
                          ...baseStyles,
                          backgroundColor: isDarkMode ? '#23282c' : '#fff',
                          color: isDarkMode ? '#fff' : '#23282c',
                          boxShadow: isDarkMode
                            ? '0px 7px 29px 0px rgba(0, 0, 0, 0.3)'
                            : '2px 4px 9px rgba(24, 37, 92, 0.15)',
                          borderRadius: '8px',
                        }),
                        option: (baseStyles, state) => ({
                          ...baseStyles,
                          backgroundColor: state.isFocused
                            ? isDarkMode
                              ? '#fff'
                              : '#2684ff'
                            : null,
                          color: state.isFocused
                            ? isDarkMode
                              ? '#23282c'
                              : '#fff'
                            : null,
                          ':hover': {
                            backgroundColor: isDarkMode ? '#fff' : '#2684ff',
                            color: isDarkMode ? '#23282c' : '#fff',
                          },
                        }),
                      }}
                    />
                  </div>
                </div>
                <div className="row g-3 align-items-center">
                  <div className="col-12 col-lg-3 d-flex flex-row gap-2 align-items-center">
                    <label
                      htmlFor="originContacts"
                      className="text-brand-yankees col-form-label fw-bold"
                    >
                      Contact Origin
                    </label>
                    <span className="fs-10 fw-normal text-brand-yankees badge text-bg-brand-anti-flash rounded-2 px-2">
                      Required
                    </span>
                  </div>
                  <div className="col-12 col-lg-9">
                    <Select
                      name="originContacts"
                      id="originContacts"
                      value={addContact.originContacts}
                      options={originContacts.map((origin) => {
                        return {
                          value: origin.value,
                          label: origin.label,
                        };
                      })}
                      onChange={_handleMultipleValue}
                      isMulti
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          backgroundColor: isDarkMode ? '#23282c' : '#fff',
                          height: '40px',
                          borderColor: state.isFocused ? '#ced4da' : '#ced4da',
                          boxShadow: state.isFocused ? null : null,
                          ':hover': {
                            borderColor: '#ced4da',
                          },
                        }),
                        valueContainer: (baseStyles, state) => ({
                          ...baseStyles,
                          height: '40px',
                          boxShadow: state.isFocused ? null : null,
                        }),
                        indicatorSeparator: (state) => ({
                          display: 'none',
                        }),
                        menu: (baseStyles, state) => ({
                          ...baseStyles,
                          backgroundColor: isDarkMode ? '#23282c' : '#fff',
                          color: isDarkMode ? '#fff' : '#23282c',
                          boxShadow: isDarkMode
                            ? '0px 7px 29px 0px rgba(0, 0, 0, 0.3)'
                            : '2px 4px 9px rgba(24, 37, 92, 0.15)',
                          borderRadius: '8px',
                        }),
                        option: (baseStyles, state) => ({
                          ...baseStyles,
                          backgroundColor: state.isFocused
                            ? isDarkMode
                              ? '#fff'
                              : '#2684ff'
                            : null,
                          color: state.isFocused
                            ? isDarkMode
                              ? '#23282c'
                              : '#fff'
                            : null,
                          ':hover': {
                            backgroundColor: isDarkMode ? '#fff' : '#2684ff',
                            color: isDarkMode ? '#23282c' : '#fff',
                          },
                        }),
                      }}
                    />
                    {requiredParam('originContacts').length > 0 &&
                    addContact.originContacts.length === 0 ? (
                      <span className="fs-9 text-brand-vivid d-block mt-2">
                        {requiredParam('originContacts')[0]?.message}
                      </span>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="row g-3 align-items-center">
                  <div className="col-12 col-lg-3 d-flex flex-row gap-2 align-items-center align-items-md-center">
                    <label
                      htmlFor="ownerTaxNumber"
                      className="text-brand-yankees col-form-label fw-bold"
                    >
                      Owner Tax Number
                    </label>
                  </div>
                  <div className="col-12 col-lg-9">
                    <div className="d-flex flex-column flex-md-row gap-4 align-items-start align-items-md-center">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="ownerTaxNumber"
                          id="ownerTaxNumber"
                          value="yes"
                          onChange={_handleRadioChange}
                          checked={isRadio === 'yes'}
                        />
                        <label
                          className="text-brand-yankees form-check-label"
                          htmlFor="ownerTaxNumber"
                        >
                          Have NPWP
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="ownerTaxNumber"
                          id="ownerTaxNumber"
                          value="no"
                          onChange={_handleRadioChange}
                          checked={isRadio === 'no'}
                        />
                        <label
                          className="text-brand-yankees form-check-label"
                          htmlFor="ownerTaxNumber"
                        >
                          Don't have NPWP
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="ownerTaxNumber"
                          id="ownerTaxNumber"
                          value="process"
                          onChange={_handleRadioChange}
                          checked={isRadio === 'process'}
                        />
                        <label
                          className="text-brand-yankees form-check-label"
                          htmlFor="ownerTaxNumber"
                        >
                          Can Be Processed
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {isRadio === 'yes' && (
                  <>
                    <div className="row g-3 align-items-center">
                      <div className="col-12 col-lg-3 d-flex flex-row gap-2 align-items-center">
                        <label
                          htmlFor="NPWP"
                          className="text-brand-yankees col-form-label fw-bold"
                        >
                          Tax Number
                        </label>
                      </div>
                      <div className="col-12 col-lg-9">
                        <input
                          onChange={_handleOnChange}
                          value={addContact.NPWP}
                          name="NPWP"
                          type="text"
                          id="NPWP"
                          className="form-control rounded-2"
                          placeholder="e.g 55258582525"
                        />
                      </div>
                    </div>
                    <div className="row g-3 align-items-center">
                      <div className="col-12 col-lg-3 d-flex flex-row gap-2 align-items-center">
                        <label
                          htmlFor="associateTo"
                          className="text-brand-yankees col-form-label fw-bold"
                        >
                          Associate To
                        </label>
                      </div>
                      <div className="col-12 col-lg-9">
                        <input
                          onChange={_handleOnChange}
                          value={addContact.associateTo}
                          name="associateTo"
                          type="number"
                          id="associateTo"
                          className="form-control rounded-2"
                          placeholder="Search Contact"
                        />
                        {(requiredParam('associateTo').length > 0 &&
                          addContact.associateTo === '') ||
                        addContact.associateTo === null ? (
                          <span className="fs-9 text-brand-vivid d-block mt-2">
                            {requiredParam('associateTo')[0]?.message}
                          </span>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                    <div className="row g-3 align-items-center">
                      <div className="col-12 col-lg-3 d-flex flex-row gap-2 align-items-center">
                        <label
                          htmlFor="isCompany"
                          className="text-brand-yankees col-form-label fw-bold"
                        >
                          Company Info
                        </label>
                      </div>
                      <div className="col-12 col-lg-9">
                        <div className="form-check">
                          <input
                            onChange={_handleIsChecked}
                            value={isChecked}
                            name="isCompany"
                            className="form-check-input"
                            type="checkbox"
                            id="isCompany"
                          />
                          <label
                            className="text-brand-yankees form-check-label"
                            htmlFor="isCompany"
                          >
                            Is Company ?
                          </label>
                        </div>
                      </div>
                    </div>
                    {isChecked && (
                      <>
                        <div className="row g-3 align-items-center">
                          <div className="col-12 col-lg-3 d-flex flex-row gap-2 align-items-center">
                            <label
                              htmlFor="companyName"
                              className="text-brand-yankees col-form-label fw-bold"
                            >
                              Company Name
                            </label>
                            <span className="fs-10 fw-normal badge text-brand-yankees badge text-bg-brand-anti-flash rounded-2 px-2">
                              Required
                            </span>
                          </div>
                          <div className="col-12 col-lg-9">
                            <input
                              onChange={_handleOnChange}
                              value={addContact.companyName}
                              name="companyName"
                              type="text"
                              id="companyName"
                              className="form-control rounded-2"
                              placeholder="e.g PT Archment Villa"
                            />
                          </div>
                        </div>
                        <div className="row g-3 align-items-center">
                          <div className="col-12 col-lg-3 d-flex flex-row gap-2 align-items-center">
                            <label
                              htmlFor="companyNPWP"
                              className="text-brand-yankees col-form-label fw-bold"
                            >
                              Company Tax Number
                            </label>
                          </div>
                          <div className="col-12 col-lg-9">
                            <input
                              onChange={_handleOnChange}
                              value={addContact.companyNPWP}
                              name="companyNPWP"
                              type="text"
                              id="companyNPWP"
                              className="form-control rounded-2"
                              placeholder="e.g 55258582525"
                            />
                          </div>
                        </div>
                        <div className="row g-3 align-items-center">
                          <div className="col-12 col-lg-3 d-flex flex-row gap-2 align-items-center">
                            <label
                              htmlFor="companyAddress"
                              className="text-brand-yankees col-form-label fw-bold"
                            >
                              Company Address
                            </label>
                            <span className="fs-10 fw-normal badge text-brand-yankees badge text-bg-brand-anti-flash rounded-2 px-2">
                              Required
                            </span>
                          </div>
                          <div className="col-12 col-lg-9">
                            <input
                              onChange={_handleOnChange}
                              value={addContact.companyAddress}
                              name="companyAddress"
                              type="text"
                              id="companyAddress"
                              className="form-control rounded-2"
                              placeholder="e.g Beringin Street"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </section>
          <section
            className={[
              'section-3',
              !isDarkMode ? 'shadow-lg' : 'shadow-dark',
            ].join(' ')}
          >
            <div className="row">
              <div className="col d-flex gap-4 justify-content-end align-items-center">
                {isLoading ? (
                  <Buttons
                    type="button"
                    className="btn btn-bg-white border text-brand-yankees fw-medium px-3 py-2"
                    isDisabled
                    style={
                      isLoading
                        ? {
                            cursor: 'not-allowed',
                            pointerEvents: 'all',
                          }
                        : {}
                    }
                  >
                    Cancel
                  </Buttons>
                ) : (
                  <Link
                    to={{
                      pathname: path.URLContact,
                      state: {
                        allContacts: history.location.state?.allContacts,
                      },
                    }}
                    className="btn btn-bg-white border text-brand-yankees fw-medium px-3 py-2"
                  >
                    Cancel
                  </Link>
                )}
                <Buttons
                  type="submit"
                  isPrimary
                  isMedium
                  className="text-white px-3 py-2"
                >
                  {isLoading ? (
                    <Spinner isInButton>Save Data</Spinner>
                  ) : (
                    'Save Data'
                  )}
                </Buttons>
              </div>
            </div>
          </section>
        </form>
      </main>
    </Layout>
  );
};

export default withAuth(ContactAdd);
