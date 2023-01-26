<template>
  <div class="hcontainer">
    <div class="service card">
      <div class="header">
        <h2>{{ title }}</h2>
        <div class="price">
          {{ price ? `от ${formatNumber(price)} &#8381;` : 'Цена договорная' }}
        </div>
      </div>
      <div class="description">{{ description }}</div>
      <div class="hcontainer">
        <link-no-update
          :to="'/order/' + name"
          class="button main"
          @click.native="() => { setService(name); setShowOrder(true); }"
        >
          Заказать
        </link-no-update>
      </div>
    </div>
  </div>
</template>

<style scoped>
.service {
  padding: 1em;
}

.price {
  font-family: Montserrat;
  margin-top: .25em;
}

.order {
  background: #1e1e1e;
  color: white;
  /*height: fit-content;*/
  padding: .5em 1em;
  border-radius: 1em;
}

a {
  display: block;
  padding: .5em 1.5em;
  font-size: .85em;
}
</style>

<script>
import { formatNumber } from '@/lib/format.js';
import LinkNoUpdate from '@/components/LinkNoUpdate.vue';
import { mapMutations } from 'vuex';

export default {
  props: ['title', 'description', 'price', 'name'],
  components: { LinkNoUpdate },
  methods: {
    formatNumber,
    ...mapMutations(['setService', 'setShowOrder']),
  },
};
</script>
