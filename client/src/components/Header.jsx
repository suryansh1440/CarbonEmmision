import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import MainLogo from '../assets/MainLogo.png'
import Search from './Search'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import UserMenu from './UserMenu';

const Header = () => {
    const [isAccountOpen, setIsAccountOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isSearch = location.pathname === "/search";
  const user = useSelector((state) => state.user);

  const handleAccount = () => {
    setIsAccountOpen(!isAccountOpen);
  }

  function handleCloseAccount(){
    setIsAccountOpen(false);
  }

    return (
        <header className='fixed top-0 z-50 bg-white shadow-md w-full'>
            <div className='container mx-auto px-8 flex items-center justify-between'>
                {/* Logo */}
                <Link to="/" className='flex items-center ml-4'>
                    <img
                        src={MainLogo}
                        alt="Main Logo"
                        width={75}
                        height={75}
                    />
                </Link>

                {/* Centered Search */}
                <Link to="/search" className='absolute left-1/2 transform -translate-x-1/2'>
                    <Search />
                </Link>

                

                {/* Navigation Links */}
                <nav className='flex items-center space-x-8'>
                  {
                    user?._id && ( <Link to="/Practice" className="">
                      Practice
                  </Link>)
                  }
               
                    <Link 
                        to="/contact-us" 
                        className='hover:text-blue-600 transition-colors'
                    >
                        Contact Us
                    </Link>

                    {
                  user?._id ? (
                    <div className='relative'>
                      <div onClick={handleAccount} className='flex items-center gap-2'>
                        <p>Account</p>
                        {isAccountOpen ? (
                          <FaAngleUp className="text-2xl" />
                        ) : (
                          <FaAngleDown className="text-2xl" />
                        )}

                      </div>
                      {isAccountOpen && (
                        <div className='absolute top-12 right-0'>
                          <div className='bg-white p-4 rounded-lg lg:shadow-md min-w-[250px]'>
                          <UserMenu handleCloseAccount={handleCloseAccount} />
                          </div>
                          
                        </div>
                      )}
                    </div>
                  ):
                  (
                    <Link to="/login" className='text-lg px-2'>Login</Link>
                  )
                }
                </nav>
            </div>
        </header>
    )
}

export default Header
