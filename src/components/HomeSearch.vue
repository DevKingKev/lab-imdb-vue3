<template>
  <div class="home-search">
    <h1>Movie Search</h1>
    <SearchBox :onInputSearch="onSearchBoxSubmit"
               :searchText="searchText()"
               :isQuerying="isQuerying"
               @clearSearch="clearSearchResults"/>
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
      <LoadingSpinner text="Searching movies..." size="medium" />
    </div>

    <div v-if="searches?.length" class="search-history">
      <h3>Recent Searches</h3>
      <div class="search-tags">
        <span
          v-for="search in searches"
          :key="search"
          class="search-tag"
          @click="onSearchTagClick(search)"
        >
          {{ search }}
        </span>
      </div>
    </div>




    <div v-if="apiErrors.length">
      <ErrorsDisplay :errors="apiErrors"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';


import { type  MovieListItem, useMovieStore } from '@/stores/movieStore';
import SearchBox from './SearchBox.vue';
import MovieList from './MovieList.vue';
import ErrorsDisplay from './ErrorsDisplay.vue';
import LoadingSpinner from './LoadingSpinner.vue';

const movieStore = useMovieStore();
const {movies, isQuerying, searchStatus, favouriteMovies, apiErrors, searches} = storeToRefs(movieStore);

const searchText = movieStore.getSearchText;


const onSearchBoxSubmit = (searchQuery: string) => {
  searchStatus.value.searchedForMovie = true;
  movieStore.updateSearchText(searchQuery);
};
const clearSearchResults = () => {
  movieStore.resetSearchData();
  searchStatus.value.searchedForMovie = false;
};

const onClearSearchResultsButtonClick = () => {
  clearSearchResults();
};
const onAddMovieToFavourites = (movie: MovieListItem) => {
  movieStore.addMovieToFavourites(movie);
};
const onRemoveMovieFromFavourites = (movie: MovieListItem) => {
  movieStore.removeMovieFromFavourites(movie);
};

const onSearchTagClick = (searchTerm: string) => {
  // Only perform search if the clicked term is different from current search
  if (searchText() !== searchTerm) {
    searchStatus.value.searchedForMovie = true;
    movieStore.updateSearchText(searchTerm);
  }
};

</script>
<style lang="scss" scoped>
.home-search {
  .clear-list {
    margin-top: 20px;

    button {
      height: 40px;
      width: 200px;
    }
  }

  .search-history {
    margin-top: 30px;

    h3 {
      margin-bottom: 15px;
      font-size: 1.2em;
    }

    .search-tags {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 10px;

      .search-tag {
        display: inline-block;
        background-color: var(--color-border);
        color: var(--color-text);
        padding: 6px 12px;
        border-radius: 15px;
        font-size: 0.9em;
        cursor: pointer;
        border: 1px solid var(--color-border-hover);
        transition: all 0.3s ease;

        &:hover {
          background-color: var(--color-border-hover);
          transform: translateY(-2px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        &:active {
          transform: translateY(0);
        }
      }
    }
  }

  @media (max-width: 800px) {
    .clear-list {
      align-items: center;

      button {
        width: 80%;
      }
    }

    .search-history {
      .search-tags {
        justify-content: center;

        .search-tag {
          display: inline-block;
        }
      }
    }
  }
}
</style>
