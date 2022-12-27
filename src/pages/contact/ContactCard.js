import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import ModalBox from '../../components/modal/ModalBox';

import Spinner from '../../components/spinner/Spinner';

const ContactCard = ({
  isLoading,
  isLoadingInButton,
  allContacts,
  _handleEditContact,
  _handleDeleteContact,
  _handleToDetail,
}) => {
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);

  const _handleShowModalDelete = (contact, e) => {
    e.stopPropagation();
    setShowModalDelete(true);
    setSelectedItem(contact);
  };
  const _handleCloseModalDelete = (e) => {
    e.stopPropagation();
    setShowModalDelete(false);
    setSelectedItem([]);
  };

  useEffect(() => {
    if (!isLoadingInButton) {
      setShowModalDelete(false);
    }
  }, [isLoadingInButton]);

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
                onClick={(e) => _handleToDetail(contact.id, e)}
              >
                <div className="card-body">
                  <h5 className="card-title fw-bold text-brand-yankees">
                    {contact.name}
                  </h5>
                  <h6 className="fs-9 text-brand-rhythm card-subtitle mb-2 fw-medium">
                    {contact.phoneNumber === null
                      ? 'Belum memiliki no handphone'
                      : contact.phoneNumber}
                  </h6>
                  <p className="fs-9 text-brand-rhythm card-text fw-medium mb-4">
                    {contact.email}
                  </p>
                  <button
                    type="button"
                    onClick={(e) => _handleEditContact(contact.id, e)}
                    className="text-brand-united-nations mb-2 bg-transparent border-0"
                    title="Edit"
                  >
                    Edit
                  </button>
                  <Button
                    onClick={(e) => _handleShowModalDelete(contact, e)}
                    className="text-brand-united-nations bg-transparent border-0"
                    title="Remove"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <ModalBox
            show={showModalDelete}
            _handleCloseModal={(e) => _handleCloseModalDelete(e)}
            _handleActionModal={() => _handleDeleteContact(selectedItem.id)}
            isLoadingInButton={isLoadingInButton}
          >
            Delete
          </ModalBox>
        </>
      )}
    </>
  );
};

export default ContactCard;
