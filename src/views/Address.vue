<template>
  <div>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @select="selected"
    />
    <van-empty v-if="list.length === 0" description="请先完善收获地址" />
  </div>
</template>

<script>
import { fetchUserAddress } from "@/api/address.js";
export default {
  data() {
    return {
      chosenAddressId: "",
      list: [],
    };
  },
  methods: {
    onAdd() {
      this.$router.push("/newAddress");
    },
    onEdit(item, index) {
      this.$toast("编辑地址:" + index);
      this.$router.push("/editAddress/" + JSON.stringify(this.list[index]));
    },
    async userAddress() {
      let userId = this.$store.state.userInfo.id;
      let allAddress = await fetchUserAddress(userId);
      // 没有地址就意味着没有id,不再往下执行
      if(allAddress.length === 0){
        return;
      }
      // 默认地址排最前面
      allAddress = allAddress.map((item) => {
        // 额外添加属性,记录编码
        item.fullAreaCode = item.areaCode; 
        // 截取 保留最后一个
        item.areaCode = item.areaCode.split('-')[2]
        if (item.isDefault) {
          item.isDefault = true;
        } else {
          item.isDefault = false;
        }
        return item;
      });
      let index = allAddress.findIndex((item) => item.isDefault == true);
      if (index >= 0) {
        let defaultAddress = allAddress[index];
        this.chosenAddressId = defaultAddress.id;
        allAddress.splice(index, 1); // 删除1个
        allAddress.unshift(defaultAddress); // 始终添加到最前面
      }else {
        // 第一个地址作为默认地址
        this.chosenAddressId = allAddress[0].id  
      }
       this.list = allAddress;
    },
    // 切换选中的地址时触发
    selected(addressInfo,index){
      localStorage.setItem('address',JSON.stringify(addressInfo))
      this.$router.back()
    }
  },
  created() {
    this.userAddress();
  },
};
</script>

<style lang="scss" scoped>
</style>