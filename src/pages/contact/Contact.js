import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import { getAllContacts, deleteContactById } from '../../lib/constant';
import { LS_AUTH } from '../../config/localStorage';

import Layout from '../../components/templates/Layout';
import ContactCard from './ContactCard';
import AddContact from './AddContact';
import EditContact from './EditContact';
import DetailContact from './DetailContact';

const Contact = () => {
  const [allContacts, setAllContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { url, path } = useRouteMatch();
  const token = localStorage.getItem(LS_AUTH);

  const _handleEditContact = (id, urlParent, e) => {
    e.stopPropagation();
    history.push({
      pathname: `${url}/edit/${id}`,
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
      pathname: `${url}/${id}`,
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
    _getDataContacts();
  }, [_getDataContacts]);

  return (
    <>
      <Switch>
        <Route path={`${path}/add`} component={AddContact} />
        <Route path={`${path}/edit/:id`} component={EditContact} />
        <Route path={`${path}/:id`} component={DetailContact} />
        <Route path={`${path}`}>
          <Layout title="Contact Management">
            <main className="h-100 contact-page-content">
              <div className="contact-list-content">
                <div className="row justify-content-between align-items-center gap-3 gap-md-0">
                  <div className="col-12 col-md-6 col-lg-8 col-xl-10">
                    <h5 className="fw-semibold">Manage Contact Management</h5>
                    <p className="fs-9 fw-normal text-secondary-gray mb-0">
                      Manage all contact management here
                    </p>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4 col-xl-2 d-flex justify-content-start justify-content-md-end">
                    <Link
                      className="text-decoration-none text-white btn btn-primary-orange py-2 px-4"
                      to={{
                        pathname: `${url}/add`,
                        state: {
                          allContacts,
                          urlParent: url,
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
        </Route>
      </Switch>
    </>
  );
};

export default Contact;
