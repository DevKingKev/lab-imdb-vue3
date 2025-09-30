<template>
  <div class="movie-details">
    <div class="data-display">
      <div class="poster">
        <img
          v-if="!showEmojiPlaceholder"
          :src="movieImageSrc"
          :alt="movieAltText"
          @error="onImageError"
        />
        <div
          v-else
          class="emoji-placeholder"
          :title="movieAltText"
        >
          🎬
        </div>
      </div>
      <div class="movie-info">
        <h3>{{ movieData.Title }}</h3>
        <div class="movie-details">
          <div class="movie-attribute movie-type ">
            <span  class="data-value movie-type-tag">{{ movieData.Type }}</span>
          </div>
          <div class="movie-attribute movie-year">
            <span class="data-key">Year:</span> <span
            class="data-value">{{ movieData.Year }}</span>
          </div>
          <div class="movie-attribute movie-genre">
            <span class="data-key">Genre:</span> <span
            class="data-value">{{ movieData.Genre }}</span>
          </div>
          <div class="movie-attribute movie-director">
            <span class="data-key">Director:</span> <span
            class="data-value">{{ movieData.Director }}</span>
          </div>
          <div class="movie-attribute movie-actors column">
            <span class="data-key">Actors:</span>
            <p class="data-value">{{ movieData.Actors }}</p>
          </div>
          <div class="movie-attribute movie-plot column">
            <span class="data-key">Plot:</span>
            <p class="data-value">{{ movieData.Plot }}</p>
          </div>
          <div class="movie-attribute movie-ratings column">
            <span class="data-key">Ratings:</span>
            <MovieRatings :movieRatings="movieData.Ratings"/>
          </div>
        </div>
      </div>
    </div>
    <FavorActions :isFavourited="isFavourited"
                  :movie="movieListItem"
                  :onAddMovieToFavouritesClick="props.onAddMovieToFavouritesClick"
                  :onRemoveMovieFromFavouritesClick="props.onRemoveMovieFromFavouritesClick"
                  v-if="props.onAddMovieToFavouritesClick && props.onRemoveMovieFromFavouritesClick"/>

  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';

import FavorActions from './FavourActions.vue';
import MovieRatings from './MovieRatings.vue';
import { type MovieDetails, type MovieListItem } from '@/stores/movieStore';
import { useImageError } from '@/util/globalUtils';

const props = defineProps<{
  movieData: MovieDetails,
  onAddMovieToFavouritesClick?: (movie: MovieListItem) => void;
  onRemoveMovieFromFavouritesClick?: (movie: MovieListItem) => void;
}>();

const {movieData} = props;
const isFavourited = true;
const movieListItem = ref({
  Title: movieData.Title,
  Year: movieData.Year,
  imdbID: movieData.imdbID,
  Type: movieData.Type,
  Poster: movieData.Poster,
  isFavourite: movieData.isFavourite
});

// Use the image error handling utility
const {
  imageSrc: movieImageSrc,
  showEmojiPlaceholder,
  onImageError
} = useImageError(
  () => movieData.Poster,
  {
    fallbackUrl: 'https://via.placeholder.com/400x600/cccccc/666666?text=No+Poster',
    showEmojiOnFinalFallback: true
  }
);

const movieAltText = computed(() => `Poster of the movie ${movieData.Title}`);

</script>
<style lang="scss" >
.movie-details {
  position: relative;
  display: flex;
  flex: 0 1 auto;
  margin-top: 10px;

  .data-display {
    flex-direction: row;
  }

  .movie-info {
    flex-grow: 1;
  }

  .movie-attribute {
    display: flex;
    flex-direction: row;
    margin: 5px 0;

    &.column {
      flex-direction: column;
    }

    .data-key {
      margin-right: 10px;
      font-weight: bold;
    }
  }

  .poster {
    width: 400px;
    height: 400px;
    margin-right: 20px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      &:hover {
        transform: scale(1.5) translateY(40px) translateX(50px);
        transition: transform 0.5s ;
        z-index: 2;
      }
    }

    .emoji-placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 6em;
      background-color: var(--color-background-soft);
      border: 2px dashed var(--color-border);
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background-color: var(--color-border);
        transform: scale(1.05);
      }
    }
  }

  $favourActionDimensions: 100px;
  .favour-actions {
    position: relative;
    left: calc(50% - ($favourActionDimensions / 2));
    z-index: 10;
    width: $favourActionDimensions;
    height: $favourActionDimensions;
    font-size: 2em;
    line-height: 2em;
    padding: 0;

   .button{
     button{
      border-radius: 50px ;
      font-size: 2.5em;
    }}
  }

  @media (max-width: 800px) {
    padding-bottom: 50px;

    .data-display {
      flex-direction: column;
    }
  }
}
</style>
