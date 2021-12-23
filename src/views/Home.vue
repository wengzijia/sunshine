<template>
  <div class="BigBox">
    <template v-if="showHome">
      <!-- 搜索框 -->
      <van-sticky>
        <div class="header">
          <img src="../assets/images/sunLogo.jpg" alt="" />
          <!-- @focus 输入框获得焦点时触发 -->
          <!-- @blur="$router.back()" 失去焦点返回上一层 -->
          <van-search
            @focus="$router.push('/home/search')"
            v-model="value"
            placeholder="搜一搜更健康"
          />
          <img src="../assets/images/miLogo.jpg" alt="" />
        </div>
      </van-sticky>
      <!-- 轮播图 -->
      <van-swipe :autoplay="3000">
        <van-swipe-item
          v-for="item in carousel"
          :key="item.img"
          class="swipeBox"
        >
          <img class="picture" v-lazy="item.img" />
        </van-swipe-item>
      </van-swipe>
      <!-- 8宫格 -->
      <van-grid square clickable>
        <van-grid-item v-for="item in grids" :key="item.img" :to="item.name">
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
        <!-- <div class="item" v-for="item in productList" :key="item.id">
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
      </div> -->
        <!-- 父通信子 绑定自定义属性 把数据(item)带过去  子组件通过props来接受  data来渲染数据 -->
        <!-- 子通信父  绑定自定义事件名 子组件通过单击事件用this.$emit把数据带过来 -->
        <Goods
          v-for="item in productList"
          :key="item.id"
          :data="item"
          @click="accept"
        ></Goods>
      </div>
      <!-- 回到顶部组件 -->
      <GotoTop :top="600"></GotoTop>
      <div style="text-align: center">
        <img src="../assets/images/gongan.png" alt="" />
        京公网安备 44030902003170号  粤ICP备2021159048号-1
      </div>
    </template>
    <!-- 搜索组件 -->
    <router-view></router-view>
  </div>
</template>

<script>
// 导入轮播图接口
import { fetchCarousel, fetchProductList } from "@/api/index.js";

// 导入商品列表组件
import Goods from "@/components/Product.vue";

// 导入回到顶部组件
import GotoTop from "@/components/GotoTop.vue";

export default {
  name:'Home',
  data() {
    return {
      value: "",
      carousel: [],
      // 这里需要require引入
      grids: [
        {
          text: "数码电器",
          img: require("@/assets/images/menu10.png"),
          name: "/goodslist",
        },
        {
          text: "乐淘头条",
          img: require("@/assets/images/menu12.png"),
          name: "/news",
        },
        { text: "美图欣赏", img: require("@/assets/images/menu13.png") },
        { text: "分类", img: require("@/assets/images/menu19.png") },
        { text: "9.9元拼单", img: require("@/assets/images/menu15.png") },
        { text: "话费充值", img: require("@/assets/images/menu16.png") },
        { text: "物流查询", img: require("@/assets/images/menu17.png") },
        { text: "查看更多", img: require("@/assets/images/menu18.png") },
      ],
      productList: [],
      showHome: true,
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
    accept(data, event) {
      this.$router.push("/productDetails/" + data.id);
    },
  },
  created() {
    // 因为刷新的时候会触发created,所以可以在这里把Home页面隐藏掉
    let { name } = this.$route;
    if (name !== "Home") {
      this.showHome = false; // 隐藏Home页面
    }
    this._fetchCarousel();
    this._fetchProductList();
  },
  // 路由(切换)更新时触发的钩子函数
  // to表示去哪里，跳转到那个页面
  // from 表示 来自那个页面
  // next() 表示继续执行页面,要加上的
  beforeRouteUpdate(to, from, next) {
    // 判断是否是home页面,是则true,否则是false
    this.showHome = to.name === "Home";
    next();
  },
  components: {
    Goods,
    GotoTop,
  },
};
</script>

<style lang="scss" scoped>
.BigBox {
  padding-bottom: 50px;
  // 深度选择器  粘性定位居中
  ::v-deep .van-sticky {
    min-width: 320px;
    max-width: 750px;
    margin: 0 auto;
  }
  .header {
    display: flex;
    img {
      width: 50px;
      height: 50px;
    }
    .van-search {
      flex: 1; // 占满剩余空间
      padding: 8px 12px;
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
    // .item {
    //   width: 48%;
    //   height: 240px;
    //   // border: 1px solid red;
    //   display: flex;
    //   flex-direction: column;
    //   margin-top: 10px;
    //   padding: 10px;
    //   background-color: #fff;
    //   .imgBox {
    //     width: 100%;
    //     height: 80%;
    //     text-align: center;
    //     // border: 1px solid blue;
    //     padding: 10px;
    //     img {
    //       width: 60%;
    //       height: 80%;
    //     }
    //   }
    //   .text {
    //     font-size: 12px;
    //     margin: 0 10px;
    //     text-align: center;
    //   }
    //   .price {
    //     display: flex;
    //     justify-content: space-around;
    //     margin-top: 10px;
    //     align-items: center;
    //     span:first-child {
    //       color: rgb(255, 183, 0);
    //     }
    //     span:last-child {
    //       font-size: 12px;
    //       color: #ccc;
    //     }
    //   }
    // }
  }
}
</style>