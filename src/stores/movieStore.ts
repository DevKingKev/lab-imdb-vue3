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

interface SearchStatus {
  searchedForMovie: boolean;
  queryCompleted: boolean;
  queryReturnedEmpty: boolean;
}

const omdpAPIURL = 'http://www.omdbapi.com/';
const omdbAPIKey = '30ba7fc1';

export const useMovieStore = defineStore('movies', () => {

  const searchData = ref<MovieListItem[]>([]);
  // const favouriteMoviesData = ref<MovieListItem[]>([]);
  const storedFavourites = localStorage.getItem('favouriteMovies');


  const searchText = ref('');
  const apiErrors = ref<string[]>([]);
  const movies = ref(getMovies());
  const isQuerying = ref(false);
  const movieToDetail = ref<MovieDetails | undefined>(undefined);

  const favouriteMovies = ref<MovieListItem[]>([]);


  if (storedFavourites) {
    favouriteMovies.value =  Array.from(JSON.parse(storedFavourites)).sort((a, b) => a.Year.localeCompare(b.Year));
  } else {
    localStorage.setItem('favouriteMovies', JSON.stringify([]));
  }
  console.info('movieStore storedFavourites:', storedFavourites,
    '\nfavouriteMovies:', favouriteMovies.value);
  const searchStatus: SearchStatus = ref({
    searchedForMovie: false,
    queryCompleted: false,
    queryReturnedEmpty: false,
  });
  // favouriteMoviesData.value = [
  //   {
  //     'Title': 'Rambo',
  //     'Year': '2008',
  //     'imdbID': 'tt0462499',
  //     'Type': 'movie',
  //     'Poster': 'https://m.media-amazon.com/images/M/MV5BMTI5Mjg1MzM4NF5BMl5BanBnXkFtZTcwNTAyNzUzMw@@._V1_SX300.jpg',
  //   },
  //   {
  //     'Title': 'Rambo: First Blood Part II',
  //     'Year': '1985',
  //     'imdbID': 'tt0089880',
  //     'Type': 'movie',
  //     'Poster': 'https://m.media-amazon.com/images/M/MV5BNTNiMzUyZjQtY2RlOS00MjIxLWFlMjAtNjI1NjkzY2JjN2M3XkEyXkFqcGc@._V1_SX300.jpg',
  //   }];


  function filterForMovies(data: MovieListItem[]): MovieListItem[] {
    return data.filter((movie) => movie.Type === 'movie');
  }

  function getMovies() {
    return filterForMovies(searchData.value);
  }

  // function ensureUniqueList(data: MovieListItem[]): MovieListItem[] {
  //   const uniqueList = Array.from(new Set(favouriteMovies.value.map(m => m.imdbID)))
  //     .map(id => favouriteMovies.value.find(m => m.imdbID === id));
  //   return uniqueList;
  // }

  function getFavouriteMovies() {
    return favouriteMovies;
  }

  function getFavouriteMovieIDs(): string[] {
    return favouriteMovies.value.map((movie) => movie.imdbID);
  }

  // function getMovieByID(id: string): MovieDetails | undefined {
  //   const found = searchData.value.find((movie) => movie.imdbID === id);
  //   if (found) {
  //     return mockMovie;
  //   } else {
  //     return undefined;
  //   }
  // }

  const omdbQuery = async (searchText: string) => {
    try {
      const response = await axios.get(`${omdpAPIURL}?apikey=${omdbAPIKey}&s=${searchText}`);
      console.info('movieStore omdbQuery response:', response);
      isQuerying.value = false;
      if (response.data.Response === 'True') {
        if (response.data?.Search) {

          searchData.value = filterForMovies(response.data.Search);
          searchData.value.sort((a, b) => a.Year.localeCompare(b.Year));

          favouriteMovies.value.forEach((favourite) => {
            const found = searchData.value.find((movie) => movie.imdbID === favourite.imdbID);
            if (found) {
              found.isFavourite = true;
            }
          });

          movies.value = getMovies();
          console.info('movieStore searchData:', searchData.value, 'movies:', movies.value);
        }
      } else {
        throw new Error(response.data.Error);
      }
    } catch (error) {

      // console.error( 'Error fetching data:', error );
      apiErrors.value.push(error);
    }
  };

  const omdbQueryMovieById = async (imdbID: string): Promise<MovieDetails> => {
    movieToDetail.value = undefined;
    try {
      isQuerying.value = true;
      const response = await axios.get(`${omdpAPIURL}?apikey=${omdbAPIKey}&i=${imdbID}`);
      console.info('movieStore omdbQueryMovieById response:', response);
      isQuerying.value = false;
      if (response.data.Response === 'True') {
        movieToDetail.value = response.data;
        console.info('movieStore omdbQueryMovieById: \nresponse.data', response.data, 'movieToDetail.value:', movieToDetail.value);
        return response.data;
      } else {
        throw new Error(response.data.Error);
      }
    } catch (error) {

      console.error('Error fetching data:', error);
      apiErrors.value.push(error);
    }
  };

  function isFavouriteMovie(id: string): boolean {
    return getFavouriteMovieIDs().includes(id);
  }

  function getSearchText() {
    return searchText.value;
  }

  function updateSearchText(text: string) {
    searchText.value = text;
    console.info('movieStore searchText:', searchText.value);
    if (text.length > 2) {
      isQuerying.value = true;
      omdbQuery(text);
      resetSearchData();
    } else {
      resetSearchData();
    }
  }

  function resetSearchData() {
    searchData.value = [];
    movies.value = [];
  }

  function addMovieToFavourites(movie: MovieListItem) {
    console.info('movieStore removeMovieFromFavourites before addition:',
      '\nfavouriteMovies.value:', favouriteMovies.value,
      '\nmovie:', movie);
    const found = favouriteMovies.value.find((m) => m.imdbID === movie.imdbID);
    movie.isFavourite = true;
    if (!found) {
      favouriteMovies.value.push(movie);
    }
    favouriteMovies.values = favouriteMovies.value.sort((a, b) => a.Year.localeCompare(b.Year));

    localStorage.setItem('favouriteMovies', JSON.stringify(favouriteMovies.value));
    console.info('movieStore removeMovieFromFavourites after addition:',
      '\nfavouriteMovies.value:', favouriteMovies.value,
      '\nmovie:', movie);
  }

  function removeMovieFromFavourites(movie: MovieListItem) {
    console.info('movieStore removeMovieFromFavourites before Removal:',
      '\nfavouriteMovies.value:', favouriteMovies.value,
      '\nmovie:', movie,
      '\n movie.isFavourite:',  movie.isFavourite);
    movie.isFavourite = false;
    const index = favouriteMovies.value.findIndex((m) => m.imdbID === movie.imdbID);
    if (index > -1) {
      console.info('index is greater than < 1:', index);
      favouriteMovies.value.splice(index, 1);
    }
    // favouriteMovies.values = favouriteMovies.value;

    localStorage.setItem('favouriteMovies', JSON.stringify(favouriteMovies.value));

    console.info('movieStore removeMovieFromFavourites after Removal:',
      '\nfavouriteMovies.value:', favouriteMovies.value,
      '\nmovie:', movie);
  }

  watch([movies, favouriteMovies], (mutation: any, state: any, some: any) => {
    console.info('movieStore -> watch->count:',
      '\nmovies: ', movies,
      '\nmutation: ', mutation,
      '\nstate:', state,
      '\nsome:', some);
  });


  return {
    searchData,
    searchStatus,
    movies,
    movieToDetail,
    favouriteMovies,
    isQuerying,
    // getMovieByID,
    getFavouriteMovies,
    addMovieToFavourites,
    removeMovieFromFavourites,
    omdbQueryMovieById,
    updateSearchText,
    getSearchText,
    resetSearchData,
    apiErrors,
  };
});
