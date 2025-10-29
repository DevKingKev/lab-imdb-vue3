import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useImageError } from '../globalUtils';

describe('useImageError', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('with string URL', () => {
    it('should initialize with correct default values', () => {
      const { imageSrc, imageError, showEmojiPlaceholder } = useImageError('test-image.jpg');

      expect(imageSrc.value).toBe('test-image.jpg');
      expect(imageError.value).toBe(false);
      expect(showEmojiPlaceholder.value).toBe(false);
    });

    it('should handle N/A poster value', () => {
      const { imageSrc } = useImageError('N/A');

      expect(imageSrc.value).toBe(
        'https://via.placeholder.com/300x450/cccccc/666666?text=No+Image',
      );
    });

    it('should use custom fallback URL for N/A', () => {
      const customFallback = 'custom-placeholder.jpg';
      const { imageSrc } = useImageError('N/A', { fallbackUrl: customFallback });

      expect(imageSrc.value).toBe(customFallback);
    });

    it('should handle first image error correctly', () => {
      const { imageSrc, imageError, showEmojiPlaceholder, onImageError } =
        useImageError('invalid-image.jpg');

      expect(imageSrc.value).toBe('invalid-image.jpg');

      // Trigger first error
      onImageError();

      expect(imageError.value).toBe(true);
      expect(showEmojiPlaceholder.value).toBe(false);
      expect(imageSrc.value).toBe(
        'https://via.placeholder.com/300x450/cccccc/666666?text=No+Image',
      );
    });

    it('should handle second image error with emoji fallback', () => {
      const { imageSrc, imageError, showEmojiPlaceholder, onImageError } =
        useImageError('invalid-image.jpg');

      // Trigger first error
      onImageError();
      expect(imageError.value).toBe(true);
      expect(showEmojiPlaceholder.value).toBe(false);

      // Trigger second error
      onImageError();
      expect(imageError.value).toBe(true);
      expect(showEmojiPlaceholder.value).toBe(true);
      expect(imageSrc.value).toBe('');
    });

    it('should not show emoji placeholder when disabled', () => {
      const { showEmojiPlaceholder, onImageError } = useImageError('invalid-image.jpg', {
        showEmojiOnFinalFallback: false,
      });

      // Trigger first error
      onImageError();
      // Trigger second error
      onImageError();

      expect(showEmojiPlaceholder.value).toBe(false);
    });

    it('should reset state correctly', () => {
      const { imageError, showEmojiPlaceholder, onImageError, resetImageState } =
        useImageError('test-image.jpg');

      // Trigger errors
      onImageError();
      onImageError();

      expect(imageError.value).toBe(true);
      expect(showEmojiPlaceholder.value).toBe(true);

      // Reset state
      resetImageState();

      expect(imageError.value).toBe(false);
      expect(showEmojiPlaceholder.value).toBe(false);
    });
  });

  describe('with function URL', () => {
    it('should work with function that returns URL', () => {
      const getUrl = vi.fn(() => 'dynamic-image.jpg');
      const { imageSrc } = useImageError(getUrl);

      expect(imageSrc.value).toBe('dynamic-image.jpg');
      expect(getUrl).toHaveBeenCalled();
    });

    it('should handle N/A from function', () => {
      const getUrl = () => 'N/A';
      const { imageSrc } = useImageError(getUrl);

      expect(imageSrc.value).toBe(
        'https://via.placeholder.com/300x450/cccccc/666666?text=No+Image',
      );
    });

    it('should react to URL changes and reset state', async () => {
      let currentUrl = 'image1.jpg';
      const getUrl = () => currentUrl;
      const { imageSrc, imageError, showEmojiPlaceholder, onImageError, resetImageState } =
        useImageError(getUrl);

      // Initial state
      expect(imageSrc.value).toBe('image1.jpg');

      // Trigger errors
      onImageError();
      onImageError();
      expect(imageError.value).toBe(true);
      expect(showEmojiPlaceholder.value).toBe(true);

      // Change URL (simulating a prop change)
      currentUrl = 'image2.jpg';

      // Manually call resetImageState to simulate the watch effect
      // Note: In a real Vue component, the watch would trigger automatically
      resetImageState();

      expect(imageError.value).toBe(false);
      expect(showEmojiPlaceholder.value).toBe(false);
      expect(imageSrc.value).toBe('image2.jpg');
    });

    it('should handle error states with function URL', () => {
      const getUrl = () => 'function-image.jpg';
      const { imageSrc, onImageError } = useImageError(getUrl);

      expect(imageSrc.value).toBe('function-image.jpg');

      // First error
      onImageError();
      expect(imageSrc.value).toBe(
        'https://via.placeholder.com/300x450/cccccc/666666?text=No+Image',
      );

      // Second error
      onImageError();
      expect(imageSrc.value).toBe('');
    });
  });

  describe('with custom options', () => {
    it('should use custom fallback URL', () => {
      const customFallback = 'https://example.com/fallback.jpg';
      const { imageSrc, onImageError } = useImageError('invalid.jpg', {
        fallbackUrl: customFallback,
      });

      onImageError();

      expect(imageSrc.value).toBe(customFallback);
    });

    it('should respect showEmojiOnFinalFallback option', () => {
      const { showEmojiPlaceholder, onImageError } = useImageError('invalid.jpg', {
        showEmojiOnFinalFallback: false,
      });

      onImageError();
      onImageError();

      expect(showEmojiPlaceholder.value).toBe(false);
    });

    it('should work with all custom options', () => {
      const customFallback = 'https://custom.com/placeholder.png';
      const { imageSrc, showEmojiPlaceholder, onImageError } = useImageError('N/A', {
        fallbackUrl: customFallback,
        showEmojiOnFinalFallback: false,
      });

      // Should use custom fallback for N/A
      expect(imageSrc.value).toBe(customFallback);

      // Should not show emoji even after multiple errors
      onImageError();
      onImageError();
      expect(showEmojiPlaceholder.value).toBe(false);
    });
  });

  describe('return values', () => {
    it('should return all expected properties', () => {
      const result = useImageError('test.jpg');

      expect(result).toHaveProperty('imageSrc');
      expect(result).toHaveProperty('imageError');
      expect(result).toHaveProperty('showEmojiPlaceholder');
      expect(result).toHaveProperty('onImageError');
      expect(result).toHaveProperty('resetImageState');

      expect(typeof result.onImageError).toBe('function');
      expect(typeof result.resetImageState).toBe('function');
    });

    it('should have reactive properties', () => {
      const { imageError, showEmojiPlaceholder, onImageError } = useImageError('test.jpg');

      // Initial values
      expect(imageError.value).toBe(false);
      expect(showEmojiPlaceholder.value).toBe(false);

      // After first error
      onImageError();
      expect(imageError.value).toBe(true);
      expect(showEmojiPlaceholder.value).toBe(false);

      // After second error
      onImageError();
      expect(imageError.value).toBe(true);
      expect(showEmojiPlaceholder.value).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('should handle empty string URL', () => {
      const { imageSrc } = useImageError('');

      expect(imageSrc.value).toBe('');
    });

    it('should handle undefined options', () => {
      const { imageSrc } = useImageError('test.jpg', undefined);

      expect(imageSrc.value).toBe('test.jpg');
    });

    it('should handle function returning empty string', () => {
      const getUrl = () => '';
      const { imageSrc } = useImageError(getUrl);

      expect(imageSrc.value).toBe('');
    });

    it('should handle multiple consecutive error calls', () => {
      const { imageError, showEmojiPlaceholder, onImageError } = useImageError('test.jpg');

      // Call onImageError multiple times
      onImageError();
      onImageError();
      onImageError();
      onImageError();

      // Should not change state after second error
      expect(imageError.value).toBe(true);
      expect(showEmojiPlaceholder.value).toBe(true);
    });
  });
});
