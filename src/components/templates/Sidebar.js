import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';
import { FiHome } from 'react-icons/fi';
import { withAuth } from '../../context/Auth';
import { TbLayoutDashboard } from 'react-icons/tb';
import * as path from '../../routes/path';

const Sidebar = ({ logo, toggleMenu, isMobile, expander, isDarkMode }) => {
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
      className="sidebar"
      id="navbar"
      ref={expander}
      style={
        isMobile
          ? {
              width: toggleMenu ? '55%' : '0',
              borderRight: !toggleMenu
                ? '0'
                : !isDarkMode
                ? '1px solid #fbf6f6'
                : '1px solid #383a3c',
            }
          : {
              width: toggleMenu ? '65px' : 'calc(65px + 8rem)',
              borderRight: !isDarkMode
                ? '1px solid #fbf6f6'
                : '1px solid #383a3c',
            }
      }
    >
      <ul className="navbar-nav">
        <Link
          to={path.URLDashboard}
          className="sidebar-brand d-flex align-items-center justify-content-center"
        >
          <div className="vbm-logo">
            <img
              src={logo}
              alt="Logo"
              className="logo-dashboard"
              style={
                !isMobile
                  ? !toggleMenu
                    ? {
                        height: '100%',
                        width: '100%',
                        padding: '0 1.3rem',
                        objectFit: 'contain',
                        objectPosition: 'center',
                      }
                    : {
                        height: '100%',
                        width: '27px',
                        objectFit: 'contain',
                        objectPosition: 'center',
                      }
                  : {
                      height: '100%',
                      width: '100%',
                      padding: '0 1.3rem',
                      objectFit: 'contain',
                      objectPosition: 'center',
                    }
              }
            />
          </div>
        </Link>
        <li className="nav-item">
          <NavLink
            to={path.URLDashboard}
            className="nav-link custom-nav-link text-brand-cadet-blue"
            activeClassName="active"
            title="Dashboard"
          >
            <TbLayoutDashboard />
            <span className="fs-9 fw-normal">Dasboard</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={path.URLProperty}
            className="nav-link custom-nav-link text-brand-cadet-blue"
            activeClassName="active"
            title="Property"
          >
            <FiHome />
            <span className="fs-9 fw-normal">Property</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={path.URLContact}
            className="nav-link custom-nav-link text-brand-cadet-blue"
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

export default withAuth(Sidebar);
