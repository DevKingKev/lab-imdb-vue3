<template>
  <section class="favourites-page">
    <h1>Your favourites</h1>
    <MovieList list-type="FavouritesList"
               :movieList="favouriteMovies"
               :onAddMovieToFavouritesClick="onAddMovieToFavourites"
               :onRemoveMovieFromFavouritesClick="onRemoveMovieFromFavourites"/>

  </section>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useMovieStore } from '@/stores/movieStore';
import { MovieListItem } from '@/stores/movieStore';


import MovieList from '../components/MovieList.vue';

const movieStore = useMovieStore();
const {favouriteMovies} = storeToRefs(movieStore);

const onAddMovieToFavourites = (movie: MovieListItem) => {
  console.info('FavouritesView onAddMovieToFavourites:', movie);
  movieStore.addMovieToFavourites(movie);
};
const onRemoveMovieFromFavourites = (movie: MovieListItem) => {
  console.info('FavouritesView  onRemoveMovieFromFavourites:', movie);
  movieStore.removeMovieFromFavourites(movie);
};

</script>
<style>
@media (min-width: 1024px) {
  .favourites {
    display: flex;
  }
}
</style>
