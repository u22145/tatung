<template>
  <div class="fix BT">
    <a href="javascript:void(0)">
      <img v-if="dayLine" src="@/assets/img/seek.png" style="width:100%;height: 100%;"
        @click="showPopup=true;$gtag_trackEvent('置底按紐', 'click', 'btn_discount');$line_trackEvent('Coupon')"></a>
    <router-link to="/listPage">
      <img src="@/assets/img/sign.png"
        @click="$gtag_trackEvent('置底按紐', 'click', 'btn_vote');$line_trackEvent('GoVoting')"
        style="width:100%;height: 100%;">
    </router-link>
    <!-- <a href="https://member.tatung.com/Content/event/no1/">
      <img src="@/assets/img/bill.png"
        @click="$gtag_trackEvent('置底按紐', 'click', 'btn_bill');$line_trackEvent('GoVoting')"
        style="width:100%;height: 100%;">
    </a> -->
   
    <popup :popupLocation="popupLocation" :class="{active:showPopup}" @popupStatus="showPopup=false" />
  </div>
</template>

<script>
  import popup from '@/components/popup.vue';
  export default {
    name: 'fixBTComponents',
    components: {
      popup,
    },
    data() {
      return {
        popupLocation: "discount",
        showPopup: false,
        dayLine: true,
      }
    },
    methods: {},
    watch: {},
    created: function () {},
    mounted: function () {}
  }
</script>
<style lang="scss">
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->