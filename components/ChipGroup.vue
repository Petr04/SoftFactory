<template>
  <div class="chip-group">
    <chip
      v-for="choice, i in choices"
      :key="i"
      :text="choice"
      :value="i == val"
      @input="i == val ? val = null : val = i"
    ></chip>
  </div>
</template>

<style scoped>
.chip-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>

<script>
import Chip from '@/components/Chip.vue';

export default {
  props: ['choices', 'value'],
  components: {
    Chip,
  },
  data() {
    return {
      val: this.value || null,
    };
  },
  watch: {
    val(val) {
      this.$emit('input', val);
    },
    value(val) {
      this.val = val;
    },
  },
};
</script>
