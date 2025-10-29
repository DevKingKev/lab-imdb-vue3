<template>
  <div class="data-value movie-ratings">
    <div class="movie-attribute movie-rating" v-for="rating in movieRatings" :key="rating.Source">
      <span class="source">{{ rating.Source }}:</span>
      <span class="data-value">{{ rating.Value }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { type MovieRating } from '@/stores/movieStore';

const props = defineProps<{
  movieRatings: MovieRating[];
}>();
const { movieRatings } = props;
</script>
<style lang="scss" scoped>
.movie-ratings {
  position: relative;
  display: flex;
  margin-top: 0;

  .data-display {
    flex-direction: row;
  }

  .source {
    margin-right: 10px;
    font-style: italic;
  }

  .movie-attribute {
    display: flex;
    flex-direction: row;

    &.column {
      flex-direction: column;
    }

    .data-key {
      margin-right: 10px;
      font-weight: bold;
    }
  }

  @media (max-width: 800px) {
  }
}
</style>
