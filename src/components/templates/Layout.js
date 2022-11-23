import React, { useState } from 'react';
import { TbLayoutDashboard } from 'react-icons/tb';
import { FiHome } from 'react-icons/fi';
import { FaRegUserCircle } from 'react-icons/fa';
import { IoMenuOutline } from 'react-icons/io5';

import VBMLogo from '../../assets/images/VBM-Logo.svg';
import Avatar from '../../assets/images/avatar.png';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Layout = (props) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const dataNavLink = [
    {
      icon: <TbLayoutDashboard />,
      name: 'Dashboard',
      link: '/dashboard',
    },
    {
      icon: <FiHome />,
      name: 'Property Management',
      link: '/property',
    },
    {
      icon: <FaRegUserCircle />,
      name: 'Contact Management',
      link: '/contact',
    },
  ];

  return (
    <div id="wrapper">
      <Sidebar logo={VBMLogo} navLink={dataNavLink} toggleMenu={toggleMenu} />
      <div id="content-wrapper" className="d-flex flex-column">
        <Topbar
          navLink={dataNavLink}
          avatar={Avatar}
          icon={
            <IoMenuOutline
              className="nav-toggle"
              onClick={() => setToggleMenu((toggle) => !toggle)}
            />
          }
        />
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
