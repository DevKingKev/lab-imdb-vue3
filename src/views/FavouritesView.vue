<template>
  <section class="favourites-page">
    <h1>Your favourites</h1>
    <MovieResults list-type="FavouritesList"/>

  </section>
</template>
<script setup lang="ts">
import MovieResults from '../components/MovieList.vue';

// functions: removeFromFavourites
</script>
<style>
@media (min-width: 1024px) {
  .favourites {
    display: flex;
  }
}
</style>
