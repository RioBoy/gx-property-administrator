import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';
import { FiHome } from 'react-icons/fi';
import { TbLayoutDashboard } from 'react-icons/tb';

const Sidebar = ({ logo, toggleMenu, isMobile, expander }) => {
  useEffect(() => {
    if (expander.current) {
      expander.current.classList.toggle('expander');
    }
    document.body.id = 'body-pd';
  }, [toggleMenu, expander]);

  const span = document?.querySelectorAll('.nav-link span');
  document.body.id = 'body-pd';
  const body = document?.getElementById('body-pd');

  if (toggleMenu) {
    body.classList.add('body-pd');
    if (body.classList.contains('body-pd').valueOf) {
      for (let i = 0; i < span.length; i++) {
        span[i].classList.add('hidden-span');
      }
    } else {
      for (let i = 0; i < span.length; i++) {
        span[i].classList.remove('hidden-span');
      }
    }
  } else {
    body.classList.remove('body-pd');
    for (let i = 0; i < span.length; i++) {
      span[i].classList.remove('hidden-span');
    }
  }

  return (
    <div
      className="sidebar border-end-1"
      id="navbar"
      ref={expander}
      style={
        isMobile
          ? {
              width: toggleMenu ? '55%' : '0',
            }
          : {
              width: toggleMenu ? '92px' : 'calc(92px + 8rem)',
            }
      }
    >
      <ul className="navbar-nav">
        <Link
          to="/dashboard"
          className="sidebar-brand d-flex align-items-center justify-content-center"
        >
          <div className="vbm-logo">
            <img src={logo} alt="Logo" className="logo-dashboard" />
          </div>
        </Link>
        <li className="nav-item">
          <NavLink
            to="/dashboard"
            className="nav-link custom-nav-link"
            activeClassName="active"
            title="Dashboard"
          >
            <TbLayoutDashboard />
            <span className="fs-9 fw-normal">Dasboard</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/property"
            className="nav-link custom-nav-link"
            activeClassName="active"
            title="Property"
          >
            <FiHome />
            <span className="fs-9 fw-normal">Property</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/contact"
            className="nav-link custom-nav-link"
            activeClassName="active"
            title="Contact"
          >
            <FaRegUserCircle />
            <span className="fs-9 fw-normal">Contact</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
