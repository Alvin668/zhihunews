<template>
  <div>
    <van-skeleton title :row="4" v-if="!body">
      <div style="height: 100px"></div>
    </van-skeleton>

    <div class="homeBox">
      <div class="top">
        <div class="back" @click="goBack"><</div>
      </div>
      <img :src="image" style="height: 200px; width: 100%; margin-top: 30px" />
      <div v-html="body"></div>
    </div>
  </div>
</template>

<script>
import { API_DETAIL } from "../api/index";
export default {
  name: "detail",
  data() {
    return {
      body: "",
      image: "",
      newsData: [],
    };
  },
  methods: {
    goBack() {
      this.$router.back();
    },
  },
  created() {
    let { id } = this.$route.params;
    API_DETAIL(id).then((res) => {
      let link = document.getElementById("link");
      if (!link) {
        link = document.createElement("link");
        link.id = "link";
        link.href = res.data.css[0];
        link.rel = "stylesheet";
        document.body.appendChild(link);
      }
      this.body = res.data.body;
      this.image = res.data.image;
      //   let img = document.createElement("img");
      //   img.src = res.data.image;
    });
  },
};
</script>

<style lang="less">
.img-place-holder {
  height: 0;
}
.top {
  box-sizing: border-box;
  position: fixed;
  width: 100%;
  height: 30px;
  background-color: #f2f2f2;
  .back {
    box-sizing: border-box;
    width: 30px;
    height: 30px;
    line-height: 30px;
    vertical-align: middle;
    font-size: 13px;
    border-radius: 50%;
    background-color: #e1e1e1;
    text-align: center;
    border: 1px solid #b7b7b7;
  }
}
</style>