<template>
<div>
      <div id="container"></div>
      <div class="info">
          <div class="input-item">
          
            <input id='tipinput' type="text" :placeholder="place_text[type]">
          </div>
      </div>
       <fix-box/>
  </div>
</template>
<script>
import fixBox from "@/components/fixBox";
export default {
  data() {
    return {
      type: 1,
      place_text: [
        "您要去哪儿？",
        "从哪里出发?",
        "您要去哪儿？",
        "从哪里出发?",
        "您要去哪儿？",
        "从哪里出发?",
        "您要去哪儿？"
      ],
      locat: {},
      path: "/"
    };
  },
  components: { fixBox },
  methods: {
    autoComplete() {
      var that = this;
      var map = new AMap.Map("container", {
        resizeEnable: true
      });
      var auto;

      AMap.plugin(["AMap.Autocomplete", "AMap.PlaceSearch"], () => {
        var autoOptions = {
          input: "tipinput",
          city: "温州"
        };
        auto = new AMap.Autocomplete(autoOptions);
        // console.info(this);
        AMap.event.addListener(auto, "select", select);
        function select(e) {
          // console.info(e);
          that.locat = e.poi;
          that.handleReturn(e.poi);
        }
      });
    },
    changePath() {
      switch (parseInt(this.type)) {
        case 1:
          this.path = "/issue_order";
          break;
        case 2:
          this.path = "/issue_order";
          break;
        case 3:
          this.path = "/issue_order";
          break;
        case 5:
          this.path = "/routeadd";
          break;
        case 6:
          this.path = "/routeadd";
          break;
        default:
          this.path = "/";
          break;
      }
    },
    handleReturn(poi) {
      console.info(poi);
      //type 1:首页->出发->首页,type:2 首页/发布页->目的 ->发布页
      //type 3 :发布页->出发->发布页  type：5/6 常用路线->出发/目的->常用
      // console.info(this.$route.query);
      if (poi.location == "") {
        this.$toast({
          message: "该地址缺少定位，重新选择"
        });
        return;
      }
      let lat = poi.location.lat,
        lng = poi.location.lng,
        name = poi.name;
      let {
        startlat: startlat = lat,
        startlng: startlng = lng,
        startname: startname = name,
        endlat: endlat = lat,
        endlng: endlng = lng,
        endname: endname = name,
        currentTab: currentTab
      } = this.$route.query;

      this.$router.push({
        path: this.path,
        query: {
          startlat,
          startlng,
          startname,
          endlat,
          endlng,
          endname,
          currentTab
        }
      });
    }
  },
  mounted() {
    this.autoComplete();
    let Obj = this.$route.query;
    this.type = Obj.type;
    // console.info(this.type);
    this.changePath();

    // this.handleReturn("");
  }
};
</script>
<style>
.auto-item {
  height: 1.2rem;
  font-size: 0.4rem;
  line-height: 1.2rem;
  border-bottom: 0.02rem solid #eee;
  padding-left: 0.4rem;
}
</style>

<style lang="less" scoped>
#container {
  width: 100%;
  height: 100%;
}
#tipinput {
  width: 100%;
  height: 1.4rem;
  padding-left: 0.4rem;
  font-size: 0.44rem;
}
</style>

