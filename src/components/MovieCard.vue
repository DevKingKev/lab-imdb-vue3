<template>
  <div class="movie-card">
    <router-link :to="{ name: 'movie', params: { id: movie.imdbID } }">
      <div class="data-display">
        <div class="poster"><img :src="movieImageSrc" :alt="moviePosterAltText"/></div>
        <div class="movie-info">
          <h3>{{ movie.Title }}</h3>
          <p class="movie-details">
            <span class="release-year">{{ movie.Year }}</span>
          </p>
        </div>
      </div>
    </router-link>
    <FavorActions :isFavourited="isFavourited"/>

  </div>
</template>
<script setup lang="ts">
import { computed, withDefaults } from 'vue'    ;

import FavorActions from './FavourActions.vue';
import { MovieListItem } from '@/stores/movieStore';
import { IMovieListProps } from '@/components/MovieList.vue';

interface IMovieCardProps {
  movie: MovieListItem;
}

const isFavourited = true;
const props = defineProps<IMovieCardProps>();

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
  box-shadow: 0 2px 5px rgba(79, 140, 238, 0.3);

  a {
    height: 100%;
    width: 100%;
  }

  .data-display {
    flex-direction: row;

    &:hover {
      .poster {
        img{
        transform: scale(1.5);
        transition: transform 0.5s;
        }
      }

    }
  }

  &:hover {
    cursor: pointer;
    box-shadow: 0px 2px 5px rgba(100, 238, 79, 0.3);

  }

  .poster {
    max-width: 150px;
    max-height: 150px;
    min-width: 100px;
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

  }
}
</style>
