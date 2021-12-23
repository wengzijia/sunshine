<template>
  <div>
    <van-address-edit
      :area-list="areaList"
      :addressInfo="editAddressInfo"
      show-postal
      show-delete
      show-set-default
      @change-area="changeArea"
      @change-default="changeDefault"
      @save="save"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @delete="onDelete"
    />
  </div>
</template>

<script>
// 导入默认的省市区数据
import { areaList } from "@vant/area-data";
import { fetchDeleteAddress, fetchUpdateAddress } from "@/api/address.js";
export default {
  // props只读,不能改
  props: {
    addressInfo: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      areaList,
      editAddressInfo: {},
      areaCode: "",
      isDefault: null,
    };
  },
  methods: {
    async onDelete() {
      let { status, message } = await fetchDeleteAddress(
        this.editAddressInfo.id
      );
      if (status == 0) {
        setTimeout(() => {
          this.$router.back();
        }, 600);
      }
      this.$toast(message);
    },
    async save(userInfo) {
      let editInfo = {
        ...userInfo,
        areaCode: this.areaCode,
        isDefault: this.isDefault,
        country: userInfo.county,
      };
      let { status,message} = await fetchUpdateAddress(editInfo.id,editInfo)
      this.$toast(message)
      if(status === 0){
        this.$router.back()
      }
    },
    // 修改收件地区时触发
    changeArea(values) {
      // 120000-120100-120101
      this.areaCode = values.map((item) => item.code).join("-");
    },
    // 切换是否使用默认地址时触发
    changeDefault(value) {
      // 转换为1和0  1=true  0=false
      this.isDefault = value ? 1 : 0;
    },
  },
  created() {
    this.editAddressInfo = JSON.parse(this.addressInfo);
    console.log(this.editAddressInfo);
    // 默认省市区编码
    this.areaCode = this.editAddressInfo.fullAreaCode;
    // 默认的地址
    this.isDefault = this.editAddressInfo.isDefault ? 1 : 0
  },
};
</script>

<style lang="scss" scoped>
</style>