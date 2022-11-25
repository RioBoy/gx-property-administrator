import React, { useEffect, useRef } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';

const Sidebar = ({ logo, navLink, toggleMenu }) => {
  const expander = useRef(null);
  const history = useHistory();

  useEffect(() => {
    if (expander.current) {
      expander.current.classList.toggle('expander');
    }
    document.body.id = 'body-pd';
  }, [toggleMenu]);

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

  const pathName = history.location.pathname;
  const splitPathName = pathName.split('/');

  return (
    <div className="sidebar" id="navbar" ref={expander}>
      <ul className="navbar-nav">
        <Link
          to="/dashboard"
          className="sidebar-brand d-flex align-items-center justify-content-center"
        >
          <div className="vbm-logo">
            <img src={logo} alt="Logo" className="logo-dashboard" />
          </div>
        </Link>
        {navLink.map((navItem, i) => {
          return (
            <li
              className={[
                'nav-item',
                splitPathName[1] === navItem.link ? 'active' : '',
              ].join(' ')}
              key={i}
            >
              <NavLink
                to={navItem.link}
                className="nav-link custom-nav-link"
                activeClassName="active"
              >
                {navItem.icon}
                <span className="fs-9 fw-medium">{navItem.name}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
