# lab-imdb-vue
This template should help get you started developing with Vue 3 in Vite.
            
# Assumptions and explanations
The project was scaffolded using vite create with pnpm as package manager. I have found that pnpm is quite fast and has good caching.

It uses TypesScript and Pinia for state management. I decided to bring in Axios for API calls as I have used it before and it seems to be very popular even among Vue specialists. 

The scaffolded project includes testing, but I did not write any tests. All default Vue files that were superfluous were removed save for HelloWorld as it is used in the HellwWorld.spec.ts file, which I might in a future occasion decide to use for test purposes.

Vue can be written in many ways, especially when one includes Pinia. The pinia website uses a different approach than the template project. I chose to continue the approach of the template project as I was used to it from before.

There is no CSS framework in use. All CSS in the project, outside the files base.css and main.css is written in SASS. There was default styling and I chose to continue with it, chanding only where I felt it was appropriate. This allows for a dark theme for those who prefer that. The colours that I chose for components should work regardless of whether one uses a bright or dark theme.

The application has 3 main views - home, favourites and details - two of which are accessible via the main menu. The details view is only accessible from the lists.

The application is responsive and should work on mobile devices as well as desktops. There are styling and layout differences beyond what may be easily noticeable, to make it easier for mobile versions.

The application makes use of local storage for the favourites list and movies can be added and removed from any view. The application is also accessability-friendly, and tab-navigation can be used for all major features.

To the greatest extent possible I have attempted to limit the logic to the views, and only have dummy components. This is with the exception of the HomeSearch component, which itself incorporates a lot of other components and can reasonably be expected to be incorporated into other pages other than the home page, though it would have to be sensibly renamed in that case.

As for the development environment, it should work on any computer which supports Node. It was developed on a Linux computer.

The application has been tested on Brave, Chrome and Firefox and found to be working satisfactorily - as intended - in all these browsers.

The error handling is rudimentary and the messages could certainly be more specific, but they keep the user informed at least.


## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
pnpm test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
pnpm build
pnpm test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
