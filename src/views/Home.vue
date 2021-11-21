<template>
  <div class="BigBox">
    <!-- 搜索框 -->
    <div class="header">
      <img src="../assets/images/sunLogo.jpg" alt="" />
      <van-search v-model="value" placeholder="搜一搜更健康" />
      <img src="../assets/images/miLogo.jpg" alt="" />
    </div>
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="item in carousel" :key="item.img" class="swipeBox">
        <img class="picture" v-lazy="item.img" />
      </van-swipe-item>
    </van-swipe>
    <!-- 8宫格 -->
    <van-grid square clickable>
      <van-grid-item v-for="item in grids" :key="item.img">
        <div class="item">
          <img :src="item.img" alt="" />
          <div class="text">{{ item.text }}</div>
        </div>
      </van-grid-item>
    </van-grid>
    <!-- 为你推荐 -->
    <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    >
      为你推荐
    </van-divider>
    <!-- 产品列表 -->
    <div class="productList">
      <div class="item" v-for="item in productList" :key="item.id">
        <div class="imgBox">
          <img :src="item.img_url" alt="" />
        </div>
        <div class="text ellipsis_l1">
          {{ item.title }}
        </div>
        <div class="price">
          <span>&yen;{{ item.market_price }}</span>
          <span>{{ item.likes }}购买</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入轮播图接口
import { fetchCarousel, fetchProductList } from "@/api/index.js";

export default {
  data() {
    return {
      value: "",
      carousel: [],
      // 这里需要require引入
      grids: [
        { text: "数码电器", img: require("@/assets/images/menu10.png") },
        { text: "乐淘头条", img: require("@/assets/images/menu12.png") },
        { text: "美图欣赏", img: require("@/assets/images/menu13.png") },
        { text: "分类", img: require("@/assets/images/menu19.png") },
        { text: "9.9元拼单", img: require("@/assets/images/menu15.png") },
        { text: "话费充值", img: require("@/assets/images/menu16.png") },
        { text: "物流查询", img: require("@/assets/images/menu17.png") },
        { text: "查看更多", img: require("@/assets/images/menu18.png") },
      ],
      productList: [],
    };
  },
  methods: {
    // 轮播图
    async _fetchCarousel() {
      let { message } = await fetchCarousel();
      this.carousel = message;
    },
    // 推荐商品
    async _fetchProductList() {
      let { message } = await fetchProductList();
      this.productList = message;
    },
  },
  created() {
    this._fetchCarousel();
    this._fetchProductList();
  },
};
</script>

<style lang="scss" scoped>
.BigBox {
  padding-bottom: 50px;
  .header {
    display: flex;
    img {
      width: 50px;
      height: 50px;
    }
    .van-search {
      flex: 1; // 占满剩余空间
    }
  }
  .swipeBox {
    width: 750px;
    height: 200px;
    .picture {
      width: 100%;
      height: 100%;
    }
  }

  .van-grid {
    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column; // 垂直显示
      font-size: 14px;
      img {
        width: 50%;
        margin-bottom: 12px;
      }
    }
  }

  .productList {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    background-color: #f0eded;
    .item {
      width: 48%;
      height: 240px;
      // border: 1px solid red;
      display: flex;
      flex-direction: column;
      margin-top: 10px;
      padding: 10px;
      background-color: #fff;
      .imgBox {
        width: 100%;
        height: 80%;
        text-align: center;
        // border: 1px solid blue;
        padding: 10px;
        img {
          width: 60%;
          height: 80%;
        }
      }
      .text {
        font-size: 12px;
        margin: 0px 60px;
      }
      .price {
        display: flex;
        justify-content: space-around;
        margin-top: 10px;
        align-items: center;
        span:first-child {
          color: rgb(255, 183, 0);
        }
        span:last-child {
          font-size: 12px;
          color: #ccc;
        }
      }
    }
  }
}
</style>