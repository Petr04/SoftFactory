<template>
  <div id="app">
    <menubar />
    <div>
      <nuxt />
      <Footer />
    </div>
  </div>
</template>

<style>
:root {
  /* Default values */
  --menu-height: 100px;

  --green: #5FB41F;
  --red: #B4481F;
}

* {
  scroll-margin-block-start: calc(var(--menu-height) + 40px);
  /*Adds margin to the top of the viewport*/
}

html {
  font-size: 20px;
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: Roboto;
}

body, .dark-bg, .button.main, .order-submit-button {
  background-color: black; /* or #1e1e1e without noise */
  background-image: url(data:image/png;base64,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);
}

* {
  /*color: #1e1e1e;*/
}

#app {
/*  width: 100%;*/
/*  max-width: 2000px;*/
  margin: 0 auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  font-family: Montserrat;
  color: #1e1e1e;
}

h1 {
  font-size: 45px;
}

.paragraph {
  margin: 1em 0;
}

.white-container {
  box-shadow: 0px -50px 0px 0px white;
  background: white;
  color: #1e1e1eee;
  padding: 40px 40px;
  border-radius: 0 0 20px 20px;
}

.description {
  font-family: Roboto;
  color: #1e1e1eee;
}

a {
  text-decoration: none;
  color: inherit;
}

.button {
  background: white;
  color: #1e1e1e;
  border-radius: 100vh;
  border: 1px solid #1e1e1e;
  padding: 10px 30px;
  font-size: 17px;
  font-family: Montserrat;
  font-weight: 500;
  cursor: pointer;
}

.button.main {
/*  if noise bg is turned off  */
/*  background: #1e1e1e;*/
  color: white;
}

.button.success, .order-submit-button.success {
  border: none;
  background-color: var(--green);
}

.button.fixed-height {
  height: 45px;
}

label {
  font-family: Montserrat;
  font-weight: 500;
  font-size: 17px;
}

label.small {
  font-weight: 400;
  font-size: 15px;
  font-family: Roboto;
  color: #000c;
}

label a {
  text-decoration: underline;
}

.grecaptcha-badge {
  visibility: hidden !important;
}

small {
  font-size: 14px;
  color: #0008;
}

small a {
  text-decoration: underline;
}

/*i.uil {
  display: flex !important;
  align-items: center;
  padding: 0;
}
*/
i.uil {
  margin: -5px;
}

.hcontainer {
  display: flex;
  align-items: center;
  gap: 20px;
}

.hidden {
  opacity: 0;
}

.space-between-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

body > div:not(#__nuxt) { /* recaptcha  */
  position: fixed !important;
  bottom: 0 !important;
  z-index: 2;
}
</style>

<script>
import Menubar from '@/components/Menubar.vue';
import Footer from '@/components/Footer.vue';
import Order from '@/components/Order.vue';
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    Menubar,
    Footer,
    Order,
  },
  data: () => ({
    mobile: false,
  }),
  head() {
    return {
      title: this.title
        ? this.title + ' | SoftFactory'
        : 'SoftFactory | Разработка программного обеспечения',
    };
  },
  methods: {
    resize() {
      this.mobile = window.innerWidth <= 1160;
    },
  },
  computed: {
    ...mapState(['title']),
  },
  mounted() {
    this.resize();
    window.addEventListener('resize', this.resize);

    const menuHeight = document.getElementById('menubar').offsetHeight;
    document.documentElement.style.setProperty('--menu-height', menuHeight + 'px');
  },
  unmounted() {
    window.removeEventListener('resize', this.resize);
  },
};
</script>
