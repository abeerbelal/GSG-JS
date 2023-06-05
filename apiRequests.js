
export async function fetchMovieData(title) {
  try {
    const apiKey = 'e18dd5c40c543aa873533e4755659b63';
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(title)}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Failed to fetch movie data from the API.');
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    throw new Error('Failed to fetch movie data from the API.');
  }
}
