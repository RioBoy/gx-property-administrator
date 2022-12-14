import React from 'react';
import { withAuth } from '../../context/Auth';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import {
  HiOutlineMoon,
  HiOutlineArrowCircleLeft,
  HiOutlineUser,
} from 'react-icons/hi';
import * as path from '../../routes/path';

import { Buttons } from '../button/Buttons';

const Topbar = ({ icon, avatar, title, logout, toggleMenu, isMobile }) => {
  return (
    <nav
      className="navbar navbar-expand-lg topbar justify-content-between shadow-sm"
      style={
        isMobile
          ? {
              left: '0',
            }
          : {
              left: toggleMenu ? '92px' : 'calc(92px + 8rem)',
            }
      }
    >
      <ul className="navbar-nav side-nav">
        <li className="nav-item">{icon}</li>
        <li className="nav-item">
          <h5 className="fw-normal navbar-brand text-primary-black mb-0">
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
            <Link
              to="/darkmode"
              className="fw-medium text-brand-rhythm text-decoration-none d-flex align-items-center"
            >
              <HiOutlineMoon
                size={isMobile ? 35 : 44}
                className="text-brand-rhythm"
              />
              Dark Mode
            </Link>
            <Buttons
              type="button"
              onClick={() => logout()}
              className="fw-medium text-brand-rhythm text-decoration-none d-flex align-items-center border-0 bg-transparent w-100"
            >
              <HiOutlineArrowCircleLeft
                size={isMobile ? 35 : 44}
                className="text-brand-rhythm p-2"
              />
              Logout
            </Buttons>
          </Dropdown.Menu>
        </Dropdown>
      </ul>
    </nav>
  );
};

export default withAuth(Topbar);
