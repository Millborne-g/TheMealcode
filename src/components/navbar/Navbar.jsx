import React from 'react';
import './navbar.css';
import logo from '../../assets/logo.png';


const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='navbar_inner'>
        <a href="#Top">
          <div className='logo_container'>
            <img className='logo_img' src={logo} alt="The Meal code" /><span className='logo_name'>The<span className='logo_name_meal'>Meal</span>code</span>

          </div>
        </a>
        <div className='about_container'>
          {/*<a className='about_link' href=""><span>About</span></a>*/}
        </div>
      </div>
        
    </div>
  )
}

export default Navbar