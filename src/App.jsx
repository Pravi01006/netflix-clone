import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Row from './components/Row'
import Modal from './components/Modal'
import MoodFilter from './components/MoodFilter'
import {
  getTrending,
  getTopRated,
  searchMovies,
  getMoviesByGenre,
} from './services/tmdb'

export default function App() {
  const [trending, setTrending] = useState([])
  const [topRated, setTopRated] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [activeMood, setActiveMood] = useState(null)
  const [moodMovies, setMoodMovies] = useState([])

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

  useEffect(() => {
    if (!activeMood) return
    getMoviesByGenre(activeMood.genres).then(setMoodMovies)
  }, [activeMood])

  function handleSurprise() {
    const allMovies = [...trending, ...topRated]
    if (allMovies.length === 0) return
    const randomIndex = Math.floor(Math.random() * allMovies.length)
    setSelectedMovie(allMovies[randomIndex])
  }

  return (
    <div className="bg-black min-h-screen">
      <Navbar query={query} onSearch={setQuery} onSurprise={handleSurprise} />

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
          <MoodFilter activeMood={activeMood} onSelectMood={setActiveMood} />
          {activeMood && (
            <Row
              title={`${activeMood.label} picks`}
              movies={moodMovies.filter((movie) => movie.poster_path)}
              onSelect={setSelectedMovie}
            />
          )}
          <Row title="Trending Now" movies={trending} onSelect={setSelectedMovie} />
          <Row title="Top Rated" movies={topRated} onSelect={setSelectedMovie} />
        </>
      )}

      <Modal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </div>
  )
}