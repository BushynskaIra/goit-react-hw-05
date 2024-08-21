import { useState } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

function MoviesPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .get('https://api.themoviedb.org/3/search/movie', {
        params: { query },
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDRjN2Q5YTFmMzRiNzM0ZTU5YmRlZmNjMzI0M2ZlZCIsIm5iZiI6MTcyNDE4NjM3NC4yMjUwNDYsInN1YiI6IjY2YmZiNjJlNTA1MzJkYWIzZDQ4OWNhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aLLl57GGpRPEiyBKqKLYLZlz_-CpJxhFrFTLGWaSHmc',
        },
      })
      .then(response => setMovies(response.data.results))
      .catch(error => console.error(error));
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className={styles.input}
          placeholder="Search movies..."
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
}

export default MoviesPage;
