<template>
  <div class="errors-display" v-if="errors.length">
    <div class="errors warning" >
      <p v-for="error in errors">
        {{error}}
      </p>
    </div>
  </div>

</template>
<script setup lang="ts">
const props = defineProps<{
  errors: string[];
}>();
const {errors} = props;

</script>
<style lang="scss" scoped>

.errors-display {
   margin: 20px 0;


  @media (max-width: 800px) {



  }

}

</style>
