const moods = [
  { label: 'Funny', genres: '35' },
  { label: 'Scary', genres: '27' },
  { label: 'Relaxing', genres: '16|10751' },
  { label: 'Romantic', genres: '10749' },
  { label: 'Rom-Com', genres: '10749,35' },
  { label: 'Emotional', genres: '18' },
]

export default function MoodFilter({ activeMood, onSelectMood }) {
  return (
    <div className="px-8 pt-4 pb-2 flex flex-wrap items-center gap-2">
      <span className="text-white font-semibold mr-2">Mood:</span>
      {moods.map((mood) => (
        <button
          key={mood.label}
          onClick={() =>
            onSelectMood(activeMood?.label === mood.label ? null : mood)
          }
          className={`px-4 py-1 rounded-full border ${
            activeMood?.label === mood.label
              ? 'bg-red-600 border-red-600 text-white'
              : 'border-gray-500 text-gray-300 hover:border-white hover:text-white'
          }`}
        >
          {mood.label}
        </button>
      ))}
    </div>
  )
}