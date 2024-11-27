<template>
    <div class="favour-actions">
      <div class="button add" title="Add to favourites" v-if="!isFavourited">+</div>
      <div class="button remove" title="Remove from favourites" v-if="isFavourited">-</div>
    </div>

</template>
<script setup lang="ts">
const props = defineProps<{
  isFavourited: boolean
}>();
const {isFavourited} = props;

// props isFavourited

</script>
<style lang="scss" scoped>
$componentDimensions: 50px;
.favour-actions {
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  padding: 10px;
  margin: 20px 10px;
  box-shadow: 0 2px 5px rgba(79, 140, 238, 0.3);
  border: 1px solid #999;
  width: $componentDimensions;
  height: $componentDimensions;
  border-radius: calc($componentDimensions / 2);
  justify-content: center;


  &:hover {
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(100, 238, 79, 0.3);

  }

  .button{
justify-content: center;
    font-weight: bold;
  }

  @media (max-width: 800px) {

  }
}
</style>
