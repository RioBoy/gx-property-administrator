import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { LS_AUTH } from '../../config/localStorage';
import { getAllProperty } from '../../lib/constant';

import ImagePlaceholder from '../../assets/images/image-placeholder.jpg';

const PropertyTable = () => {
  const [propertyList, setPropertyList] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
        <div className="d-flex justify-content-center align-items-center min-vh-50">
          <div className="spinner-border text-primary-orange" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row mt-3">
          <div className="col-12">
            <Table responsive>
              <thead>
                <tr>
                  <th>ID Property</th>
                  <th>Property Image</th>
                  <th>Property Name</th>
                  <th>Owner Name</th>
                  <th>Created On</th>
                  <th>Entried By</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {propertyList.properties?.map((property, index) => (
                  <tr key={property.id}>
                    <td>#{property.number}</td>
                    <td>
                      {property.photos.length > 0 ? (
                        <img src={property.photos[0].photo} alt="Property" />
                      ) : (
                        <img src={ImagePlaceholder} alt="Property" />
                      )}
                    </td>
                    <td>
                      <p className="mb-0 fs-9 fw-normal">
                        <Link
                          to={`/property/${property.id}`}
                          className="text-primary-black"
                        >
                          {property.land ? property.land.name : 'Ini Vie Villa'}
                        </Link>
                      </p>
                      <p className="fs-10 text-secondary-gray mt-2 mb-0 fw-normal">
                        {property.ownershipStatus.display} -{' '}
                        {property.type.display}
                      </p>
                    </td>
                    <td>
                      <p className="fs-9 text-primary-blue mb-0 fw-normal">
                        {property.ownershipStatus.display}
                      </p>
                    </td>
                    <td>
                      <p className="fs-9 mb-0 fw-normal">
                        {property.createdAt}
                      </p>
                    </td>
                    <td>
                      <p className="mb-0 fs-9 fw-normal">
                        {property.createdBy.name}
                      </p>
                      <p className="fs-10 text-secondary-gray mt-2 mb-0 fw-normal">
                        {property.createdBy.nickName}
                      </p>
                    </td>
                    <td>
                      {property.status.name === 'pending' ? (
                        <span className="fs-10 fw-normal text-primary-black rounded-2 badge text-bg-primary-yellow px-2">
                          {property.status.display}
                        </span>
                      ) : property.status.name === 'approved' ? (
                        <span className="fs-10 fw-normal text-white rounded-2 badge text-bg-primary-green px-2">
                          {property.status.display}
                        </span>
                      ) : (
                        <span className="fs-10 fw-normal text-white rounded-2 badge text-bg-primary-red px-2">
                          {property.status.display}
                        </span>
                      )}
                      <p className="fs-10 text-secondary-gray mt-2 mb-0 fw-normal">
                        Progress
                      </p>
                      <p className="mb-0 fs-9 fw-normal">
                        {property.progress}%
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyTable;
