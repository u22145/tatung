<template>
  <div class="winning">
    <div class="content">
      <img src="@/assets/img/winning/title.png">
    </div>
    <footerComponents></footerComponents>
  </div>
</template>
<script>
  import footerComponents from '@/components/footerComponents.vue'
  export default {
    name: 'winningBox',
    components: {
      footerComponents,
    },
  }
</script>