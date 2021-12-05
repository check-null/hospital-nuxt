<template>
  <div></div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import《组件名称》from'《组件路径》';

export default {
  data() {
    //这里存放数据
    return {};
  },
  mounted() {
    this.callback();
  }, //生命周期-挂载完成（可以访问DOM元素）
  methods: {
    callback() {
      console.log(2);
      let token = this.$route.query.token;
      let name = this.$route.query.name;
      let unionId = this.$route.query.unionId;
      this.$route.params.call = { token, name, unionId };
      this.$route.params.isCall = true;
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>