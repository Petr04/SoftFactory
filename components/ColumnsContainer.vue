<template>
  <div
    class="columns-container"
    :class="{ compact }"
    ref="columnsContainer"
  >
    <slot />
  </div>
</template>

<style scoped>
.columns-container {
  --gap: 20px;
  --column-width: 20em;
  display: flex;
  justify-content: center;
  padding: 0 var(--gap);
  gap: var(--gap);
}

.columns-container.compact {
  padding: 0;
}
</style>

<script>
export default {
  props: ['gap', 'columnWidth', 'maxColumns', 'oneColumnWidth'],
  data() {
    return {
      columns: this.maxColumns,
      compact: false,
    };
  },
  methods: {
    resizeGrid() {
      const columns = Math.floor((window.innerWidth - this.gap) / (this.columnWidth + this.gap));
      this.compact = columns == 0;
      this.columns = Math.max(1, Math.min(columns, this.maxColumns));

      this.$refs.columnsContainer.style.setProperty(
        '--column-width',
        (this.columns == 1 ? this.oneColumnWidth : this.columnWidth) + 'px'
      );
    },
  },
  watch: {
    columns(columns) {
      this.$emit('changeColumns', columns);
    },
  },
  mounted() {
    this.$refs.columnsContainer.style.setProperty('--gap', this.gap + 'px');
    this.$refs.columnsContainer.style.setProperty(
      '--column-width', this.columnWidth + 'px');

    setTimeout(() => this.resizeGrid());
    window.addEventListener('resize', this.resizeGrid);
  },
  unmounted() {
    window.removeEventListener('resize', this.resizeGrid);
  },
};
</script>
