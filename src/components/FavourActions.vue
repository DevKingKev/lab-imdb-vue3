<template>
  <div class="favour-actions">
    <div class="button add" title="Add to favourites"
         v-if="!movie.isFavourite">
      <button v-on:click="onAddToFavouritesButtonClick" class="add">+</button>
    </div>
    <div class="button remove" title="Remove from favourites"
         v-if="movie.isFavourite"
    >
      <button v-on:click="onRemoveFromFavouritesButtonClick"  class="remove">-</button>
    </div>
  </div>

</template>
<script setup lang="ts">


import {type MovieListItem } from '@/stores/movieStore';

const props = defineProps<{
  movie: MovieListItem;
  onAddMovieToFavouritesClick?: (movie: MovieListItem) => void;
  onRemoveMovieFromFavouritesClick?: (movie: MovieListItem) => void;
}>();
const {movie} = props;
const onAddToFavouritesButtonClick = () => {
  if (props.onAddMovieToFavouritesClick) {
    props.onAddMovieToFavouritesClick(movie);
  }
};
const onRemoveFromFavouritesButtonClick = () => {
  if (props.onRemoveMovieFromFavouritesClick) {
    props.onRemoveMovieFromFavouritesClick(movie);
  }
};


</script>
<style lang="scss" scoped>
$componentDimensions: 50px;
$componentDimensionsForSmallerScreen: 80px;
.favour-actions {
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  padding: 10px;
  margin: 20px 10px;
  box-shadow: 0 2px 5px rgba(79, 140, 238, 0.3);
  border: 1px solid #999;
  width: $componentDimensions;
  height: $componentDimensions;
  border-radius: calc($componentDimensions / 2);
  justify-content: center;


  &:hover {
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(100, 238, 79, 0.3);

  }

  &:active {
    background: orange;
  }

  .button {
    justify-content: center;
    font-weight: bold;
    width: 100%;

  }

  button {
    display: inline-flex;
    width: 100%;
    height: 100%;
    border-radius: calc($componentDimensions / 2);
    font-size: 1.5em;
    font-weight: bold;
    justify-content: center;
    align-items: center;

    &.add {

        background: #639163;

    }

    &.remove {

        background: #c54a2e;

    }
  }

  @media (max-width: 800px) {

    width: $componentDimensionsForSmallerScreen;
    height: $componentDimensionsForSmallerScreen;
    border-radius: calc($componentDimensionsForSmallerScreen / 2);


    button{
      border-radius: calc($componentDimensionsForSmallerScreen / 2);

    }

  }

}

</style>
