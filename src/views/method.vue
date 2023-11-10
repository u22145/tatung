<template>
  <div class="method">
      <img src="@/assets/img/method/methodTxt.png">
  </div>
</template>
<script>
  export default {
    name: 'methodBox',
    components: {
    },
    mounted: function () {
      window.scrollTo(0, 0)
    },
  }
</script>
<style lang="scss">
  .method{
    padding: 30px 20px 80px 20px;
    background: linear-gradient(
      to bottom,
      #fedb3f 30%,
      #ff7928 50%,
      #fedb3f 100%
    );
  }
</style>