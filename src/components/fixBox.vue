<template>
  	<div class="fixBox">
		<div class="fixBall" :class="{'active':isFlag}" @click="isFlag=!isFlag">
			<!--<span class="inBall"></span>-->
		</div>
		<router-link to="/" class="fixIcon fixGift"  :style="{ backgroundImage: 'url(' + bg1 + ')' }" v-show="isFlag" ></router-link>
		<router-link to="/message" class="fixIcon fixPerson" :style="{ backgroundImage: 'url(' + bg2 + ')' }"  v-show="isFlag"></router-link>

		<router-link to="/usercenter" class="fixIcon fixHome " :style="{ backgroundImage: 'url(' + bg3 + ')' }" v-show="isFlag"></router-link>
	</div>
</template>
<script>
import bg1 from "../assets/shouye1.png";
import bg2 from "../assets/xiaoxi3.png";
import bg3 from "../assets/geren2.png";
export default {
  data() {
    return {
      isFlag: false,
      bg1,
      bg2,
      bg3
    };
  },
  methods: {},
  mounted() {}
};
</script>
<style scoped>
/*浮球*/
.fixBox {
  position: fixed;
  right: 0.6rem;
  bottom: 3rem;
  width: 0.94rem;
  height: 0.94rem;
  z-index: 111;
}
.fixBall {
  position: relative;
  width: 0.94rem;
  height: 0.94rem;
  border-radius: 50%;
  background-image: url(../assets/daijia.png);
  background-size: auto 0.55rem;
  background-position: center;
  border: 1px solid #eee;
  box-shadow: 1px 3px 6px 1px rgba(0, 0, 0, 0.2);
  text-align: center;
  line-height: 0.94rem;
  vertical-align: middle;
  background-repeat: no-repeat;
  background-color: rgba(255, 255, 255, 0.7);
}
.fixBall.active {
  /*border: 0.09rem solid #f4f6f7;*/
  background-image: url(../assets/daijia.png);
  background-color: #ffffff;
}
.fixBall.active span.inBall {
  background-color: #9382d3;
  left: 0.24rem;
  top: 0.24rem;
}
.fixBall span.inBall {
  position: absolute;
  left: 0.29rem;
  top: 0.29rem;
  background-color: #d3d3d3;
  width: 0.35rem;
  height: 0.35rem;
  border-radius: 50%;
  display: inline-block;
}
.fixIcon {
  background-size: auto 0.5rem;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #ffffff;
  width: 0.92rem;
  height: 0.92rem;
  border-radius: 50%;
  box-shadow: 1px 3px 6px 1px rgba(0, 0, 0, 0.2);
  position: absolute;
  border: 1px solid #eee;
}
.fixIcon.fixHome {
  left: 0;
  top: -1.3rem;
}
.fixIcon.fixPerson {
  right: 1rem;
  top: -1rem;
}
.fixIcon.fixGift {
  right: 1.46rem;
  top: 0;
}
</style>



