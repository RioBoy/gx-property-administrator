import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import Spinner from '../../components/spinner/Spinner';

const ContactCard = ({
  isLoading,
  allContacts,
  _handleEditContact,
  _handleDeleteContact,
  _handleToDetail,
}) => {
  const { url } = useRouteMatch();

  return (
    <>
      {isLoading ? (
        <Spinner height="min-vh-50" />
      ) : (
        <>
          {allContacts?.map((contact) => (
            <div className="col-12 col-md-6 col-lg-4 col-xl-3" key={contact.id}>
              <div
                className="card w-100 mb-4"
                onClick={(e) => _handleToDetail(contact.id, url, e)}
              >
                <div className="card-body">
                  <h5 className="card-title fw-bold text-primary-black">
                    {contact.name}
                  </h5>
                  <h6 className="fs-9 text-secondary-gray card-subtitle mb-2 fw-medium">
                    {contact.phoneNumber === null
                      ? 'Belum memiliki no handphone'
                      : contact.phoneNumber}
                  </h6>
                  <p className="fs-9 text-secondary-gray card-text fw-medium mb-4">
                    {contact.email}
                  </p>
                  <button
                    type="button"
                    onClick={(e) => _handleEditContact(contact.id, url, e)}
                    className="text-primary-blue mb-2 bg-transparent border-0"
                    title="Edit"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={(e) => _handleDeleteContact(contact.id, e)}
                    className="text-primary-blue mb-2 bg-transparent border-0"
                    title="Remove"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default ContactCard;
