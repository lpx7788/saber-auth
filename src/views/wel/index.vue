<template>
  <basic-container>
    <div class="index-page">
      <el-row>
        <el-col :span="24"
                class="warp-main">
          <el-row>
            <el-col>
              <div class="grid-content bg-purple mb10">
                <datePicker @input="changeDataPicker"
                            ref="datePick"
                            :defaultTime="currentTime"
                            class="mr20"></datePicker>
                <el-button @click="initIndexData"
                           type="primary"
                           icon="el-icon-refresh">刷新</el-button>
              </div>
            </el-col>
          </el-row>
          <!-- 基本数据.start -->
          <el-row>
            <el-col :span="24">
              <!-- <div class="grid-content bg-purple"> -->
              <el-card>
                <!-- <strong class="card-head-title">基本数据</strong> -->
                <el-divider content-position="left">
                  <el-link :underline="false"
                           type="primary">基本数据</el-link>
                </el-divider>
                <avue-data-panel :option="baseOption"></avue-data-panel>
                <!-- <el-row>
                    <el-col :span="3" class="mr20" @click.native="goToDetail('appLogin','')" >
                      <el-card shadow="hover" class="center">
                        <h2>880</h2>
                        <h5 class="cRed">19.00%</h5>App登录数
                      </el-card>
                    </el-col>
                    <el-col :span="3" class="mr20" @click.native="goToDetail('WebLogin','')">
                      <el-card shadow="hover" class="center">
                        <h2>880</h2>
                        <h5 class="cRed">19.00%</h5>Web登录数
                      </el-card>
                    </el-col>
                    <el-col :span="3" class="mr20" @click.native="goToDetail('register','')">
                      <el-card shadow="hover" class="center">
                        <h2>{{registerUser.count}}</h2>
                        <h5 class="cRed">{{registerUser.percentage}}</h5>注册用户数
                      </el-card>
                    </el-col>
                    <el-col :span="3" class="mr20" @click.native="goToDetail('userNumber','')">
                      <el-card shadow="hover" class="center">
                        <h2>{{authUser.count}}</h2>
                        <h5 class="cRed">{{authUser.percentage}}</h5>认证用户数
                      </el-card>
                    </el-col>
                    <el-col :span="3" class="mr20" @click.native="goToDetail('companies','')">
                      <el-card shadow="hover" class="center">
                        <h2>{{registerCompany.count}}</h2>
                        <h5 class="cRed">{{registerCompany.percentage}}</h5>注册企业数
                      </el-card>
                    </el-col>
                    <el-col :span="3" class="mr20" @click.native="goToDetail('transaction','')">
                      <el-card shadow="hover" class="center">
                        <h2>{{totalPrice.count}}</h2>
                        <h5 class="cRed">{{totalPrice.percentage}}</h5>交易总额(元)
                      </el-card>
                    </el-col>
                  </el-row> -->
              </el-card>
              <!-- </div> -->
            </el-col>
          </el-row>
          <!-- 交易数据-现货商城.start -->
          <el-row>
            <el-col :span="24">
              <el-card>
                <!-- <strong class="card-head-title">交易数据-现货商城</strong> -->
                <el-divider content-position="left">
                  <el-link :underline="false"
                           type="primary">交易数据-现货商城</el-link>
                </el-divider>
                <avue-data-panel :option="spotmallOption"></avue-data-panel>
              </el-card>
              <!-- <div
                    class="grid-content bg-purple divborder">
                    <div>
                      <el-row>
                        <el-col>
                          <strong class="card-head-title">交易数据-现货商城</strong>
                        </el-col>
                      </el-row>
                      <el-row @click.native="goToDetail('orderDetail',1)">
                        <el-col  class="mr20" :span="3">
                          <el-card shadow="hover" class="center">
                            <h2>{{xh_fabubaojiashu.count}}</h2>
                            <h5 class="cRed">{{xh_fabubaojiashu.percentage}}</h5>发布报价数
                          </el-card>
                        </el-col>
                        <el-col class="mr20" :span="3">
                          <el-card shadow="hover" class="center">
                            <h2>{{xh_dianjiadingdanshu.count}}</h2>
                            <h5 class="cRed">{{xh_dianjiadingdanshu.percentage}}</h5>点价订单数
                          </el-card>
                        </el-col>
                        <el-col class="mr20" :span="3">
                          <el-card shadow="hover" class="center">
                            <h2>{{xh_dianjiadingdandunshu.count}}</h2>
                            <h5 class="cRed">{{xh_dianjiadingdandunshu.percentage}}</h5>点价订单吨数
                          </el-card>
                        </el-col>
                        <el-col class="mr20" :span="3">
                          <el-card shadow="hover" class="center">
                            <h2>{{xh_qudingjiadingdanshu.count}}</h2>
                            <h5 class="cRed">{{xh_qudingjiadingdanshu.percentage}}</h5>确定价订单数
                          </el-card>
                        </el-col>
                        <el-col class="mr20" :span="3">
                          <el-card shadow="hover" class="center">
                            <h2>{{xh_quedingjiadingdandunshu.count}}</h2>
                            <h5 class="cRed">{{xh_quedingjiadingdandunshu.percentage}}</h5>确定价订单吨数
                          </el-card>
                        </el-col>
                        <el-col class="mr20" :span="3">
                          <el-card shadow="hover" class="center">
                            <h2>{{xh_dianjiachengjiaodunshu.count}}</h2>
                            <h5 class="cRed">{{xh_dianjiachengjiaodunshu.percentage}}</h5>点价成交吨数
                          </el-card>
                        </el-col>
                        <el-col class="mr20" :span="3">
                          <el-card shadow="hover" class="center">
                            <h2>{{xh_quedingjiachengjiaoshu.count}}</h2>
                            <h5 class="cRed">{{xh_quedingjiachengjiaoshu.percentage}}</h5>确定价成交数
                          </el-card>
                        </el-col>
                      </el-row>
                    </div>
                  </div> -->
            </el-col>
          </el-row>
          <!-- 交易数据-求购大厅.start -->
          <el-row>
            <el-col :span="24">
              <el-card>
                <!-- <strong class="card-head-title">交易数据-求购大厅</strong> -->
                <el-divider content-position="left">
                  <el-link :underline="false"
                           type="primary">交易数据-求购大厅</el-link>
                </el-divider>
                <avue-data-panel :option="buyhallOption"></avue-data-panel>
              </el-card>
              <!-- <div
                    class="grid-content bg-purple divborder">
                    <div>
                      <el-row>
                        <el-col>
                          <strong class="card-head-title">交易数据-求购大厅</strong>
                        </el-col>
                      </el-row>
                      <el-row @click.native="goToDetail('orderDetail','2')">
                        <el-col  class="mr20" :span="3">
                          <el-card shadow="hover" class="center">
                            <h2>{{qg_fabucaigoushu.count}}</h2>
                            <h5 class="cRed">{{qg_fabucaigoushu.percentage}}</h5>发布采购数
                          </el-card>
                        </el-col>
                        <el-col  class="mr20" :span="3">
                          <el-card shadow="hover" class="center">
                            <h2>{{qg_dianjiadingdanshu.count}}</h2>
                            <h5 class="cRed">{{qg_dianjiadingdanshu.percentage}}</h5>点价订单数
                          </el-card>
                        </el-col>
                        <el-col  class="mr20" :span="3">
                          <el-card shadow="hover" class="center">
                            <h2>{{qg_dianjiadingdandunshu.count}}</h2>
                            <h5 class="cRed">{{qg_dianjiadingdandunshu.percentage}}</h5>点价订单吨数
                          </el-card>
                        </el-col>
                        <el-col  class="mr20" :span="3">
                          <el-card shadow="hover" class="center">
                            <h2>{{qg_qudingjiadingdanshu.count}}</h2>
                            <h5 class="cRed">{{qg_qudingjiadingdanshu.percentage}}</h5>确定价订单数
                          </el-card>
                        </el-col>
                        <el-col  class="mr20" :span="3">
                          <el-card shadow="hover" class="center">
                            <h2>{{qg_quedingjiadingdandunshu.count}}</h2>
                            <h5 class="cRed">{{qg_quedingjiadingdandunshu.percentage}}</h5>确定价订单吨数
                          </el-card>
                        </el-col>
                        <el-col  class="mr20" :span="3">
                          <el-card shadow="hover" class="center">
                            <h2>{{qg_dianjiachengjiaoshu.count}}</h2>
                            <h5 class="cRed">{{qg_dianjiachengjiaoshu.percentage}}</h5>点价成交吨数
                          </el-card>
                        </el-col>
                        <el-col  class="mr20" :span="3">
                          <el-card shadow="hover" class="center">
                            <h2>{{qg_quedingjiachengjiaoshu.count}}</h2>
                            <h5 class="cRed">{{qg_quedingjiachengjiaoshu.percentage}}</h5>确定价成交数
                          </el-card>
                        </el-col>
                      </el-row>
                    </div>
                  </div> -->
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </basic-container>
</template>
<script>
import { mapGetters } from 'vuex';
import getList from '@/api/platform/index';
import { dateFormat } from '@/util/date';
import datePicker from '@/components/date-picker/main';

