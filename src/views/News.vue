<template>
  <div class="newslist-container">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        :offset="300"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <router-link tag="div" :to="'/newsdetails/'+item.id" class="box" v-for="item in newsList" :key="item.id">
          <div class="picture">
            <img v-lazy="item.img_url" alt="" />
          </div>
          <div class="contentBox">
            <div class="title van-multi-ellipsis--l2">{{item.title}}</div>
            <div class="date">
              <span>日期:{{ item.add_time | dataFormat('YYYY-MM-DD')}}</span>
              <span>浏览次数:{{item.click}}</span>
            </div>
          </div>
        </router-link>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { fetchNewsList } from "@/api/index.js";
export default {
  data() {
    return {
      page: 0,
      limit: 8,
      newsList: [],
      loading: false, // 控制是否在加载中
      finished: false, // 控制是否加载完成
      refreshing: false, // 控制是否在刷新中...
    };
  },
  methods: {
    async getNewsList() {
      //   正在刷新中则把数据清空
      if (this.refreshing) {
        this.newsList = [];
        this.refreshing = false;
      }
      let  {message}  = await fetchNewsList(this.page, this.limit);
      this.newsList = [...this.newsList, ...message];
      this.loading = false; // 加载完毕

      if (message.length === 0) {
        this.finished = true;
      }
    },
    handle(data, event) {
      this.$router.push("/productDetails/" + data.id);
    },
    onLoad() {
      this.page++;
      // 默认会加载一次
      this.getNewsList();
    },
    onRefresh() {
      this.page = 0;
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
  },
  // created() {
    //   this.getNewsList();
    // },
};
</script>

<style lang="scss" scoped>
.newslist-container {
  .box {
    margin: 20px;
    background-color: rgba(248, 252, 1,.6);
    display: flex;
    .picture {
      width: 200px;
      height: 100px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .contentBox{
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .title{
        font-weight: 700;
      }
      .date{
        color:slateblue;
        font-size: 12px;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>