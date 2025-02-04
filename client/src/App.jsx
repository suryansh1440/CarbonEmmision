import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setUserDetails } from './store/userSlice'
import { fetchUserDetail } from "./utils/fetchUserDetail";
import BackToTopButton from './components/BackToTopButtom'
const App = () => {
  const dispatch = useDispatch();
  
  const fetchUser = async () => { 
    const userDetail = await fetchUserDetail();
    dispatch(setUserDetails(userDetail.data));
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 overflow-hidden">
      <Header />
      <main className='flex-grow min-h-[calc(100vh-10rem)] lg:mt-0 mt-10 transition-all duration-300 pt-16'>
        <Outlet />
      </main>
      <Footer />
      <BackToTopButton/>
      <Toaster/>
    </div>
  )
}

export default App
