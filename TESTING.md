# Testing & Coverage Guide

## Overview

This project uses **Vitest** for unit testing with **v8** coverage provider for comprehensive test coverage reporting.

## Running Tests

### Unit Tests (Watch Mode)

```bash
pnpm test:unit
```

Runs tests in watch mode - automatically reruns tests when files change.

### Unit Tests with Coverage

```bash
pnpm test:unit:coverage
```

Runs all tests once and generates a coverage report.

### Unit Tests with UI

```bash
pnpm test:unit:ui
```

Opens an interactive UI for running and debugging tests.

## Coverage Reports

After running `pnpm test:unit:coverage`, coverage reports are generated in multiple formats:

### 1. **Terminal Output**

- Shows coverage summary directly in your terminal
- Displays % coverage for Statements, Branches, Functions, and Lines
- Lists uncovered line numbers

### 2. **HTML Report**

- Located in `coverage/index.html`
- Open in browser for interactive coverage exploration
- View coverage per file with line-by-line details

### 3. **JSON Report**

- Located in `coverage/coverage-final.json`
- Machine-readable format for CI/CD integration

### 4. **LCOV Report**

- Located in `coverage/lcov.info`
- Compatible with popular coverage tools and IDEs

## Coverage Configuration

### Current Settings

**Provider:** v8 (fastest, most accurate)

**Reporters:**

- `text` - Terminal output
- `json` - JSON format
- `html` - Interactive HTML report
- `lcov` - LCOV format

**Coverage Thresholds:**

- Lines: 80%
- Functions: 80%
- Branches: 80%
- Statements: 80%

### Excluded from Coverage

The following are excluded from coverage reporting:

- `node_modules/` - Third-party dependencies
- `dist/` - Build output
- `cypress/` - E2E tests
- `lab-imdb-vue3/` - Old implementation
- `**/*.config.*` - Configuration files
- `**/*.d.ts` - TypeScript declaration files
- `**/main.ts` - Application entry point
- `**/env.d.ts` - Environment declarations
- `**/__tests__/**` - Test files themselves
- `**/icons/**` - Icon components
- `**/assets/**` - Static assets

## Current Coverage Status

As of the latest run:

- **Overall Coverage:** ~8.4% (baseline)
- **Well-Tested:**

  - ✅ `MovieRatings.vue` - 100% coverage
  - ✅ `globalUtils.ts` - 95% coverage

- **Needs Testing:**
  - ⚠️ Components (HomeSearch, MovieCard, MovieDetails, etc.)
  - ⚠️ Store (movieStore.ts)
  - ⚠️ Views (HomeView, FavouritesView, MovieDetailsView)
  - ⚠️ Router

## Writing Tests

### Test File Location

- Place test files in `__tests__` folders
- Name pattern: `*.spec.ts` or `*.test.ts`

### Example Test Structure

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MyComponent from '../MyComponent.vue'

describe('MyComponent', () => {
  it('renders properly', () => {
    const wrapper = mount(MyComponent, {
      props: { message: 'Hello' },
    })
    expect(wrapper.text()).toContain('Hello')
  })
})
```

## Improving Coverage

To improve test coverage:

1. **Run coverage report:** `pnpm test:unit:coverage`
2. **Open HTML report:** `open coverage/index.html`
3. **Identify untested files:** Look for red/orange highlights
4. **Write tests:** Create `*.spec.ts` files for untested components
5. **Verify:** Re-run coverage to see improvements

## CI/CD Integration

The coverage reports are compatible with popular CI/CD tools:

- **GitHub Actions:** Use `lcov` reporter with coverage upload actions
- **GitLab CI:** Native support for `lcov` format
- **Jenkins:** Use Coverage plugins with `lcov` or `html` reports

## Tips

- **Focus on critical paths first:** Store, routing, business logic
- **Use snapshot testing:** For UI components
- **Mock external dependencies:** API calls, localStorage, etc.
- **Test user interactions:** Click events, form submissions
- **Aim for meaningful coverage:** Not just high percentages

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Vue Test Utils](https://test-utils.vuejs.org/)
- [Coverage Provider V8](https://vitest.dev/guide/coverage.html)
