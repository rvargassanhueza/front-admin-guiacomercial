import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import * as FaIcons from 'react-icons/fa'
import { IconContext } from 'react-icons';
import MenuNavbar from './MenuNavbar';

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link> 
        </div>
        <MenuNavbar 
          showSidebar={showSidebar}
          sidebar={sidebar}
        />
      </IconContext.Provider>
  );
}

export default Navbar;
