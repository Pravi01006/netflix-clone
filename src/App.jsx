import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Row from './components/Row'
import Modal from './components/Modal'
import { getTrending, getTopRated, searchMovies } from './services/tmdb'

export default function App() {
  const [trending, setTrending] = useState([])
  const [topRated, setTopRated] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    getTrending().then(setTrending)
    getTopRated().then(setTopRated)
  }, [])

  useEffect(() => {
    if (!query.trim()) return
    const timer = setTimeout(() => {
      searchMovies(query).then(setSearchResults)
    }, 500)
    return () => clearTimeout(timer)
  }, [query])

  return (
    <div className="bg-black min-h-screen">
      <Navbar query={query} onSearch={setQuery} />

      {query.trim() ? (
        <div className="pt-24">
          <Row
            title={`Results for "${query}"`}
            movies={searchResults.filter((movie) => movie.poster_path)}
            onSelect={setSelectedMovie}
          />
        </div>
      ) : (
        <>
          <Hero movie={trending[0]} onSelect={setSelectedMovie} />
          <Row title="Trending Now" movies={trending} onSelect={setSelectedMovie} />
          <Row title="Top Rated" movies={topRated} onSelect={setSelectedMovie} />
        </>
      )}

      <Modal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </div>
  )
}