import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { MdOutlinePhotoSizeSelectActual } from 'react-icons/md';
import { updateContactById } from '../../lib/constant';
import { LS_AUTH } from '../../config/localStorage';
import ImagePlaceholderDefault from '../../assets/images/image-placeholder-default.jpg';

import { Buttons } from '../../components/button/Buttons';
import Spinner from '../../components/spinner/Spinner';
import Layout from '../../components/templates/Layout';

const EditContact = () => {
  const history = useHistory();
  const [updateContact, setUpdateContact] = useState({
    name: '',
    parentId: 1, // default
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
    commission: 15,
    companyName: '',
    companyNPWP: '',
    companyAddress: '',
    other: 'coba', // default
  });
  const fileRef = useRef(null);
  const [file, setFile] = useState('');
  const [filePreview, setFilePreview] = useState(null);
  const [filePreviewUpdate, setFilePreviewUpdate] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isError, setIsError] = useState('');
  const [isRadio, setIsRadio] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { urlParent } = history.location.state;

  const _handleOnChange = (event) => {
    setUpdateContact((state) => ({
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
    setUpdateContact((state) => ({
      ...state,
      [action.name]: value,
    }));
  };

  const _handleIsChecked = () => {
    if (isChecked || isRadio === 'yes') {
      setUpdateContact((state) => ({
        ...state,
        companyName: '',
        companyNPWP: '',
        companyAddress: '',
      }));
    }
    setIsChecked((current) => !current);
  };

  const _handleRadioChange = (event) => {
    if (isRadio !== 'yes' || updateContact.ownerTaxNumber !== 'yes') {
      setUpdateContact((state) => ({
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

  const _handleSubmitUpdateContact = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const token = localStorage.getItem(LS_AUTH);
    const updatePayload = {
      ...updateContact,
      identityPhoto: file,
      originContacts: updateContact.originContacts.map(
        (origin) => origin.value,
      ),
      contactPreferences: updateContact.contactPreferences.map(
        (preferences) => preferences.value,
      ),
      ownerTaxNumber: isRadio,
    };
    axios({
      method: 'post',
      url: updateContactById(history.location.state.contactId),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      data: updatePayload,
    })
      .then((response) => {
        const { status, error, success } = response.data;
        if (status === 'error') {
          toast(error.msg, {
            autoClose: 3000,
          });
          setIsError((state) => ({
            ...state,
            errors: error?.validations ? error?.validations : [],
          }));
        } else {
          toast(success.msg, {
            autoClose: 3000,
          });
          history.push(urlParent);
          setUpdateContact([]);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const { allContacts, contactId } = history.location.state;

  const filteredUpdateContactById = allContacts?.filter(
    (contact) => contact?.id === contactId,
  )?.[0];

  useEffect(() => {
    if (
      filteredUpdateContactById.companyName !== '' &&
      filteredUpdateContactById.companyName !== null
    ) {
      setIsChecked(true);
    }
    setUpdateContact((state) => ({
      ...state,
      name: filteredUpdateContactById.name,
      // parentId
      salutation: filteredUpdateContactById.salutation,
      email: filteredUpdateContactById.email,
      // password
      type: filteredUpdateContactById.type.display,
      // language
      country: filteredUpdateContactById.country.code,
      residence: filteredUpdateContactById.residence,
      phoneNumber: filteredUpdateContactById.phoneNumber,
      contactPreferences: filteredUpdateContactById.contactPreferences.map(
        (preferences) => {
          return {
            value: preferences.name,
            label: preferences.display,
          };
        },
      ),
      // ownerTaxNumber
      NPWP: filteredUpdateContactById.NPWP,
      identityNumber: filteredUpdateContactById.identityNumber,
      // identityPhoto
      originContacts: filteredUpdateContactById.originContacts.map((origin) => {
        return {
          value: origin.name,
          label: origin.display,
        };
      }),
      associateTo: filteredUpdateContactById.commission,
      commission: filteredUpdateContactById.commission,
      companyName: filteredUpdateContactById.companyName,
      companyNPWP: filteredUpdateContactById.companyNPWP,
      companyAddress: filteredUpdateContactById.companyAddress,
      other: filteredUpdateContactById.other,
    }));
    setFilePreviewUpdate(filteredUpdateContactById.identityPhoto);
    setIsRadio(filteredUpdateContactById.ownerTaxNumber.name);
  }, [filteredUpdateContactById]);

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
        <form onSubmit={_handleSubmitUpdateContact} method="post">
          <section className="section-1">
            <div className="card bg-white border-0 rounded-2">
              <div className="card-header bg-white border-0 mb-2 py-3 px-3">
                <h5 className="fs-8 fw-medium text-secondary-black mb-0">
                  Contact Account Information
                </h5>
              </div>
              <div className="card-body">
                <div className="row g-3 align-items-center">
                  <div className="col-3 d-flex flex-column flex-md-row gap-2 align-items-center">
                    <label htmlFor="name" className="col-form-label fw-bold">
                      Fullname
                    </label>
                    <span className="fs-10 fw-normal badge text-bg-primary-gray rounded-2 px-2">
                      Required
                    </span>
                  </div>
                  <div className="col-9">
                    <input
                      value={updateContact.name}
                      onChange={_handleOnChange}
                      name="name"
                      type="text"
                      id="name"
                      className="form-control rounded-2"
                      placeholder="Type fullname here"
                    />
                    {requiredParam('name').length > 0 &&
                    updateContact.name === '' ? (
                      <span className="fs-9 text-secondary-red d-block mt-2">
                        {requiredParam('name')[0]?.message}
                      </span>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="row g-3 align-items-center">
                  <div className="col-3 d-flex flex-column flex-md-row gap-2 align-items-center">
                    <label
                      htmlFor="salutation"
                      className="col-form-label fw-bold"
                    >
                      Status Salutation
                    </label>
                    <span className="fs-10 fw-normal badge text-bg-primary-gray rounded-2 px-2">
                      Required
                    </span>
                  </div>
                  <div className="col-9">
                    <select
                      onChange={_handleOnChange}
                      value={updateContact.salutation}
                      name="salutation"
                      className="form-select text-primary-black"
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
                    updateContact.salutation === '' ? (
                      <span className="fs-9 text-secondary-red d-block mt-2">
                        {requiredParam('salutation')[0]?.message}
                      </span>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="row g-3 align-items-center">
                  <div className="col-3 d-flex flex-column flex-md-row gap-2 align-items-center">
                    <label htmlFor="type" className="col-form-label fw-bold">
                      Contact Type
                    </label>
                    <span className="fs-10 fw-normal badge text-bg-primary-gray rounded-2 px-2">
                      Required
                    </span>
                  </div>
                  <div className="col-9">
                    <select
                      onChange={_handleOnChange}
                      value={updateContact.type}
                      name="type"
                      className="form-select text-primary-black"
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
                    updateContact.type === '' ? (
                      <span className="fs-9 text-secondary-red d-block mt-2">
                        {requiredParam('type')[0]?.message}
                      </span>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="row g-3 align-items-center">
                  <div className="col-3 d-flex flex-column flex-md-row gap-2 align-items-center">
                    <label htmlFor="country" className="col-form-label fw-bold">
                      Country
                    </label>
                  </div>
                  <div className="col-9">
                    <select
                      onChange={_handleOnChange}
                      value={updateContact.country}
                      name="country"
                      className="form-select text-primary-black"
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
                  <div className="col-3 d-flex flex-column flex-md-row gap-2 align-items-center">
                    <label
                      htmlFor="residence"
                      className="col-form-label fw-bold"
                    >
                      Address
                    </label>
                  </div>
                  <div className="col-9">
                    <textarea
                      onChange={_handleOnChange}
                      value={updateContact.residence}
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
                <h5 className="fs-8 fw-medium text-secondary-black mb-0">
                  Contact Information
                </h5>
              </div>
              <div className="card-body">
                <div className="row g-3 align-items-center">
                  <div className="col-3 d-flex flex-column flex-md-row gap-2 align-items-center">
                    <label
                      htmlFor="identityNumber"
                      className="col-form-label fw-bold"
                    >
                      Identity Number
                    </label>
                    <span className="fs-10 fw-normal badge text-bg-primary-gray rounded-2 px-2">
                      Required
                    </span>
                  </div>
                  <div className="col-9">
                    <input
                      onChange={_handleOnChange}
                      value={updateContact.identityNumber}
                      name="identityNumber"
                      type="text"
                      id="identityNumber"
                      className="form-control rounded-2"
                      placeholder="e.g 5288252258888852"
                    />
                    {requiredParam('identityNumber').length > 0 && (
                      <span className="fs-9 text-secondary-red d-block mt-2">
                        {requiredParam('identityNumber')[0]?.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row g-3 align-items-center">
                  <div className="col-3 d-flex flex-column flex-md-row gap-2 align-items-center">
                    <label
                      htmlFor="identityPhoto"
                      className="col-form-label fw-bold"
                    >
                      Upload Identity Number
                    </label>
                  </div>
                  <div className="col-9">
                    <div className="input-group input-file-upload">
                      <input
                        ref={fileRef}
                        accept="image/*"
                        onChange={(e) => _handleImageUpload(e)}
                        value={updateContact.identityPhoto}
                        name="identityPhoto"
                        type="file"
                        id="identityPhoto"
                        className="d-none"
                      />
                      {file === '' && (
                        <label htmlFor="identityPhoto">
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
                    {filePreview ? (
                      <img
                        src={filePreview}
                        alt="Preview"
                        className="mt-2 image-preview"
                      />
                    ) : (
                      <img
                        src={filePreviewUpdate ? ImagePlaceholderDefault : ''}
                        alt={filePreviewUpdate ? 'Preview' : ''}
                        className="mt-2 image-preview"
                      />
                    )}
                  </div>
                </div>
                <div className="row g-3 align-items-center">
                  <div className="col-3 d-flex flex-column flex-md-row gap-2 align-items-center">
                    <label
                      htmlFor="phoneNumber"
                      className="col-form-label fw-bold"
                    >
                      Phone Number
                    </label>
                    <span className="fs-10 fw-normal badge text-bg-primary-gray rounded-2 px-2">
                      Required
                    </span>
                  </div>
                  <div className="col-9">
                    <input
                      onChange={_handleOnChange}
                      value={updateContact.phoneNumber || ''}
                      name="phoneNumber"
                      type="text"
                      id="phoneNumber"
                      className="form-control rounded-2"
                      placeholder="e.g 082255569999"
                    />
                    {requiredParam('phoneNumber').length > 0 && (
                      <span className="fs-9 text-secondary-red d-block mt-2">
                        {requiredParam('phoneNumber')[0]?.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row g-3 align-items-center">
                  <div className="col-3 d-flex flex-column flex-md-row gap-2 align-items-center">
                    <label htmlFor="email" className="col-form-label fw-bold">
                      Email
                    </label>
                    <span className="fs-10 fw-normal badge text-bg-primary-gray rounded-2 px-2">
                      Required
                    </span>
                  </div>
                  <div className="col-9">
                    <input
                      onChange={_handleOnChange}
                      value={updateContact.email}
                      name="email"
                      type="text"
                      id="email"
                      className="form-control rounded-2"
                      placeholder="e.g john@example.com"
                    />
                    {requiredParam('email').length > 0 && (
                      <span className="fs-9 text-secondary-red d-block mt-2">
                        {requiredParam('email')[0]?.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row g-3 align-items-center">
                  <div className="col-3 d-flex flex-column flex-md-row gap-2 align-items-center">
                    <label
                      htmlFor="contactPreferences"
                      className="col-form-label fw-bold"
                    >
                      Contact Preferences
                    </label>
                  </div>
                  <div className="col-9">
                    <Select
                      name="contactPreferences"
                      id="contactPreferences"
                      value={updateContact.contactPreferences}
                      onChange={_handleMultipleValue}
                      options={contactPreferences.map((preferences) => {
                        return {
                          value: preferences.value,
                          label: preferences.label,
                        };
                      })}
                      isMulti
                    />
                  </div>
                </div>
                <div className="row g-3 align-items-center">
                  <div className="col-3 d-flex flex-column flex-md-row gap-2 align-items-center">
                    <label
                      htmlFor="originContacts"
                      className="col-form-label fw-bold"
                    >
                      Contact Origin
                    </label>
                    <span className="fs-10 fw-normal badge text-bg-primary-gray rounded-2 px-2">
                      Required
                    </span>
                  </div>
                  <div className="col-9">
                    <Select
                      name="originContacts"
                      id="originContacts"
                      value={updateContact.originContacts}
                      onChange={_handleMultipleValue}
                      options={originContacts.map((origin) => {
                        return {
                          value: origin.value,
                          label: origin.label,
                        };
                      })}
                      isMulti
                    />
                    {requiredParam('originContacts').length > 0 &&
                    updateContact.originContacts.length === 0 ? (
                      <span className="fs-9 text-secondary-red d-block mt-2">
                        {requiredParam('originContacts')[0]?.message}
                      </span>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="row g-3 align-items-center">
                  <div className="col-3 d-flex flex-column flex-md-row gap-2 align-items-center">
                    <label
                      htmlFor="ownerTaxNumber"
                      className="col-form-label fw-bold"
                    >
                      Owner Tax Number
                    </label>
                  </div>
                  <div className="col-9">
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
                          className="form-check-label"
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
                          className="form-check-label"
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
                          className="form-check-label"
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
                      <div className="col-3 d-flex flex-column flex-md-row gap-2 align-items-center">
                        <label
                          htmlFor="NPWP"
                          className="col-form-label fw-bold"
                        >
                          Tax Number
                        </label>
                      </div>
                      <div className="col-9">
                        <input
                          onChange={_handleOnChange}
                          value={updateContact.NPWP}
                          name="NPWP"
                          type="text"
                          id="NPWP"
                          className="form-control rounded-2"
                          placeholder="e.g 55258582525"
                        />
                      </div>
                    </div>
                    <div className="row g-3 align-items-center">
                      <div className="col-3 d-flex flex-column flex-md-row gap-2 align-items-center">
                        <label
                          htmlFor="associateTo"
                          className="col-form-label fw-bold"
                        >
                          Associate To
                        </label>
                      </div>
                      <div className="col-9">
                        <input
                          onChange={_handleOnChange}
                          value={updateContact.associateTo}
                          name="associateTo"
                          type="number"
                          id="associateTo"
                          className="form-control rounded-2"
                          placeholder="Search Contact"
                        />
                        {(requiredParam('associateTo').length > 0 &&
                          updateContact.associateTo === '') ||
                        updateContact.associateTo === null ? (
                          <span className="fs-9 text-secondary-red d-block mt-2">
                            {requiredParam('associateTo')[0]?.message}
                          </span>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                    <div className="row g-3 align-items-center">
                      <div className="col-3 d-flex flex-column flex-md-row gap-2 align-items-center">
                        <label
                          htmlFor="isCompany"
                          className="col-form-label fw-bold"
                        >
                          Company Info
                        </label>
                      </div>
                      <div className="col-9">
                        <div className="form-check">
                          <input
                            onChange={_handleIsChecked}
                            value={isChecked}
                            checked={isChecked}
                            name="isCompany"
                            className="form-check-input"
                            type="checkbox"
                            id="isCompany"
                          />
                          <label
                            className="form-check-label"
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
                          <div className="col-3 d-flex flex-column flex-md-row gap-2 align-items-center">
                            <label
                              htmlFor="companyName"
                              className="col-form-label fw-bold"
                            >
                              Company Name
                            </label>
                            <span className="fs-10 fw-normal badge text-bg-primary-gray rounded-2 px-2">
                              Required
                            </span>
                          </div>
                          <div className="col-9">
                            <input
                              onChange={_handleOnChange}
                              value={updateContact.companyName}
                              name="companyName"
                              type="text"
                              id="companyName"
                              className="form-control rounded-2"
                              placeholder="e.g PT Archment Villa"
                            />
                          </div>
                        </div>
                        <div className="row g-3 align-items-center">
                          <div className="col-3 d-flex flex-column flex-md-row gap-2 align-items-center">
                            <label
                              htmlFor="companyNPWP"
                              className="col-form-label fw-bold"
                            >
                              Company Tax Number
                            </label>
                          </div>
                          <div className="col-9">
                            <input
                              onChange={_handleOnChange}
                              value={updateContact.companyNPWP}
                              name="companyNPWP"
                              type="text"
                              id="companyNPWP"
                              className="form-control rounded-2"
                              placeholder="e.g 55258582525"
                            />
                          </div>
                        </div>
                        <div className="row g-3 align-items-center">
                          <div className="col-3 d-flex flex-column flex-md-row gap-2 align-items-center">
                            <label
                              htmlFor="companyAddress"
                              className="col-form-label fw-bold"
                            >
                              Company Address
                            </label>
                            <span className="fs-10 fw-normal badge text-bg-primary-gray rounded-2 px-2">
                              Required
                            </span>
                          </div>
                          <div className="col-9">
                            <input
                              onChange={_handleOnChange}
                              value={updateContact.companyAddress}
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
          <section className="section-3 shadow-lg">
            <div className="row">
              <div className="col d-flex gap-4 justify-content-end align-items-center">
                <Link
                  to={{
                    pathname: urlParent,
                    state: { allContacts },
                  }}
                  className="btn btn-bg-white border text-primary-black fw-medium px-3 py-2"
                >
                  Cancel
                </Link>
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

export default EditContact;
