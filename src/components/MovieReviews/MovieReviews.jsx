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
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDRjN2Q5YTFmMzRiNzM0ZTU5YmRlZmNjMzI0M2ZlZCIsIm5iZiI6MTcyNDE4NjM3NC4yMjUwNDYsInN1YiI6IjY2YmZiNjJlNTA1MzJkYWIzZDQ4OWNhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aLLl57GGpRPEiyBKqKLYLZlz_-CpJxhFrFTLGWaSHmc',
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
