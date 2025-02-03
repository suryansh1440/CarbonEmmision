import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa'
import { AnimatedContainer, AnimatedFade } from '../components/animations/AnimatedContainer'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    category: '',
    difficulty: ''
  })
  const [showFilters, setShowFilters] = useState(false)

  const categories = ['Technology', 'Science', 'History', 'Literature', 'Mathematics']
  const difficulties = ['Beginner', 'Intermediate', 'Advanced']

  const handleSearch = async () => {
    if (!searchTerm) return

    setLoading(true)
    try {
      // Simulated search results
      const mockResults = [
        { 
          id: 1, 
          title: 'Introduction to Artificial Intelligence', 
          category: 'Technology', 
          difficulty: 'Beginner',
          description: 'Learn the basics of AI and machine learning'
        },
        { 
          id: 2, 
          title: 'Advanced Machine Learning Techniques', 
          category: 'Technology', 
          difficulty: 'Advanced',
          description: 'Deep dive into complex machine learning algorithms'
        }
      ].filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filters.category ? item.category === filters.category : true) &&
        (filters.difficulty ? item.difficulty === filters.difficulty : true)
      )

      setResults(mockResults)
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) handleSearch()
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm, filters])

  return (
    <AnimatedContainer className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold text-center mb-8 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Content Search
        </motion.h1>

        {/* Search Input */}
        <motion.div 
          className="relative mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input 
                type="text"
                placeholder="Search for content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors ${
                showFilters ? 'bg-blue-600' : ''
              }`}
            >
              <FaFilter />
            </motion.button>
          </div>

          {/* Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 grid grid-cols-2 gap-4 overflow-hidden"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select 
                    value={filters.category}
                    onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                  <select 
                    value={filters.difficulty}
                    onChange={(e) => setFilters(prev => ({ ...prev, difficulty: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">All Levels</option>
                    {difficulties.map(diff => (
                      <option key={diff} value={diff}>{diff}</option>
                    ))}
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Search Results */}
        {loading ? (
          <LoadingSpinner size="lg" className="mt-12" />
        ) : (
          <AnimatePresence>
            {results.length > 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {results.map((result, index) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow"
                  >
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{result.title}</h2>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>{result.category}</span>
                      <span className="font-medium">{result.difficulty} Level</span>
                    </div>
                    <p className="text-gray-500">{result.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            ) : searchTerm ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-gray-600 mt-12"
              >
                No results found. Try a different search term.
              </motion.div>
            ) : null}
          </AnimatePresence>
        )}
      </div>
    </AnimatedContainer>
  )
}

export default SearchPage
