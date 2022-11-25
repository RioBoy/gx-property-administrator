import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { HiOutlineMoon, HiOutlineArrowCircleLeft } from 'react-icons/hi';

const Topbar = ({ icon, avatar, navLink }) => {
  const history = useHistory();
  const detailPage = history.location.pathname.split('/');
  const filteredNavLink = navLink.filter(
    (nav) => nav.link.split('/')[1] === detailPage[1],
  );

  return (
    <nav className="navbar navbar-expand-lg topbar justify-content-between">
      <ul className="navbar-nav side-nav">
        <li className="nav-item">{icon}</li>
        <li className="nav-item d-none d-md-block">
          {filteredNavLink ? (
            <Link
              className="fw-normal navbar-brand text-primary-black"
              to={filteredNavLink[0].link}
            >
              {filteredNavLink[0].name}
            </Link>
          ) : (
            navLink.map((navItem, i) => {
              return (
                navItem.link === history.location.pathname && (
                  <Link
                    className="fw-normal navbar-brand"
                    to={navItem.link}
                    key={i}
                  >
                    {navItem.name}
                  </Link>
                )
              );
            })
          )}
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
            <h6 className="dropdown-header fs-10 fw-semibold text-third-gray text-uppercase mb-2">
              Version 1.0.0
            </h6>
            <Link
              to="/"
              className="fw-medium text-secondary-gray text-decoration-none d-flex align-items-center"
            >
              <HiOutlineMoon size={44} className="text-secondary-gray" />
              Dark Mode
            </Link>
            <Link
              to="/logout"
              className="fw-medium text-secondary-gray text-decoration-none d-flex align-items-center"
            >
              <HiOutlineArrowCircleLeft
                size={44}
                className="text-secondary-gray p-2"
              />
              Logout
            </Link>
          </Dropdown.Menu>
        </Dropdown>
      </ul>
    </nav>
  );
};

export default Topbar;
