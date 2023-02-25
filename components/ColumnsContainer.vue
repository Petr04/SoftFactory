<template>
  <div
    class="columns-container"
    ref="columnsContainer"
  >
    <slot />
  </div>
</template>

<style scoped>
.columns-container {
  --gap: 20px;
  --column-width: 400px;
  display: flex;
  justify-content: center;
  padding: 0 var(--gap);
  gap: var(--gap);
}

@media all and (max-width: calc(400px + 2*20px)) {
  .columns-container {
    padding: 0;
  }
}
</style>

<script>
export default {
  props: ['gap', 'columnWidth', 'maxColumns', 'oneColumnWidth'],
  data() {
    return {
      columns: this.maxColumns,
    };
  },
  methods: {
    resizeGrid() {
      const columns = Math.floor((window.innerWidth - this.gap) / (this.columnWidth + this.gap));
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
