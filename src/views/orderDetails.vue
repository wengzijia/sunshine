<template>
  <div class="orderDetailsContainer">
    <div class="finish">
      <div><van-icon name="certificate" color="#fff" />已完成</div>
      <van-button round type="default" size="small">再次购买</van-button>
    </div>
    <div class="addressBox">
      <div class="icon">
        <van-icon size="28" name="location-o" color="#1989fa" />
      </div>
    <div class="addressInfo" v-if="orderInfo.address_info !== undefined">
        <div class="username">
          {{ orderInfo.address_info.name }} {{ orderInfo.address_info.tel }}
        </div>
        <div class="address">
          {{ orderInfo.address_info.province }}
          {{ orderInfo.address_info.city }}
          {{ orderInfo.address_info.country }}
          {{ orderInfo.address_info.addressDetail }}
        </div>
      </div>
    </div>
    <div class="goodsInfo" v-for="item in goodsInfo" :key="item.id">
      <div class="shop">
        <van-icon name="shop-o" />
        <span>总统特权店</span>
        <van-icon name="vip-card-o" />
      </div>
      <div class="goods">
        <div class="imgWrap">
          <img :src="item.thumb_path" alt="" />
        </div>
        <div class="info">
          <div class="title">{{ item.title }}</div>
          <div class="price">&yen;{{ item.sell_price }}</div>
        </div>
      </div>
      <van-button
        round
        size="small"
        icon="certificate"
        plain
        type="primary"
        class="afterSale"
        >申请售后</van-button
      >
      <div class="service">
        <van-button
          round
          icon="vip-card-o"
          size="small"
          plain
          type="primary"
          class="afterSale"
          >联系客服</van-button
        >
        <van-button
          round
          icon="phone-o"
          size="small"
          plain
          type="primary"
          class="afterSale"
          >拨打卖家电话</van-button
        >
      </div>
    </div>
    <div class="orderInfoWrap">
      <div class="number item">
        订单编号:{{ orderInfo.order_id }}
        <van-button
          round
          size="mini"
          plain
          type="primary"
          v-clipboard:copy="orderInfo.order_id"
          v-clipboard:success="onCopy"
          >复制</van-button
        >
      </div>
      <div class="orderTime item">下单时间:{{ orderInfo.add_time }}</div>
      <div class="payment item">支付方式:{{ orderInfo.pay_way }}</div>
      <div class="express item">配送方式:jd快递</div>
    </div>
    <div class="buttonBox">
      <template v-if="orderInfo.status == 1">
        <van-button size="mini" plain icon="passed" type="warning"
          >提醒发货</van-button
        >
        <van-button
          size="mini"
          plain
          icon="free-postage"
          type="primary"
          @click="checkLogistics"
          >查看物流</van-button
        >
      </template>
      <template v-if="orderInfo.status == 2">
        <van-button size="mini" plain icon="certificate" type="danger"
          >已完成</van-button
        >
        <van-button size="mini" plain icon="records" type="info"
          >评价</van-button
        >
      </template>
      <van-button
        v-if="orderInfo.status == 0"
        icon="refund-o"
        size="mini"
        type="danger"
        >立即付款</van-button
      >
    </div>

    <van-popup
      v-model="show"
      round
      position="bottom"
      :style="{ height: '80%' }"
    >
      <van-steps direction="vertical" :active="0">
        <div class="addressBox">
          <div class="icon">
            <van-icon size="28" name="location-o" color="#1989fa" />
          </div>
          <div class="addressInfo" v-if="orderInfo.address_info !== undefined">
            <div class="username">
              {{ orderInfo.address_info.name }} {{ orderInfo.address_info.tel }}
            </div>
            <div class="address">
              {{ orderInfo.address_info.province }}
              {{ orderInfo.address_info.city }}
              {{ orderInfo.address_info.country }}
              {{ orderInfo.address_info.addressDetail }}
            </div>
          </div>
        </div>
        <van-step v-for="(item,index) in logisticsData" :key="index">
          <h3>{{item.location}}</h3>
          <p>{{item.time}}</p>
        </van-step>
      </van-steps>
    </van-popup>
  </div>
</template>

<script>
import { fetchOrderInfo, fetchLogistics } from "@/api/order.js";
import { fetchCartGoodsList } from "@/api/index.js";
export default {
  props: ["order_id"],
  data() {
    return {
      orderInfo: {},
      goodsInfo: [],
      show: false,
      logisticsData:[],
    };
  },
  methods: {
    async OrdersInfo() {
      this.orderInfo = await fetchOrderInfo(this.order_id);
      this.orderInfo.address_info = JSON.parse(this.orderInfo.address_info);
      let { message } = await fetchCartGoodsList(this.orderInfo.goods_ids);
      this.goodsInfo = message;
    },
    onCopy() {
      this.$toast("订单号复制成功");
    },
   async checkLogistics() {
      this.logisticsData = await fetchLogistics()
      this.show = true;
    },
  },
  created() {
    this.OrdersInfo();
  },
};
</script>

<style lang="scss" scoped>
.orderDetailsContainer {
  background-color: rgb(253, 253, 253);
  height: 100vh;
  .finish {
    background-color: #ff433e;
    color: #fff;
    line-height: 40px;
    text-align: center;
    padding-bottom: 10px;
  }
  .addressBox {
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 10px;
    .icon {
      margin-right: 10px;
    }
    .addressInfo {
      color: #5c5a5a;
      .address {
        margin-top: 6px;
      }
    }
  }
  .goodsInfo {
    background-color: #fff;
    height: 180px;
    .shop {
      padding: 10px;
      span {
        padding: 6px;
      }
    }
    .goods {
      display: flex;
      padding: 10px;
      .imgWrap {
        width: 80px;
        img {
          width: 100%;
        }
      }
      .info {
        margin-left: 10px;
        .price {
          margin-top: 10px;
          color: red;
        }
      }
    }
    .afterSale {
      float: right;
      clear: both;
    }
    .service {
      display: flex;
    }
  }
  .orderInfoWrap {
    background-color: #fff;
    padding: 6px;
    .item {
      padding: 6px;
      display: flex;
      align-items: center;
    }
  }
  .buttonBox {
    display: flex;
    justify-content: flex-end;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: rgb(252, 250, 250);
    box-shadow: 0 0 10px red;
    line-height: 40px;
    width: 100%;
    padding: 10px;
  }
}
</style>