import React from 'react'
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";
import { TypeAnimation } from 'react-type-animation';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Search = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isSearch = location.pathname === "/search";
    return (
        <div className='w-full min-w-[300px] lg:min-w-[400px] lg:h-12 h-11 rounded-lg border border-gray-300 overflow-hidden flex items-center text-neutral-500 bg-slate-100 group focus-within:border-primary-200 m'>
            <button className='lg:flex hidden items-center justify-center h-full p-3 text-gray-500 group-focus-within:text-primary-200'>
                <IoSearchOutline className='text-2xl' />
            </button>
            {
                isSearch ? (
                    <button onClick={() => { navigate(-1) }} className='lg:hidden block items-center justify-center h-full p-3 text-gray-500 group-focus-within:text-primary-200'>

                        <IoCloseOutline className='text-2xl' />
                    </button>
                ) : (

            <button className='lg:hidden block items-center justify-center h-full p-3 text-gray-500 group-focus-within:text-primary-200'>

            <IoSearchOutline className='text-2xl' />
            </button>
                )
            }



            <div className='w-full h-full flex items-center'>
                {!isSearch ? (
                    <div className='w-full h-full flex items-center p-4'>
                        <TypeAnimation
                            sequence={[
                                // Same substring at the start will only be typed once, initially
                                'Search "Math"',
                                1000,
                                'Search "English"',
                                1000,
                                'Search "Social Science"',
                                1000,
                                'Search "Geography"',
                                1000,
                                'Search "Physics"',
                                1000,
                                'Search "Chemistry"',
                                1000,
                                'Search "Biology"',
                                1000,

                            ]}
                            speed={60}
                            style={{ fontSize: '1em' }}
                            repeat={Infinity}
                        />
                    </div>
                ) : (
                    <input type="text" className='w-full h-full outline-none bg-transparent ' placeholder='Search for Course' autoFocus />
                )}
            </div>
        </div>
    )
}

export default Search
