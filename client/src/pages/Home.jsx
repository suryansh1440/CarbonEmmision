import React from 'react'
import BookModel from '../components/BookModel'
import CourseVideos from '../components/CourseVideos'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <BookModel />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <h1 className="text-6xl font-bold text-white tracking-widest mb-4">Welcome to Kid Tutor</h1>
          <p className="text-2xl text-gray-200 mb-8">Discover Amazing Experiences</p>
          <Link 
            to="/practice" 
            className="px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-lg font-semibold"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Course Videos Section */}
      <CourseVideos />

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students already learning with us
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-lg font-semibold"
          >
            Sign Up Now
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
