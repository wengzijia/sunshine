<template>
  <div>
    <van-tabs v-model="active">
      <van-tab v-for="item in orderTabs" :key="item.title" :title="item.title">
        <van-card
          v-for="item in orderData(item.status)"
          :key="item.id"
          :num="item.number"
          :price="item.total_price"
          :desc="item.pay_way"
          :title="item.goodsInfo.message[0].title"
          :thumb="item.goodsInfo.message[0].thumb_path"
          @click="viewOrderDetails(item)"
        >
          <!-- is_take  收货   is_out 发货  status  付款 -->
          <template #footer>
            <van-button
              size="mini"
              icon="completed"
              color="#7232dd"
              plain
               v-clipboard:copy="item.order_id"
               v-clipboard:success="onCopy"
              >复制订单号</van-button
            >
            <van-button
              size="mini"
              icon="service-o"
              color="#7232dd"
              plain
              @click.stop="Service"
              >联系客服</van-button
            >
            <template v-if="item.status == 1">
              <van-button size="mini" plain icon="passed" type="warning"
                >提醒发货</van-button
              >
              <van-button size="mini" plain icon="free-postage" type="primary"
                >查看物流</van-button
              >
            </template>
            <template v-if="item.status == 2">
              <van-button size="mini" plain icon="certificate" type="danger"
                >已完成</van-button
              >
              <van-button size="mini" plain icon="records" type="info"
                >评价</van-button
              >
            </template>
            <van-button
              v-if="item.status == 0"
              icon="refund-o"
              size="mini"
              type="danger"
              >立即付款</van-button
            >
          </template>
        </van-card>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { fetchCartGoodsList } from "@/api/index.js";
import { fetchUserOrder } from "@/api/order.js";
export default {
  data() {
    return {
      active: 0,
      orderTabs: [
        { title: "全部", status: "all" },
        { title: "未付款", status: "0" },
        { title: "已付款", status: "1" },
        { title: "已完成", status: "2" },
      ],
      allOrders: [],
      //   status:'all'
    };
  },
  methods: {
    async userOrder() {
      let userId = this.$store.state.userInfo.id;
      let orderData = await fetchUserOrder(userId);
      let promiseArr = [];
      orderData.forEach((item) => {
        promiseArr.push(fetchCartGoodsList(item.goods_ids));
      });

      let allOrderGoods = await Promise.all(promiseArr);
      orderData = orderData.map((item, index) => {
        item.goodsInfo = allOrderGoods[index];
        return item;
      });
      this.allOrders = orderData;
    },
    // tabWidget(index,text){
    //     let orderStatusMap = {
    //         '全部':"all",
    //         '未付款':'0',
    //         '已付款':'1',
    //         '已完成':'2'
    //     }
    //     this.status = orderStatusMap[text]
    // },
    orderData(status) {
      if (status == "all") {
        return this.allOrders;
      }
      // 过滤后再返回相应的状态数据
      return this.allOrders.filter((item) => item.status == status);
    },
    Service() {
      this.$dialog
        .confirm({
          message: "确定要联系客服吗?",
        })
        .then(() => {
          window.location.href = "tel:16866668888"
        })
        .catch(() => {
        });
    },
    onCopy(){
     window.event.stopPropagation()   // 阻止事件冒泡
      this.$toast('复制成功')
    },
    // 查看订单详情
    viewOrderDetails(orderData){
      this.$router.push('/orderDetails/'+ orderData.order_id)
    }
  },
  created() {
    this.userOrder();
  },
};
</script>

<style lang="scss" scoped>
</style>