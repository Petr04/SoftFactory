<template>
  <div class="hcontainer project-services">
    <div
      v-for="service in services"
      @click="() => { setService(service.name); setShowOrder(true); }"
      class="project-chip"
    >
      {{ service.title }}
    </div>
  </div>
</template>

<style scoped>
.project-services {
  gap: .8em;
  flex-wrap: wrap;
}

.project-chip {
  border-radius: 100vh;
  font-family: Montserrat;
  font-size: .8em;
  background: #eee;
  padding: .4em .8em;
  cursor: pointer;
  transition: .3s;
}

.project-chip:hover {
  background: #ccc;
}
</style>

<script>
import { mapMutations } from 'vuex';

export default {
  props: ['services'],
  methods: {
    ...mapMutations(['setService', 'setShowOrder']),
  },
};
</script>
