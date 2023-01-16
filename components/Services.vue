<template>
  <div class="services" ref="services">
    <h1 id="services" style="text-align: center;">Услуги</h1>
    <div id="service-list" ref="serviceList">
      <div
        v-for="arr, i in servicesDisplay"
        :key="i"
        class="vertical-container"
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
.services {
  --gap: 1em;
  font-size: 18px;
  margin: 2.5em 0;
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

.vertical-container {
  display: flex;
  flex-direction: column;
  gap: var(--gap);
  width: 20em;
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
  }),
  computed: {
    servicesDisplay() {
      return unzip(chunk(this.services, this.columns));
    },
  },
  methods: {
    resizeGrid() {
      const em = parseInt(getComputedStyle(this.$refs.services)['font-size']);
      const listWidth = 20*em * (this.columns) + em * (this.columns + 1);

      if (window.innerWidth <= listWidth) {
        this.columns = Math.max(1, this.columns-1);
      } else if (window.innerWidth - listWidth > 22*em) {
        this.columns = Math.min(this.columnsMax, this.columns+1);
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.resizeGrid();
      this.resizeGrid();
    });
    window.addEventListener('resize', this.resizeGrid);
  },
  unmounted() {
    window.removeEventListener('resize', this.resizeGrid);
  },
};
</script>
