<template>
  <div class="movie-card">
    <div class="data-display">
      <div class="poster"><img src="https://via.placeholder.com/150" alt="Movie poster"/></div>
      <div class="movie-info">
        <h3>Movie Title</h3>
        <p class="movie-details">
          <span class="release-year">1983</span>
        </p>
      </div>
    </div>
    <FavorActions :isFavourited="isFavourited"/>

  </div>
</template>
<script setup lang="ts">
import FavorActions from './FavourActions.vue';

const isFavourited = true;
// props movieDetails   , isFavourited

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
