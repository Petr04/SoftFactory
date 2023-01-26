<template>
  <columns-container
    :gap="gap"
    :columnWidth="columnWidth"
    :maxColumns="maxColumns"
    :oneColumnWidth="oneColumnWidth"
    @changeColumns="n => columns = n"
  >
    <column
      v-for="arr, i in dataDisplay"
      :key="i"
    >
      <component
        :is="component"
        v-for="obj, j in arr.filter(x => x != undefined)"
        :key="j"
        v-bind="obj"
      />
    </column>
  </columns-container>
</template>

<script>
import ColumnsContainer from '@/components/ColumnsContainer.vue';
import Column from '@/components/Column.vue'
import { unzip, chunk } from 'lodash';

export default {
  props: {
    data: { type: Array, required: true },
    component: { type: Object, required: true },

    gap: { default: 18 },
    columnWidth: { default: 360 },
    maxColumns: { default: 3 },
    oneColumnWidth: { default: 540 },
  },
  data() {
    return {
      columns: this.maxColumns,
    };
  },
  components: {
    ColumnsContainer,
    Column,
  },
  computed: {
    dataDisplay() {
      return unzip(chunk(this.data, this.columns));
    },
  },
  beforeMount() {
    this.$options.components.MyComponent = this.component;
  },
};
</script>
