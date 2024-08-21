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
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZGU0MTYzYzNkMjliODRlN2Y1ZjQ0YTk3ZTMzNDdkZiIsIm5iZiI6MTcyNDI2OTY4My42NTQ3MzEsInN1YiI6IjY2YmZiNjJlNTA1MzJkYWIzZDQ4OWNhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AGGO737iief1pTSQeXBOm0iuTEymPT9L79puKrHMQ3A',
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
