import React, { useState } from 'react';
import { IoMenuOutline } from 'react-icons/io5';

import VBMLogo from '../../assets/images/VBM-Logo.svg';
import Avatar from '../../assets/images/avatar.png';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Layout = ({ title, children }) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div id="wrapper">
      <Sidebar logo={VBMLogo} toggleMenu={toggleMenu} />
      <div id="content-wrapper" className="d-flex flex-column">
        <Topbar
          title={title}
          avatar={Avatar}
          icon={
            <IoMenuOutline
              className="nav-toggle"
              onClick={() => setToggleMenu((toggle) => !toggle)}
            />
          }
        />
        {children}
      </div>
    </div>
  );
};

export default Layout;
