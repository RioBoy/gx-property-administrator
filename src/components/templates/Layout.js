import React, { useState, useEffect, useRef } from 'react';
import { IoMenuOutline } from 'react-icons/io5';
import { withAuth } from '../../context/Auth';
import useScrollToTop from '../../config/useScrollToTop';

import GXLogo from '../../assets/images/GX-Logo.png';
import GXLogoWhite from '../../assets/images/GX-Logo-white.png';
import VBMLogo from '../../assets/images/VBM-Logo.png';
import Avatar from '../../assets/images/avatar.png';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Layout = ({ title, children, isDarkMode }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [mobileWidth, setMobileWidth] = useState(window.innerWidth);
  const expander = useRef(null);
  useScrollToTop();

  const _handleMobileWidth = () => {
    setMobileWidth(window.innerWidth);
  };

  const isMobile = mobileWidth <= 425;

  useEffect(() => {
    const _handleClickOutside = (e) => {
      if (!expander.current.contains(e.target) && isMobile) {
        setToggleMenu(false);
      }
    };

    document.addEventListener('mousedown', _handleClickOutside);
    window.addEventListener('resize', _handleMobileWidth);

    return () => {
      document.removeEventListener('mousedown', _handleClickOutside);
      window.removeEventListener('resize', _handleMobileWidth);
    };
  }, [isMobile]);

  return (
    <>
      {toggleMenu && isMobile ? <div className="overlay-sidebar"></div> : ''}
      <div id="wrapper">
        <Topbar
          title={title}
          avatar={Avatar}
          icon={
            <IoMenuOutline
              className={[
                'nav-toggle',
                !isDarkMode ? 'text-brand-yankees' : 'text-white',
              ].join(' ')}
              size={24}
              onClick={() => setToggleMenu((toggle) => !toggle)}
            />
          }
          toggleMenu={toggleMenu}
          isMobile={isMobile}
        />
        <Sidebar
          logo={
            !isMobile
              ? toggleMenu
                ? VBMLogo
                : !isDarkMode
                ? GXLogo
                : GXLogoWhite
              : !isDarkMode
              ? GXLogo
              : GXLogoWhite
          }
          toggleMenu={toggleMenu}
          isMobile={isMobile}
          expander={expander}
        />
        <div
          id="content-wrapper"
          className="d-flex flex-column"
          style={
            isMobile
              ? {
                  left: '0',
                  position: toggleMenu ? 'fixed' : 'absolute',
                }
              : {
                  left: toggleMenu ? '65px' : 'calc(65px + 8rem)',
                  position: 'absolute',
                }
          }
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default withAuth(Layout);
