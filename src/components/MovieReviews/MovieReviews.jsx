import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieReviews.module.css';

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZGU0MTYzYzNkMjliODRlN2Y1ZjQ0YTk3ZTMzNDdkZiIsIm5iZiI6MTcyNDI2OTY4My42NTQ3MzEsInN1YiI6IjY2YmZiNjJlNTA1MzJkYWIzZDQ4OWNhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AGGO737iief1pTSQeXBOm0iuTEymPT9L79puKrHMQ3A',
        },
      })
      .then(response => setReviews(response.data.results))
      .catch(error => console.error(error));
  }, [movieId]);

  return (
    <ul className={styles.list}>
      {reviews.map(review => (
        <li key={review.id} className={styles.item}>
          <p><strong>{review.author}</strong></p>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}

export default MovieReviews;
