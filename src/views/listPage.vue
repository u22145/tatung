<template>
  <div class="listPage">
    <div class="titleBox">
      <img
        src="@/assets/img/list/titleImg.png"
        :onload="$gtag_trackEvent('page', 'PV', 'vote')"
      />
    </div>
    <div class="itemBox" id="itemBox">
      <thisItem
        v-for="(item, key) in thisItemS"
        :item="item"
        :key="`${key}`"
        :apiUrl="apiUrl"
        @seePopup="getPopupVal"
      />
    </div>
    <!-- <popup :popupLocation="popupLocation" :thisItemToken="thisItemToken" :apiUrl="apiUrl"  :class="{active:showPopup}" @popupStatus="showPopup=false" /> -->
  </div>
</template>

<!-- swiper -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.1.0/js/swiper.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.1.0/js/swiper.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.1.0/js/swiper.esm.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.1.0/js/swiper.esm.bundle.js"></script>
<script>
import footerComponents from "@/components/footerComponents.vue";
import thisItem from "@/components/thisItem.vue";
import axios from "axios";
import swal from "sweetalert2";
import popup from "@/components/popup.vue";

export default {
  name: "HomeView",
  components: {
    footerComponents,
    thisItem,
    popup,
  },
  props: ["apiUrl"],
  data() {
    return {
      popupLocation: "formPopup",
      showPopup: false,
      activeBT: true,
      table: {
        params: {
          pageCount: -1,
          page: 1,
          sortDesc: [false],
        },
      },
      thisItemS: "",
      thisItemToken: "",
    };
  },
  watch: {
    "table.params": {
      handler: function (newVal) {
        var me = this;
        window.scroll(0, 0);
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    getPopupVal(val) {
      if (new Date() > new Date("2023/1/2 12:00:00")) {
        alert("投票時間已過，感謝您的參與");
      } else {
        this.showPopup = true;
        this.thisItemToken = val;
        this.$emit("popupStatus", val, "formPopup", this.thisItemToken);
      }
    },
    // getPopupVal(token){
    //   this.thisItemToken=token
    //   this.showPopup=true
    // },
    //取得列表資料
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
  created: function () {},
  mounted: function () {
    this.getItemList();
  },
  destroyed: function () {},
};
</script>
<style lang="scss">
.listPage {
  padding: 30px 20px 80px 20px;
  background: linear-gradient(
    to bottom,
    #fedb3f 30%,
    #ff7928 50%,
    #fedb3f 100%
  );

  .titleBox {
    margin-bottom: 20px;
  }
}
</style>