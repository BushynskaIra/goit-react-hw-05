import { useState, useEffect } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieDetailsPage.module.css';

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLinkHref = location.state?.from || '/movies';

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/trending/movie/day${movieId}`, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZGU0MTYzYzNkMjliODRlN2Y1ZjQ0YTk3ZTMzNDdkZiIsIm5iZiI6MTcyNDI2OTY4My42NTQ3MzEsInN1YiI6IjY2YmZiNjJlNTA1MzJkYWIzZDQ4OWNhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AGGO737iief1pTSQeXBOm0iuTEymPT9L79puKrHMQ3A',
        },
      })
      .then(response => setMovie(response.data))
      .catch(error => console.error(error));
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <Link to={backLinkHref} className={styles.backButton}>
        Go back
      </Link>
      <div className={styles.movieInfo}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={styles.poster}
        />
        <div className={styles.details}>
          <h2 className={styles.title}>{movie.title}</h2>
          <p className={styles.overview}>{movie.overview}</p>
          <p className={styles.subTitle}>Genres:</p>
          <ul className={styles.genres}>
            {movie.genres.map(genre => (
              <li key={genre.id} className={styles.genre}>
                {genre.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.additionalInfo}>
        <h3>Additional Information</h3>
        <ul>
          <li>
            <Link to="cast" state={{ from: backLinkHref }}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={{ from: backLinkHref }}>
              Reviews
            </Link>
          </li>
        </ul>
        <Outlet />
      </div>
    </div>
  );
}

export default MovieDetailsPage;
