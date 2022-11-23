import React from 'react';
import { Table } from 'react-bootstrap';
import ImagePlaceholder from '../../assets/images/image-placeholder.jpg';

const PropertyTable = ({ propertyList }) => {
  return (
    <>
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
                    <p className="mb-0 text-sm fw-normal">
                      <a href={`/property/${property.id}`}>
                        {property.land ? property.land.name : 'Ini Vie Villa'}
                      </a>
                    </p>
                    <p className="text-xs font-secondary mt-2 mb-0 fw-normal">
                      {property.ownershipStatus.display} -{' '}
                      {property.type.display}
                    </p>
                  </td>
                  <td>
                    <p className="text-sm font-third mb-0 fw-normal">
                      {property.ownershipStatus.display}
                    </p>
                  </td>
                  <td>
                    <p className="text-sm mb-0 fw-normal">
                      {property.createdAt}
                    </p>
                  </td>
                  <td>
                    <p className="mb-0 text-sm fw-normal">
                      {property.createdBy.name}
                    </p>
                    <p className="text-xs font-secondary mt-2 mb-0 fw-normal">
                      {property.createdBy.nickName}
                    </p>
                  </td>
                  <td>
                    {property.status.name === 'pending' ? (
                      <span className="text-xs fw-normal pending">
                        {property.status.display}
                      </span>
                    ) : property.status.name === 'approved' ? (
                      <span className="text-xs fw-normal approved">
                        {property.status.display}
                      </span>
                    ) : (
                      <span className="text-xs fw-normal rejected">
                        {property.status.display}
                      </span>
                    )}
                    <p className="text-xs font-secondary mt-2 mb-0 fw-normal">
                      Progress
                    </p>
                    <p className="mb-0 text-sm fw-normal">
                      {property.progress}%
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default PropertyTable;
