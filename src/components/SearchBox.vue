<template>
  <div class="search-box">
    <form><input type="text" placeholder="Search for a movie"/>
      <button>Search</button>
    </form>
  </div>

</template>
<script setup lang="ts">

</script>
<style lang="scss" scoped>
.search-box {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 20px;

  form {
    display: flex;
    flex-grow: 1;
    flex-direction: row;
    max-width: 80%;
    justify-content: center;
    align-items: center;
  }

  input {
    width: 80%;
    line-height: 3em;
    margin-right: 10px;
    padding: 1px 10px;

  }

  button {
    height: 46px;
    padding: 5px 3em;
  }

  @media (max-width: 800px) {
    form {
      flex-direction: column;
      max-width: 100%;

    }
    input{
      width: 100%;
      margin-bottom: 10px;
    }

  }
}
</style>
