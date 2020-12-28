<template>
  <div id="topbanner" class="top-banner">
    <div class="date">
      <span class="day">{{ day }}</span>
      <span class="month">{{ month }}月</span>
    </div>
    <div class="title">知乎日报</div>
    <div class="photo"></div>
  </div>
</template>

<script>
export default {
  name: "TopBanner",
  data() {
    return {
      day: new Date().getDate(),
    };
  },
  computed: {
    month() {
      let m = new Date().getMonth() + 1;
      let m_obj = {
        1: "一",
        2: "二",
        3: "三",
        4: "四",
        5: "五",
        6: "六",
        7: "七",
        8: "八",
        9: "九",
        10: "十",
        11: "十一",
        12: "十二",
      };
      return m_obj[m];
    },
  },
};
</script>

<style lang='less'>
.top-banner {
  box-sizing: border-box;
  display: flex;
  height: 50px;
  padding: 10px;
  padding-left: 0;

  .date {
    display: flex;
    flex-direction: column;
    .day {
      width: 40px;
      font-size: 16px;
    }
    .month {
      font-size: 8px;
    }
  }
  .title {
    font-size: 18px;
    font-weight: bold;
    flex: 1;
    text-align: left;
    padding-left: 8px;
    border-left: 1px solid #b7b7b7;
  }
  .photo {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: pink;
  }
}
</style>