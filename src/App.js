import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
  setIsLoading(true);
  setError(null);
  try {
    const res =  await fetch('https://swapi.dev/api/films/');
    
    if (!res.ok) {
      throw new Error('Something went wrong!');
    }
   
    const data = await res.json(); 


    const tranformedMovies = data.results.map(movieData => {
    return {
      id: movieData.episode_id,
      title: movieData.title,
      openingText: movieData.opening_crawl,
      realeseDate: movieData.release_date,
     };
  });
   setMovies(tranformedMovies);
  } catch (err) {
    setError(err.message);
  }
  setIsLoading(false);
}, []);

useEffect( () => {
  fetchMoviesHandler();
}, [fetchMoviesHandler]);

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading &&  movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>Found no movies!</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
