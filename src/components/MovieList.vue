<template>
  <div class="movie-list">
    <div class="header-section">
      <h2>
        {{ listHeaderText }} <span class="count">({{ movieList.length }})</span>
      </h2>
      <SortSelector :onSortChange="onSortChange" :defaultSort="currentSort" />
    </div>
    <div class="results-list">
      <MovieCard
        v-for="movieItem in sortedMovieList"
        :key="movieItem.imdbID"
        :movie="movieItem"
        :onAddMovieToFavouritesClick="props.onAddMovieToFavouritesClick"
        :onRemoveMovieFromFavouritesClick="props.onRemoveMovieFromFavouritesClick"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, withDefaults } from 'vue';

export type MovieListType = 'SearchList' | 'FavouritesList';

export interface IMovieListProps {
  listType?: MovieListType;
  movieList: MovieListItem[];
  onAddMovieToFavouritesClick?: (movie: MovieListItem) => void;
  onRemoveMovieFromFavouritesClick?: (movie: MovieListItem) => void;
}

import MovieCard from './MovieCard.vue';
import SortSelector, { type SortOption } from './SortSelector.vue';
import { type MovieListItem } from '@/stores/movieStore';

const props = withDefaults(defineProps<IMovieListProps>(), {
  listType: 'SearchList',
});

const currentSort = ref<SortOption>('Year');
const previousSort = ref<SortOption>('Year');

const listHeaderText = computed(() => {
  return props.listType === 'SearchList' ? 'Search results' : 'Favourite movies';
});

const sortedMovieList = computed(() => {
  const moviesCopy = [...props.movieList];

  return moviesCopy.sort((a, b) => {
    if (currentSort.value === 'Type') {
      // First sort by Type
      const typeComparison = a.Type.localeCompare(b.Type);
      if (typeComparison !== 0) {
        return typeComparison;
      }
      // If types are the same, sort by previous sort option
      if (previousSort.value === 'Title') {
        return a.Title.localeCompare(b.Title);
      } else {
        return a.Year.localeCompare(b.Year);
      }
    } else if (currentSort.value === 'Title') {
      return a.Title.localeCompare(b.Title);
    } else {
      // Sort by Year
      return a.Year.localeCompare(b.Year);
    }
  });
});

const onSortChange = (sortBy: SortOption) => {
  if (sortBy !== 'Type') {
    previousSort.value = currentSort.value;
  }
  currentSort.value = sortBy;
};
</script>
<style lang="scss" scoped>
.movie-list {
  .header-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    h2 {
      margin: 0;
    }
  }

  .results-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  }

  .movie-card {
    max-width: 100%;
  }

  @media (max-width: 800px) {
    .header-section {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
  }

  @media (max-width: 400px) {
    .results-list {
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }
  }
}
</style>
