<template>
  <div class="item">
    <div class="itemImg">
      <img :src="getPreviewUrl(item.id)">
    </div>
    <div class="itemTxt">
      <div class="txt">
        {{item.txt}}
      </div>
      <div class="ticket">
        <span>美味票數</span> {{item.ticket}}
      </div>
    </div>
    <div class="vote" @click="$emit('seePopup',item.id)">
      <a href="javascript:void(0)">
      <img src="@/assets/img/list/bnt.png" @click="$gtag_trackEvent('vote', 'click', 'btn_vote_'+item.id)"></a>
    </div>
  </div>

</template>
<script>
  export default {
    name: 'popupBox',
    props: ["item", "apiUrl",],
    data() {
      return {
        
      }
    },
    methods: {
      getPreviewUrl(id) {
        return this.$props.apiUrl +
          `API/GetFile/4756280689664F3CBA32F19366A05F38/id/${id}/file_food?d=a22_tatung_food&&v=1`;
      },
    }

  }
</script>
<style scoped lang="scss">
  .item {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 50px;

    .itemTxt {
      width: 75%;
      padding-right: 10px;

      .txt {
        line-height: 1.4;
        word-wrap: break-word;
        margin-bottom: 15px;
        text-align: justify
      }

      .ticket {
        span {
          font-size: 13px;
          font-weight: 200;
          background-color: #000000;
          color: #ffffff;
          padding: 2px 10px;
          margin-right: 10px;
        }
      }
    }

    .vote {
      width: 25%;
      &:hover {
          cursor: pointer;
        }
    }
  }
</style>
