<template>
  <section class="movie-page">
    <MovieDetails :movieData="movie"/>
  </section>
</template>

<script setup lang="ts">
import {useMovieStore} from '@/stores/movieStore';
import MovieDetails from '../components/MovieDetails.vue';

const movieStore = useMovieStore();
const movie = movieStore.getMovieByID('tt0462499');
console.info('MovieView movie:', movie);
</script>

