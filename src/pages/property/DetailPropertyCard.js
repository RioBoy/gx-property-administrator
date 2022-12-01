import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { LS_AUTH } from '../../config/localStorage';
import { getPropertDetail } from '../../lib/constant';
import { Tab, Tabs } from 'react-bootstrap';
import '../../config/thousand';
import UserAvatarHistory from '../../assets/images/user-history.png';
import DetailPropertyImage from '../../assets/images/detail-property.jpg';
import ImagePlaceholder from '../../assets/images/image-placeholder.jpg';
import Map from '../../assets/images/maps.jpg';

import Spinner from '../../components/spinner/Spinner';

const DetailPropertyCard = () => {
  const [propertyDetail, setPropertyDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const id = history.location.pathname.split('/')[2];

  useEffect(() => {
    const token = localStorage.getItem(LS_AUTH);
    setIsLoading(true);
    axios({
      method: 'get',
      url: getPropertDetail(id),
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        const { results } = response.data;
        setPropertyDetail(results);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  return (
    <>
      {isLoading === true ? (
        <Spinner height="min-vh-50" />
      ) : (
        <>
          <div className="row gap-3 gap-lg-0 p-3 section-2 card flex-row border-0">
            <div className="col-12 col-lg-4">
              {propertyDetail.property?.photos.length > 0 ? (
                <img
                  src={propertyDetail.property?.photos[0].photo}
                  alt="Villa"
                  className="w-100 h-100 villa-image"
                />
              ) : (
                <img
                  src={DetailPropertyImage}
                  alt="Villa"
                  className="w-100 h-100 villa-image"
                />
              )}
            </div>
            <div className="col-12 col-lg-8">
              <div className="row gap-3 gap-md-0 justify-content-between">
                <div className="col">
                  <h5 className="fw-semibold text-secondary-black mb-2">
                    {propertyDetail.property?.building
                      ? propertyDetail.property?.building.name
                      : propertyDetail.property?.land.name}
                  </h5>
                  <p className="fw-normal text-dark-blue mb-2">
                    {propertyDetail.property?.ownershipStatus.display} •{' '}
                    {propertyDetail.property?.type.display}
                  </p>
                  <p className="fs-9 fw-normal text-secondary-gray mt-1 mb-2">
                    ID Property
                  </p>
                  <p className="fs-9 fw-normal mb-3">
                    {propertyDetail.property?.number}
                  </p>
                  <div className="d-flex gap-4">
                    <div className="created-on me-1">
                      <p className="fs-9 fw-normal text-secondary-gray mb-2">
                        Created on
                      </p>
                      <p className="fs-9 fw-normal mb-0">
                        {propertyDetail.property?.createdAt}
                      </p>
                    </div>
                    <div className="entried-by">
                      <p className="fs-9 fw-normal text-secondary-gray mb-2">
                        Entried by
                      </p>
                      <p className="fs-9 fw-normal mb-0">
                        {propertyDetail.property?.createdBy.name}
                      </p>
                    </div>
                  </div>
                  {propertyDetail.property?.status.name === 'pending' ? (
                    <span className="fw-normal text-primary-black rounded-2 badge text-bg-primary-yellow px-2">
                      {propertyDetail.property?.status.display}
                    </span>
                  ) : propertyDetail.property?.status.name === 'approved' ? (
                    <span className="fw-normal text-white rounded-2 badge text-bg-primary-green px-2">
                      {propertyDetail.property?.status.display}
                    </span>
                  ) : (
                    <span className="rejected">
                      {propertyDetail.property?.status.display}
                    </span>
                  )}
                </div>
                <div className="col d-flex justify-content-start justify-content-md-end">
                  <h4 className="fs-7 fw-semibold text-primary-orange">
                    IDR{' '}
                    {propertyDetail.property?.priceManagement.IDR
                      .finalEstimation.publicPrice
                      ? propertyDetail.property?.priceManagement.IDR.finalEstimation.publicPrice.thousand()
                      : propertyDetail.property?.priceManagement.IDR.ownerEstimation.publicPrice.thousand()}
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="row section-3 gap-3 gap-xl-0">
            <div className="col-12 col-lg-7 col-xl-8 card">
              <Tabs
                defaultActiveKey="home"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="home" title="Main Info">
                  <div className="row">
                    <h5 className="fw-semibold mb-3">General Info</h5>
                    <div className="col-12">
                      <div className="mb-3">
                        <label
                          htmlFor="contactName"
                          className="fs-9 fw-normal text-secondary-gray mb-1"
                        >
                          Contact
                        </label>
                        <p className="fw-normal text-primary-black">
                          Contact Name
                        </p>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="mb-3">
                        <label
                          htmlFor="villaType"
                          className="fs-9 fw-normal text-secondary-gray mb-1"
                        >
                          Villa Type
                        </label>
                        <p className="fw-normal text-primary-black">
                          {
                            propertyDetail.property?.location.area.types[0].type
                              .display
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="landSize"
                          className="fs-9 fw-normal text-secondary-gray mb-1"
                        >
                          Land Size
                        </label>
                        <p className="fw-normal text-primary-black">
                          {propertyDetail.property?.building
                            ? propertyDetail.property?.building.landSize
                            : propertyDetail.property?.land.totalLandSize}{' '}
                          are
                        </p>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="fullname"
                          className="fs-9 fw-normal text-secondary-gray mb-1"
                        >
                          Villa Total Size
                        </label>
                        <p className="fw-normal text-primary-black">18 sqm</p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="fullname"
                          className="fs-9 fw-normal text-secondary-gray mb-1"
                        >
                          Year Build
                        </label>
                        <p className="fw-normal text-primary-black">2018</p>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="fullname"
                          className="fs-9 fw-normal text-secondary-gray mb-1"
                        >
                          Year of Renovation
                        </label>
                        <p className="fw-normal text-primary-black">2020</p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-3">
                        <label
                          htmlFor="fullname"
                          className="fs-9 fw-normal text-secondary-gray mb-1"
                        >
                          NPWPD
                        </label>
                        <p className="fw-normal text-primary-black">Yes</p>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="mb-3">
                        <label
                          htmlFor="fullname"
                          className="fs-9 fw-normal text-secondary-gray mb-1"
                        >
                          Roof Type
                        </label>
                        <p className="fw-normal text-primary-black">
                          Alang - alang
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-5">
                    <div className="col-12 col-md-6">
                      <div className="row">
                        <div className="col-12">
                          <div className="mb-3">
                            <label
                              htmlFor="fullname"
                              className="fs-9 fw-normal text-secondary-gray mb-1"
                            >
                              Does it have IMB?
                            </label>
                            <p className="fw-normal text-primary-black">Yes</p>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="mb-3">
                            <label
                              htmlFor="fullname"
                              className="fs-9 fw-normal text-secondary-gray mb-1"
                            >
                              IMB Type
                            </label>
                            <p className="fw-normal text-primary-black">
                              Label
                            </p>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="mb-3">
                            <label
                              htmlFor="fullname"
                              className="fs-9 fw-normal text-secondary-gray mb-1"
                            >
                              Valid Until
                            </label>
                            <p className="fw-normal text-primary-black">
                              Label
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <label
                        htmlFor="fullname"
                        className="fs-9 fw-normal text-secondary-gray mb-1"
                      >
                        IMB Image
                      </label>
                      <img
                        src={ImagePlaceholder}
                        alt="Villa"
                        className="image-placeholder"
                      />
                    </div>
                  </div>
                  <div className="row mb-5">
                    <h5 className="fw-semibold mb-3">Location</h5>
                    <div className="col-12 col-md-6">
                      <div className="row">
                        <div className="col-12">
                          <div className="mb-3">
                            <label
                              htmlFor="fullname"
                              className="fs-9 fw-normal text-secondary-gray mb-1"
                            >
                              Location
                            </label>
                            <p className="fw-normal text-primary-black">
                              label
                            </p>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="mb-3">
                            <label
                              htmlFor="fullname"
                              className="fs-9 fw-normal text-secondary-gray mb-1"
                            >
                              Meeting Point
                            </label>
                            <p className="fw-normal text-primary-black">
                              Label
                            </p>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="mb-3">
                            <label
                              htmlFor="fullname"
                              className="fs-9 fw-normal text-secondary-gray mb-1"
                            >
                              Area
                            </label>
                            <p className="fw-normal text-primary-black">
                              Label
                            </p>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="mb-3">
                            <label
                              htmlFor="fullname"
                              className="fs-9 fw-normal text-secondary-gray mb-1"
                            >
                              Notes
                            </label>
                            <p className="fw-normal text-primary-black">
                              Label
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <label
                        htmlFor="fullname"
                        className="fs-9 fw-normal text-secondary-gray mb-1"
                      >
                        Preview Map
                      </label>
                      <img src={Map} alt="Villa" className="preview-map" />
                    </div>
                  </div>
                  <div className="row mb-5">
                    <h5 className="fw-semibold mb-3">Room</h5>
                    <div className="col-12">
                      <div className="mb-3">
                        <label
                          htmlFor="fullname"
                          className="fs-9 fw-normal text-secondary-gray mb-1"
                        >
                          Floor
                        </label>
                        <p className="fw-normal text-primary-black">24 are</p>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="row">
                        <div className="col-12 col-md-6">
                          <div className="mb-3">
                            <label
                              htmlFor="fullname"
                              className="fs-9 fw-normal text-secondary-gray mb-1"
                            >
                              Total Room
                            </label>
                            <p className="fw-normal text-primary-black">
                              24 are
                            </p>
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="mb-3">
                            <label
                              htmlFor="fullname"
                              className="fs-9 fw-normal text-secondary-gray mb-1"
                            >
                              Total Bathroom
                            </label>
                            <p className="fw-normal text-primary-black">
                              24 are
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="mb-3">
                        <label
                          htmlFor="fullname"
                          className="fs-9 fw-normal text-secondary-gray mb-1"
                        >
                          Living Room
                        </label>
                        <p className="fw-normal text-primary-black">24 are</p>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="mb-3">
                        <label
                          htmlFor="fullname"
                          className="fs-9 fw-normal text-secondary-gray mb-1"
                        >
                          Other Room
                        </label>
                        <p className="fw-normal text-primary-black">
                          Security Room
                        </p>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="row">
                        <div className="col-12 col-md-6">
                          <div className="mb-3">
                            <label
                              htmlFor="fullname"
                              className="fs-9 fw-normal text-secondary-gray mb-1"
                            >
                              Room Circulation
                            </label>
                            <p className="fw-normal text-primary-black">
                              Open but can be closed
                            </p>
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="mb-3">
                            <label
                              htmlFor="fullname"
                              className="fs-9 fw-normal text-secondary-gray mb-1"
                            >
                              AC
                            </label>
                            <p className="fw-normal text-primary-black">
                              With AC
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <h5 className="fw-semibold mb-3">Amenities</h5>
                    <div className="col-12 col-md-6">
                      <div className="row">
                        <div className="col-12">
                          <div className="mb-3">
                            <label
                              htmlFor="fullname"
                              className="fs-9 fw-normal text-secondary-gray mb-1"
                            >
                              Building Configuration
                            </label>
                            <p className="fw-normal text-primary-black">
                              Complex
                            </p>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="mb-3">
                            <label
                              htmlFor="fullname"
                              className="fs-9 fw-normal text-secondary-gray mb-1"
                            >
                              Does it have Pool?
                            </label>
                            <p className="fw-normal text-primary-black">Yes</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="row">
                        <div className="col-12">
                          <div className="mb-3">
                            <label
                              htmlFor="fullname"
                              className="fs-9 fw-normal text-secondary-gray mb-1"
                            >
                              Other Room in Residence
                            </label>
                            <p className="fw-normal text-primary-black">
                              Storage
                            </p>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="mb-3">
                            <label
                              htmlFor="fullname"
                              className="fs-9 fw-normal text-secondary-gray mb-1"
                            >
                              Pool Size
                            </label>
                            <p className="fw-normal text-primary-black">
                              7 meters x 4 meters
                            </p>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="mb-3">
                            <label
                              htmlFor="fullname"
                              className="fs-9 fw-normal text-secondary-gray mb-1"
                            >
                              Pool Type
                            </label>
                            <p className="fw-normal text-primary-black">
                              Overflow 1
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="row">
                        <div className="col-12">
                          <div className="mb-3">
                            <label
                              htmlFor="fullname"
                              className="fs-9 fw-normal text-secondary-gray mb-1"
                            >
                              Does it have Jacuzzi?
                            </label>
                            <p className="fw-normal text-primary-black">Yes</p>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="mb-3">
                            <label
                              htmlFor="fullname"
                              className="fs-9 fw-normal text-secondary-gray mb-1"
                            >
                              Garden Type
                            </label>
                            <p className="fw-normal text-primary-black">
                              Tropycal
                            </p>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="mb-3">
                            <label
                              htmlFor="fullname"
                              className="fs-9 fw-normal text-secondary-gray mb-1"
                            >
                              Parking Plot
                            </label>
                            <p className="fw-normal text-primary-black">
                              Garage
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="row">
                        <div className="col-12">
                          <div className="mb-3">
                            <label
                              htmlFor="fullname"
                              className="fs-9 fw-normal text-secondary-gray mb-1"
                            >
                              Jacuzzi Size
                            </label>
                            <p className="fw-normal text-primary-black">
                              1 meters x 1 meters
                            </p>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="mb-3">
                            <label
                              htmlFor="fullname"
                              className="fs-9 fw-normal text-secondary-gray mb-1"
                            >
                              Outdoor Amenities
                            </label>
                            <p className="fw-normal text-primary-black">
                              Outside Bar
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="profile" title="Facilities">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Vitae, voluptates? Debitis libero praesentium quisquam
                  delectus consequatur possimus obcaecati unde veritatis
                  consectetur, quos nobis voluptatibus eum tempora. Commodi,
                  quisquam. Doloribus, magni!
                </Tab>
              </Tabs>
            </div>
            <div className="col-12 col-lg-4 col-xl-4 ps-0 ps-lg-3 pe-0">
              <div className="card">
                <h5 className="fs-7 fw-medium mb-2">History</h5>
                <div className="history-item mb-2 p-2">
                  <img
                    src={UserAvatarHistory}
                    alt="User"
                    className="rounded-circle"
                  />
                  <div className="user-history">
                    <p className="fs-9 text-primary-black mb-1">
                      <span className="fw-semibold mt-0 ps-0">Sales Name</span>{' '}
                      has visited{' '}
                      <span className="fw-semibold mt-0 ps-0">
                        The Popus Villa
                      </span>{' '}
                      with customer
                    </p>
                    <p className="fs-10 text-third-gray">7 minutes ago</p>
                  </div>
                </div>
                <div className="history-item mb-2 p-2">
                  <img
                    src={UserAvatarHistory}
                    alt="User"
                    className="rounded-circle"
                  />
                  <div className="user-history">
                    <p className="fs-9 text-primary-black mb-1">
                      <span className="fw-semibold mt-0 ps-0">Sales Name</span>{' '}
                      has visited{' '}
                      <span className="fw-semibold mt-0 ps-0">
                        The Popus Villa
                      </span>{' '}
                      with customer
                    </p>
                    <p className="fs-10 minutes">7 minutes ago</p>
                  </div>
                </div>
                <div className="history-item mb-2 p-2">
                  <img
                    src={UserAvatarHistory}
                    alt="User"
                    className="rounded-circle"
                  />
                  <div className="user-history">
                    <p className="fs-9 text-primary-black mb-1">
                      <span className="fw-semibold mt-0 ps-0">Sales Name</span>{' '}
                      has visited{' '}
                      <span className="fw-semibold mt-0 ps-0">
                        The Popus Villa
                      </span>{' '}
                      with customer
                    </p>
                    <p className="fs-10 minutes">7 minutes ago</p>
                  </div>
                </div>
                <div className="history-item mb-2 p-2">
                  <img
                    src={UserAvatarHistory}
                    alt="User"
                    className="rounded-circle"
                  />
                  <div className="user-history">
                    <p className="fs-9 text-primary-black mb-1">
                      <span className="fw-semibold mt-0 ps-0">Sales Name</span>{' '}
                      has visited{' '}
                      <span className="fw-semibold mt-0 ps-0">
                        The Popus Villa
                      </span>{' '}
                      with customer
                    </p>
                    <p className="fs-10 minutes">7 minutes ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DetailPropertyCard;
