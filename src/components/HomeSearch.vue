<template>
  <div class="home-search">
    <h1>Movie Search</h1>
    <SearchBox/>
    <MovieResults/>
  </div>
</template>
<script setup lang="ts">
   import SearchBox from './SearchBox.vue';
   import MovieResults from './MovieList.vue';
   // props searchText, searchData, favouritesList
   // functions: addToFavourites, removeFromFavourites

</script>
<style lang="scss" scoped>
.home-search{

}
</style>
