<template>
  <div id="menubar">
    <nuxt-link
      :to="$route.path.includes('order') ? '' : '/'"
      @click.native="setShowOrder(false)"
    >
      <img src="/logo.png" height="30">
    </nuxt-link>
    <div class="menu-items">
      <!-- <a href="/#services">Услуги</a> -->
      <!-- <a href="#">Портфолио</a> -->
      <!-- <a href="#">Магазин шаблонов</a> -->
      <!-- <a href="#">Блог</a> -->
      <!-- <nuxt-link class="button" id="become-client" to="/order">Стать клиентом</nuxt-link> -->
    </div>
  </div>
</template>

<style scoped>
#menubar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25px;
  padding-bottom: 20px;
  font-size: 17px;
  background: white;
  border-radius: 0 0 20px 20px;
  color: #1e1e1e;

  position: sticky;
  top: 0;
  left: 0;
  right: 0;
}

a {
  font-family: Montserrat;
  font-weight: 500;
}

.menu-items a {
  margin: 0 10px;
}

a#become-client {
  margin-left: 30px;
}
</style>

<script>
import { mapMutations } from 'vuex';

export default {
  props: ['mobile'],
  methods: {
    ...mapMutations(['setShowOrder']),
  },
};
</script>
