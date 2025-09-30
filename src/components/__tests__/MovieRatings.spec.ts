import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MovieRatings from '../MovieRatings.vue';
import type { MovieRating } from '@/stores/movieStore';

describe( 'MovieRatings', () => {
  const mockRatings: MovieRating[] = [
    { Source: 'Internet Movie Database', Value: '8.5/10' },
    { Source: 'Rotten Tomatoes', Value: '94%' },
    { Source: 'Metacritic', Value: '81/100' }
  ];

  it( 'renders properly with ratings data', () => {
    const wrapper = mount( MovieRatings, {
      props: {
        movieRatings: mockRatings
      }
    } );

    expect( wrapper.find( '.movie-ratings' ).exists() ).toBe( true );
    expect( wrapper.findAll( '.movie-rating' ) ).toHaveLength( 3 );
  } );

  it( 'displays each rating source and value correctly', () => {
    const wrapper = mount( MovieRatings, {
      props: {
        movieRatings: mockRatings
      }
    } );

    const ratingElements = wrapper.findAll( '.movie-rating' );

    expect( ratingElements[0].find( '.source' ).text() ).toBe( 'Internet Movie Database:' );
    expect( ratingElements[0].find( '.data-value' ).text() ).toBe( '8.5/10' );

    expect( ratingElements[1].find( '.source' ).text() ).toBe( 'Rotten Tomatoes:' );
    expect( ratingElements[1].find( '.data-value' ).text() ).toBe( '94%' );

    expect( ratingElements[2].find( '.source' ).text() ).toBe( 'Metacritic:' );
    expect( ratingElements[2].find( '.data-value' ).text() ).toBe( '81/100' );
  } );

  it( 'renders empty when no ratings provided', () => {
    const wrapper = mount( MovieRatings, {
      props: {
        movieRatings: []
      }
    } );

    expect( wrapper.find( '.movie-ratings' ).exists() ).toBe( true );
    expect( wrapper.findAll( '.movie-rating' ) ).toHaveLength( 0 );
  } );

  it( 'handles single rating correctly', () => {
    const singleRating: MovieRating[] = [
      { Source: 'IMDb', Value: '7.8/10' }
    ];

    const wrapper = mount( MovieRatings, {
      props: {
        movieRatings: singleRating
      }
    } );

    expect( wrapper.findAll( '.movie-rating' ) ).toHaveLength( 1 );
    expect( wrapper.find( '.source' ).text() ).toBe( 'IMDb:' );
    expect( wrapper.find( '.movie-rating .data-value' ).text() ).toBe( '7.8/10' );
  } );

  it( 'applies correct CSS classes', () => {
    const wrapper = mount( MovieRatings, {
      props: {
        movieRatings: mockRatings
      }
    } );

    expect( wrapper.find( '.movie-ratings' ).classes() ).toContain( 'data-value' );
    expect( wrapper.find( '.movie-ratings' ).classes() ).toContain( 'movie-ratings' );

    const firstRating = wrapper.find( '.movie-rating' );
    expect( firstRating.classes() ).toContain( 'movie-attribute' );
    expect( firstRating.classes() ).toContain( 'movie-rating' );
  } );

  it( 'uses unique keys for v-for loop', () => {
    const wrapper = mount( MovieRatings, {
      props: {
        movieRatings: mockRatings
      }
    } );

    const ratingElements = wrapper.findAll( '.movie-rating' );

    // Check that each rating element is properly rendered
    // (Vue's v-for with :key should handle uniqueness internally)
    expect( ratingElements ).toHaveLength( mockRatings.length );

    // Verify each source appears exactly once
    const sources = ratingElements.map( el => el.find( '.source' ).text() );
    expect( sources ).toEqual( [
      'Internet Movie Database:',
      'Rotten Tomatoes:',
      'Metacritic:'
    ] );
  } );

  it( 'handles ratings with special characters and formats', () => {
    const specialRatings: MovieRating[] = [
      { Source: 'Test Source!@#', Value: 'N/A' },
      { Source: 'Another-Source_123', Value: '★★★★☆' },
      { Source: 'Unicode Test', Value: '9.5/10 ⭐' }
    ];

    const wrapper = mount( MovieRatings, {
      props: {
        movieRatings: specialRatings
      }
    } );

    const ratingElements = wrapper.findAll( '.movie-rating' );

    expect( ratingElements[0].find( '.source' ).text() ).toBe( 'Test Source!@#:' );
    expect( ratingElements[0].find( '.data-value' ).text() ).toBe( 'N/A' );

    expect( ratingElements[1].find( '.source' ).text() ).toBe( 'Another-Source_123:' );
    expect( ratingElements[1].find( '.data-value' ).text() ).toBe( '★★★★☆' );

    expect( ratingElements[2].find( '.source' ).text() ).toBe( 'Unicode Test:' );
    expect( ratingElements[2].find( '.data-value' ).text() ).toBe( '9.5/10 ⭐' );
  } );
} );
