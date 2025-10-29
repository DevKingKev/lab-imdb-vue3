<template>
  <div class="movie-card" :key="movie.imdbID">
    <router-link
      :to="{ name: 'movie', params: { id: movie.imdbID } }"
      :aria-label="`View details for ${movie.Title}, ${movie.Year}, ${movie.Type}`"
    >
      <div class="data-display">
        <div class="poster">
          <img
            v-if="!showEmojiPlaceholder"
            :src="movieImageSrc"
            :alt="moviePosterAltText"
            @error="onImageError"
          />
          <div v-else class="emoji-placeholder" :title="moviePosterAltText">🎬</div>
        </div>
        <div class="movie-info">
          <h3>{{ movie.Title }}</h3>
          <p class="movie-details">
            <span class="release-year">{{ movie.Year }}</span>
          </p>
          <p class="movie-details">
            <span class="movie-type-tag">{{ movie.Type }}</span>
          </p>
        </div>
      </div>
    </router-link>
    <FavorActions
      :movie="movie"
      :onAddMovieToFavouritesClick="props.onAddMovieToFavouritesClick"
      :onRemoveMovieFromFavouritesClick="props.onRemoveMovieFromFavouritesClick"
    />
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';

import FavorActions from './FavourActions.vue';
import { type MovieListItem } from '@/stores/movieStore';
import { useImageError } from '@/util/globalUtils';

interface IMovieCardProps {
  movie: MovieListItem;
  onAddMovieToFavouritesClick?: (movie: MovieListItem) => void;
  onRemoveMovieFromFavouritesClick?: (movie: MovieListItem) => void;
}

const props = defineProps<IMovieCardProps>();

const { movie } = props;

// Create a properly encoded fallback URL with movie title
const createFallbackUrl = () => {
  return `https://placehold.co/325x325?text=${movie.Title.replace(' ', '+')}`;
};

// Use the image error handling utility
const {
  imageSrc: movieImageSrc,
  showEmojiPlaceholder,
  onImageError,
} = useImageError(() => movie.Poster, {
  fallbackUrl: createFallbackUrl(),
  showEmojiOnFinalFallback: true,
});

const moviePosterAltText = computed(() => `Poster for ${movie.Title}`);
</script>
<style lang="scss" scoped>
.movie-card {
  position: relative;
  display: flex;
  padding: 10px;
  margin: 20px 10px;
  min-height: 150px;
  box-shadow: 0 2px 5px rgba(79, 140, 238, 0.3);

  a {
    height: 100%;
    width: 100%;
  }

  .data-display {
    flex-direction: row;

    &:hover {
      .poster {
        img {
          transform: scale(1.5);
          transition: transform 0.5s;
        }
      }
    }
  }

  &:hover {
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(100, 238, 79, 0.3);
  }

  .poster {
    max-width: 180px;
    min-width: 100px;
    margin-right: 20px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 5px;
      z-index: 10;
    }

    .emoji-placeholder {
      width: 100%;
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 4em;
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

  .movie-type-tag {
    display: inline-block;
    background-color: var(--color-border);
    color: var(--color-text);
    padding: 4px 8px;
    margin: 5px 0;
    border-radius: 12px;
    font-size: 0.8em;
    text-transform: capitalize;
    border: 1px solid var(--color-border-hover);
  }

  .favour-actions {
    z-index: 10;
    font-size: 2em;
    line-height: 2em;
    padding: 0;
  }

  @media (max-width: 800px) {
    padding: 10px 0;
    .favour-actions {
      bottom: -10px;
    }
  }

  @media (max-width: 400px) {
    margin: 20px 0;
  }
}
</style>
