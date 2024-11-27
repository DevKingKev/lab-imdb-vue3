<template>
  <div class="home-search">
    <h1>Movie Search</h1>
    <SearchBox :onInputSearch="onSearchBoxSubmit" :searchText="searchText"/>
    <div v-if="!searchStatus.searchedForMovie">
      <p>Search for a movie</p>
    </div>
    <div v-if="searchStatus.searchedForMovie && movies.length">
      <MovieResults :movieList="movies"/>
      <div class="clear-list">
        <button @click="onClearSearchResultsButtonClick">Clear search results</button>
      </div>
    </div>
    <div v-if="searchStatus.searchedForMovie && !movies.length && !isQuerying">
      <p>No movies found for that search phrase</p>
    </div>
    <div v-if="searchStatus.searchedForMovie && isQuerying">
      <p>Searching...</p>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

interface SearchStatus {
  searchedForMovie: boolean;
  queryCompleted: boolean;
  queryReturnedEmpty: boolean;
}

const searchStatus: SearchStatus = ref({
  searchedForMovie: false,
  queryCompleted: false,
  queryReturnedEmpty: false,
});

import { useMovieStore } from '@/stores/movieStore';
import SearchBox from './SearchBox.vue';
import MovieResults from './MovieList.vue';

const movieStore = useMovieStore();
const {movies, isQuerying} = storeToRefs(movieStore);

// const {searchText} = storeToRefs(useMovieStore);
const searchText = movieStore.getSearchText();
console.info('HomeSearch searchText:', searchText);

// props searchText, searchData, favouritesList
// functions: addToFavourites, removeFromFavourites

const onSearchBoxSubmit = (searchQuery: string) => {
  searchStatus.value.searchedForMovie = true;
  console.log('HomeSearch onSearchBoxSubmit:', searchQuery);
  movieStore.updateSearchText(searchQuery);
};
const onClearSearchResultsButtonClick = () => {
  movieStore.resetSearchData();
  searchStatus.value.searchedForMovie = false;
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

  @media (max-width: 800px) {
       .clear-list{
         align-items: center;
         button {
           width: 80%;
         }
       }
  }
}
</style>
