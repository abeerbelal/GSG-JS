// Import required modules
import readline from 'readline';
import { readFile, writeFile } from './fileHandling.js';
import {filterMovies } from './movieManagement.js';
import { fetchMovieData } from './apiRequests.js';

// Create a readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to display the main menu
function displayMenu() {
  console.log('========= Movie Catalog CLI =========');
  console.log('1. Display Movie Catalog');
  console.log('2. Add New Movie');
  console.log('3. Update Movie Details');
  console.log('4. Delete Movie');
  console.log('5. Search Movies');
  console.log('6. Filter Movies');
  console.log('7. Fetch Movie Data');
  console.log('8. Exit');
  console.log('====================================');
  rl.question('Select an option: ', handleMenuOption);
}

// Function to handle user input for the main menu
function handleMenuOption(option) {
  switch (option) {
    case '1':
      displayMovieCatalog();
      break;
    case '2':
      addNewMovie();
      break;
    case '3':
      updateMovieDetails();
      break;
    case '4':
      deleteMovie();
      break;
    case '5':
      searchMoviesMenu();
      break;
    case '6':
      filterMoviesMenu();
      break;
    case '7':
      fetchMovieDataMenu();
      break;
    case '8':
      console.log('Exiting...');
      rl.close();
      break;
    default:
      console.log('Invalid option!');
      displayMenu();
      break;
  }
}

// Function to display the movie catalog
async function displayMovieCatalog() {
    try {
      const movies = await readFile('movies.json');
      console.log('===== Movie Catalog =====');
      movies.forEach((movie) => {
        console.log(`Title: ${movie.title}`);
        console.log(`Director: ${movie.director}`);
        console.log(`Year: ${movie.year}`);
        console.log(`Genre: ${movie.genre}`);
        console.log('---------------------------');
      });
    } catch (error) {
      console.error('Error reading movie catalog:', error);
    } finally {
      displayMenu();
    }
  }
  

  // Function to add a new movie
  async function addNewMovie() {
    try {
      const movies = await readFile('movies.json');
      
      rl.question('Enter the title: ', (title) => {
        rl.question('Enter the director: ', (director) => {
          rl.question('Enter the release year: ', (year) => {
            rl.question('Enter the genre: ', (genre) => {
              const newMovie = {
                title,
                director,
                year: parseInt(year),
                genre
              };
              movies.push(newMovie);
              
              writeFile('movies.json', movies)
                .then(() => {
                  console.log('Movie added successfully!');
                  rl.close();
                })
                .catch((error) => {
                  console.error('Error adding movie:', error);
                  rl.close();
                });
            });
          });
        });
      });
    } catch (error) {
      console.error('Error reading movie catalog:', error);
      rl.close();
    }
  }
  

// Function to update movie details
async function updateMovieDetails() {
    try {
      const movies = await readFile('movies.json');
      console.log('Movies:', movies);
  
      rl.question('Enter the movie title: ', (title) => {
        const movie = movies.find((movie) => movie.title === title);
        if (!movie) {
          console.log('Movie not found!');
          rl.close();
          return;
        }
  
        rl.question('Enter the new director: ', (director) => {
          rl.question('Enter the new release year: ', (year) => {
            rl.question('Enter the new genre: ', (genre) => {
              movie.director = director;
              movie.year = parseInt(year);
              movie.genre = genre;
  
              writeFile('movies.json', movies)
                .then(() => {
                  console.log('Movie details updated successfully!');
                  rl.close();
                })
                .catch((error) => {
                  console.error('Error updating movie details:', error);
                  rl.close();
                });
            });
          });
        });
      });
    } catch (error) {
      console.error('Error reading movie catalog:', error);
      rl.close();
    }
  }
  
  

// Function to delete a movie
async function deleteMovie() {
    try {
      const movies = await readFile('movies.json');
  
      rl.question('Enter the movie title to delete: ', (title) => {
        const updatedMovies = movies.filter((movie) => movie.title !== title);
  
        writeFile('movies.json', updatedMovies)
          .then(() => {
            console.log('Movie deleted successfully!');
            rl.close();
          })
          .catch((error) => {
            console.error('Error deleting movie:', error);
            rl.close();
          });
      });
    } catch (error) {
      console.error('Error reading movie catalog:', error);
      rl.close();
    }
  }
  
 
  
// Function to search movies by title, director, or genre
async function searchMoviesMenu() {
    console.log('======== Search Movies =========');
    rl.question('Enter search term: ', async (searchTerm) => {
      try {
        const movieData = await readFile('movies.json');
      
       const searchResults =  movieData.filter(
            (movie) =>
              movie.title.toLowerCase().includes(searchTerm) 
          );
        if (searchResults.length > 0) {
          console.log('===== Search Results =====');
          searchResults.forEach((movie) => {
            console.log(`Title: ${movie.title}`);
            console.log(`Director: ${movie.director}`);
            console.log(`Year: ${movie.year}`);
            console.log(`Genre: ${movie.genre}`);
            console.log('---------------------------');
          });
        } else {
          console.log('No movies found for the search term.');
        }
      } catch (error) {
        console.error('Error searching movies:', error);
      } finally {
        displayMenu();
      }
    });
  }
  
  async function filterMoviesMenu() {
    console.log('======== Filter Movies =========');
    console.log('1. Filter by Genre');
    console.log('2. Filter by Release Year');
    rl.question('Select an option: ', async (option) => {
      if (option === '1') {
        rl.question('Enter genre: ', async (genre) => {
          try {
            const movieData = await readFile('movies.json');
            const movies = JSON.parse(movieData); // Parse the movieData
  
            const filteredMovies = movies.filter((movie) =>
              movie.genre.toLowerCase().includes(genre.toLowerCase())
            );
  
            if (filteredMovies.length > 0) {
              console.log('===== Filtered Movies =====');
              filteredMovies.forEach((movie) => {
                console.log(`Title: ${movie.title}`);
                console.log(`Director: ${movie.director}`);
                console.log(`Year: ${movie.year}`);
                console.log(`Genre: ${movie.genre}`);
                console.log('---------------------------');
              });
            } else {
              console.log('No movies found for the selected genre.');
            }
          } catch (error) {
            console.error('Error filtering movies:', error);
          } finally {
            displayMenu();
          }
        });
      } else if (option === '2') {
        rl.question('Enter release year: ', async (year) => {
          try {
            const movieData = await readFile('movies.json');
            const movies = JSON.parse(movieData); // Parse the movieData
  
            const filteredMovies = movies.filter(
              (movie) => movie.year === year
            );
  
            if (filteredMovies.length > 0) {
              console.log('===== Filtered Movies =====');
              filteredMovies.forEach((movie) => {
                console.log(`Title: ${movie.title}`);
                console.log(`Director: ${movie.director}`);
                console.log(`Year: ${movie.year}`);
                console.log(`Genre: ${movie.genre}`);
                console.log('---------------------------');
              });
            } else {
              console.log('No movies found for the selected release year.');
            }
          } catch (error) {
            console.error('Error filtering movies:', error);
          } finally {
            displayMenu();
          }
        });
      } else {
        console.log('Invalid option!');
        displayMenu();
      }
    });
  }
  
  

  async function fetchMovieDataMenu() {
    console.log('======== Fetch Movie Data =========');
    rl.question('Enter movie title: ', async (title) => {
      try {
        const movies = await fetchMovieData(title);
        // Write the movies data to a file or perform any desired operation
        console.log('Movie data fetched successfully!', movies);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      } finally {
        displayMenu();
      }
    });
  }
  
  // Call fetchMovieDataMenu or any other desired function
  

// Start the application
displayMenu();
