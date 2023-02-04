<template>
  <div class="project-page white-container">
    <div class="content">
      <h1>{{ title }}</h1>
      <project-services :services="services" />
      <client-only>
        <table>
          <tr>
            <th class="section-name">Задача:</th>
            <td>{{ task }}</td>
          </tr>
          <tr v-if="description">
            <th class="section-name">Описание:</th>
            <td v-html="$md.render(description)"></td>
          </tr>
        </table>
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

th {
  text-align: left;
  font-weight: normal;
  padding-right: 2em;
  display: flex;
}

table {
  border-spacing: 0 1em;
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
  }
};
</script>