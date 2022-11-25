import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAllContacts } from '../../lib/constant';

import Spinner from '../../components/spinner/Spinner';
import { Buttons } from '../../components/button/Buttons';

const ContactCard = () => {
  const [allContacts, setAllContacts] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios({
      method: 'get',
      url: getAllContacts,
    })
      .then((response) => {
        const { results } = response.data;
        setAllContacts(results);
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
        <Spinner height="min-vh-50" />
      ) : (
        <>
          {allContacts.contacts?.map((contact) => (
            <div className="col-12 col-md-6 col-lg-4 col-xl-3" key={contact.id}>
              <div className="card w-100">
                <div className="card-body">
                  <h5 className="card-title fw-bold">
                    <Buttons
                      type="link"
                      href={`/contact/${contact.id}`}
                      className="text-reset"
                    >
                      {contact.name}
                    </Buttons>
                  </h5>
                  <h6 className="fs-9 text-secondary-gray card-subtitle mb-2 fw-medium">
                    {contact.phoneNumber === null
                      ? 'Belum memiliki no handphone'
                      : contact.phoneNumber}
                  </h6>
                  <p className="fs-9 text-secondary-gray card-text fw-medium mb-4">
                    {contact.email}
                  </p>
                  <a
                    href="/contact/edit/:id"
                    className="card-link text-decoration-none mb-2 text-primary-blue"
                  >
                    Edit
                  </a>
                  <a
                    href="/contact/delete/:id"
                    className="card-link card-link text-decoration-none mb-2 text-primary-blue"
                  >
                    Remove
                  </a>
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
