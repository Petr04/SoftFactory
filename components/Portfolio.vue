<template>
  <div class="portfolio">
    <h1>Портфолио</h1>
    <div class="portfolio-content">
      <div class="portfolio-section">
        
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: white;
  text-align: center;
/*  margin-left: 2em;*/
}

.portfolio-content {
  background: white;
  border-radius: 20px;
  padding: 1em;
}
</style>

<script>
export default {
  props: ['projects'],
};
</script>
