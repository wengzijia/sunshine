<template>
  <div class="goodsContainer">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        :offset="300"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <Goodslist
          v-for="item in Goodslist"
          :key="item.id"
          :data="item"
          @click="accept"
        >
          <template #base>
            <div class="base">
              <div class="price">
                <span>&yen;{{ item.market_price }}</span>
                <span>&yen;{{ item.sell_price }}</span>
              </div>
              <div class="info">
                <span>热卖中</span>
                <span>剩余{{ item.stock_quantity }}件</span>
              </div>
            </div>
          </template>
        </Goodslist>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { fetchGoodsList } from "@/api/index.js";
import Goodslist from "@/components/Product.vue";
export default {
  name:'GoodsList',
  data() {
    return {
      page: 0,
      limit: 12,
      Goodslist: [],
      loading: false, // 控制是否在加载中
      finished: false, // 控制是否加载完成
      refreshing: false, // 控制是否在刷新中...
    };
  },
  methods: {
    async getGoodslist() {
      // 判断是否在刷新中
      if (this.refreshing) {
        this.Goodslist = []; // 清空数据
        this.refreshing = false;  // 未在刷新中
      }
      let { message } = await fetchGoodsList(this.page, this.limit);
      this.Goodslist = [...this.Goodslist, ...message]; // 合并数组
      this.loading = false;  // 未在加载中

      // 判断数据等于空
      if (message.length === 0) {
        // 数据等于奇数的时候,就把最后一个弹出去
        this.Goodslist.length % 2 === 1 && this.Goodslist.pop();
        this.finished = true; // 加载完成
      }
    },
    accept(data, event) {
      this.$router.push("/productDetails/" + data.id);
    },
    // 加载(默认onLoad会加载一次)
    onLoad() {
      this.page++; //页码加1
      // 默认会加载一次
      this.getGoodslist();
    },
    // 刷新
    onRefresh() {
      this.page = 0;
      // 清空列表数据
      this.finished = false; // 未加载完成
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;  // 加载中
      this.onLoad();
    },
  },
  //   created() {
  //     this.getGoodslist();
  //   },
  components: {
    Goodslist,
  },
};
</script>

<style lang="scss" scoped>
.goodsContainer {
  background-color: #f0eded;
  display: flex;
  flex-wrap: wrap;
  padding: 6px;
  justify-content: space-between;
  .van-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .item {
      border-radius: 10px;
      box-shadow: 0 0 6px red;
      .base {
        font-size: 12px;
        color: #a8a5a4;
        .info {
          display: flex;
          justify-content: space-around;
        }
      }
    }
    // ::v-deep  深度选择器   node-sass => /deep/  dart-sass => ::v-deep
    ::v-deep .van-list__finished-text {
      margin: auto;
    }
  }
}
</style>