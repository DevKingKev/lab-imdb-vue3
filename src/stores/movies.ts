import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export type MovieListItemType = 'movie' | 'series' | 'episode' | 'game';

export interface MovieListItem {
  Title: string;
  Year: number;
  imdbID: string;
  Type: MovieListItemType;
  Poster: string;
  isFavourite?: boolean;
}

export interface MovieRating {
  Source: string;
  Value: string;
}


export interface MovieDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: MovieRating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: MovieListItemType;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}


export const useMovieStore = defineStore('movies', () => {

  const searchData = ref<MovieListItem[]>([]);
  searchData.value = [
    {
      'Title': 'Rambo',
      'Year': '2008',
      'imdbID': 'tt0462499',
      'Type': 'movie',
      'Poster': 'https://m.media-amazon.com/images/M/MV5BMTI5Mjg1MzM4NF5BMl5BanBnXkFtZTcwNTAyNzUzMw@@._V1_SX300.jpg',
    },
    {
      'Title': 'Rambo: First Blood Part II',
      'Year': '1985',
      'imdbID': 'tt0089880',
      'Type': 'movie',
      'Poster': 'https://m.media-amazon.com/images/M/MV5BNTNiMzUyZjQtY2RlOS00MjIxLWFlMjAtNjI1NjkzY2JjN2M3XkEyXkFqcGc@._V1_SX300.jpg',
    },
    {
      'Title': 'Rambo III',
      'Year': '1988',
      'imdbID': 'tt0095956',
      'Type': 'movie',
      'Poster': 'https://m.media-amazon.com/images/M/MV5BMjNkMmI5OGEtNzJhMC00YzAzLWE4MzItM2IzNWFjZjdmZmJhXkEyXkFqcGc@._V1_SX300.jpg',
    },
    {
      'Title': 'Rambo: Last Blood',
      'Year': '2019',
      'imdbID': 'tt1206885',
      'Type': 'movie',
      'Poster': 'https://m.media-amazon.com/images/M/MV5BMWM5NzVlNzMtMDNhNy00OGMxLTlmYTktOGIwMzRlZmE0ZWVmXkEyXkFqcGc@._V1_SX300.jpg',
    },
    {
      'Title': 'Rambo',
      'Year': '1986',
      'imdbID': 'tt0222619',
      'Type': 'series',
      'Poster': 'https://m.media-amazon.com/images/M/MV5BNWI2ZTFmZWYtNzk4Ny00YWEzLTgxMDAtYTdjNWI2NmExMjM5XkEyXkFqcGc@._V1_SX300.jpg',
    },
    {
      'Title': 'Arthur Rambo',
      'Year': '2021',
      'imdbID': 'tt10951972',
      'Type': 'movie',
      'Poster': 'https://m.media-amazon.com/images/M/MV5BODFmYmU1ZjMtZDlkOS00YjM5LWJkMDAtMmNiMWQ1NjY0ZWRhXkEyXkFqcGc@._V1_SX300.jpg',
    },
    {
      'Title': 'Rambo III',
      'Year': '1989',
      'imdbID': 'tt0301766',
      'Type': 'game',
      'Poster': 'https://m.media-amazon.com/images/M/MV5BNDE3Y2NkODgtMzhmNi00M2M3LTgxMTAtNjBhNTJiOTdmZDIzXkEyXkFqcGdeQXVyMjY3MjUzNDk@._V1_SX300.jpg',
    },
    {
      'Title': 'Rambo',
      'Year': '2012',
      'imdbID': 'tt3107798',
      'Type': 'movie',
      'Poster': 'https://m.media-amazon.com/images/M/MV5BMzYyYzdlZTMtOWQyYy00ZjU3LThkZjctZWY1NjU0YWJmODZjXkEyXkFqcGc@._V1_SX300.jpg',
    },
    {
      'Title': 'Rambo: First Blood Part II',
      'Year': '1986',
      'imdbID': 'tt0301768',
      'Type': 'game',
      'Poster': 'https://m.media-amazon.com/images/M/MV5BOWUzMDE1NTktMTU0OS00NTE3LWE2NzItMzA3MGM2NzdkYTJlXkEyXkFqcGdeQXVyMjY3MjUzNDk@._V1_SX300.jpg',
    },
    {
      'Title': 'Rambo',
      'Year': '1987',
      'imdbID': 'tt0301765',
      'Type': 'game',
      'Poster': 'https://m.media-amazon.com/images/M/MV5BYmMxZGVjYzYtNWY4ZC00ZjAwLWFjNWQtOWFjNGEzNDQ2ZDM3XkEyXkFqcGdeQXVyMTgwOTE5NDk@._V1_SX300.jpg',
    },
  ];
  const favouriteMoviesData = ref<MovieListItem[]>([]);
  favouriteMoviesData.value = [
    {
      'Title': 'Rambo',
      'Year': '2008',
      'imdbID': 'tt0462499',
      'Type': 'movie',
      'Poster': 'https://m.media-amazon.com/images/M/MV5BMTI5Mjg1MzM4NF5BMl5BanBnXkFtZTcwNTAyNzUzMw@@._V1_SX300.jpg',
    },
    {
      'Title': 'Rambo: First Blood Part II',
      'Year': '1985',
      'imdbID': 'tt0089880',
      'Type': 'movie',
      'Poster': 'https://m.media-amazon.com/images/M/MV5BNTNiMzUyZjQtY2RlOS00MjIxLWFlMjAtNjI1NjkzY2JjN2M3XkEyXkFqcGc@._V1_SX300.jpg',
    }];

  const movies = getMovies();
  const favouriteMovies = getFavouriteMovies();
  const mockMovie: MovieDetails = {
    'Title': 'Rambo',
    'Year': '2008',
    'Rated': 'R',
    'Released': '25 Jan 2008',
    'Runtime': '92 min',
    'Genre': 'Action, Adventure, Thriller',
    'Director': 'Sylvester Stallone',
    'Writer': 'Art Monterastelli, Sylvester Stallone, David Morrell',
    'Actors': 'Sylvester Stallone, Julie Benz, Matthew Marsden',
    'Plot': 'In Thailand, John Rambo joins a group of mercenaries to venture into war-torn Burma, and rescue a group of Christian aid workers who were kidnapped by the ruthless local infantry unit.',
    'Language': 'English, Burmese, Thai',
    'Country': 'Germany, United States',
    'Awards': '1 win & 1 nomination',
    'Poster': 'https://m.media-amazon.com/images/M/MV5BMTI5Mjg1MzM4NF5BMl5BanBnXkFtZTcwNTAyNzUzMw@@._V1_SX300.jpg',
    'Ratings': [
      {
        'Source': 'Internet Movie Database',
        'Value': '7.0/10',
      },
      {
        'Source': 'Rotten Tomatoes',
        'Value': '38%',
      },
      {
        'Source': 'Metacritic',
        'Value': '46/100',
      },
    ],
    'Metascore': '46',
    'imdbRating': '7.0',
    'imdbVotes': '248,136',
    'imdbID': 'tt0462499',
    'Type': 'movie',
    'DVD': 'N/A',
    'BoxOffice': '$42,754,105',
    'Production': 'N/A',
    'Website': 'N/A',
    'Response': 'True',
  };

  function getMovies() {
    return searchData.value.filter((movie) => movie.Type === 'movie');
  }

  function getFavouriteMovies() {
    return favouriteMoviesData;
  }

  function getFavouriteMovieIDs(): string[] {
    return favouriteMoviesData.value.map((movie) => movie.imdbID);
  }

  function getMovieByID(id: string): MovieDetails | undefined {
    const found = searchData.value.find((movie) => movie.imdbID === id);
    if (found) {
      return mockMovie;
    } else {
      return undefined;
    }
  }

  function isFavouriteMovie(id: string): boolean {
    return getFavouriteMovieIDs().includes(id);
  }


  return {searchData, movies, favouriteMovies, getMovieByID, getFavouriteMovies};
});
