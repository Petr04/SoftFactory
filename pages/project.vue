<template>
  <div class="project-page white-container">
    <div class="content">
      <h1>{{ title }}</h1>
      <project-services :services="services" />
      <client-only>
        <div class="container" :class="{ wrap }">
          <div class="section-name">Задача:</div>
          <div class="section-content">{{ task }}</div>
          <template v-if="description">
            <div class="section-name">Описание:</div>
            <div v-html="$md.render(description)" class="section-content" />
          </template>
        </div>
      </client-only>
    </div>
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: .3em;
}

.project-services {
  margin-bottom: 1em;
}

.container {
  --project-columns: 2;
  display: grid;
  grid-template-columns: repeat(var(--project-columns), auto);
  row-gap: 1em;
  column-gap: 2em;
}

.container.wrap {
  --project-columns: 1;
  row-gap: 0;
}

.container.wrap .section-content {
  margin-bottom: 1em;
}
</style>

<style>
.project-page p {
  margin: 0;
}

.project-page img {
  max-width: calc(100% - 2em);
  border-radius: 20px;
  margin: 1em;
}

.section {
  display: flex;
  flex-wrap: wrap;
}
</style>

<script>
import ProjectServices from '@/components/ProjectServices.vue';

export default {
  components: {
    ProjectServices,
  },
  data: () => ({
    wrap: false,
  }),
  methods: {
    onResize() {
      this.wrap = window.innerWidth <= 900;
    },
  },
  async asyncData({ $axios, route, $md }) {
    const response = await $axios.$get('/api/projects?populate=*&filters[name][$eq]='
      + route.params.name);

    const props = response.data[0].attributes;

    return {
      ...props,
      services: props.services.data.map(service => service.attributes)
    };
  },
  mounted() {
    this.onResize();
    window.addEventListener('resize', this.onResize);
  },
};
</script>
