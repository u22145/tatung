<template>
  <v-app>
    <v-app-bar app :class="{active:navList}" v-if="!showPopup">
      <div class="logo">
        <router-link to="/"><img src="@/assets/img/logo.png"></router-link>
      </div>
      <v-spacer></v-spacer>

      <v-btn @click="nav(true)" :class="{active:navList}">
        <img src="@/assets/img/nav/menu.png">
      </v-btn>
    </v-app-bar>
    <nav id="menu_list" :class="{active:navList}">
      <ul>
        <li @click="nav(false)">
          <router-link to="/listPage">
            <img src="@/assets/img/nav/nav1.png" @click="$gtag_trackEvent('選單', 'click', 'btn_meun_check');$line_trackEvent('nav_GoVoting')">
          </router-link>
        </li>
        <li @click="nav(false)">
          <router-link to="/detail">
            <img src="@/assets/img/nav/nav2.png" @click="$gtag_trackEvent('選單', 'click', 'btn_meun_product');$line_trackEvent('nav_MoreProduct')">
          </router-link>
        </li>
        <li @click="nav(false)">
          <a href="https://member.tatung.com/StoreLocator/Index" target="_blank">
            <img src="@/assets/img/nav/nav3.png" @click="$gtag_trackEvent('選單', 'click', 'btn_meun_3c')">
          </a>
        </li>
        <li @click="nav(false)">
          <router-link to="/method">
            <img src="@/assets/img/nav/nav4.png" @click="$gtag_trackEvent('選單', 'click', 'btn_meun_manual')">
          </router-link>
        </li>
        <!-- <li @click="nav(false)">
          <router-link to="/method">
            <img src="@/assets/img/nav/nav5.png"  @click="$gtag_trackEvent('選單', 'click', 'btn_meun_award')">
          </router-link>
        </li> -->
        <li @click="nav(false)">
          <a href="https://social-plugins.line.me/lineit/share?url=https://tatung.iprefer.com.tw/&text=投下想學的菜色抽電鍋盒玩再拿折扣優惠" target="_blank">
            <img @click="$gtag_trackEvent('選單', 'click', 'btn_meun_line')" src="@/assets/img/nav/nav6.png" /></a>
        </li>

      </ul>
      <button @click="nav(false)" :class="{active:navList}" id="menu_button_wrapper">
        <img src="@/assets/img/nav/menuX.png">
      </button>
    </nav>
    <v-main>
      <router-view :url-query="urlQuery" :access-token="accessToken" :apiUrl="apiUrl" @popupStatus="seePopup" />
      <fixBTComponents v-if="!navList|| !showPopup"></fixBTComponents>
    </v-main>
    <popup :popupLocation="popupLocation" :thisItemToken="thisItemToken" :apiUrl="apiUrl"  :class="{active:showPopup}"  @popupStatus="seePopup" />
    <!-- <popup :popupLocation="popupLocation" :class="{active:showPopup}" @popupStatus="seePopup" /> -->
  </v-app>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.js"></script>
<script>
  import fixBTComponents from '@/components/fixBTComponents.vue';
  import axios from 'axios'
  import popup from '@/components/popup.vue';
  import liff from '@line/liff';
  import swal from 'sweetalert2';
  export default {
    components: {
      popup,
      fixBTComponents,
    },
    data() {
      return {
        shareMsgSuccess: false,
        popupLocation: "",
        thisItemToken:'',
        accessToken: '', //取得Line Token
        lineProfile: '', //取得user資訊
        showPopup: false,
        navList: false,
        urlQuery: {},
        obj: {},
        apiUrl: process.env.NODE_ENV != 'production' ? this.$store.state.stgUrl : this.$store.state.proUrl,
      }
    },
    beforeDestroy() {
      // 移除 監聽
      // window.addEventListener("resize", this.renderResize, false);
    },
    methods: {
      //  監測手機橫向
      // renderResize() {
      //   if (window.orientation == 180 || window.orientation == 0) {
      //     this.showPopup = false
      //   }
      //   if (window.orientation == 90 || window.orientation == -90) {
      //     this.showPopup = true
      //   }
      // },
      // 選單
      seePopup(val, popupLocation,thisItemToken) {
        this.showPopup = val
        this.popupLocation = popupLocation
        this.thisItemToken=thisItemToken
        console.log('赴this.thisItemToken',this.thisItemToken);
      },
      nav(val) {
        if (val) {
          this.navList = !this.navList
        } else(
          this.navList = false
        )
      },
    },
    watch: {
      '$route.query': {
        handler: function (newVal, oldVal) {
          this.urlQuery = newVal;
        },
        deep: true,
        immediate: true
      }
    },
    created: function () {
      this.$childMethod.$on('gotoPage', this.gotoPage);
    },
    mounted() {
      // window.addEventListener("resize", this.renderResize, true);
    },
  }
</script>
<style lang="scss">
  @import "@/assets/scss/all";
</style>