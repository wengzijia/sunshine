<template>
  <div class="productDetails">
    <!-- 图片轮播懒加载 -->
    <div class="public imgBox" @click="viewImage">
      <van-swipe class="img" :autoplay="3000">
        <van-swipe-item v-for="(item, index) in carousel" :key="index">
          <img v-lazy="item.src" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 商品信息 -->
    <div class="public info">
      <div class="price">
        <span class="discountPrice">&yen;{{ goodsData.sell_price }}</span>
        <span class="originalPrice">&yen;{{ goodsData.market_price }}</span>
      </div>
      <div class="public title">{{ goodsData.title }}</div>
    </div>
    <!-- 商品内容 -->
    <div class="public contentBox">
      <van-divider
        :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
      >
        介绍
      </van-divider>
      <div class="content" v-html="goodsData.content"></div>
    </div>
    <!-- 购物车购买 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" @click="Service" text="客服" />
      <van-goods-action-icon @click="$router.push('/cart')" icon="cart-o" text="购物车" :badge="$store.getters.getTotalNumber" />
      <van-goods-action-button
        color="#be99ff"
        type="warning"
        text="加入购物车"
        @click="cartPopup"
      />
      <van-goods-action-button
        color="#7232dd"
        type="danger"
        text="立即购买"
        @click="buyPopup"
      />
    </van-goods-action>
    <!-- Sku商品规格 -->
    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :goods-id="goodsData.id"
      :hide-stock="sku.hide_stock"
      :reset-stepper-on-hide="true"
      :show-add-cart-btn="isShowCart"
      @add-cart="addCart"
      @buy-clicked="buyNow"
    >
      <template #sku-messages>
        <div class="card">
          <van-divider>文字</van-divider>
          <div>商品货号：{{ goodsData.goods_no }}</div>
          <div>库存：{{ goodsData.stock_quantity }}件</div>
          <div>
            上架时间：{{ goodsData.add_time | dataFormat("YYYY-MM-DD") }}
          </div>
        </div>
      </template>
    </van-sku>
    <!-- 回到顶部 -->
    <GotoTop></GotoTop>
  </div>
</template>

<script>
import { fetchGoodsInfo, fetchViewpager } from "@/api/index.js";
import { ImagePreview } from "vant"; // 图片预览
import GotoTop from "@/components/GotoTop.vue"
export default {
  props: ["id"], //方式二:接受外面传过来的id参数
  data() {
    return {
      // 方式一:拿到当前路由的id参数
      // id: this.$route.params.id
      carousel: [],
      goodsData: {},
      show: false, // 默认不显示sku弹窗
      sku: {
        tree: [],
        price:'', // 默认价格（单位元）
        stock_num: 18, // 商品总库存
        hide_stock: false, // 是否隐藏剩余库存
      },
      goods: {
        picture: "",
      },
      isShowCart:true
    };
  },
  methods: {
    async _fetchCarousel() {
      let { message } = await fetchViewpager(this.id);
      this.carousel = message;
      // 把图片路径赋给他
      this.goods.picture = message[0].src;
    },
    async _fetchGoodsInfo() {
      let { message } = await fetchGoodsInfo(this.id);
      let reg = /\width=['"]\w+['"]\s+/i; // 正则匹配
      message.content = message.content.replace(reg, ""); // 正则替换
      this.goodsData = message;
      this.sku.price = message.sell_price
      this.sku.stock_num = message.stock_quantity
    },
    // 点击购物车弹出sku相关信息
    cartPopup() {
      this.show = true;
      this.isShowCart = true
    },
    buyPopup() {
      this.show = true;
      this.isShowCart = false
    },
    Service() {
      // 确认框
      this.$dialog
        .confirm({
          title: "客户服务",
          message: "是否要拨打电话?",
        })
        .then(() => {
          // on confirm
          // 调用系统拨打电话
          window.location.href = "tel://" + 15966668888;
        })
        .catch(() => {
          // on cancel
        });
    },
    // 预览图片
    viewImage() {
      let imgs = this.carousel.map((item) => item.src);
      ImagePreview({
        images: imgs,
        startPosition: 1,
      });
    },
    // 加入购物车
    addCart(skudata){
      // 商品id,数量
      let {goodsId,selectedNum} = skudata
      // 商品价格
      let {sell_price} = this.goodsData
      // 创建购物车的信息
      let cartData = {
        id:goodsId,
        number:selectedNum,
        sell_price,
        selected:true
      }
      // 调用mutations里面的方法.把数据传过去
      this.$store.commit('addCartGoods',cartData)
      this.show = false  // 关闭sku弹窗
    },
    // 立即购买
    buyNow(skudata){
      let { goodsId,selectedNum } =  skudata;
      let { sell_price }  = this.goodsData;
      // 购买提供id,数量,价格,selected:true  购物车默认勾选
      let  cartData  =  {id:goodsId,number:selectedNum,sell_price,selected:true}
      this.$store.commit('addCartGoods',cartData)
      this.$router.push('/cart')
    }
  },
  created() {
    this._fetchGoodsInfo();
    this._fetchCarousel();
  },
  components:{
      GotoTop
  }
};
</script>

<style lang="scss" scoped>
.productDetails {
  height: 100vh;
  padding: 6px;
  background-color: #f0eded;
  .van-goods-action{
    min-width: 320px;
    max-width: 750px;
    margin: 0 auto;
  }
  .public {
    background-color: #fff;
    border-radius: 20px;
  }
  .imgBox {
    background-color: #fff;
    .img {
      .van-swipe-item {
        height: 200px;
        text-align: center;
        img {
          width: 30%;
          height: 100%;
        }
      }
    }
  }
  .info {
    margin: 10px 0;
    padding: 8px;
    .price {
      .discountPrice {
        color: #fa865d;
        font-size: 18px;
      }
      .originalPrice {
        margin-left: 10px;
        color: #666666;
        font-size: 14px;
      }
    }
    .title {
      color: rgb(240, 6, 248);
    }
  }
  .contentBox {
    padding: 8px;
    .content {
      ::v-deep img {
        width: 100%;
      }
    }
  }
}
</style>