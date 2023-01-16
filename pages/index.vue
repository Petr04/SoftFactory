<template>
  <div>
    <div :class="{ dimmable: true, dimmed: showOrder }">
      <landing />
      <services :services="services" />
    </div>
    <order :show="showOrder" :services="services" />
  </div>
</template>

<style>
.dimmable {
  transition: .3s ease;
}

.dimmable.dimmed {
  filter: brightness(0);
  pointer-events: none;
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
