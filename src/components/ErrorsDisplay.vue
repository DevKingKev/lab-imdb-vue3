<template>
  <div class="errors-display" v-if="errors.length" role="alert" aria-live="polite">
    <div class="errors warning">
      <p v-for="(error, index) in errors" :key="index">
        {{ error }}
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  errors: string[];
}>();
const { errors } = props;
</script>
<style lang="scss" scoped>
.errors-display {
  margin: 20px 0;

  @media (max-width: 800px) {
  }
}
</style>
