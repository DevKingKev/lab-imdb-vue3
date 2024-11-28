<template>
  <div class="movie-list">
    <h2>{{ listHeaderText }}<span class="count"></span></h2>
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
import { MovieListItem } from '@/stores/movieStore';

const props = withDefaults(defineProps<IMovieListProps>(), {
  listType: 'SearchList',
  movieList: [],
});
const {movieList} = props;
console.info('MovieList movieList:', movieList);
const listHeaderText = computed(() => {
  return props.listType === 'SearchList' ? 'Search results' : 'Favourite movies';
});

// props listHeader, list
</script>
<style lang="scss" scoped>
.movie-list {

  .results-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  }

  .movie-card {
    max-width: 400px;
  }

  @media (max-width: 800px) {


  }

}
</style>
