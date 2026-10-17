export default function MovieCard({ movie, onSelect }) {
  const imageUrl = `https://image.tmdb.org/t/p/w300${movie.poster_path}`

  return (
    <img
      src={imageUrl}
      alt={movie.title}
      onClick={() => onSelect(movie)}
      className="min-w-[160px] h-60 object-cover rounded cursor-pointer hover:scale-105 transition-transform"
    />
  )
}