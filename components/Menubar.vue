<template>
  <div id="menubar">
    <nuxt-link
      to="/"
      @click.native="setShowOrder(false)"
    >
      <img src="/logo.png" height="30">
    </nuxt-link>
<!--     <div
      class="hamburger-menu-button"
      @click="showMenu = !showMenu"
    >
      <i class="uil uil-bars" />
    </div>
    <div
      class="menu-items"
      ref="menuItems"
      :class="{ shown: showMenu }"
    >
      <a href="/#services">Услуги</a>
      <a href="/#portfolio">Портфолио</a>
      <a href="#">Магазин шаблонов</a>
      <a href="#">Блог</a>
      <nuxt-link class="button" id="become-client" to="/order">Стать клиентом</nuxt-link>
    </div>
 -->
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
  transform-style: preserve-3d;
}

.hamburger-menu-button {
  display: none;
  font-size: 1.5em;
  cursor: pointer;
}

.menu-items a {
  margin: 0 10px;
}

@media all and (max-width: 710px) {
  .menu-items {
    display: flex;
    flex-direction: column;
    gap: 1em;
    padding: 1em;
    border-radius: 0 0 20px 20px;

    position: fixed;
    left: 0;
    right: 0;
    top: var(--menu-height);
    transform: translateY(calc(-100% - var(--menu-height))) translateZ(-10px);

    background: white;
    box-shadow: 0px -20px 0px 0px white;
    transition: .3s;
  }

  .menu-items.shown {
    transform: none;
  }

  .hamburger-menu-button {
    display: block;
  }
}

a {
  font-family: Montserrat;
  font-weight: 500;
}

a#become-client {
  margin-left: 30px;
}
</style>

<script>
import { mapMutations } from 'vuex';

export default {
  data: () => ({
    showMenu: false,
  }),
  methods: {
    ...mapMutations(['setShowOrder']),
  },
};
</script>
