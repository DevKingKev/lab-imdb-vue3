<template>
  <div class="movie-list">
    <h2>{{ listHeaderText }}<span class="count"></span></h2>
    <div class="results-list">
      <MovieCard/>
      <MovieCard/>
      <MovieCard/>
      <MovieCard/>
    </div>
  </div>

</template>
<script setup lang="ts">
import {   computed ,withDefaults} from 'vue'    ;
    export type MovieListType = 'SearchList' | 'FavouritesList';
    export interface IMovieListProps {
      listType?: MovieListType;
    }
import MovieCard from './MovieCard.vue';

const props = withDefaults (defineProps<IMovieListProps>(),{
  listType: 'SearchList'
}) ;
const {isFavourited} = props;
const listHeaderText = computed(() => {
  return props.listType === 'SearchList' ? 'Search results' : 'Favourite movies';
});
// props listHeader, list
</script>
<style lang="scss" scoped>
.movie-list {

  .results-list{
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
