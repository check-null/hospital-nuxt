<template>
  <!-- p109 动态路由文件,必须已_开头 -->
  <!-- header -->
  <div class="nav-container page-component">
    <!--左侧导航 #start -->
    <div class="nav left-nav">
      <div class="nav-item selected">
        <span class="v-link selected dark">预约挂号 </span>
      </div>
      <div class="nav-item">
        <span class="v-link clickable dark" @click="detail"> 医院详情 </span>
      </div>
      <div class="nav-item">
        <span class="v-link clickable dark" @click="notice"> 预约须知 </span>
      </div>
      <div class="nav-item">
        <span class="v-link clickable dark"> 停诊信息 </span>
      </div>
      <div class="nav-item">
        <span class="v-link clickable dark"> 查询/取消 </span>
      </div>
    </div>
    <!-- 左侧导航 #end -->
    <!-- 右侧内容 #start -->
    <div class="page-container">
      <div class="hospital-home">
        <div class="common-header">
          <div class="title-wrapper">
            <span class="hospital-title">{{ hospital.hosname }}</span>
            <div class="icon-wrapper">
              <span class="iconfont"></span>{{ hospital.param.hostypeString }}
            </div>
          </div>
        </div>
        <div class="info-wrapper">
          <img
            class="hospital-img"
            :src="'data:image/jpeg;base64,' + hospital.logoData"
            :alt="hospital.hosname"
          />
          <div class="content-wrapper">
            <div>挂号规则</div>
            <div class="line">
              <div>
                <span class="label">预约周期:</span
                ><span>{{ bookingRule.cycle }}天</span>
              </div>
              <div class="space">
                <span class="label">放号时间:</span
                ><span>{{ bookingRule.releaseTime }}</span>
              </div>
              <div class="space">
                <span class="label">停挂时间:</span
                ><span>{{ bookingRule.stopTime }}</span>
              </div>
            </div>
            <div class="line">
              <span class="label">退号时间:</span>
              <span v-if="bookingRule.quitDay == -1"
                >就诊前一工作日{{ bookingRule.quitTime }}前取消</span
              >
              <span v-if="bookingRule.quitDay == 0"
                >就诊前当天{{ bookingRule.quitTime }}前取消</span
              >
            </div>
            <div style="margin-top: 20px">医院预约规则</div>
            <div class="rule-wrapper">
              <ol>
                <li v-for="item in bookingRule.rule" :key="item">{{ item }}</li>
              </ol>
            </div>
          </div>
        </div>
        <div class="title select-title">选择科室</div>
        <div class="select-dept-wrapper">
          <div class="department-wrapper">
            <div class="hospital-department">
              <div class="dept-list-wrapper el-scrollbar" style="height: 100%">
                <div
                  class="dept-list el-scrollbar__wrap"
                  style="margin-bottom: -17px; margin-right: -17px"
                >
                  <div class="el-scrollbar__view">
                    <div
                      class="sub-item move"
                      v-for="(item, index) in departmentVoList"
                      :key="item.id"
                      :class="index == activeIndex ? 'selected' : ''"
                      @click="move(index, item.depcode)"
                    >
                      {{ item.depname }}
                    </div>
                  </div>
                </div>
                <div class="el-scrollbar__bar is-horizontal">
                  <div
                    class="el-scrollbar__thumb"
                    style="transform: translateX(0%)"
                  ></div>
                </div>
                <div class="el-scrollbar__bar is-vertical">
                  <div
                    class="el-scrollbar__thumb"
                    style="transform: translateY(0%); height: 91.4761%"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div class="sub-dept-container">
            <div
              v-for="(item, index) in departmentVoList"
              :key="item.id"
              :class="index == 0 ? 'selected' : ''"
              class="sub-dept-wrapper"
              :id="item.depcode"
            >
              <div class="sub-title">
                <div class="block selected"></div>
                {{ item.depname }}
              </div>
              <div class="sub-item-wrapper">
                <div
                  v-for="it in item.children"
                  :key="it.id"
                  class="sub-item schedule"
                  @click="schedule(it.depcode)"
                >
                  <span class="v-link clickable">{{ it.depname }} </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 右侧内容 #end -->
  </div>
  <!-- footer -->
</template>

<script>
//这里可以导入其他文件（比如:组件，工具js，第三方插件js，json文件，图片文件等等）
//例如:import《组件名称》from'《组件路径》';
import "~/assets/css/hospital_personal.css";
import "~/assets/css/hospital.css";
import cookie from "js-cookie";
import hospApi from "@/api/hosp";
import userInfoApi from "@/api/userInfo";

export default {
  data() {
    //这里存放数据
    return {
      hoscode: null,
      activeIndex: 0,
      hospital: {
        param: {},
      },
      bookingRule: {},
      departmentVoList: [],
    };
  },
  created() {
    console.log(this.$route.params);
    this.hoscode = this.$route.params.hospcode;
    this.init();
  },
  //方法集合
  methods: {
    init() {
      hospApi.show(this.hoscode).then(({ data }) => {
        this.hospital = data.hospital;
        this.bookingRule = data.bookingRule;
      });
      hospApi.findDepartment(this.hoscode).then(({ data }) => {
        this.departmentVoList = data;
      });
    },
    move(index, deptCode) {
      this.activeIndex = index;
      document.getElementById(deptCode).scrollIntoView();
    },
    schedule(depcode) {
      const token = cookie.get("token");
      if (!token) {
        loginEvent.$emit("loginDialogEvent");
        return;
      }

      userInfoApi.getUserInfo().then(({ data }) => {
        let status = data.authStatus;
        if (!status || status !== 2) {
          window.location.href = "/user";
          return;
        }
      });

      window.location.href = `/hosp/schedule?hoscode=${this.hoscode}&depcode=${depcode}`;
    },
    show() {
      // 默认会跳转到@/pages/hosp/index.vue
      window.location.href = "/hosp/" + this.hospcode;
    },
    detail() {
      window.location.href = "/hosp/detail/" + this.hospital.hoscode;
    },
    notice() {
      window.location.href = "/hosp/notice/" + this.hospital.hoscode;
    },
  },
};
</script>

<style scoped>
</style>