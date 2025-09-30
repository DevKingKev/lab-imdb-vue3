import { ref, computed, watch } from 'vue';

export interface UseImageErrorOptions {
  fallbackUrl?: string;
  showEmojiOnFinalFallback?: boolean;
}

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
    imageSrc,
    imageError,
    showEmojiPlaceholder,
    onImageError,
    resetImageState
  };
}
