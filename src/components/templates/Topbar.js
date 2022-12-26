import React, { useState } from 'react';
import { withAuth } from '../../context/Auth';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import {
  HiOutlineMoon,
  HiOutlineArrowCircleLeft,
  HiOutlineUser,
  HiOutlineSun,
} from 'react-icons/hi';
import * as path from '../../routes/path';

import { Buttons } from '../button/Buttons';
import ModalBox from '../modal/ModalBox';

const Topbar = ({
  icon,
  avatar,
  title,
  logout,
  toggleMenu,
  isMobile,
  isLoading,
  isDarkMode,
  _handleChangeTheme,
}) => {
  const [showModalLogout, setShowModalLogout] = useState(false);

  const _handleShowModalLogout = () => setShowModalLogout(true);
  const _handleCloseModalLogout = () => setShowModalLogout(false);

  return (
    <nav
      className={[
        'navbar navbar-expand-lg topbar justify-content-between',
        !isDarkMode ? 'shadow-sm' : 'shadow-dark',
      ].join(' ')}
      style={
        isMobile
          ? {
              left: '0',
            }
          : {
              left: toggleMenu ? '65px' : 'calc(65px + 8rem)',
            }
      }
    >
      <ul className="navbar-nav side-nav">
        <li className="nav-item">{icon}</li>
        <li className="nav-item">
          <h5
            className={[
              'fw-normal navbar-brand mb-0',
              !isDarkMode ? 'text-brand-yankees' : 'text-white',
            ].join(' ')}
          >
            {title}
          </h5>
        </li>
      </ul>
      <ul className="navbar-nav">
        <Dropdown>
          <Dropdown.Toggle
            variant="transparent"
            id="dropdown-basic"
            className="border-0"
          >
            <img
              src={avatar}
              alt="Avatar"
              className="img-profile rounded-circle"
            />
          </Dropdown.Toggle>
          <Dropdown.Menu className="shadow border-0">
            <h6 className="dropdown-header fs-10 fw-semibold text-brand-cadet-blue text-uppercase mb-2">
              Version 1.0.0
            </h6>
            <Link
              to={path.URLProfile}
              className="fw-medium text-brand-rhythm text-decoration-none d-flex align-items-center"
            >
              <HiOutlineUser
                size={isMobile ? 35 : 44}
                className="text-brand-rhythm"
              />
              Profile
            </Link>
            <Buttons
              type="button"
              onClick={() => _handleChangeTheme()}
              className="fw-medium text-brand-rhythm text-decoration-none d-flex align-items-center border-0 bg-transparent w-100"
            >
              {!isDarkMode ? (
                <HiOutlineMoon
                  size={isMobile ? 35 : 44}
                  className="text-brand-rhythm"
                />
              ) : (
                <HiOutlineSun
                  size={isMobile ? 35 : 44}
                  className="text-brand-rhythm"
                />
              )}
              {!isDarkMode ? 'Dark Mode' : 'Light Mode'}
            </Buttons>
            <Buttons
              type="button"
              onClick={() => _handleShowModalLogout()}
              className="fw-medium text-brand-rhythm text-decoration-none d-flex align-items-center border-0 bg-transparent w-100"
            >
              <HiOutlineArrowCircleLeft
                size={isMobile ? 35 : 44}
                className="text-brand-rhythm p-2"
              />
              Logout
            </Buttons>
            <ModalBox
              show={showModalLogout}
              _handleCloseModal={_handleCloseModalLogout}
              _handleActionModal={() => logout()}
              isLoadingInButton={isLoading}
              isLogout
            >
              Logout
            </ModalBox>
          </Dropdown.Menu>
        </Dropdown>
      </ul>
    </nav>
  );
};

export default withAuth(Topbar);
