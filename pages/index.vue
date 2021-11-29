<template>
  <div class="home page-component">
    <!-- 轮播图 -->
    <el-carousel style="height: 350px">
      <el-carousel-item style="height: 350px" v-for="item in 2" :key="item">
        <img src="~/assets/images/web-banner1.png" alt="" />
      </el-carousel-item>
    </el-carousel>
    <!-- 搜索医院 -->
    <div class="search-container">
      <div class="search-wrapper">
        <div class="hospital-search">
          <el-autocomplete
            class="search-input"
            prefix-icon="el-icon-search"
            v-model="state"
            :fetch-suggestions="querySearchAsync"
            placeholder="点击输入医院名称"
            @select="handleSelect"
          >
            <span
              slot="suffix"
              class="search-btn v-link highlight clickable selected"
              >搜索
            </span>
          </el-autocomplete>
        </div>
      </div>
    </div>
    <!-- bottom -->
    <div class="bottom">
      <div class="left">
        <div class="home-filter-wrapper">
          <!-- 医院 -->
          <div class="title">医院</div>
          <div>
            <!-- 等级 -->
            <div class="filter-wrapper">
              <span class="label">等级：</span>
              <div class="condition-wrapper">
                <span
                  class="item v-link clickable v-cloak"
                  :class="hostypeActiveIndex == index ? 'selected' : ''"
                  v-for="(item, index) in hostypeList"
                  :key="index"
                  @click="hostypeSelect(item.value, index)"
                >
                  {{ item.name }}
                </span>
              </div>
            </div>
            <!-- 地区 -->
            <div class="filter-wrapper">
              <span class="label">地区：</span>
              <div class="condition-wrapper">
                <span
                  class="item v-link clickable v-cloak"
                  :class="provinceActiveIndex == index ? 'selected' : ''"
                  v-for="(item, index) in districtList"
                  :key="index"
                  @click="districtSelect(item.value, index)"
                >
                  {{ item.name }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- 医院list -->
        <div class="v-scroll-list hospital-list">
          <div
            class="v-card clickable list-item"
            v-for="(item, index) in list"
            :key="index"
          >
            <div class="">
              <div
                class="hospital-list-item hos-item"
                index="0"
                @click="show(item.hoscode)"
              >
                <div class="wrapper">
                  <div class="hospital-title">{{ item.hosname }}</div>
                  <div class="bottom-container">
                    <div class="icon-wrapper">
                      <span class="iconfont"></span>
                      {{ item.param.hostypeString }}
                    </div>
                    <div class="icon-wrapper">
                      <span class="iconfont"></span>
                      每天{{ item.bookingRule.releaseTime }}放号
                    </div>
                  </div>
                </div>
                <img
                  :src="'data:image/jpeg;base64,' + item.logoData"
                  :alt="item.hosname"
                  class="hospital-img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="common-dept">
          <div class="header-wrapper">
            <div class="title">常见科室</div>
            <div class="all-wrapper">
              <span>全部</span> <span class="iconfont icon"></span>
            </div>
          </div>
          <div class="content-wrapper">
            <span class="item v-link clickable dark">神经内科 </span>
            <span class="item v-link clickable dark">消化内科 </span>
            <span class="item v-link clickable dark">呼吸内科 </span>
            <span class="item v-link clickable dark">内科 </span>
            <span class="item v-link clickable dark">神经外科 </span>
            <span class="item v-link clickable dark">妇科 </span>
            <span class="item v-link clickable dark"> 产科 </span>
            <span class="item v-link clickable dark">儿科 </span>
          </div>
        </div>
        <div class="space">
          <div class="header-wrapper">
            <div class="title-wrapper">
              <div class="icon-wrapper">
                <span class="iconfont title-icon"></span>
              </div>
              <span class="title">平台公告</span>
            </div>
            <div class="all-wrapper">
              <span>全部</span> <span class="iconfont icon"></span>
            </div>
          </div>
          <div class="content-wrapper">
            <div class="notice-wrapper">
              <div class="point"></div>
              <span class="notice v-link clickable dark"
                >关于延长北京大学国际医院放假的通知
              </span>
            </div>
            <div class="notice-wrapper">
              <div class="point"></div>
              <span class="notice v-link clickable dark"
                >北京中医药大学东方医院 部分科室医生门诊医
              </span>
            </div>
            <div class="notice-wrapper">
              <div class="point"></div>
              <span class="notice v-link clickable dark">
                武警总医院号源暂停更新通知
              </span>
            </div>
          </div>
        </div>
        <div class="suspend-notice-list space">
          <div class="header-wrapper">
            <div class="title-wrapper">
              <div class="icon-wrapper">
                <span class="iconfont title-icon"></span>
              </div>
              <span class="title">停诊公告</span>
            </div>
            <div class="all-wrapper">
              <span>全部</span> <span class="iconfont icon"></span>
            </div>
          </div>
          <div class="content-wrapper">
            <div class="notice-wrapper">
              <div class="point"></div>
              <span class="notice v-link clickable dark">
                中国人民解放军总医院第六医学中心(原海军总医院)呼吸内科门诊停诊公告
              </span>
            </div>
            <div class="notice-wrapper">
              <div class="point"></div>
              <span class="notice v-link clickable dark">
                首都医科大学附属北京潞河医院老年医学科门诊停诊公告
              </span>
            </div>
            <div class="notice-wrapper">
              <div class="point"></div>
              <span class="notice v-link clickable dark"
                >中日友好医院中西医结合心内科门诊停诊公告
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 

<script>
import hospApi from "@/api/hosp";
import dictApi from "@/api/dict";
export default {
  // 服务端异步渲染
  asyncData({ params, error }) {
    //调用
    return hospApi.getPageList(1, 10, null).then(({ data }) => {
      return {
        list: data.content,
        pages: data.totalPages,
      };
    });
  },

  data() {
    return {
      searchObj: {},
      page: 1,
      limit: 10,
      hosname: "", // 医院名称
      hostypeList: [],
      districtList: [],
      hostypeActiveIndex: 0,
      provinceActiveIndex: 0,
      state: "",
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      // 查询医院等级list
      dictApi.findByDictCode("Hostype").then(({ data }) => {
        data.unshift({ name: "全部", value: "" });
        this.hostypeList = data;
      });

      dictApi.findByDictCode("Beijing").then(({ data }) => {
        data.unshift({ name: "全部", value: "" });
        this.districtList = data;
      });
    },
    handleSelect(item) {
      window.location.href = "/hospital/" + item.hoscode;
    },
    querySearchAsync(queryString, cb) {
      this.searchObj = [];
      if (!queryString) return;
      hospApi.getByHosname(queryString).then(({ data }) => {
        data.forEach((element) => {
          element.value = element.hosname;
        });
        cb(data);
      });
    },
    hostypeSelect(hospType, index) {
      this.list = [];
      this.page = 1;
      this.hostypeActiveIndex = index;
      this.searchObj.hostype = hospType;
      this.getList();
    },
    getList() {
      hospApi
        .getPageList(this.page, this.limit, this.searchObj)
        .then(({ data }) => {
          this.list = data.content;
          this.page = data.totalPages;
        });
    },
    districtSelect(districtCode, index) {
      this.list = [];
      this.page = 1;
      this.provinceActiveIndex = index;
      this.searchObj.districtCode = districtCode;
      this.getList();
    },
    show(hospCode) {
      // 默认会跳转到@/pages/hosp/index.vue
      window.location.href = "/hosp/" + hospCode;
    },
  },
};
</script>

<style scoped>
[v-cloak] {
  display: none;
}
</style>