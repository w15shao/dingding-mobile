<template>
  <div>
    <!-- <div class="content"  @click="handleUpdateMsg"> -->
       <div class="content" >
      <div class="avatar">头像<span><img :src="avatars == ''? logo : `${$baseUrl + avatars}`" alt="placeholder image"> </span></div>
      <div >性别<span>{{sex == 1? '男' : sex == 2? '女' : '待选择'}}</span></div>
      <div >QQ<span>{{qq == ''? '待填写' : qq}}</span></div>
      <div >微信<span>{{wechat == ''? '待填写' : wechat}}</span></div>
      <div >邮箱<span>{{email == ''? '待填写' : email}}</span></div>
      <div >联系方式<span>{{phone}}</span></div>
    </div>
    <div class="other">
      <div @click="handleGoArea">管理地址<span>&nbsp;</span></div>
      <div @click="handleGoPwd">管理密码<span>&nbsp;</span></div>
    </div>
     <div class="logout-btn" >退出账号</div>
     <fix-box/>
    <!-- <div class="logout-btn" @click.self="handlelogout">退出账号</div> -->
  </div>
</template>

<script>
import logo from "@/assets/touxiang1.png";

export default {
  data() {
    return {
      logo,
      id: "",
      email: "",
      wechat: "",
      qq: "",
      sex: 0,
      realName: "",
      avatars: "",
      address: "",
      province: "",
      city: "",
      area: ""
    };
  }
  // beforeMount() {
  //   this.phone = this.$store.getters.userInfo.telephone;
  //   this.getUserInfo();
  // },
  // methods: {
  //   handlelogout() {
  //     console.log("123312");
  //     this.$store.dispatch("logoutAction");
  //     this.$store.commit("CLEAR_USERID");
  //   },
  //   handleUpdateMsg() {
  //     console.log("修改个人信息");
  //     this.$router.push({ path: "/settingEdit" });
  //   },
  //   handleGoArea() {
  //     this.$router.push({
  //       path: "/addOrEditAddress",
  //       query: {
  //         id: this.id,
  //         address: this.address,
  //         province: this.province,
  //         city: this.city,
  //         area: this.area
  //       }
  //     });
  //   },
  //   handleGoPwd() {
  //     this.$router.push({ path: "/updatePwd" });
  //   },
  //   getUserInfo() {
  //     this.$store.dispatch("getArticleListAction", {
  //       params: { cate_id: 158, is_login: 1, show_self: 1 },
  //       cb: res => {
  //         let data = res.list[0];
  //         // this.$store.commit('SET_USER_LOGINS_STATUS', {
  //         //   res: data,
  //         //   type: 'login'
  //         // })
  //         this.email = data.email;
  //         this.wechat = data.wechat;
  //         this.qq = data.qq;
  //         this.sex = Number(data.sex);
  //         this.realName = data.title;
  //         this.avatars = data.cover_id;
  //         this.address = data.address;
  //         this.province = data.province;
  //         this.city = data.city;
  //         this.area = data.area;
  //         this.id = data.id;
  //       }
  //     });
  //   }
  // }
};
</script>

<style lang="less" scoped>
.content,
.other {
  margin: 15px 0 50px;
  padding-left: 23px;
  background-color: #fff;
  > div {
    font-size: 28px;
    letter-spacing: 1px;
    color: #3d3d3d;
    padding: 27px 23px 27px 0;
    text-align: left;
    line-height: 30px;
    // display: flex;
    // align-items: center;
    span {
      float: right;
      padding-right: 30px;
      position: relative;
      color: #a0a0a0;
      &::after {
        content: "";
        display: inline-block;
        width: 14px;
        height: 26px;
        background: url("../assets/you jiantou.png") center no-repeat;
        background-size: 100%;
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -13px;
      }
    }
    &.avatar {
      height: 1.9rem;
      padding: 13px 23px 13px 0;
      line-height: 80px;
      span {
        line-height: 30px;
        img {
          width: 80px;
          height: 80px;
        }
      }
    }
    & + div {
      border-top: 1px solid #f2f2f2;
    }
  }
}
.logout-btn {
  margin: 15px 23px;
  background-color: #fff;
  border: solid 1px #cecece;
  height: 80px;
  letter-spacing: 1px;
  color: #3d3d3d;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
