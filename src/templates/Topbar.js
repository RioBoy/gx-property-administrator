import React from 'react';
import { useHistory, Link } from 'react-router-dom';

import { Dropdown } from 'react-bootstrap';
import { HiOutlineMoon, HiOutlineArrowCircleLeft } from 'react-icons/hi';

const Topbar = ({ icon, avatar, navLink }) => {
  const history = useHistory();

  return (
    <nav className="navbar navbar-expand-lg topbar justify-content-between">
      <ul className="navbar-nav side-nav">
        <li className="nav-item">{icon}</li>
        <li className="nav-item d-none d-md-block">
          {navLink.map((navItem, i) => {
            return navItem.link === history.location.pathname ? (
              <Link
                className="text-xl fw-normal navbar-brand"
                to="/dashboard"
                key={i}
              >
                {navItem.name}
              </Link>
            ) : (
              ''
            );
          })}
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

          <Dropdown.Menu className="shadow">
            <h6 className="dropdown-header fs-8 fw-semibold text-uppercase">
              Version 1.0.0
            </h6>
            <Dropdown.Item href="#/action-2" className="fw-medium">
              <HiOutlineMoon size={44} />
              Dark Mode
            </Dropdown.Item>
            <Dropdown.Item href="#/action-3" className="fw-medium">
              <HiOutlineArrowCircleLeft size={44} />
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </ul>
    </nav>
  );
};

export default Topbar;
