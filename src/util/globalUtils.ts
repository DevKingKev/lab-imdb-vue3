import { ref, computed, watch } from 'vue';

/**
 * Configuration options for the useImageError composable
 */
export interface UseImageErrorOptions {
  /** Custom fallback URL to use when the original image fails to load */
  fallbackUrl?: string;
  /** Whether to show an emoji placeholder when all image URLs fail */
  showEmojiOnFinalFallback?: boolean;
}

/**
 * Vue composable for handling image loading errors with multi-level fallback system
 * 
 * Provides a robust image loading system that gracefully handles failed image URLs
 * by implementing a three-tier fallback mechanism:
 * 1. Original image URL
 * 2. Fallback placeholder image
 * 3. Emoji placeholder (🎬)
 * 
 * @param originalUrl - The original image URL, either as a string or a reactive function
 * @param options - Configuration options for fallback behavior
 * 
 * @returns Object containing reactive image source and error handling functions
 * 
 * @example
 * ```typescript
 * // Basic usage with string URL
 * const { imageSrc, showEmojiPlaceholder, onImageError } = useImageError('movie-poster.jpg');
 * 
 * // Usage with reactive URL (e.g., from props)
 * const { imageSrc, showEmojiPlaceholder, onImageError } = useImageError(
 *   () => props.movie.Poster,
 *   { 
 *     fallbackUrl: 'https://example.com/no-poster.jpg',
 *     showEmojiOnFinalFallback: true 
 *   }
 * );
 * 
 * // In template:
 * // <img v-if="!showEmojiPlaceholder" :src="imageSrc" @error="onImageError" />
 * // <div v-else class="emoji-placeholder">🎬</div>
 * ```
 * 
 * @since 1.0.0
 */
export function useImageError (
  originalUrl: string | ( () => string ),
  options: UseImageErrorOptions = {}
) {
  const {
    fallbackUrl = 'https://via.placeholder.com/300x450/cccccc/666666?text=No+Image',
    showEmojiOnFinalFallback = true
  } = options;

  // Track image loading state
  const imageError = ref( false );
  const showEmojiPlaceholder = ref( false );

  // Computed image source with fallback logic
  const imageSrc = computed( () => {
    const url = typeof originalUrl === 'function' ? originalUrl() : originalUrl;

    if ( imageError.value ) {
      // If the image failed to load, try the fallback
      return showEmojiPlaceholder.value ? '' : fallbackUrl;
    }

    return url === 'N/A' ? fallbackUrl : url;
  } );

  // Handle image loading errors
  const onImageError = () => {
    if ( !imageError.value ) {
      // First error - try the fallback image
      imageError.value = true;
    } else if ( showEmojiOnFinalFallback ) {
      // Second error - show emoji placeholder
      showEmojiPlaceholder.value = true;
    }
  };

  // Reset error state
  const resetImageState = () => {
    imageError.value = false;
    showEmojiPlaceholder.value = false;
  };

  // Watch for URL changes and reset state
  if ( typeof originalUrl === 'function' ) {
    watch( originalUrl, () => {
      resetImageState();
    } );
  }

  return {
    /** Computed reactive image source with fallback logic applied */
    imageSrc,
    /** Reactive boolean indicating if the original image failed to load */
    imageError,
    /** Reactive boolean indicating if the emoji placeholder should be shown */
    showEmojiPlaceholder,
    /** Function to call when an image fails to load (use with @error event) */
    onImageError,
    /** Function to reset the error state back to initial values */
    resetImageState
  };
}
