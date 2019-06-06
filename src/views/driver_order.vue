<template>
  <div class="issue_order">
    <div class="indextab">
      
      <div class="index_field" >
        <div class="field_input green"><input type="text" placeholder="温州科技城"></div>
        <div class="field_input orange"><input type="text" placeholder="你要去哪儿"></div>
        <div class="index_order">
            <div class="index_empty" @click="num_show=!num_show">
              <img src="../assets/chenkeshu.png" alt="">
              <span>乘车人数</span>
            </div>
            <div class="index_empty" @click=" time_show=! time_show">
              <img src="../assets/chuxingshijian.png" alt="">
              <span>出发时间</span>
            </div>
       
        </div>
     
    </div>

       
      </div>
     
<div class="info_btn">确认发布</div>
      

<van-popup v-model="num_show"  position="bottom" :overlay="true">
 <van-picker :columns="columns" show-toolbar/>
</van-popup>
<van-popup v-model="time_show"  position="bottom" :overlay="true">
  <van-datetime-picker
    v-model="currentDate"
    type="datetime"
    :min-date="minDate"
    :max-date="maxDate"
  />
</van-popup>
<fix-box/>
  </div>


</template>
<script>
export default {
  data() {
    return {
      minHour: 10,
      maxHour: 20,
      minDate: new Date(),
      maxDate: new Date(2019, 10, 1),
      currentDate: new Date(),
      time_show: false,
      num_show: false,
      columns: ["1", "2", "3", "4", "5"]
    };
  }
};
</script>
<style>
body {
  background: #f1f5f8;
}
</style>

<style lang="less" scoped>
.index_field {
  background: #fff;

  box-shadow: 0rem 0.05rem 0.12rem 0rem rgba(222, 222, 222, 0.42);
  border-radius: 0.11rem;

  margin: 0.16rem;

  .field_input {
    height: 1.4rem;
    position: relative;
    line-height: 1.4rem;
    margin: 0 0.57rem 0 1.15rem;
    border-bottom: 1px solid #e6e6e6;
    &::after {
      content: "";
      position: absolute;
      left: -0.53rem;
      top: 0.6rem;
      background: #38eac2;
      width: 0.19rem;
      height: 0.19rem;
      border-radius: 100%;
    }
    &.orange::after {
      background: #ff8523;
      input {
        :-webkit-input-placeholder {
          /* WebKit browsers */
          color: #ff8523;
        }
        :-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          color: #ff8523;
        }
        ::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: #ff8523;
        }
        ::-ms-input-placeholder {
          /* Internet Explorer 10+ */
          color: #ff8523;
        }
      }
    }
    input {
      height: 1.4rem;
      width: 7rem;
    }
  }
}
</style>

