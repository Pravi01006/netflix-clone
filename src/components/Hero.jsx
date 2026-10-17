export default function Hero({ movie, onSelect }) {
  if (!movie) return null

  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`

  return (
    <header
      className="h-[70vh] flex items-end bg-cover bg-center"
      style={{ backgroundImage: `url(${backdropUrl})` }}
    >
      <div className="w-full p-8 bg-gradient-to-t from-black to-transparent">
        <h1 className="text-5xl font-bold text-white mb-3">{movie.title}</h1>
        <p className="text-gray-300 max-w-md mb-4 line-clamp-3">
          {movie.overview}
        </p>
        <button
          onClick={() => onSelect(movie)}
          className="bg-white text-black px-6 py-2 rounded mr-2 font-semibold"
        >
          Play
        </button>
        <button
          onClick={() => onSelect(movie)}
          className="bg-gray-600 text-white px-6 py-2 rounded"
        >
          More Info
        </button>
      </div>
    </header>
  )
}