<template>
  <div class="portfolio">
    <h1>Портфолио</h1>
    <columns-container-from-data
      :data="projects"
      :component="projectComponent"
    />
  </div>
</template>

<style scoped>
h1 {
  color: white;
  text-align: center;
}

.portfolio-content {
  background: white;
  border-radius: 20px;
  padding: 1em;
}
</style>

<script>
import Project from '@/components/Project.vue'
export default {
  props: ['projects'],
  data: () => ({
    projectComponent: Project,
  }),
};
</script>
