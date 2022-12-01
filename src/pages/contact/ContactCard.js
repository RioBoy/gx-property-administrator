import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useRouteMatch } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { getAllContacts, deleteContactById } from '../../lib/constant';
import { LS_AUTH } from '../../config/localStorage';
import { toast } from 'react-toastify';

import { Buttons } from '../../components/button/Buttons';
import Spinner from '../../components/spinner/Spinner';

const ContactCard = () => {
  const [allContacts, setAllContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { url } = useRouteMatch();
  const token = localStorage.getItem(LS_AUTH);

  const _handleDeleteContact = (id) => {
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
              <div className="card w-100">
                <div className="card-body">
                  <h5 className="card-title fw-bold">
                    <Link
                      to={{
                        pathname: `${url}/${contact.id}`,
                        state: { allContacts, contactId: contact.id },
                      }}
                      className="text-primary-black"
                    >
                      {contact.name}
                    </Link>
                  </h5>
                  <h6 className="fs-9 text-secondary-gray card-subtitle mb-2 fw-medium">
                    {contact.phoneNumber === null
                      ? 'Belum memiliki no handphone'
                      : contact.phoneNumber}
                  </h6>
                  <p className="fs-9 text-secondary-gray card-text fw-medium mb-4">
                    {contact.email}
                  </p>
                  <Link
                    to={{
                      pathname: `${url}/edit/${contact.id}`,
                      state: { allContacts, contactId: contact.id },
                    }}
                    className="card-link text-decoration-none mb-2 text-primary-blue"
                  >
                    Edit
                  </Link>
                  <Buttons
                    type="button"
                    onClick={() => _handleDeleteContact(contact.id)}
                    className="card-link card-link text-decoration-none mb-2 text-primary-blue bg-transparent border-0"
                  >
                    Remove
                  </Buttons>
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
