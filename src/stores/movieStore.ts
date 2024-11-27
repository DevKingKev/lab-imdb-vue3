import { ref, computed, watch } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

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

const omdpAPIURL = 'http://www.omdbapi.com/';
const omdbAPIKey = '30ba7fc1';

export const useMovieStore = defineStore( 'movies', () => {

  const searchData = ref<MovieListItem[]>( [] );
  const favouriteMoviesData = ref<MovieListItem[]>( [] );

  const searchText = ref( '' );
  const apiErrors = ref<string[]>( [] );
  const movies = ref( getMovies() );
  const isQuerying = ref(false);
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

  function filterForMovies ( data: MovieListItem[] ): MovieListItem[] {
    return data.filter( ( movie ) => movie.Type === 'movie' );
  }

  function getMovies () {
    return filterForMovies( searchData.value );
  }

  function getFavouriteMovies () {
    return favouriteMoviesData;
  }

  function getFavouriteMovieIDs (): string[] {
    return favouriteMoviesData.value.map( ( movie ) => movie.imdbID );
  }

  function getMovieByID ( id: string ): MovieDetails | undefined {
    const found = searchData.value.find( ( movie ) => movie.imdbID === id );
    if ( found )
    {
      return mockMovie;
    } else
    {
      return undefined;
    }
  }

  const omdbQuery = async ( searchText: string ) => {
    try
    {
      const response = await axios.get( `${omdpAPIURL}?apikey=${omdbAPIKey}&s=${searchText}` );
      console.info( 'movieStore omdbQuery response:', response );
      isQuerying.value = false;
      if(response.data.Response === 'True'){
        if (response.data?.Search) {

          searchData.value = filterForMovies(response.data.Search);
          movies.value = getMovies();
          console.info('movieStore searchData:', searchData.value, 'movies:', movies.value);
        }
      }    else{
        // throw new Error(response.data.Error);
      }
    } catch ( error )
    {

      console.error( 'Error fetching data:', error );
      apiErrors.value.push( error );
    }
  };

  function isFavouriteMovie ( id: string ): boolean {
    return getFavouriteMovieIDs().includes( id );
  }

  function getSearchText () {
    return searchText.value;
  }

  function updateSearchText ( text: string ) {
    searchText.value = text;
    console.info( 'movieStore searchText:', searchText.value );
    if ( text.length > 2 )
    {
      isQuerying.value = true;
      omdbQuery( text ) ;
      resetSearchData();
    }  else{
      resetSearchData();
    }
  }

  function resetSearchData() {
    searchData.value = [];
    movies.value = [];
  }

  watch( [movies], ( mutation: any, state: any, some: any ) => {
    console.info( 'movieStore -> watch->count:',
      '\nmovies: ', movies,
      '\nmutation: ', mutation,
      '\nstate:', state,
      '\nsome:', some );
  } );


  return {
    searchData,
    movies,
    favouriteMovies,
    isQuerying,
    getMovieByID,
    getFavouriteMovies,
    updateSearchText,
    getSearchText,
    resetSearchData,
    apiErrors,
  };
} );
