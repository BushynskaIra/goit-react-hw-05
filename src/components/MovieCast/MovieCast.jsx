import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieCast.module.css';

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZGU0MTYzYzNkMjliODRlN2Y1ZjQ0YTk3ZTMzNDdkZiIsIm5iZiI6MTcyNDI2OTY4My42NTQ3MzEsInN1YiI6IjY2YmZiNjJlNTA1MzJkYWIzZDQ4OWNhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AGGO737iief1pTSQeXBOm0iuTEymPT9L79puKrHMQ3A',
        },
      })
      .then(response => setCast(response.data.cast))
      .catch(error => console.error(error));
  }, [movieId]);

  return (
    <ul className={styles.list}>
      {cast.map(actor => (
        <li key={actor.id} className={styles.item}>
          {actor.name} as {actor.character}
        </li>
      ))}
    </ul>
  );
}

export default MovieCast;
