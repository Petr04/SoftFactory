<template>
  <nuxt-link to="#">
    <div class="project card">
      <img :src="cover">
      <div class="content">
        <div class="hcontainer project-chip-group">
          <div
            v-for="serviceName in services"
            class="project-chip"
          >
            {{ serviceName }}
          </div>
        </div>
        <h2 class="title">{{ title }}</h2>
        <div class="task">
          <i>Задача:</i>
          {{task}}
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<style scoped>
.project {
  display: flex;
  transition: .3s;
}

.project * {
  transition: .3s;
}

.project img {
  width: 100%;
  border-radius: inherit;
  margin: 0 auto;
}

.project:hover img {
  transform: scale(1.05);
}

.content {
  display: flex;
  flex-direction: column;
  gap: inherit;
  padding: 1em;
  padding-top: 0;
}

.project-chip-group {
  gap: .8em;
}

.project-chip {
  border-radius: 100vh;
  font-family: Montserrat;
  font-size: .8em;
  background: #eee;
  padding: .4em .8em;
}

.task i {
  display: block;
  font-family: Montserrat;
  color: #aaa;
}
</style>

<script>
import Chip from '@/components/Chip.vue';

export default {
  props: ['title', 'task', 'description', 'cover', 'services'],
  components: {
    Chip,
  },
};
</script>
