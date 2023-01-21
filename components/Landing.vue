<template>
  <div class="white-container landing" :class="{ tall }" ref="container">
    <div id="landing-block" class="space-between-container">
      <img src="/illustration.svg">
      <div id="text-block">
        <h1 class="headline">Студия SoftFactory</h1>
        <div class="description">
          Разрабатываем программное обеспечение для вас и вашего бизнеса
        </div>
        <div class="hcontainer buttons">
          <link-no-update
            class="button main"
            to="/order"
            @click.native="setShowOrder(true)"
          >
            Стать клиентом
          </link-no-update>
          <!-- <a class="button" href="#services">Посмотреть услуги</a> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.headline {
  font-family: Montserrat;
  font-size: min(70px, 12vw);
  margin: 20px 0;
}

img {
  height: min(400px, 70vw);
}

.landing {
  padding: 96px 40px;
  box-sizing: border-box;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}

.landing.tall {
  min-height: calc(100vh - 80px + 20px);
}

#landing-block {
  display: flex;
  flex-wrap: wrap;
  row-gap: 10%;
  column-gap: 100px;
  justify-content: center;
  margin: 0 auto;
}

.landing.tall #landing-block {
  margin-bottom: 20px;
}

#text-block {
  max-width: 500px;
  min-width: 0;
}

.buttons {
  margin: 30px 0;
}
</style>
<script>
import { mapMutations } from 'vuex';

export default {
  data: () => ({
    tall: false,
  }),
  methods: {
    resize() {
      this.tall = window.innerHeight < 840
        && this.$refs.container.scrollHeight+40 <= window.innerHeight;
    },
    ...mapMutations(['setShowOrder']),
  },
  mounted() {
    setTimeout(() => this.resize());
    window.addEventListener('resize', this.resize);
  },
  unmounted() {
    window.removeEventListener('resize', this.resize);
  },
};
</script>
