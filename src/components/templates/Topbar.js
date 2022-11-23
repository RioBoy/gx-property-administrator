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
            <h6 className="dropdown-header fs-9 fw-semibold text-uppercase">
              Version 1.0.0
            </h6>
            <Link to="/" className="fw-medium text-decoration-none">
              <HiOutlineMoon size={44} />
              Dark Mode
            </Link>
            <Link to="/logout" className="fw-medium text-decoration-none">
              <HiOutlineArrowCircleLeft size={44} />
              Logout
            </Link>
          </Dropdown.Menu>
        </Dropdown>
      </ul>
    </nav>
  );
};

export default Topbar;
