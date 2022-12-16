import React from 'react';
import { Table } from 'react-bootstrap';

import ImagePlaceholderDefault from '../../assets/images/image-placeholder-default.jpg';
import ImagePlaceholder from '../../assets/images/image-placeholder.jpg';

import Spinner from '../../components/spinner/Spinner';

const PropertyTable = ({
  _handleToDetail,
  isLoading,
  propertyList,
  isEmptyFilter,
  isFullHeight,
}) => {
  return (
    <>
      {isLoading && propertyList?.length < 1 ? (
        <Spinner height={isFullHeight ? 'min-vh-50' : 'min-vh-100'} />
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
                {isEmptyFilter ? (
                  <tr style={{ pointerEvents: 'none' }}>
                    <td colSpan={7}>
                      <p className="text-center fs-7 tet-primary-black fw-medium my-4">
                        Data not found
                      </p>
                    </td>
                  </tr>
                ) : (
                  propertyList?.map((property) => (
                    <tr
                      key={property.id}
                      onClick={() =>
                        _handleToDetail(
                          property.id,
                          property?.location?.latitude,
                          property?.location?.longitude,
                        )
                      }
                    >
                      <td>#{property.number}</td>
                      <td>
                        {property.photos.length > 0 ? (
                          <img src={ImagePlaceholder} alt="Property" />
                        ) : (
                          <img src={ImagePlaceholderDefault} alt="Property" />
                        )}
                      </td>
                      <td>
                        <p className="mb-0 fs-9 fw-normal">
                          {property.land ? property.land.name : 'Ini Vie Villa'}
                        </p>
                        <p className="fs-10 text-brand-rhythm mt-2 mb-0 fw-normal">
                          {property.ownershipStatus.display} -{' '}
                          {property.type.display}
                        </p>
                      </td>
                      <td>
                        <p className="fs-9 text-brand-united-nations mb-0 fw-normal">
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
                        <p className="fs-10 text-brand-rhythm mt-2 mb-0 fw-normal">
                          {property.createdBy.nickName}
                        </p>
                      </td>
                      <td>
                        {property.status.name === 'pending' ? (
                          <span className="fs-10 fw-normal text-primary-black rounded-2 badge text-bg-brand-crayola px-2">
                            {property.status.display}
                          </span>
                        ) : property.status.name === 'approved' ? (
                          <span className="fs-10 fw-normal text-white rounded-2 badge text-bg-brand-mountain-meadow px-2">
                            {property.status.display}
                          </span>
                        ) : (
                          <span className="fs-10 fw-normal text-white rounded-2 badge text-bg-brand-terra-cotta px-2">
                            {property.status.display}
                          </span>
                        )}
                        <p className="fs-10 text-brand-rhythm mt-2 mb-0 fw-normal">
                          Progress
                        </p>
                        <p className="mb-0 fs-9 fw-normal">
                          {property.progress}%
                        </p>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyTable;
