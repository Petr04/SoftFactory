<template>
  <div
    class="chip"
    :class="{ active: value }"
    @click="$emit('input', !value)"
  >
    {{ text }}
  </div>
</template>

<style scoped>
.chip {
  display: inline-block;
  font-family: Montserrat;
  font-size: 17px;
  border-radius: 100vh;
  padding: 8px 16px;
  background: #eee;
  cursor: pointer;
  user-select: none;
}

.chip:hover {
  background: #ddd;
}

.chip.active {
  background: #1e1e1e;
  color: white;
}
</style>

<script>
export default {
  props: ['text', 'value', 'href'],
};
</script>
