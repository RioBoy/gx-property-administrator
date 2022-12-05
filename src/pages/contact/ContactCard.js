import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { getAllContacts, deleteContactById } from '../../lib/constant';
import { LS_AUTH } from '../../config/localStorage';

import Spinner from '../../components/spinner/Spinner';

const ContactCard = () => {
  const [allContacts, setAllContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { url } = useRouteMatch();
  const history = useHistory();
  const token = localStorage.getItem(LS_AUTH);

  const _handleEditContact = (id, e) => {
    e.stopPropagation();
    history.push({
      pathname: `${url}/edit/${id}`,
      state: {
        allContacts,
        contactId: id,
      },
    });
  };

  const _handleDeleteContact = (id, e) => {
    e.stopPropagation();
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            axios({
              method: 'post',
              url: deleteContactById(id),
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((response) => {
                const { status, success } = response.data;
                if (status === 'success') {
                  toast(success.msg, {
                    autoClose: 3000,
                  });
                }
                const remainingContactResult = allContacts?.filter(
                  (result) => result.id !== id,
                );
                setAllContacts(remainingContactResult);
              })
              .catch((error) => {
                console.log(error);
              });
          },
        },
        {
          label: 'No',
          onClick: () => console.log('Batal'),
        },
      ],
    });
  };

  const _handleToDetail = (id) => {
    history.push({
      pathname: `${url}/${id}`,
      state: {
        allContacts,
        contactId: id,
      },
    });
  };

  useEffect(() => {
    setIsLoading(true);
    axios({
      method: 'get',
      url: getAllContacts,
    })
      .then((response) => {
        const { results } = response.data;
        setAllContacts(results.contacts);
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
                    onClick={(e) => _handleEditContact(contact.id, e)}
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
