import './App.css'
import MovieCard from './components/MovieCard'

function App() {

  return (
    <>
      <MovieCard movie = {{title: 'The Matrix', release_date: '1999'}}/>
      <MovieCard movie = {{title: 'The Matrix', release_date: '2004'}}/>
    </>
  )
}

export default App
