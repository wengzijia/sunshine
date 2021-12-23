<template>
  <div class="cartContainer">
    <!-- 显示收货地址 -->
    <div v-if="goodsList.length > 0" class="addressBox">
      <div v-if="isHaveAddress" class="info" @click="$router.push('/address')">
        <div class="username">
          <van-icon name="location-o" size="30" />
          <span class="name location-o">{{ address.name }}</span>
          <span class="phone">{{ address.tel }}</span>
        </div>
        <div class="address">
          {{ address.province }}{{ address.city }}{{ address.country
          }}{{ address.addressDetail }}
        </div>
      </div>
      <!-- 没有收货地址显示 -->
      <div v-else class="addAddress">
        <van-button to="/newAddress" round plain block type="info"
          >还没有地址哦,点击去添加地址</van-button
        >
      </div>
    </div>
    <div class="item" v-for="(item, index) in goodsList" :key="item.id">
      <div class="status">
        <van-checkbox
          @click="alterChecked(item.id, $store.getters.getStatusId[item.id])"
          v-model="$store.getters.getStatusId[item.id]"
        />
      </div>
      <div class="imgWrap">
        <img :src="item.thumb_path" alt="" />
      </div>
      <div class="info">
        <div class="title van-ellipsis">{{ item.title }}</div>
        <div class="price">
          <div class="rate">&yen;{{ item.sell_price }}</div>
          <van-stepper
            @change="alterNumber($event, item.id)"
            v-model="$store.getters.getNumberById[item.id]"
            theme="round"
            button-size="22"
            disable-input
          />
          <van-button
            type="danger"
            plain
            hairline
            size="small"
            @click="delGoods(item.id, index)"
            >删除</van-button
          >
        </div>
      </div>
    </div>
    <!-- 购物车没数据显示 -->
    <van-empty
      v-if="!goodsList.length"
      :image="emptyPicture"
      description="购物车还是空的,快来挑选好货吧~~"
    >
      <van-button plain type="info" class="bottom-button" to="/goodslist">去逛逛</van-button>
    </van-empty>
    <!-- 提交订单 -->
    <van-submit-bar
      :class="{ db: isMainPage }"
      :price="$store.getters.getTotalPrice * 100"
      button-text="提交订单"
      :disabled="goodsList.length === 0 || !address"
      @submit="onSubmit"
    >
      <template #default>
        <span style="padding: 10px"
          >合计{{ $store.getters.getSelectedTotalNumber }}件</span
        >
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import { fetchCartGoodsList } from "@/api/index.js";
import { fetchUserAddress } from "@/api/address.js";
// 导入订单id
import { orderId } from "@/util/tools.js";

// 下单
import {fetchPlaceOrder} from "@/api/order.js"

export default {
  data() {
    return {
      goodsList: [],
      ids: this.$store.getters.getGoodsIds,
      emptyPicture: require("@/assets/images/cart-empty.png"),
      isHaveAddress: false, // 是否有地址
      isMainPage: false, // 是否主页面
      address: {},
    };
  },
  methods: {
    async _fetchCartGoodsList() {
      // 购物车没有数据则不请求
      if(!this.ids){
        return;
      }
      // this.ids = this.ids ? this.ids : 0; // 没有id 默认传0 容错
      let { message } = await fetchCartGoodsList(this.ids);
      this.goodsList = message;
    },
    async userAddress() {
      // 没有id,则不再发送获取地址请求
      if(!this.ids){
        return;
      }
      let userId = this.$store.state.userInfo.id;
      let userAllAddress = await fetchUserAddress(userId);
      // 判断是否有地址  !!转换为布尔类型
      this.isHaveAddress = !!userAllAddress.length;
      // 只有一个地址就是默认地址
      if (userAllAddress.length === 1) {
        this.address = userAllAddress[0];
        return;
      }
      // 判断是否有默认收货地址
      let defaultIndex = userAllAddress.findIndex(
        (item) => item.isDefault === 1
      );
      if (defaultIndex !== -1) {
        // 说明有默认地址
        this.address = userAllAddress[defaultIndex];
      } else {
        // 没有默认地址,就把第一个作为默认地址
        this.address = userAllAddress[0];
      }
    },
    async onSubmit() {
      let user_id = this.$store.state.userInfo.id;
      if (!user_id) {
        this.$router.push("/login");
        return;
      }
      // 下单数据
      let orderData = {
        user_id,
        order_id: orderId(),
        address_id: this.address.id,
        total_price: this.$store.getters.getTotalPrice,
        number: this.$store.getters.getSelectedTotalNumber,
        goods_ids: this.$store.getters.getSelectedGoodsIds,
      };
      // 下单提示
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: "下单中...",
        forbidClick: true,
        overlay: true
      });

      let {message,status} = await fetchPlaceOrder(orderData)
      this.$toast(message)
      
      if(status === 0 ){
        // 清除购物车数据
        this.$store.commit('clearCartData')
        // 直接替换
        this.$router.replace('/orderlist')
      }

      // 下单成功或者失败都关闭提示
      this.$toast.clear()

    },
    // 删除商品
    delGoods(id, index) {
      // 删除data的商品
      this.goodsList.splice(index, 1);
      // 删除vuex
      this.$store.commit("delGoods", id);
    },
    // 改变选中状态
    alterChecked(id, selected) {
      this.$store.commit("setGoodsChecked", { id, selected });
    },
    // 改变数量
    alterNumber(number, id) {
      this.$store.commit("setGoodsNumber", { number, id });
    },
  },
  created() {
    if (this.$parent.fromRoute) {
      this.isMainPage = !!this.$parent.fromRoute.meta.mainPage;
    } else {
      this.isMainPage = true;
    }
    this._fetchCartGoodsList();
    this.address = JSON.parse(localStorage.getItem("address") || "{}");
    let isShippingAddress =
      Object.keys(this.address).length === 0 ? false : true;
    this.isHaveAddress = isShippingAddress;
    if (!this.isHaveAddress) {
      this.userAddress();
    }
  },
};
</script>

<style lang="scss" scoped>
.cartContainer {
  padding: 6px;
  background-color: #f0eded;
  height: 100vh;
  // 深度选择器
 ::v-deep .van-empty{
    .van-empty__image{
      img{
        border-radius: 50%;
      }
    }
  }
  .addressBox {
    .info {
      background-color: #fff;
      padding: 10px;
      font-weight: 600;
      font-size: 18px;
      border: 1px solid goldenrod;
      border-radius: 20px;
      margin: 6px;
      .username {
        margin-bottom: 6px;
        .phone {
          margin-left: 30px;
        }
      }
      .address {
        margin-left: 30px;
      }
    }
  }
  .addAddress {
    margin: 10px;
  }
  .item {
    display: flex;
    align-items: center;
    background-color: #fff;
    .status {
      margin-left: 10px;
    }
    .imgWrap {
      width: 60px;
      padding: 6px;
      img {
        width: 100%;
      }
    }
    .info {
      flex: 1;
      .title {
        width: 276px;
      }
      .price {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 6px;
        .rate {
          color: red;
          font-size: 20px;
        }
      }
    }
  }
  .db {
    margin-bottom: 50px;
  }
}
</style>