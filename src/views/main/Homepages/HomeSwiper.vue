<template>
  <div class="swiper-size">
        <swiper :options="swiperOption">
    <swiper-slide v-for="(slide,index) in  banner" :key="index"><img :src="slide" alt="" class="swiperimg"></swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
  </div>
</template>

<script>
export default {
  data(){
      return{
         swiperOption:{
          pagination: {
            el: '.swiper-pagination'
          },
            navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                loop:true,
           autoplay:true,
         },
       
          /* 引入图片 所有在js部分引入的数据必须使用require*/
          banner:[
              require('../../../assets/slideShow/j1.jpg'),
              require('../../../assets/slideShow/j2.jpg'),
              require('../../../assets/slideShow/j3.jpg'),
              require('../../../assets/slideShow/j4.jpg')
          ]
      }
  }
}
</script>

<style scoped>
.swiperimg {
    width: 100%;
    height: 350px;
}

.swiper-size {
    margin-top: 15px;
}
</style>