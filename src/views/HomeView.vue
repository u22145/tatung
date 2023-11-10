<template>
  <div class="home">
    <div class="titleBox content" id="home">
      <img
        class="titleImg"
        src="@/assets/img/index/titleImg.png"
        :onload="$gtag_trackEvent('page', 'PV', 'index')"
      />
      <router-link to="/method">
        <img class="titleImg" src="@/assets/img/index/titleImg1.png"
      /></router-link>
    </div>
    <div class="itemBox content">
      <img src="@/assets/img/list/titleImg.png" />
      <div id="itemBox">
        <thisItem
          v-for="(item, key) in thisItemS"
          :item="item"
          :key="`${key}`"
          :apiUrl="apiUrl"
          @seePopup="getPopupVal"
        />
      </div>
      <router-link to="/listPage" class="btn">
        <img
          @click="
            $gtag_trackEvent('index', 'click', 'btn_vote_more');
            $line_trackEvent('MoreDishes');
          "
          class="shake"
          src="@/assets/img/index/listBT.png"
      /></router-link>
      <img src="@/assets/img/index/txt0.png" />
      <router-link to="/detail">
        <img
          class="shake"
          src="@/assets/img/index/txt.png"
          @click="
            $gtag_trackEvent('index', 'click', 'btn_product');
            $line_trackEvent('MoreProduct');
          "
        />
      </router-link>
    </div>
    <div class="slickBox" style="margin-bottom: 30px">
      <img src="@/assets/img/index/slickImg.png" />
      <img src="@/assets/img/index/slickImg01.png" />
    </div>
    <!-- <popup :popupLocation="popupLocation" :thisItemToken="thisItemToken" :apiUrl="apiUrl"  :class="{active:showPopup}"  @popupStatus="seePopup" /> -->
  </div>
</template>

<!-- swiper -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.1.0/js/swiper.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.1.0/js/swiper.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.1.0/js/swiper.esm.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.1.0/js/swiper.esm.bundle.js"></script>
<script>
// @ is an alias to /src

import footerComponents from "@/components/footerComponents.vue";
import thisItem from "@/components/thisItem.vue";
import popup from "@/components/popup.vue";
import swal from "sweetalert2";
import axios from "axios";

export default {
  name: "HomeView",
  props: [, "apiUrl"],
  components: {
    footerComponents,
    thisItem,
    popup,
  },
  data() {
    return {
      popupLocation: "formPopup",
      thisItemS: "",
      thisItemToken: "",
      apiUrl: "",
      showPopup: false,
      table: {
        params: {
          pageCount: -1,
          page: 1,
          sortDesc: [false],
          filter: JSON.stringify([
            {
              field: ["fix"],
              value: true,
              operation: "=",
              logical: "AND",
            },
          ]),
        },
      },
    };
  },
  methods: {
    getPopupVal(val) {
      this.showPopup = true;
      this.thisItemToken = val;
      this.$emit("popupStatus", val, "formPopup", this.thisItemToken);
    },
    getItemList() {
      var me = this;
      var config = {
        method: "get",
        url: me.apiUrl + "API/GetDataTable/B20D1F8159CA485480B57EC5FC875587",
        params: me.table.params,
      };
      swal.fire({
        allowOutsideClick: false,
      });
      swal.showLoading();
      axios(config)
        .then((res) => {
          var data = res.data;
          if (data && data.success) {
            me.thisItemS = data.data;
          }
        })
        .catch((err) => {
          console.log(err);
          alert("系統忙碌中，請稍後再試");
        })
        .finally(() => {
          swal.close();
        });
    },
  },
  created() {},
  mounted() {
    this.getItemList();
  },
  destroyed() {},
};
</script>
<style lang="scss">
.home {
  .itemBox {
    .itemTxt {
      width: 100% !important;
    }

    .vote {
      display: none;
    }

    .shake {
      animation: shake 1s infinite;
    }
  }
}

@keyframes shake {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.8);
  }

  100% {
    transform: scale(1);
  }
}
</style>