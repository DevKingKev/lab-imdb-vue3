<template>
  <div class="home-search">
    <h1>Movie Search</h1>
    <SearchBox :onInputSearch="onSearchBoxSubmit" :searchText="searchText"/>
    <div v-if="!searchStatus.searchedForMovie">
      <p>Search for a movie</p>
    </div>
    <div v-if="searchStatus.searchedForMovie && movies.length">
      <MovieList :movieList="movies"
                 :onAddMovieToFavouritesClick="onAddMovieToFavourites"
                 :onRemoveMovieFromFavouritesClick="onRemoveMovieFromFavourites"
                 :favouriteMovies="favouriteMovies"
      />
      <div class="clear-list">
        <button @click="onClearSearchResultsButtonClick">Clear search results</button>
      </div>
    </div>
    <div v-if="searchStatus.searchedForMovie && !movies.length && !isQuerying">
      <p class="warning">No movies found for that search phrase</p>
    </div>
    <div v-if="searchStatus.searchedForMovie && isQuerying">
      <p class="searching"><span class="text">Searching...</span></p>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';


import {type  MovieListItem, useMovieStore } from '@/stores/movieStore';
import SearchBox from './SearchBox.vue';
import MovieList from './MovieList.vue';

const movieStore = useMovieStore();
const {movies, isQuerying, searchStatus, favouriteMovies} = storeToRefs(movieStore);


const searchText = movieStore.getSearchText();

const onSearchBoxSubmit = (searchQuery: string) => {
  searchStatus.value.searchedForMovie = true;
  movieStore.updateSearchText(searchQuery);
};
const onClearSearchResultsButtonClick = () => {
  movieStore.resetSearchData();
  searchStatus.value.searchedForMovie = false;
};
const onAddMovieToFavourites = (movie: MovieListItem) => {
  movieStore.addMovieToFavourites(movie);
};
const onRemoveMovieFromFavourites = (movie: MovieListItem) => {
  movieStore.removeMovieFromFavourites(movie);
};

</script>
<style lang="scss" scoped>
.home-search {
  .searching {
    .text {
      display: inline-flex;
      animation: growAndShrink 2.5s ease-in-out infinite;
    }
  }

  .clear-list {
    margin-top: 20px;

    button {
      height: 40px;
      width: 200px;
    }
  }

  @media (max-width: 800px) {
    .clear-list {
      align-items: center;

      button {
        width: 80%;
      }
    }
  }
}
</style>
