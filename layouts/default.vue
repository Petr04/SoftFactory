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
  background-color: #1e1e1e;
  background-image: url("@/assets/images/noise.svg")
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

.content {
  max-width: 900px;
  margin: 0 auto;
  overflow-x: auto;
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

.card {
  display: flex;
  flex-direction: column;
  font-size: 18px;
  gap: .75em;
  border-radius: 20px;
/*  padding: 1em;*/
  background: white;
  color: #1e1e1e;
  width: 100%;
}

.card h2 {
  margin: 0;
  font-family: Montserrat;
}

.section-name {
  font-style: italic;
  font-family: Montserrat;
  color: #aaa;
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

body > div:not(#__nuxt) { /* recaptcha */
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
