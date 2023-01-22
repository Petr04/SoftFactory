<template>
  <div class="column" ref="column">
    <slot />
  </div>
</template>

<style scoped>
.column {
  display: flex;
  flex-direction: column;
  gap: var(--gap);
  width: var(--column-width);
}
</style>

<script>
export default {
  props: ['width'],
};
</script>
