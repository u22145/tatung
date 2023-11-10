<template>
  <div class="detailPage">
    <div class="item" v-for="(item,index,key) in hotItem" :item="item" :key="`${key}`">
      <img :src="require('@/assets/img/detail/'+item.itemImg)">
      <a href="javascript:void(0)">
        <img src="@/assets/img/detail/recipeImg.png"
          @click="openWindow(item.recipeUrl),$gtag_trackEvent('product', 'click', 'btn_product_recipe'+(index+1));$line_trackEvent('MoreRecipe')"></a>
      <a href="javascript:void(0)"><img src="@/assets/img/detail/buyImg.png"
          @click="openWindow(item.buyUrl),$gtag_trackEvent('product', 'click', 'btn_product_ec'+(index+1));$line_trackEvent('OnlinePurchase')"></a>
    </div>
    <router-link to="/">
        <img src="@/assets/img/detail/Btn.png" :onload="$gtag_trackEvent('page', 'PV', 'product')">
      </router-link>
  </div>
</template>

<script>
  export default {
    name: 'HomeView',
    components: {},
    data() {
      return {
        popupLocation: "",
        access_token: null,
        hotItem: [{ //智慧恆溫電鍋
          itemImg: 'itemImg1.png',
          buyUrl: 'https://lihi1.com/AvNkN',
          recipeUrl: 'http://cooking.tatung.com.tw/?RecipeTrees=17',
        }, { //多功能電烤盤
          itemImg: '2@3x.png',
          buyUrl: 'https://lihi1.com/AvNkN',
          recipeUrl: 'http://cooking.tatung.com.tw/?RecipeTrees=20',
        }, { //10人份多功能IH灶釜電子鍋
          itemImg: '3@3x.png',
          buyUrl: 'https://lihi1.com/AvNkN',
          recipeUrl: 'http://cooking.tatung.com.tw/?RecipeTrees=15',
        }, { //4L微電腦萬用壓力鍋
          itemImg: '4@3x.png',
          buyUrl: 'https://lihi1.com/AvNkN',
          recipeUrl: 'http://cooking.tatung.com.tw/',
        }, { //11人份深海藍電鍋
          itemImg: '5@3x.png',
          buyUrl: 'https://lihi1.com/AvNkN',
          recipeUrl: 'http://cooking.tatung.com.tw/?RecipeTrees=7',
        }, { //20L 溫控旋風氣炸烤箱
          itemImg: '6@3x.png',
          buyUrl: 'https://lihi1.com/AvNkN',
          recipeUrl: 'http://cooking.tatung.com.tw/?RecipeTrees=16',
        }, { //6.5L多功能恆溫舒肥燉鍋
          itemImg: '7@3x.png',
          buyUrl: 'https://lihi1.com/AvNkN',
          recipeUrl: 'http://cooking.tatung.com.tw/',
        }, { //多功能調理攪拌棒
          itemImg: '8@3x.png',
          buyUrl: 'https://lihi1.com/AvNkN',
          recipeUrl: 'http://cooking.tatung.com.tw/?RecipeTrees=12',
        }, { //多功能食物調理機
          itemImg: '9@3x.png',
          buyUrl: 'https://lihi1.com/AvNkN',
          recipeUrl: 'http://cooking.tatung.com.tw/?RecipeTrees=18',
        }, { //20L燒烤微波爐
          itemImg: '10@3x.png',
          buyUrl: 'https://lihi1.com/AvNkN',
          recipeUrl: 'http://cooking.tatung.com.tw/',
        }, ],
      }
    },
    methods: {
      openWindow(val) {
        window.open(val);
      },
    },
    watch: {},
    created: function () {},
    mounted: function () {
      window.scrollTo(0, 0)
    },
    computed: {},
    destroyed: function () {},
  }
</script>