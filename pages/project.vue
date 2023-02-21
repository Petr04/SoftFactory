<template>
  <div class="project-page white-container">
    <div class="content">
      <h1>{{ title }}</h1>
      <project-services :services="services" />
      <client-only>
        <div class="project-container">
          <div class="section">
            <div class="section-name">Задача:</div>
            <div class="section-content">{{ task }}</div>
          </div>
          <div v-if="description" class="section">
            <div class="section-name">Описание:</div>
            <div v-html="$md.render(description)" class="section-content" />
          </div>
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

.project-container {
  display: table;
  border-spacing: 2em 1em;
}

.project-container .section {
  display: table-row;
}

.section > * {
  display: table-cell;
}

@media all and (max-width: 900px) {
  .project-container {
    display: block;
    border-spacing: 0;
  }

  .section {
    display: block;
  }

  .section > * {
    display: block;
  }

  .section-content {
    margin-bottom: 1em;
  }
}

@media all and (min-width: 600px) and (max-width: 899.99px) {
  .project-container {
    padding: 0 1em;
  }
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
</style>

<script>
import ProjectServices from '@/components/ProjectServices.vue';

export default {
  components: {
    ProjectServices,
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
};
</script>
