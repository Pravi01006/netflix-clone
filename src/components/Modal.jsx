import { useState, useEffect } from 'react'
import { getTrailerKey } from '../services/tmdb'

export default function Modal({ movie, onClose }) {
  const [trailer, setTrailer] = useState({ movieId: null, key: null })

  useEffect(() => {
    if (!movie) return
    getTrailerKey(movie.id).then((key) =>
      setTrailer({ movieId: movie.id, key })
    )
  }, [movie])

  if (!movie) return null

  const trailerKey = trailer.movieId === movie.id ? trailer.key : null
  const imageUrl = `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`

  return (
    <div
      className="fixed inset-0 z-20 bg-black/80 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-zinc-900 text-white rounded-lg max-w-2xl w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {trailerKey ? (
          <iframe
            className="w-full aspect-video"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title={movie.title}
            allowFullScreen
          />
        ) : (
          <img src={imageUrl} alt={movie.title} className="w-full" />
        )}
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
          <p className="text-green-500 mb-2">
            Rating: {movie.vote_average.toFixed(1)} / 10
          </p>
          <p className="text-gray-300 mb-4">{movie.overview}</p>
          <button
            onClick={onClose}
            className="bg-red-600 px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}