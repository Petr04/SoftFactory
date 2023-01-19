<template>
  <a
    :href="to"
    onclick="event.preventDefault()"
    @click="navigate"
  >
    <slot />
  </a>
</template>

<script>
export default {
  props: ['to'],
  methods: {
    navigate() {
      history.replaceState({}, null, this.to);
    }
  }
};
</script>