export default {
  name: 'wel',
  components: {
    datePicker,
  },
  data() {
    return {
      baseOption: {
        span: 4,
        data: [],
      },
      spotmallOption: {
        span: 4,
        data: [],
      },
      buyhallOption: {
        span: 4,
        data: [],
      },
      // groupArr: [
      //   { value: 'today', textName: '今天', key: 1 },
      //   { value: 'yesterday', textName: '昨天', key: 2 },
      //   { value: 'lastWeek', textName: '最近一周', key: 3 },
      //   { value: 'lastMonth', textName: '最近30天', key: 4 },
      //   { value: 'lastThreeMonth', textName: '最近90天', key: 5 },
      //   { value: 'all', textName: '累计', key: 6 },
      // ],
      // 注册用户数
      registerUser: {
        count: 0,
        percentage: '88%',
      },
      // 认证用户数
      authUser: {
        count: 0,
        percentage: '88%',
      },
      // 注册企业数
      registerCompany: {
        count: 0,
        percentage: '88%',
      },
      // 交易总额
      totalPrice: {
        count: 0,
        percentage: '88%',
      },
      // 发布报价数
      xh_fabubaojiashu: {
        count: 0,
        percentage: '88%',
      },
      // 点价订单数
      xh_dianjiadingdanshu: {
        count: 0,
        percentage: '88%',
      },
      // 点价订单吨数
      xh_dianjiadingdandunshu: {
        count: 0,
        percentage: '88%',
      },
      // 确定价订单数
      xh_qudingjiadingdanshu: {
        count: 0,
        percentage: '88%',
      },
      // 确定价订单吨数
      xh_quedingjiadingdandunshu: {
        count: 0,
        percentage: '88%',
      },
      // 点价成交吨数
      xh_dianjiachengjiaodunshu: {
        count: 0,
        percentage: '88%',
      },
      // 确定价成交数
      xh_quedingjiachengjiaoshu: {
        count: 0,
        percentage: '88%',
      },
      // 发布采购数
      qg_fabucaigoushu: {
        count: 0,
        percentage: '88%',
      },
      // 点价订单数
      qg_dianjiadingdanshu: {
        count: 0,
        percentage: '88%',
      },
      // 点价订单吨数
      qg_dianjiadingdandunshu: {
        count: 0,
        percentage: '88%',
      },
      // 确定价订单数
      qg_qudingjiadingdanshu: {
        count: 0,
        percentage: '88%',
      },
      // 确定价订单吨数
      qg_quedingjiadingdandunshu: {
        count: 0,
        percentage: '88%',
      },
      // 点价成交数
      qg_dianjiachengjiaoshu: {
        count: 0,
        percentage: '88%',
      },
      // 确定价成交数
      qg_quedingjiachengjiaoshu: {
        count: 0,
        percentage: '88%',
      },
      // 查询实体
      query: {
        // dateKey: "today",
        // dateNum: 0,
        createDateStart: null,
        createDateEnd: null,
      },
      currentTime: '', // 当前时间
    };
  },
  computed: {
    ...mapGetters(['userInfo', 'colorName']),
  },
  mounted() {
    this.baseOption.data = [{
      title: 'App登录数(19%)',
      count: 880,
      icon: 'el-icon-mobile-phone',
      color: this.colorName,
    },
    {
      title: 'Web登录数(10%)',
      count: 33,
      icon: 'el-icon-s-platform',
      color: this.colorName,
    },
    {
      title: '注册用户数',
      count: 223,
      icon: 'el-icon-s-custom',
      color: this.colorName,
    },
    {
      title: '认证用户数',
      count: 66,
      icon: 'el-icon-document-checked',
      color: this.colorName,
    },
    {
      title: '注册企业数',
      count: 123,
      icon: 'el-icon-office-building',
      color: this.colorName,
    },
    {
      title: '交易总额(元)',
      count: 99999,
      icon: 'icon-qian',
      color: this.colorName,
    },
    ]
    this.spotmallOption.data = [{
      title: '发布报价数(19%)',
      count: 880,
      icon: 'el-icon-s-promotion',
      color: this.colorName,
    },
    {
      title: '点价订单数(10%)',
      count: 33,
      icon: 'icon-zujianku-dianjiajiaoyi',
      color: this.colorName,
    },
    {
      title: '点价订单吨数',
      count: 223,
      icon: 'icon-dunshulei2x',
      color: this.colorName,
    },
    {
      title: '确定价订单数',
      count: 66,
      icon: 'el-icon-success',
      color: this.colorName,
    },
    {
      title: '确定价订单吨数',
      count: 123,
      icon: 'icon-dunshulei2x',
      color: this.colorName,
    },
    {
      title: '点价成交吨数',
      count: 99999,
      icon: 'icon-quangangchegnjiao',
      color: this.colorName,
    },
    {
      title: '确定价成交数',
      count: 99999,
      icon: 'icon-quangangchegnjiao',
      color: this.colorName,
    },
    ]
    this.buyhallOption.data = [{
      title: '发布采购数(19%)',
      count: 880,
      icon: 'el-icon-s-promotion',
      color: this.colorName,
    },
    {
      title: '点价订单数(10%)',
      count: 33,
      icon: 'icon-zujianku-dianjiajiaoyi',
      color: this.colorName,
    },
    {
      title: '点价订单吨数',
      count: 223,
      icon: 'icon-dunshulei2x',
      color: this.colorName,
    },
    {
      title: '确定价订单数',
      count: 66,
      icon: 'el-icon-success',
      color: this.colorName,
    },
    {
      title: '确定价订单吨数',
      count: 123,
      icon: 'icon-dunshulei2x',
      color: this.colorName,
    },
    {
      title: '点价成交吨数',
      count: 99999,
      icon: 'icon-quangangchegnjiao',
      color: this.colorName,
    },
    {
      title: '确定价成交吨数',
      count: 99999,
      icon: 'icon-quangangchegnjiao',
      color: this.colorName,
    },
    ]
    this.initIndexData();
    const time = dateFormat(new Date(), 'yyyy-MM-dd');
    this.currentTime = [new Date(time.replace(/-/g, ',')), new Date(time.replace(/-/g, ','))]
    this.query.createDateStart = new Date(time.replace(/-/g, ',')) / 1000
    this.query.createDateEnd = new Date(time.replace(/-/g, ',')) / 1000
  },
  methods: {
    // 初始化首页数据
    initIndexData() {
      // if (this.query.dateKey == "today") {
      //   this.query.dateKey = "today";
      // } else if (this.query.dateKey == "yesterday") {
      //   this.query.dateKey = "yesterday";
      // } else if (this.query.dateKey == "lastWeek") {
      //   this.query.dateKey = "dateNum";
      //   this.query.dateNum = 7;
      // } else if (this.query.dateKey == "lastMonth") {
      //   this.query.dateKey = "dateNum";
      //   this.query.dateNum = 30;
      // } else if (this.query.dateKey == "lastThreeMonth") {
      //   this.query.dateKey = "dateNum";
      //   this.query.dateNum = 90;
      // } else {
      //   this.query.dateKey = null;
      // }
      getList(this.query)
        .then(res => {
          const dataList = res.data.returnObject;
          // 注册用户数
          this.registerUser = dataList.find(
            data => data.type === 'registerUser'
          );
          // 认证用户数
          this.authUser = dataList.find(data => data.type === 'authUser');
          // 注册企业数
          this.registerCompany = dataList.find(
            data => data.type === 'registerCompany'
          );
          // 交易总额
          this.totalPrice = dataList.find(data => data.type === 'totalPrice');
          // 发布报价数
          this.xh_fabubaojiashu = dataList.find(
            data => data.type === 'xh_fabubaojiashu'
          );
          // 点价订单数
          this.xh_dianjiadingdanshu = dataList.find(
            data => data.type === 'xh_dianjiadingdanshu'
          );
          // 点价订单吨数
          this.xh_dianjiadingdandunshu = dataList.find(
            data => data.type === 'xh_dianjiadingdandunshu'
          );
          // 确定价订单数
          this.xh_qudingjiadingdanshu = dataList.find(
            data => data.type === 'xh_qudingjiadingdanshu'
          );
          // 确定价订单吨数
          this.xh_quedingjiadingdandunshu = dataList.find(
            data => data.type === 'xh_quedingjiadingdandunshu'
          );
          // 点价成交吨数
          this.xh_dianjiachengjiaodunshu = dataList.find(
            data => data.type === 'xh_dianjiachengjiaodunshu'
          );
          // 确定价成交数
          this.xh_quedingjiachengjiaoshu = dataList.find(
            data => data.type === 'xh_quedingjiachengjiaoshu'
          );
          // 发布采购数
          this.qg_fabucaigoushu = dataList.find(
            data => data.type === 'qg_fabucaigoushu'
          );
          // 点价订单数
          this.qg_dianjiadingdanshu = dataList.find(
            data => data.type === 'qg_dianjiadingdanshu'
          );
          // 点价订单吨数
          this.qg_dianjiadingdandunshu = dataList.find(
            data => data.type === 'qg_dianjiadingdandunshu'
          );
          // 确定价订单数
          this.qg_qudingjiadingdanshu = dataList.find(
            data => data.type === 'qg_qudingjiadingdanshu'
          );
          // 确定价订单吨数
          this.qg_quedingjiadingdandunshu = dataList.find(
            data => data.type === 'qg_quedingjiadingdandunshu'
          );
          // 点价成交数
          this.qg_dianjiachengjiaoshu = dataList.find(
            data => data.type === 'qg_dianjiachengjiaoshu'
          );
          // 确定价成交数
          this.qg_quedingjiachengjiaoshu = dataList.find(
            data => data.type === 'qg_quedingjiachengjiaoshu'
          );
        }).catch(() => { });
    },
    // 按钮组点击事件
    // changeButtonGroup(val) {
    //   this.query.dateKey = val;
    //   this.query.createDateStart = ''
    //   this.query.createDateEnd = ''
    //    this.$refs.datePick.initialAction()
    //   this.initIndexData();
    // },
    // 日期点击事件
    changeDataPicker(val) {
      this.currentTime = val

      if (val) {
        this.query.createDateStart = val[0] / 1000;
        this.query.createDateEnd = val[1] / 1000;
      } else {
        this.query.createDateStart = '';
        this.query.createDateEnd = '';
        this.currentTime = []
      }
      // this.query.dateKey = ''
      // this.query.dateNum = ''
      // this.$refs.btnGroup.initialAction()
      this.initIndexData();
    },
    methods: {
      // 跳转首页详情页面
      goToDetail() {
        // 'appLogin' app登陆数
        // 'WebLogin' web登陆数
        // 'register' 注册人数
        // 'attestation' 认证人数
        // 'userNumber' 认证用户数
        // 'companies' 认证企业数
        // 'transaction' 交易总额
        // 'orderDetail' 订单模块
        // if (type == "orderDetail") {
        //   this.$router.push({
        //     path:
        //       "./information_details?type=" +
        //       type +
        //       "&deliveryType=" +
        //       deliveryType
        //   });
        // }
      },
    },
  },
}
</script>
<style lang="scss">
.index-page {
  background: #ffffff;
  margin-bottom: 100px;
  .card-head-title {
    margin: 10px 0;
    display: block;
  }
}
.avue-data-panel {
  margin-top: 30px;
  .item-info {
    padding-left: 10px;
  }
  .item-icon {
    font-size: 32px !important;
  }
}
.avue-data-panel [class^="icon-"] {
  font-size: 32px !important;
}
</style>
