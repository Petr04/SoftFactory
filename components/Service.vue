<template>
  <div class="hcontainer">
<!--     <div
      v-if="!iconRight"
      class="icon"
    >иконка</div>
 -->
    <div class="service">
      <div class="header">
        <h2>{{ title }}</h2>
        <div class="price">
          {{ typeof(price) == 'number' ? `от ${formatNumber(price)} &#8381;` : price }}
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

    <div
      v-if="iconRight"
      class="icon"
    >иконка</div>
  </div>
</template>

<style scoped>
.service {
  display: flex;
  flex-direction: column;
  font-size: 18px;
  gap: .75em;
  border-radius: .5em;
  padding: 1em;
  background: white;
  color: #1e1e1e;
  width: 100%;
}

h2 {
  margin: 0;
  font-family: Montserrat;
}

.price {
  font-family: Montserrat;
  margin-top: .25em;
}

.icon {
  width: 6em;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
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
  props: ['title', 'description', 'price', 'name', 'iconRight'],
  components: { LinkNoUpdate },
  methods: {
    formatNumber,
    ...mapMutations(['setService', 'setShowOrder']),
  },
};
</script>
