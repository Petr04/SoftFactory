<template>
  <div>
    <landing />
    <div class="container">
      <services :services="services" />
      <portfolio
        v-if="projects.length > 0"
        :projects="projects"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  --gap: 1.5em;
  display: flex;
  flex-direction: column;
  gap: var(--gap);

  width: min-content;
  max-width: 100vw;
  margin: var(--gap) auto;
}
</style>

<script>
import Landing from '@/components/Landing.vue';
import Services from '@/components/Services.vue';
import Portfolio from '@/components/Portfolio.vue';

export default {
  components: {
    Landing,
    Services,
    Portfolio,
  },
  async asyncData({ $axios }) {
    const services = (await $axios.$get('/api/services'))
      .data.map(entry => entry.attributes);

    const projects = (await $axios.$get('/api/projects?populate=*'))
      .data.map(entry => ({
        ...entry.attributes,
        cover: entry.attributes.cover.data.attributes.formats.medium.url,
        services: entry.attributes.services.data.map(service => service.attributes),
      }));

    return { services, projects };
  },
};
</script>
