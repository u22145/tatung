<template>
  <div class="home">
    <div class="titleBox content" id="home">
      <img
        class="titleImg"
        src="@/assets/img/index/titleImg3.png"
        :onload="$gtag_trackEvent('page', 'PV', 'index')"
      />
      <img src="@/assets/img/index/down.gif" />
    </div>
    <div class="slickBox">
      <img src="@/assets/img/index/slickImg02.png" />

      <div class="item">
        <iframe
          src="https://www.youtube.com/embed/MYBNDANFHag"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <a href="pdf/01食譜-砂鍋魚頭.pdf" target="_blank">
        <img
          src="@/assets/img/index/slickBox.png"
          @click="
            $gtag_trackEvent('index', 'click', 'btn_recipe2');
            $line_trackEvent('MoreProduct');
          "
        />
      </a>
      <div class="item">
        <iframe
          src="https://www.youtube.com/embed/WegK1l-eLeM"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <a href="pdf/02食譜-奶油螃蟹.pdf" target="_blank">
        <img
          src="@/assets/img/index/slickBox.png"
          @click="
            $gtag_trackEvent('index', 'click', 'btn_recipe1');
            $line_trackEvent('MoreProduct');
          "
        />
      </a>
      <div class="item">
        <iframe
          src="https://www.youtube.com/embed/nlk0Lr2kAG8"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <a href="pdf/03食譜-萬巒豬腳.pdf" target="_blank">
        <img
          src="@/assets/img/index/slickBox.png"
          @click="
            $gtag_trackEvent('index', 'click', 'btn_recipe4');
            $line_trackEvent('MoreProduct');
          "
        />
      </a>
      <div class="item">
        <iframe
          src="https://www.youtube.com/embed/R7-0M-0MzYI"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <a href="pdf/04食譜-客家麻糬.pdf" target="_blank">
        <img
          src="@/assets/img/index/slickBox.png"
          @click="
            $gtag_trackEvent('index', 'click', 'btn_recipe3');
            $line_trackEvent('MoreProduct');
          "
        />
      </a>
    </div>
    <div class="itemBox content">
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
  .shake {
    animation: shake 1s infinite;
  }

  .itemBox {
    padding-bottom: 75px;

    .itemTxt {
      width: 100% !important;
    }

    .vote {
      display: none;
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