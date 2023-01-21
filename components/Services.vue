<template>
  <div class="services" ref="services">
    <h1>Услуги</h1>
    <div id="service-list" ref="serviceList" :class="{ compact }">
      <div
        v-for="arr, i in servicesDisplay"
        :key="i"
        class="vertical-container"
        :class="{ 'one-column': columns == 1 }"
      >
        <service
          v-for="service, j in arr.filter(x => x != undefined)"
          :key="j"
          :icon-right="false"
          v-bind="service"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
}

.services {
  --gap: 20px;
  font-size: 18px;
}

.services * {
  color: white;
}

#service-list {
  display: flex;
  justify-content: center;
  padding: 0 var(--gap);
  gap: var(--gap);
}

#service-list.compact {
  padding: 0;
}

.vertical-container {
  display: flex;
  flex-direction: column;
  gap: var(--gap);
  width: 20em;
}

.vertical-container.one-column {
  width: 30em;
}
</style>

<script>
import Service from '@/components/Service.vue';
import { unzip, chunk } from 'lodash';

export default {
  props: ['services'],
  components: {
    Service,
  },
  data: () => ({
    columns: 3,
    columnsMax: 3,
    compact: false,
  }),
  computed: {
    servicesDisplay() {
      return unzip(chunk(this.services, this.columns));
    },
  },
  methods: {
    resizeGrid() {
      const em = 18;
      const columnWidth = 20*em;
      const gap = 20;

      const columns = Math.floor((window.innerWidth - gap) / (columnWidth + gap));
      this.compact = columns == 0;
      this.columns = Math.max(1, Math.min(columns, this.columnsMax));
    },
  },
  beforeMount() {
    setTimeout(() => this.resizeGrid());
    window.addEventListener('resize', this.resizeGrid);
  },
  unmounted() {
    window.removeEventListener('resize', this.resizeGrid);
  },
};
</script>
