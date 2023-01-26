<template>
  <div class="hcontainer project-services">
    <div
      v-for="serviceName in serviceNames"
      class="project-chip"
    >
      {{ serviceName }}
    </div>
  </div>
</template>

<style scoped>
.project-services {
  gap: .8em;
}

.project-chip {
  border-radius: 100vh;
  font-family: Montserrat;
  font-size: .8em;
  background: #eee;
  padding: .4em .8em;
}
</style>

<script>
export default {
  props: ['serviceNames'],
};
</script>
