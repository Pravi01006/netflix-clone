const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export async function getTrending() {
  const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`)
  const data = await response.json()
  return data.results
}

export async function getTopRated() {
  const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`)
  const data = await response.json()
  return data.results
}

export async function getTrailerKey(movieId) {
  const response = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`)
  const data = await response.json()
  const trailer = data.results.find(
    (video) => video.site === 'YouTube' && video.type === 'Trailer'
  )
  return trailer ? trailer.key : null
}

export async function searchMovies(query) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  )
  const data = await response.json()
  return data.results
}

export async function getMoviesByGenre(genreIds) {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${encodeURIComponent(genreIds)}&sort_by=popularity.desc`
  )
  const data = await response.json()
  return data.results
}