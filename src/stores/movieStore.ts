import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export type MovieListItemType = 'movie' | 'series' | 'episode' | 'game';

export interface MovieListItem {
  Title: string;
  Year: string;
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
  isFavourite?: boolean;
}

export interface SearchStatus {
  searchedForMovie: boolean;
  queryCompleted: boolean;
  queryReturnedEmpty: boolean;
}

const omdpAPIURL = 'http://www.omdbapi.com/';
const omdbAPIKey = '30ba7fc1';

export const useMovieStore = defineStore( 'movies', () => {
  const searchData = ref<MovieListItem[]>( [] );

  const searchText = ref( '' );
  const searches = ref<string[]>( [] );
  const apiErrors = ref<string[]>( [] );
  const movies = ref( getMovies() );
  const isQuerying = ref( false );
  const movieToDetail = ref<MovieDetails | undefined>( undefined );
  const favouriteMovies = ref<MovieListItem[]>( [] );
  populateFavouriteMoviesList();

  const searchStatus = ref<SearchStatus>( {
    searchedForMovie: false,
    queryCompleted: false,
    queryReturnedEmpty: false,
  } );

  function filterForMovies ( data: MovieListItem[] ): MovieListItem[] {
    return data.filter( ( movie ) => movie.Type === 'movie' );
  }

  function getMovies () {
    return filterForMovies( searchData.value );
  }

  const omdbQuery = async ( searchText: string ) => {
    try {
      const response = await axios.get( `${omdpAPIURL}?apikey=${omdbAPIKey}&s=${searchText}` );

      isQuerying.value = false;
      if ( response.data.Response === 'True' ) {
        apiErrors.value = [];

        if ( response.data?.Search ) {
          searchData.value = filterForMovies( response.data.Search );
          searchData.value.sort( ( a, b ) => a.Year.localeCompare( b.Year ) );

          favouriteMovies.value.forEach( ( favourite ) => {
            const found = searchData.value.find( ( movie ) => movie.imdbID === favourite.imdbID );
            if ( found ) {
              found.isFavourite = true;
            }
          } );

          movies.value = getMovies();
        }

      } else {
        const errorMessage = `Movie not found. Make sure you have the right spelling!`;
        apiErrors.value.push( errorMessage );
      }
    } catch ( error: any ) {
      console.error( 'movieStore -> omdbQuery :', error.toString() );
      const errorMessage = `Failed in fetching list of movies, "${error.toString()}". Try again later!`;
      apiErrors.value.push( errorMessage );
    }
  };

  const omdbQueryMovieById = async ( imdbID: string ) => {
    movieToDetail.value = undefined;
    try {
      isQuerying.value = true;
      const response = await axios.get( `${omdpAPIURL}?apikey=${omdbAPIKey}&i=${imdbID}` );

      isQuerying.value = false;
      if ( response.data.Response === 'True' ) {
        apiErrors.value = [];
        const isFavourited = favouriteMovies.value.some( ( movie ) => movie.imdbID === imdbID );
        if ( isFavourited ) {
          movieToDetail.value = { ...response.data, isFavourite: isFavourited };
        } else {
          movieToDetail.value = { ...response.data };
        }

        return response.data;
      } else {
        const errorMessage = `Movie not found. Make sure you have the right imdb id for the movie!`;
        apiErrors.value.push( errorMessage );
      }
    } catch ( error: any ) {
      console.error( 'movieStore -> omdbQueryMovieById :', error.toString() );
      const errorMessage = `Failed to fetch movie, "${error.toString()}".  Check if the movie exists and try again later!`;
      apiErrors.value.push( errorMessage );
    }
  };

  function getSearchText () {
    return searchText.value;
  }

  function updateSearchText ( text: string ) {
    searchText.value = text;

    if ( text.length > 2 ) {
      // Add search to history
      addSearchToHistory( text );

      isQuerying.value = true;
      omdbQuery( text );
      resetSearchData();
    } else {
      resetSearchData();
    }
  }

  function addSearchToHistory ( searchTerm: string ) {
    // Check if search term already exists in the array
    const existingIndex = searches.value.indexOf( searchTerm );

    if ( existingIndex > -1 ) {
      // Remove the existing search term from its current position
      searches.value.splice( existingIndex, 1 );
    }

    // Add the search term to the front of the array
    searches.value.unshift( searchTerm );
  }

  function resetSearchData () {
    searchData.value = [];
    movies.value = [];
  }

  function addMovieToFavourites ( movie: MovieListItem ) {
    const found = favouriteMovies.value.find( ( m ) => m.imdbID === movie.imdbID );
    movie.isFavourite = true;

    updateMovieReferencesForFavourite( movie, true );
    if ( !found ) {
      favouriteMovies.value.push( movie );
    }
    favouriteMovies.value = favouriteMovies.value.sort( ( a, b ) => a.Year.localeCompare( b.Year ) );

    localStorage.setItem( 'favouriteMovies', JSON.stringify( favouriteMovies.value ) );
  }

  function removeMovieFromFavourites ( movie: MovieListItem ) {
    movie.isFavourite = false;
    const index = favouriteMovies.value.findIndex( ( m ) => m.imdbID === movie.imdbID );

    if ( index > -1 ) {
      favouriteMovies.value.splice( index, 1 );
    }
    updateMovieReferencesForFavourite( movie, false );

    localStorage.setItem( 'favouriteMovies', JSON.stringify( favouriteMovies.value ) );
  }

  function populateFavouriteMoviesList () {
    const storedFavourites = localStorage.getItem( 'favouriteMovies' );
    if ( storedFavourites ) {
      favouriteMovies.value = Array.from( JSON.parse( storedFavourites ) as MovieListItem[] ).sort( ( a: MovieListItem, b: MovieListItem ) => a.Year.localeCompare( b.Year ) );
    } else {
      localStorage.setItem( 'favouriteMovies', JSON.stringify( [] ) );
    }
  }

  function updateMovieReferencesForFavourite ( movie: MovieListItem, value: boolean ) {
    if ( movieToDetail?.value?.imdbID === movie.imdbID ) {
      movieToDetail.value.isFavourite = value;
    }

    if ( movies.value ) {
      const found = movies.value.find( ( m ) => m.imdbID === movie.imdbID );
      if ( found ) {
        found.isFavourite = value;
      }
    }
  }

  return {
    searchData,
    searchStatus,
    searches,
    movies,
    movieToDetail,
    favouriteMovies,
    isQuerying,
    addMovieToFavourites,
    removeMovieFromFavourites,
    omdbQueryMovieById,
    updateSearchText,
    getSearchText,
    resetSearchData,
    addSearchToHistory,
    apiErrors,
  };
} );
