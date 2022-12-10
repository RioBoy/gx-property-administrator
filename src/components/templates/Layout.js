import React, { useState, useEffect } from 'react';
import { IoMenuOutline } from 'react-icons/io5';

import VBMLogo from '../../assets/images/VBM-Logo.svg';
import Avatar from '../../assets/images/avatar.png';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Layout = ({ title, children }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [mobileWidth, setMobileWidth] = useState(window.innerWidth);

  const _handleMobileWidth = () => {
    setMobileWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', _handleMobileWidth);

    return () => {
      window.removeEventListener('resize', _handleMobileWidth);
    };
  }, []);

  const isMobile = mobileWidth <= 768;

  return (
    <div id="wrapper">
      <Topbar
        title={title}
        avatar={Avatar}
        icon={
          <IoMenuOutline
            className="nav-toggle"
            onClick={() => setToggleMenu((toggle) => !toggle)}
          />
        }
        toggleMenu={toggleMenu}
        isMobile={isMobile}
      />
      <Sidebar logo={VBMLogo} toggleMenu={toggleMenu} isMobile={isMobile} />
      <div
        id="content-wrapper"
        className="d-flex flex-column"
        style={
          isMobile
            ? {
                left: toggleMenu ? '92px' : '0',
              }
            : {
                left: toggleMenu ? '92px' : 'calc(92px + 8rem)',
              }
        }
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
