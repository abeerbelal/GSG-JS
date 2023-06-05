

export function filterMovies(movies, filterOptions) {
  let filteredMovies = movies;

  if (filterOptions.genre) {
    filteredMovies = filteredMovies.filter((movie) =>
      movie.genre.toLowerCase().includes(filterOptions.genre.toLowerCase())
    );
  }

  if (filterOptions.releaseYear) {
    filteredMovies = filteredMovies.filter((movie) =>
      getReleaseYear(movie.release_date) === filterOptions.releaseYear
    );
  }

  return filteredMovies;
}

function getReleaseYear(dateString) {
  const releaseDate = new Date(dateString);
  return releaseDate.getFullYear();
}
