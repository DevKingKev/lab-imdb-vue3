<template>
  <section class="movie-page">
    <div v-if="isQuerying">
      <p class="loading">
        <span class="text"> Loading...</span>
      </p>
    </div>
    <div v-else>
      <div v-if="movieToDetail">
        <MovieDetails :movieData="movieToDetail"/>
      </div>
      <div v-else>
        <p class="warning">Movie not found</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useMovieStore } from '@/stores/movieStore';
import MovieDetails from '../components/MovieDetails.vue';
import { storeToRefs } from 'pinia';

const route = useRoute();
const movieId = route.params.id;
console.info('MovieView movieId:', movieId);

const movieStore = useMovieStore();
// const movie = movieStore.getMovieByID('tt0462499');
const movie = movieStore.omdbQueryMovieById(movieId);
const {movieToDetail, isQuerying} = storeToRefs(movieStore);
console.info('MovieView movie:', movie);
</script>

<style lang="scss" scoped>

.movie-page {
  .loading {
    .text {
      display: inline-flex;
      animation: growAndShrink 2.5s ease-in-out infinite;
      //text-align: center;
      //transform: scale(2.5) translateY(50px) translateX(50px);
      //transition: transform 0.5s;
    }
  }
}
</style>
