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
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDRjN2Q5YTFmMzRiNzM0ZTU5YmRlZmNjMzI0M2ZlZCIsIm5iZiI6MTcyNDE4NjM3NC4yMjUwNDYsInN1YiI6IjY2YmZiNjJlNTA1MzJkYWIzZDQ4OWNhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aLLl57GGpRPEiyBKqKLYLZlz_-CpJxhFrFTLGWaSHmc',
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
