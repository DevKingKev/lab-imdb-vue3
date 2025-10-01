<template>
  <div class="search-box">
    <form @submit.prevent="onFormSubmit">
      <div class="input-wrapper">
        <input type="text" placeholder="Search for a movie (2 character minimum)"
               v-model="searchQuery"
               autofocus
               ref="searchTextInput"/>
        <button
          v-if="searchQuery.length > 0"
          type="button"
          class="clear-button"
          @click="clearSearch"
          title="Clear search"
        >
          ✕
        </button>
      </div>
      <button :disabled="searchIsDisabled">{{ searchButtonText }}</button>
    </form>
  </div>

</template>
<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';

const props = defineProps<{
  onInputSearch: (searchQuery: string) => void,
  searchText: string,
  isQuerying?: boolean
}>();

const emit = defineEmits<{
  clearSearch: []
}>();

const searchQuery = ref(props.searchText || '');

// Watch for changes in searchText prop and update searchQuery
watch(() => props.searchText, (newSearchText) => {
  searchQuery.value = newSearchText || '';
});
const searchTextInput = ref<HTMLInputElement | null>(null);

const searchButtonText = computed(() => {
  return props.isQuerying ? 'Searching...' : 'Search';
});

const searchIsDisabled = computed(() => {
  return !searchQuery.value.length || searchQuery.value.length < 2 || props.isQuerying;
});
onMounted(() => {
  setTimeout(() => {
    if ((searchTextInput.value)) {
      searchTextInput.value.focus();
    }
  }, 500);

});
const onFormSubmit = () => {
  if (props.onInputSearch) {
    props.onInputSearch(searchQuery.value);
  }
};

const clearSearch = () => {
  searchQuery.value = '';
  // Focus back to the input after clearing
  if (searchTextInput.value) {
    searchTextInput.value.focus();
  }
  // Emit clearSearch event
  emit('clearSearch');
};

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

  .input-wrapper {
    position: relative;
    width: 80%;
    margin-right: 10px;
  }

  input {
    width: 100%;
    line-height: 3em;
    padding: 1px 10px;
    padding-right: 35px; // Make room for clear button
  }

  .clear-button {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    background: white;
    border: 2px solid #dc3545;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    font-size: 14px;
    color: #dc3545;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    transition: all 0.2s ease;

    &:hover {
      background-color: #dc3545;
      color: white;
      transform: translateY(-50%) scale(1.1);
    }

    &:active {
      transform: translateY(-50%) scale(0.95);
    }
  }

  button {
    height: 46px;

  }

  @media (max-width: 800px) {
    form {
      flex-direction: column;
      max-width: 100%;
    }

    .input-wrapper {
      width: 100%;
      margin-right: 0;
      margin-bottom: 10px;
    }

  }
}
</style>
