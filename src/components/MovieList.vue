<template>
  <div class="movie-list">
    <h2>{{ listHeaderText }} <span class="count">({{ movieList.length }})</span></h2>
    <div class="results-list">
      <MovieCard v-for="movieItem in movieList"
                 :key="movieItem.imdbID"
                 :movie="movieItem"
                 :onAddMovieToFavouritesClick="props.onAddMovieToFavouritesClick"
                 :onRemoveMovieFromFavouritesClick="props.onRemoveMovieFromFavouritesClick"
      />
    </div>
  </div>

</template>
<script setup lang="ts">
import { computed, withDefaults } from 'vue';

export type MovieListType = 'SearchList' | 'FavouritesList';

export interface IMovieListProps {
  listType?: MovieListType;
  movieList: MovieListItem[];
  onAddMovieToFavouritesClick?: (movie: MovieListItem) => void;
  onRemoveMovieFromFavouritesClick?: (movie: MovieListItem) => void;
}

import MovieCard from './MovieCard.vue';
import { type MovieListItem } from '@/stores/movieStore';

const props = withDefaults(defineProps<IMovieListProps>(), {
  listType: 'SearchList',
});
const {movieList} = props;

const listHeaderText = computed(() => {
  return props.listType === 'SearchList' ? 'Search results' : 'Favourite movies';
});

</script>
<style lang="scss" scoped>
.movie-list {

  .results-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  }

  .movie-card {
    max-width: 100%;
  }

  @media (max-width: 800px) {

  }
  @media (max-width: 400px) {
    .results-list {
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }
  }

}
</style>
