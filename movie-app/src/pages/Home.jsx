import MovieCard from '../components/MovieCard'
import {useState} from 'react'
import '../css/Home.css'


function Home() {

    const [searchQuery, setSearchQuery] = useState('')

    const movies = [
        {id: 1, title: 'The Matrix', release_date: '1999'},
        {id: 2, title: 'Terminator', release_date: '2004'},
        {id: 3, title: 'John Wick', release_date: '2020'},
    ]

    const handleSearch = (e) => {
        e.preventDefault()
        alert(searchQuery)
    }

  return (
    <div className='home'>
        <form onSubmit={handleSearch} className='search-form'>
            <input type="text" placeholder='Search for movies...' 
            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} 
            className='search-input' />
            <button type='submit' className='search-button'>Search</button>
        </form>
      <div className="movies-grid">
       {movies.map((movie) => ( 
        <MovieCard key={movie.id} movie={movie} />
       ))}
      </div>
    </div>
  )
}

export default Home
