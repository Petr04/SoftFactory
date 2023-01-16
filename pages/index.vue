<template>
  <div>
    <landing />
    <services :services="services" />
    <order :show="showOrder" :services="services" />
    <div class="dimmer" :class="{ active: showOrder }" />
  </div>
</template>

<style>
#order {
  z-index: 1;
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
}
</style>

<script>
import Landing from '@/components/Landing.vue';
import Services from '@/components/Services.vue';
import { mapState, mapMutations } from 'vuex';

export default {
  components: {
    Landing,
    Services,
  },
  methods: {
    ...mapMutations(['setService']),
  },
  computed: {
    ...mapState(['showOrder']),
  },
  async asyncData({ $axios }) {
    const response = await $axios.$get('services');
    const services = response.data.map(entry => entry.attributes);
    return { services };
  },
};
</script>
