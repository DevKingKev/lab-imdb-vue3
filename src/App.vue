<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125"/>

    <div class="wrapper">
      <nav>
        <RouterLink to="/" tabindex="0">Home</RouterLink>
        <RouterLink to="/favourites" tabindex="0">Favourites</RouterLink>
      </nav>
    </div>
  </header>
  <main>
    <RouterView/>
  </main>
</template>

<style lang="scss" scoped>
$headerHeight: 100px;
header {
  display: flex;
  place-items: center;
  justify-content: center;
  padding-right: calc(var(--section-gap) / 2);
  line-height: 1.5;
  height: $headerHeight;
  border-bottom: 1px solid #0F0;
}

.logo {
  display: inline-flex;
  margin: 0 2rem 0 0;
  max-height: 100%;
  padding: 10px;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);

}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 1rem;
  border-left: 1px solid var(--color-border);

}

nav a:first-of-type {
  border: 0;
}

main {

  overflow-y: auto;
  padding: 10px;
}

@media (min-width: 1024px) {
  header {

  }

  .logo {
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    display: flex;
    flex-direction: row;
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
