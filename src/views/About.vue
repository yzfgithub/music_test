<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div @click='aaa'>aa</div>
  </div>
</template>
<script>
export default {
  data(){
    return {

    }
  },
  methods:{
    aaa(){
      const instance =this.$kplHello({
        $props:{
          content:'yzf',
        },
        $events:{
          click: () => {
            // console.log('s')
            instance.remove();
          },
          change: (e) => {
            console.log(e);
          }
          // select: this.selectHandler
        }
      }).show();
    }
  }
}
</script>
<style scoped>
  .about{
   
  }
</style>
