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
}

.project-container .section {
  display: table-row;
}

.section > * {
  display: table-cell;
}

.section-name {
  padding-right: 2em;
  padding-bottom: .2em;
}

.section-content {
  padding-bottom: 1em;
  color: #333;
}

@media all and (max-width: 900px) {
  .project-container {
    display: block;
  }

  .section {
    display: block;
  }

  .section > * {
    display: block;
  }
}
</style>

<style>
.project-page p {
  margin: 0;
}

.project-page img {
  display: block;
  max-width: calc(100% - 2em);
  max-height: 500px;
  border-radius: 20px;
  margin: 3em auto;
}

.project-page a {
  text-decoration: underline;
  color: #aaa;
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
