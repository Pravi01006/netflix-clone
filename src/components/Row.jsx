import MovieCard from './MovieCard'

export default function Row({ title, movies, onSelect }) {
  return (
    <div className="px-8 mb-6">
      <h2 className="text-white text-xl font-semibold mb-2">{title}</h2>
      <div className="flex gap-3 overflow-x-scroll">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onSelect={onSelect} />
        ))}
      </div>
    </div>
  )
}