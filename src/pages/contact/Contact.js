import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { Link } from 'react-router-dom';
import { getAllContacts, deleteContactById } from '../../lib/constant';
import { LS_AUTH } from '../../config/localStorage';
import * as path from '../../routes/path';

import Layout from '../../components/templates/Layout';
import ContactCard from './ContactCard';

const Contact = () => {
  const [allContacts, setAllContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const token = localStorage.getItem(LS_AUTH);

  const _handleEditContact = (id, urlParent, e) => {
    e.stopPropagation();
    history.push({
      pathname: `${path.URLContactEdit(id)}`,
      state: {
        allContacts,
        contactId: id,
        urlParent,
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
      closeOnClickOutside: false,
    });
  };

  const _handleToDetail = (id, urlParent) => {
    history.push({
      pathname: `${path.URLContactDetail(id)}`,
      state: {
        allContacts,
        contactId: id,
        urlParent,
      },
    });
  };

  const dataFromDetail = history.location.state?.allContacts;

  const _getDataContacts = useCallback(() => {
    if (!dataFromDetail) {
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
    } else {
      setAllContacts(dataFromDetail);
    }
  }, [dataFromDetail]);

  useEffect(() => {
    if (history.location.state?.message) {
      toast(history.location.state?.message, {
        autoClose: 3000,
      });
    }
    _getDataContacts();
  }, [_getDataContacts, history.location.state]);

  return (
    <Layout title="Contact Management">
      <main className="h-100 contact-page-content">
        <div className="contact-list-content">
          <div className="row justify-content-between align-items-center gap-3 gap-md-0">
            <div className="col-12 col-md-6 col-lg-8 col-xl-10">
              <h5 className="fw-semibold">Manage Contact Management</h5>
              <p className="fs-9 fw-normal text-brand-rhythm mb-0">
                Manage all contact management here
              </p>
            </div>
            <div className="col-12 col-md-6 col-lg-4 col-xl-2 d-flex justify-content-start justify-content-md-end">
              <Link
                className="text-decoration-none text-white btn btn-brand-amber py-2 px-4"
                to={{
                  pathname: `${path.URLContactAdd}`,
                  state: {
                    allContacts,
                    urlParent: path.URLContact,
                  },
                }}
              >
                Add New
              </Link>
            </div>
          </div>
          <div className="row">
            <ContactCard
              isLoading={isLoading}
              allContacts={allContacts}
              _handleToDetail={_handleToDetail}
              _handleEditContact={_handleEditContact}
              _handleDeleteContact={_handleDeleteContact}
            />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Contact;
