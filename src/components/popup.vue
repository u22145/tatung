<template>
  <div class="popupBox">
    <!-- 優惠碼 -->
    <div v-if="popupLocation == 'discount'" class="popup discount">
      <img class="menuX" src="@/assets/img/nav/menuX.png" @click="closePopup">
      <img src="@/assets/img/popup/discount.png">
    </div>
    <!-- 點及投下一票的彈窗 -->
    <div v-if="popupLocation == 'formPopup'" class="popup" :class="{discount:formBox=='3',privacyOut:formBox=='4'}">
      <img class="menuX" src="@/assets/img/nav/menuX.png" @click="closePopup">
      <img class="menuX" v-if="formBox=='4'" src="@/assets/img/nav/menuX.png" @click="formBox='1'">
      <!-- 填寫表單 -->
      <div v-if="formBox=='1'" class="form">
        <img src="@/assets/img/popup/formTtitle.png">
        <v-form ref="form" v-model="valid" lazy-validation>
          <!-- 姓名 -->
          <p>姓名</p>
          <v-text-field v-model="form.name" :rules="rules.name" solo required maxlength="30" label="王小明" id="name">
          </v-text-field>

          <!-- E-mail -->
          <p>E-mail</p>
          <v-text-field v-model="form.email" :rules="rules.email" solo required label="xxxx@xx.xx.xxx" class="email"
            id="email">
          </v-text-field>

          <!-- 手機 -->
          <p>手機</p>
          <v-text-field v-model="form.mobile" :rules="rules.mobile" maxlength="10" :counter="10" id="mobile" solo
            required label="0912345678">
          </v-text-field>

          <!-- 地址 -->
          <!-- <p>地址</p>
          <v-text-field v-model="form.address" :rules="rules.address" id="address" minlength="6" maxlength="100" solo
            required label="請輸入有效地址">
          </v-text-field> -->
          <!-- 並同意個資 -->
          <v-checkbox v-model="checkbox" required :rules="[v => !!v || '請勾選個資同意']">
            <template v-slot:label>
              <div>
                我已經詳盡閱讀並同意
                <a @click="formBox='4'">
                  個資告知事項及注意事項
                </a>
              </div>
            </template>
          </v-checkbox>
        </v-form>
        <p>請填寫正確email，以利中獎通知使用</p>
        <v-btn :disabled="!valid" @click="validate()">
          <img src="@/assets/img/popup/formBtn.png">
        </v-btn>
        <p class="googleRecapcha"> This site is protected by reCAPTCHA and the Google <a
            href="https://policies.google.com/privacy" target="_blank">Privacy
            Policy</a> and <a href="https://policies.google.com/terms" target="_blank">Terms of Service</a> apply.<br>
        </p>
        <googleRecapcha ref='googleRecapcha' @getGoogle="getGoogleRecapcha"></googleRecapcha>
      </div>
      <!-- 完成表單 -->
      <div v-if="formBox=='2'" class="successVote">
        <img src="@/assets/img/popup/successVote.png">
        <a href="javascript:void(0)"><img @click="formBox='3',$gtag_trackEvent('form', 'click', 'btn_vote_discount');$line_trackEvent('popup_Coupon')"
          src="@/assets/img/popup/successVoteBtn1.png"></a> 
        <router-link to="/detail">
          <img @click="$gtag_trackEvent('form', 'click', 'btn_vote_product'),
          $line_trackEvent('popup_MoreProduct'),closePopup()" src="@/assets/img/popup/successVoteBtn2.png">
        </router-link>
        <a href="https://social-plugins.line.me/lineit/share?url=https://tatung.iprefer.com.tw/&text=投下想學的菜色抽電鍋盒玩再拿折扣優惠" target="_blank">
          <img @click="$gtag_trackEvent('form', 'click', 'btn_vote_line')"
            src="@/assets/img/popup/successVoteBtn3.png"></a>

      </div>
      <img v-if="formBox=='3'" class="'discount" src="@/assets/img/popup/discount.png">
      <!-- 隱私權 -->
      <div v-if="formBox=='4'" class="privacy">
        <div class="privacyBox">
          <img src="@/assets/img/popup/privacy.png">
        </div>
      </div>
      <!-- 已投過票 -->
      <div v-if="formBox=='5'">
        <img src="@/assets/img/popup/haveVoted.png">
      </div>
    </div>
    <!-- popup背景 -->
    <button @click="closePopup">
      <div class="popupBG"></div>
    </button>

  </div>
</template>

