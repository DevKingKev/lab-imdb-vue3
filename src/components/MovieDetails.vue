<template>
  <div class="movie-details">
    <div class="data-display">
      <div class="poster"><img :src="movieData.Poster" :alt="movieAltText"/></div>
      <div class="movie-info">
        <h3>{{ movieData.Title }}</h3>
        <div class="movie-details">
          <div class="movie-attribute movie-year"><span class="data-key">Year:</span> <span
            class="data-value">{{ movieData.Year }}</span></div>
          <div class="movie-attribute movie-genre"><span class="data-key">Genre:</span> <span
            class="data-value">{{ movieData.Genre }}</span></div>
          <div class="movie-attribute movie-year"><span class="data-key">Director:</span> <span
            class="data-value">{{ movieData.Director }}</span></div>
          <div class="movie-attribute movie-year column"><span class="data-key">Actors:</span>
            <p class="data-value">{{ movieData.Actors }}</p></div>
          <div class="movie-attribute movie-plot column"><span class="data-key">Plot:</span>
            <p class="data-value">{{ movieData.Plot }}</p></div>
          <div class="movie-attribute movie-ratings column"><span class="data-key">Ratings:</span>
            <MovieRatings :movieRatings="movieData.Ratings"/>
          </div>
        </div>
      </div>
    </div>
    <FavorActions :isFavourited="isFavourited"/>

  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';

import FavorActions from './FavourActions.vue';
import MovieRatings from './MovieRatings.vue';
import { MovieDetails } from '@/stores/movies';

const props = defineProps<{
  movieData: MovieDetails,
}>();
const {movieData} = props;

const isFavourited = true;
const movieAltText = computed(() => `Poster of the movie ${movieData.Title}`);

// props movieDetails   , isFavourited

</script>
<style lang="scss" scoped>
.movie-details {
  position: relative;
  display: flex;
  flex: 0 1 auto;
  margin-top: 10px;
  //box-shadow: 0px 2px 5px rgba(79, 140, 238, 0.3);

  .data-display {
    flex-direction: row;
  }



  .movie-info {
    flex-grow: 1;
  }

  .movie-attribute {
    display: flex;
    flex-direction: row;
    margin: 5px 0;

    &.column {
      flex-direction: column;
    }

    .data-key {
      margin-right: 10px;
      font-weight: bold;
    }
  }

  .poster {
    width: 400px;
    height: 400px;
    margin-right: 20px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .favour-actions {
    z-index: 10;
    font-size: 2em;
    line-height: 2em;
    padding: 0;
  }

  @media (max-width: 800px) {
    .data-display {
      flex-direction: column;
    }
  }
}
</style>
