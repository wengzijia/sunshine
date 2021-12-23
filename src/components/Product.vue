<template>
      <div  class="item" @click="sendData">
        <div class="imgBox">
          <img :src="data.img_url" alt="" />
        </div>
        <div class="text ellipsis_l1">{{ data.title }}</div>
        <slot name="base">
        <div class="price">
          <span>&yen;{{ data.market_price }}</span>
          <span>{{ data.likes }}购买</span>
        </div>
        </slot>
      </div>
</template>

<script>
    export default {
        props:{
            data:{
                // 参数类型对象
                type:Object,
                required:true  // 必传 
            }
        },
        methods:{
            sendData(event){
                this.$emit('click',this.data,event);
            }
        }
    }
</script>

<style lang="scss" scoped>
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
        height: 76%;
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
        margin: 0 10px;
        text-align: center;
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
</style>