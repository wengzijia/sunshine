<template>
  <div>
    <Child :message="data" @alter="handle"></Child>
    {{msg}}
  </div>
</template>

<script>
import Child from "./zi.vue";
export default {
  data() {
    return {
      data: "父亲",
      msg:''
    };
  },
  methods:{
    handle(msg){
      this.msg = msg
    }
  },
  
  components: {
    Child,
  },
};
</script>

<style lang="scss" scoped>
</style>