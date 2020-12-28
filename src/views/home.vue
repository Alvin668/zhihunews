<template>
  <div>
    <top-banner></top-banner>
    <div class="container">
      <section>
        <van-swipe class="my-swipe" :autoplay="3000" v-if="images.length">
          <van-swipe-item v-for="item in images" :key="item.image">
            <router-link :to="{ name: 'detail', params: { id: `${item.id}` } }">
              <img v-lazy="item.image" />
              <span class="title">{{ item.title }}</span>
              <span class="author">{{ item.hint }}</span>
              <div class="mark"></div>
            </router-link>
          </van-swipe-item>
        </van-swipe>
      </section>
      <section>
        <van-skeleton
          title
          :row="4"
          v-if="reportData.length === 0"
        ></van-skeleton>
        <div class="list" v-else>
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有跟多数据了"
            @load="handleLoad"
          >
            <div class="item-box" v-for="item in reportData" :key="item.date">
              <h4 class="time" v-if="item.date !== time">
                <span>{{ item.date | filterTime }}</span>
                <i></i>
              </h4>

              <ul>
                <li v-for="(obj, index) in item.stories" :key="obj.id">
                  <router-link
                    :to="{ name: 'detail', params: { id: `${obj.id}` } }"
                  >
                    <div class="content">
                      <span class="title">{{ obj.title }}</span>
                      <span class="hint">{{ obj.hint }}</span>
                    </div>
                    <img class="img" :src="obj.images[0]" />
                  </router-link>
                </li>
              </ul>
            </div>
          </van-list>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { API_LATEST, API_BEFORE } from "../api/index";
import TopBanner from "../components/TopBanner.vue";
import { formatTime, delay } from "../utils";
export default {
  name: "home",
  components: { TopBanner },
  data() {
    return {
      reportData: [],
      images: [],
      newsData: [],
      time: formatTime(new Date()),
      time2: "",
      loading: false,
      finished: false,
    };
  },
  methods: {
    handleLoad() {
      this.loading = true;
      let time2 = this.time2 || formatTime(new Date());
      time2 = time2.match(/^(\d{4})(\d{2})(\d{2})$/);
      time2 = formatTime(
        new Date(
          new Date(`${time2[1]}/${time2[2]}/${time2[3]}`).getTime() - 86400000
        )
      );
      API_BEFORE(time2).then((res) => {
        this.reportData.push({
          date: res.data.date,
          stories: res.data.stories,
        });
        this.loading = false;
        this.time2 = time2;
      });
    },
  },
  filters: {
    // 格式化时间
    filterTime(time) {
      let month = time.substr(4, 2),
        day = time.substr(6);
      return month + "月" + day + "日";
    },
  },
  created() {
    API_LATEST()
      .then((res) => {
        // this.reportData = res.data.stories;
        this.images = res.data.top_stories;
        this.reportData.push({
          date: res.data.date,
          stories: res.data.stories,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang='less'>
.my-swipe {
  height: 200px;
}
.my-swipe .van-swipe-item {
  position: relative;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: #39a9ed;
  a {
    color: #fff;
  }
  > img {
    width: 100%;
    height: 200px;
  }
  .title {
    display: block;
    position: absolute;
    left: 10px;
    bottom: 25px;
  }

  .author {
    display: block;
    position: absolute;
    font-size: 10px;
    left: 10px;
    bottom: 10px;
  }
  .mark {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40px;
    background: -webkit-linear-gradient(
      top,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.7)
    ); // 从上到下，从完全透明到半透明
  }
}
.list {
  ul {
    list-style: none;
  }
  li {
    padding: 10px;
    a {
      display: flex;
      color: #000;
    }
  }
  .content {
    font-size: 10px;
    flex: 1;
    text-align: left;
    display: flex;
    flex-direction: column;
    .title {
      font-weight: bold;
    }
    .hint {
      font-size: 8px;
      color: #b7b7b7;
      margin-top: 3px;
    }
  }
  .img {
    width: 40px;
    height: 40px;
  }
}

.item-box {
  .time {
    margin: 0;
    padding: 0;
    text-align: left;
    color: #b7b7b7;
    margin-left: 8px;
    span {
      font-size: 6px;
      font-weight: normal;
    }
    i {
      display: inline-block;
      width: 80%;
      height: 1px;
      border-top: 1px solid #b7b7b7;
    }
  }
}
</style>