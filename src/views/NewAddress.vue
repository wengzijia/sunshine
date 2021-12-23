<template>
  <div>
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @change-area="changeArea"
    />
  </div>
</template>

<script>
// 导入默认的省市区数据
import { areaList } from "@vant/area-data";
import { fetchNewAddress } from "@/api/address.js";
export default {
  data() {
    return {
      areaList,
      searchResult: [],
      areaCode: "", // 地区编码   120000-120100-120102
    };
  },
  methods: {
    async onSave(addressInfo) {
      // 获取用户的id
      let userId = this.$store.state.userInfo.id;
      // 默认选中转换为 1 和 0
      addressInfo.isDefault = addressInfo.isDefault ? 1 : 0;
      // 把区赋给他
      addressInfo.country = addressInfo.county;
      // addressInfo.areaCode = this.areaCode
      // 地址数据
      let formData = {
        ...addressInfo,
        areaCode: this.areaCode,
      };
      //addressInfo
      let result = await fetchNewAddress(userId,formData);
      this.$router.back();
    },
    changeArea(values) {
      // 地区编码用(-)连接,再赋给他
      this.areaCode = values.map((item) => item.code).join("-");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>