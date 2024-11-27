<template>
  <div class="movie-card">
    <div class="data-display">
      <div class="poster"><img :src="movieImageSrc" :alt="moviePosterAltText"/></div>
      <div class="movie-info">
        <h3>{{ movie.Title }}</h3>
        <p class="movie-details">
          <span class="release-year">{{ movie.Year }}</span>
        </p>
      </div>
    </div>
    <FavorActions :isFavourited="isFavourited"/>

  </div>
</template>
<script setup lang="ts">
import {   computed ,withDefaults} from 'vue'    ;

import FavorActions from './FavourActions.vue';
import { MovieListItem } from '@/stores/movieStore';
import { IMovieListProps } from '@/components/MovieList.vue';

interface IMovieCardProps {
  movie: MovieListItem;
}
const isFavourited = true;
const props = defineProps<IMovieCardProps>() ;
// props movieDetails   , isFavourited
const {movie} = props;
const movieImageSrc = computed(() => {
  return movie.Poster === 'N/A' ? 'https://via.placeholder.com/150' : movie.Poster;
});
const moviePosterAltText = computed(() => `Poster for ${movie.Title}`);

</script>
<style lang="scss" scoped>
.movie-card {
  position: relative;
  display: flex;
  padding: 10px;
  margin: 20px 10px;
  box-shadow: 0px 2px 5px rgba(79, 140, 238, 0.3);

  .data-display {
    flex-direction: row;
  }

  &:hover {
    cursor: pointer;
    box-shadow: 0px 2px 5px rgba(100, 238, 79, 0.3);

  }

  .poster {
    max-width: 150px;
    max-height: 150px;
    margin-right: 20px;
    img{
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

  }
}
</style>
