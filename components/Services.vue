<template>
  <div class="services" id="services">
    <h1>Услуги</h1>
    <columns-container-from-data
      :data="services"
      :component="serviceComponent"
    />
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  color: white;
}
</style>

<script>
import Service from '@/components/Service.vue';
import ColumnsContainerFromData from '@/components/ColumnsContainerFromData.vue';

export default {
  props: ['services'],
  components: {
    Service,
    ColumnsContainerFromData,
  },
  data: () => ({
    serviceComponent: Service,
  }),
};
</script>
