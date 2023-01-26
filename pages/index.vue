<template>
  <div>
    <landing />
    <div class="container">
      <services :services="services" />
      <portfolio :projects="projects" />
    </div>

    <order :show="showOrder" :services="services" />
    <div class="dimmer" :class="{ active: showOrder }" @click="setShowOrder(false)" />
  </div>
</template>

<style>
.container {
  --gap: 1.5em;
  display: flex;
  flex-direction: column;
  gap: var(--gap);

  width: min-content;
  max-width: 100vw;
  margin: var(--gap) auto;
}

.dimmer {
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #000000aa;
  opacity: 0;
  transition: opacity .3s ease;
}

.dimmer.active {
  opacity: 1;
  pointer-events: auto;
}
</style>

<script>
import Landing from '@/components/Landing.vue';
import Services from '@/components/Services.vue';
import Portfolio from '@/components/Portfolio.vue';
import { mapState, mapMutations } from 'vuex';

export default {
  components: {
    Landing,
    Services,
    Portfolio,
  },
  methods: {
    ...mapMutations(['setShowOrder']),
  },
  computed: {
    ...mapState(['showOrder']),
  },
  async asyncData({ $axios }) {
    const services = (await $axios.$get('/api/services'))
      .data.map(entry => entry.attributes);

    const projects = (await $axios.$get('/api/projects?populate=*'))
      .data.map(entry => ({
        ...entry.attributes,
        cover: $axios.defaults.baseURL
          + entry.attributes.cover.data.attributes.formats.small.url,
        services: entry.attributes.services.data.map(service => service.attributes.title),
      }));

    return { services, projects };
  },
};
</script>
