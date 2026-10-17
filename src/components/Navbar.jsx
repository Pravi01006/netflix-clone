export default function Navbar({ query, onSearch }) {
  return (
    <nav className="fixed top-0 w-full z-10 flex items-center justify-between px-8 py-4 bg-gradient-to-b from-black to-transparent">
      <h1 className="text-red-600 text-3xl font-bold">NETFLIX</h1>
      <div className="flex items-center gap-4">
        <input
          type="text"
          value={query}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search movies..."
          className="bg-black/70 text-white border border-gray-500 rounded px-3 py-1 outline-none focus:border-white"
        />
        <button className="bg-red-600 text-white px-4 py-1 rounded">Sign In</button>
      </div>
    </nav>
  )
}