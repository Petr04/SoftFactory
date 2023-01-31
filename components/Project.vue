<template>
  <nuxt-link :to="'/project/' + name">
    <div class="project card">
      <img :src="cover">
      <div class="card-content">
        <project-services
          :services="services"
          onclick="event.preventDefault()"
        />
        <h2 class="title">{{ title }}</h2>
        <div class="task">
          <div class="section-name">Задача:</div>
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
  aspect-ratio: 16 / 9;
  object-fit: cover;
  object-position: 0 0;
}

.project:hover img {
  transform: scale(1.05);
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: inherit;
  padding: 1em;
  padding-top: 0;
}

.task {
  color: #333;
}

.task .section-name {
  margin-bottom: .25em;
  font-size-adjust: 1px;
  margin-top: -.2em;
}
</style>

<script>
import Chip from '@/components/Chip.vue';
import ProjectServices from '@/components/ProjectServices.vue';

export default {
  props: ['title', 'name', 'task', 'description', 'cover', 'services'],
  components: {
    Chip,
    ProjectServices,
  },
};
</script>