<script>
  import swal from 'sweetalert2'
  import axios from 'axios';
  import googleRecapcha from '@/components/googleRecapcha.vue';
  export default {
    name: 'popupBox',
    props: ['popupLocation', 'thisItemToken', 'apiUrl'],
    components: {
      googleRecapcha
    },
    data() {
      return {
        formBox: '1',
        valid: true,
        checkbox: '',
        form: {
          name: '',
          mobile: '',
          email: '',
          // address: '',
          foodID: '',
          gCAPTCHA_token: ''
        },
        rules: {
          name: [v => (!!v) || '請輸入姓名'],
          mobile: [v => !!v || '請輸入十位手機號碼', v => /^[0-9]{10}$/.test(v) || '格式錯誤'],
          email: [v => !!v || '請輸入電子信箱', v => /.+@.+\..+/.test(v) || '格式錯誤'],
          address: [v => (!!v) || '請輸入地址', v => /.{6,}$/.test(v) || '至少輸入六個字'],
        },
      }
    },
    methods: {
      closePopup() {
        this.$emit('popupStatus', false);
        this.formBox = '1'
      },
      // 驗證表單
      validate() {
        this.$refs.form.validate();
        if (this.$refs.form.validate()) {
          this.googleVerify()
        }
      },
      // 打googleRecapcha
      googleVerify() {
        this.$refs.googleRecapcha.execute();
      },
      // 獲得googleRecapcha 資料
      getGoogleRecapcha(val) {
        this.form.gCAPTCHA_token = val
        this.form.foodID = this.thisItemToken
        this.addData()
      },
      // 傳資料
      addData() {
        var me = this;
        var config = {
          method: "post",
          url: me.apiUrl + 'API/AddData_Vote/FFBCB947B9244C8CA7F586CE87DD864F',
          data: new FormData()
        }
        config.data.append('name', me.form.name || '$.null');
        config.data.append('Email', me.form.email || '$.null');
        config.data.append('mobile', me.form.mobile || '$.null');
        // config.data.append('address', me.form.address || '$.null');
        config.data.append('foodID', me.form.foodID || '$.null');
        config.data.append('gCAPTCHA_token', me.form.gCAPTCHA_token || '$.null');
        swal.fire({
          didOpen: () => {
            swal.fire({
              allowOutsideClick: false
            });
            swal.showLoading();
            axios(config).then(res => {
              var data = res.data;
              if (data && data.success) {

                this.$gtag_trackEvent('form', 'click', 'btn_vote_ok')
                this.$line_trackEvent('Complete')
                this.formBox = '2'
                this.form.name = ''
                this.form.mobile = ''
                this.form.email = ''
                this.form.foodID = ''
                this.form.gCAPTCHA_token = ''
              } else {
                this.formBox = '5'
              }
            }).catch((err) => {
              console.log(err)
              alert("系統忙碌中，請稍後再試");
            }).finally(() => {
              swal.close();
            })
          }
        })
      },
    },
    watch: {},
    created: function () {},
    mounted: function () {

    },
  }
</script>
<style lang="scss">
  .popupBox {
    visibility: hidden;
    opacity: 0;
    transition: all .3s;

    &.active {
      visibility: visible;
      opacity: 1;
      transition: all .3s;
    }
  }

  .popup {
    position: fixed;
    z-index: 111;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -20%);
    width: 80%;
    max-width: 365px;
    background: linear-gradient(to top, #fedb3f 40%, #ff7928 100%);
    padding: 20px 35px;

    &.privacyOut {
      padding: 20px 10px;
      margin: 10px;
    }

    >img.menuX {
      width: 10vw !important;
      max-width: 50px !important;
      position: fixed;
      right: -25px;
      top: -25px;
    }

    &.active {
      opacity: 1;
      transform: opacity .3s;
    }


    &.discount {
      width: 100%;
      max-width: 100%;
      height: 100vh;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 90%;
        max-width: 500px;
        right: 4vw;
        top: 9vw;
      }
    }
  }

  .popupBG {
    opacity: 0.85;
    background-color: #000000;
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
    z-index: 110;
  }

  .successVote {
    img {
      margin-bottom: 15px;
    }
  }

  .privacy {
    height: 75vh;
    overflow-y: scroll;

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 3px hsla(49deg, 99%, 62%, 0%);
      background-color: hsla(49deg, 99%, 62%, 0%);
    }

    //捲軸寬度
    &::-webkit-scrollbar {
      width: 3px;
      background-color: hsla(49deg, 99%, 62%, 0%);
    }

    //捲軸本體顏色
    &::-webkit-scrollbar-thumb {
      background-color: #ff7928;
    }
  }
</style>