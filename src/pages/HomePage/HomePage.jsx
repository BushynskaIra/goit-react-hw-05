import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import styles from './HomePage.module.css';

function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get('https://api.themoviedb.org/3/trending/movie/day', {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDRjN2Q5YTFmMzRiNzM0ZTU5YmRlZmNjMzI0M2ZlZCIsIm5iZiI6MTcyNDE4NjM3NC4yMjUwNDYsInN1YiI6IjY2YmZiNjJlNTA1MzJkYWIzZDQ4OWNhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aLLl57GGpRPEiyBKqKLYLZlz_-CpJxhFrFTLGWaSHmc',
        },
      })
      .then(response => setMovies(response.data.results))
      .catch(error => console.error('Error fetching trending movies:', error));
  }, []);

  return (
    <div className={styles.container}>
      <h1>Trending Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
}

export default HomePage;
