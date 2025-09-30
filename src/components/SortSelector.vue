<template>
  <div class="sort-selector">
    <label for="sort-select">Sort by:</label>
    <select id="sort-select" v-model="selectedSort" @change="onSortChange">
      <option value="Year">Year</option>
      <option value="Title">Title</option>
      <option value="Type">Type</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, withDefaults } from 'vue';

export type SortOption = 'Year' | 'Title' | 'Type';

export interface ISortSelectorProps {
  onSortChange: (sortBy: SortOption) => void;
  defaultSort?: SortOption;
}

const props = withDefaults(defineProps<ISortSelectorProps>(), {
  defaultSort: 'Year',
});

const selectedSort = ref<SortOption>(props.defaultSort);

const onSortChange = () => {
  props.onSortChange(selectedSort.value);
};
</script>

<style lang="scss" scoped>
.sort-selector {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;

  label {
    font-weight: bold;
    font-size: 0.9em;
  }

  select {
    padding: 5px 10px;
    border: 1px solid var(--color-border);
    border-radius: 5px;
    background-color: var(--color-background);
    color: var(--color-text);
    font-size: 0.9em;
    cursor: pointer;

    &:focus {
      outline: none;
      border-color: var(--color-border-hover);
    }
  }
}

@media (max-width: 800px) {
  .sort-selector {
    margin-left: 0;
    margin-top: 10px;
    justify-content: center;
  }
}
</style>
