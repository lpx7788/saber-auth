<template>
  <basic-container>
    <div class="order-page">
      <avue-crud :option="orderOption"
                 :table-loading="loading"
                 :data="orderList"
                 :page.sync="page"
                 ref="crud"
                 @current-change="currentChange"
                 @on-load="getList"
                 @search-change="searchChange"
                 @search-reset="searchReset"
                 @refresh-change="refreshChange">
        <template slot="orderStatusSearch">
          <avue-select v-model="query.orderStatus"
                       @change="getOrderStatus"
                       placeholder="请选择"
                       type="tree"
                       :dic="orderStatusDatas"></avue-select>
        </template>
        <template slot="priceTypeSearch">
          <avue-select v-model="query.priceType"
                       @change="getEvaluateType"
                       placeholder="请选择"
                       type="tree"
                       :dic="evaluateDatas"></avue-select>
        </template>
        <template slot="deliveryTypeSearch">
          <avue-select v-model="query.deliveryType"
                       @change="getOriginType"
                       placeholder="请选择"
                       type="tree"
                       :dic="originDatas"></avue-select>
        </template>
        <template slot="buyNameSearch">
          <el-select default-first-option
                     clearable
                     filterable
                     placeholder="请选择或者输入买家公司"
                     v-model="query.buyUserCompanyCode"
                     @change="getBuyCompany">
            <el-option v-for="item in companyList.buyer"
                       :key="item.companyCode"
                       :label="item.companyName"
                       :value="item.companyCode"></el-option>
          </el-select>
        </template>
        <template slot="sellNameSearch">
          <el-select default-first-option
                     clearable
                     filterable
                     placeholder="请选择或者输入卖家公司"
                     v-model="sellerCompanyCode"
                     @change="getSellerCompany">
            <el-option v-for="item in companyList.seller"
                       :key="item.companyCode"
                       :label="item.companyName"
                       :value="item.companyCode"></el-option>
          </el-select>
        </template>
        <template slot="search">
          <datePicker @input="changeDataPicker"
                      :defaultTime="currentTime"
                      ref="datePick"></datePicker>
          <el-input class="searchInput"
                    v-model="query.queryKey"
                    placeholder="请输入企业名称/简称/用户手机号码/姓名"
                    @keyup.enter.native="getList"
                    @clear="getList"></el-input>
        </template>
        <template slot="menuLeft">
          <a :href="exportDataUrl">
            <el-button class="mb20"
                       type="primary"
                       icon="el-icon-download"
                       @click="exportExcel"
                       size="small">导出</el-button>
          </a>
        </template>
        <template slot-scope="{ row }"
                  slot="orderStatus">
          <el-tag :type="
              row.orderStatus === '1'
                ? 'warning'
                : row.orderStatus === '2'
                ? ''
                : row.orderStatus === '3'
                ? 'danger'
                : row.orderStatus === '4'
                ? 'success'
                : row.orderStatus === '5'
                ? ''
                : 'info'
            ">
            {{ row.orderStatusName }}
          </el-tag>
        </template>
        <template slot-scope="scope"
                  slot="menu">
          <el-button type="text"
                     size="small"
                     icon="el-icon-view"
                     plain
                     @click.stop="handleOrderDetail(scope.row)">查看</el-button>
        </template>
      </avue-crud>
    </div>
  </basic-container>
</template>
<script>
import { getOrderList, getCompanyList } from '@/api/order/index';
import { baseExportDataUrl } from '@/config/env';
import projectConfig from '@/api/projectConfig';
import { dateFormat } from '@/util/date';
import datePicker from '@/components/date-picker/main';

export default {
  components: {
    datePicker,
  },
  data() {
    return {
      initialize: true, // 用于判断是否初始化
      loading: true,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      query: {
        createDateStart: '', // 开始时间
        createDateEnd: '', // 结束时间
        // dateKey: "today",
        buyUserCompanyCode: '', // 买家公司
        sellerCompanyCode: '', // 卖家公司
        deliveryType: '1', // 订单来源
        priceType: '1', // 作价方式
        orderStatus: '', // 订单状态
        queryKey: '', // 搜索关键字
      },
      companyList: [], // 公司列表
      // groupArr: [
      //   { value: "today", textName: "今天", key: 1 },
      //   { value: "yesterday", textName: "昨天", key: 2 },
      //   { value: "lastWeek", textName: "最近一周", key: 3 },
      //   { value: "lastMonth", textName: "最近30天", key: 4 },
      //   { value: "lastThreeMonth", textName: "最近90天", key: 5 },
      //   { value: "all", textName: "累计", key: 6 }
      // ],
      // 订单来源数据
      originDatas: [
        {
          label: '现货商城',
          value: '1',
        },
        {
          label: '求购大厅',
          value: '2',
        },
      ],
      // 作价方式数据
      evaluateDatas: [
        {
          label: '点价',
          value: '1',
        },
        {
          label: '延期点价',
          value: '3',
        },
        {
          label: '确定价',
          value: '2',
        },
      ],
      // 订单状态数据
      orderStatusDatas: [
        {
          label: '全部',
          value: '',
        },
        {
          label: '待确认',
          value: '1',
        },
        {
          label: '已挂单',
          value: '4',
        },
        {
          label: '待生成合同',
          value: '5',
        },
        {
          label: '已生成合同',
          value: '6',
        },
        {
          label: '已取消',
          value: '3',
        },
      ],
      // 表格信息
      orderOption: {
        index: true,
        height: 'auto',
        calcHeight: 30,
        tip: false,
        searchShow: true,
        border: true,
        editBtn: false,
        addBtn: false,
        viewBtn: false,
        delBtn: false,
        menuWidth: 150,
        dialogWidth: 900,
        dialogClickModal: false,
        searchMenuSpan: 4,
        column: [
          {
            label: '订单编号',
            prop: 'customerOrderCode',

          },
          {
            label: '买家',
            prop: 'buyCompanyName',
          },
          {
            label: '卖家',
            prop: 'sellCompanyName',
          },
          {
            label: '点价人',
            prop: 'createUserName',
            width: 150,
          },
          {
            label: '商品名称',
            prop: 'categoryName',
          },
          {
            label: '合约',
            prop: 'contractName',
          },
          {
            label: '基价',
            prop: 'basePrice',
            width: 80,
          },
          {
            label: '成交数量',
            prop: 'dealQuantity',
            width: 80,
          },
          {
            label: '下单数量',
            prop: 'quantity',
            width: 80,
          },
          {
            label: '订单状态',
            prop: 'orderStatus',
            width: 120,
            row: true,
            slot: true,
            search: true,
            searchslot: true,
            searchSpan: 4,
          },
          {
            label: '订单来源',
            prop: 'deliveryType',
            hide: true,
            search: true,
            searchslot: true,
            searchSpan: 4,
          },
          {
            label: '作价方式',
            prop: 'priceType',
            hide: true,
            search: true,
            searchslot: true,
            searchSpan: 4,
          },
          {
            label: '买家公司',
            prop: 'buyName',
            hide: true,
            search: true,
            searchslot: true,
          },
          {
            label: '卖家公司',
            prop: 'sellName',
            hide: true,
            search: true,
            searchslot: true,
          },
          {
            label: '下单时间',
            prop: 'createDate',
            width: 180,
          },
        ],
      },
      orderList: [], // 订单列表
      exportDataUrl: '', // 导出数据地址
      currentTime: '', // 当前时间
    };
  },
  mounted() {
    this.initialize = false
  },
  created() {
    this.getTableColumn()
    // 当前时间
    const time = dateFormat(new Date(), 'yyyy-MM-dd');
    this.currentTime = [new Date(time.replace(/-/g, ',')), new Date(time.replace(/-/g, ','))]
    this.query.createDateStart = new Date(time.replace(/-/g, ',')) / 1000
    this.query.createDateEnd = new Date(time.replace(/-/g, ',')) / 1000

    // 导出数据
    // this.exportDataUrl =
    //   baseExportDataUrl +
    //   projectConfig.URL_order_exportData +
    //   '?queryKey=' +
    //   this.query.queryKey +
    //   '&deliveryType=' +
    //   this.query.deliveryType +
    //   '&priceType=' +
    //   this.query.priceType +
    //   '&orderStatus=' +
    //   this.query.orderStatus +
    //   '&dateKey=' +
    //   this.query.dateKey +
    //   '&createDateStart=' +
    //   this.query.createDateStart +
    //   '&createDateEnd=' +
    //   this.query.createDateEnd +
    //   '&dateNum=' +
    //   this.query.dateNum;
    this.exportDataUrl =
      `${baseExportDataUrl}${projectConfig.URL_order_exportData}
      ?queryKey=${this.query.queryKey}
      &deliveryType=${this.query.deliveryType}
      &priceType=${this.query.priceType}
      &orderStatus=${this.query.orderStatus}
      &dateKey=${this.query.dateKey}
      &createDateStart=${this.query.createDateStart} 
      &createDateEnd=${this.query.createDateEnd}
      &dateNum=${this.query.dateNum}`
    // 获取买家/卖家公司列表
    this.getCompanyListDatas();
  },
  methods: {
    refreshChange() {
      this.page.currentPage = 1
      this.getList()
    },
    searchChange(params, done) {
      this.getList()
      done()
    },
    searchReset() {
      this.currentTime = []
      this.query = {
        createDateStart: null,
        createDateEnd: null,
        buyUserCompanyCode: '', // 买家公司
        sellerCompanyCode: '', // 卖家公司
        deliveryType: this.query.deliveryType, // 订单来源
        priceType: this.query.priceType, // 作价方式
        orderStatus: '', // 订单状态
        queryKey: '', // 搜索关键字
      }
      this.getList()
    },
    // 订单详情
    handleOrderDetail(row) {
      this.$router.push({
        path: '/order/detail',
        query: {
          orderCode: row.orderCode,
        },
      });
    },
    // 导出订单列表
    exportExcel() {
      this.$message({
        message: '数据正在导出,请耐心等候',
        type: 'success',
      });
    },
    // 获取当前页面
    currentChange(currentPage) {
      this.page.currentPage = currentPage
    },
    // 获取订单列表
    getList() {
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
      const queryData = this.query
      queryData.pageNum = this.page.currentPage
      queryData.pageSize = this.page.pageSize
      this.loading = true;
      getOrderList(queryData).then(res => {
        const returnData = res.data.returnObject;
        this.page.total = returnData.total;
        this.orderList = returnData.list;
        this.loading = false;
      }).catch(() => { });
    },
    // 获取公司列表
    getCompanyListDatas() {
      const query = {
        type: '1',
      };
      getCompanyList(query).then(res => {
        if (res) {
          this.companyList = res.data.returnObject;
        }
      }).catch(() => { });
    },
    // 获取订单来源
    getOriginType(value) {
      if (this.initialize) return
      this.page.currentPage = 1;
      this.query.deliveryType = value;
      this.getList();
    },
    getTableColumn() {
      const column = [
        {
          label: '订单编号',
          prop: 'customerOrderCode',
          minWidth: '180',
        },
        {
          label: '买家',
          prop: 'buyCompanyName',
          minWidth: '180',
        },
        {
          label: '卖家',
          prop: 'sellCompanyName',
          minWidth: '180',
        },
        {
          label: this.query.priceType === '2' ? '下单人' : '点价人',
          prop: 'createUserName',
        },
        {
          label: '商品名称',
          prop: 'categoryName',
        },
        {
          label: '下单数量',
          prop: 'quantity',
        },
        {
          label: '订单状态',
          prop: 'orderStatus',
          width: 120,
          row: true,
          slot: true,
          search: true,
          searchslot: true,
          searchSpan: 4,
        },
        {
          label: '订单来源',
          prop: 'deliveryType',
          showColumn: false,
          hide: true,
          search: true,
          searchslot: true,
          searchSpan: 4,
        },
        {
          label: '作价方式',
          prop: 'priceType',
          showColumn: false,
          hide: true,
          search: true,
          searchslot: true,
          searchSpan: 4,
        },
        {
          label: '买家公司',
          prop: 'buyName',
          showColumn: false,
          hide: true,
          search: true,
          searchslot: true,
        },
        {
          label: '卖家公司',
          prop: 'sellName',
          showColumn: false,
          hide: true,
          search: true,
          searchslot: true,
        },
        {
          label: '下单时间',
          prop: 'createDate',
          minWidth: '160',
        },
      ]
      if (this.query.priceType === '1') {
        column.splice(5, 0, {
          label: '合约',
          prop: 'contractName',
        }, {
          label: '基价',
          prop: 'basePrice',
        }, {
          label: '成交数量',
          prop: 'dealQuantity',
        })
      }
      if (this.query.priceType === '2') {
        column.splice(5, 0, {
          label: '价格',
          prop: 'basePrice',
        })
      }
      this.orderOption.column = column
    },
    // 作价方式
    getEvaluateType(value) {
      if (this.initialize) return
      this.getTableColumn()
      this.query.orderStatus = '';
      // 作价方式不同，订单状态可选项不同 ******* start
      const orderStatusData = [
        {
          label: '全部',
          value: '',
        },
        {
          label: this.query.priceType === '1' ? '待挂单' : '待确认',
          value: '1',
        },
        {
          label: '待生成合同',
          value: this.query.orderStatus === '2' ? '2' : '5',
        },
        {
          label: '已生成合同',
          value: '6',
        },
        {
          label: '已取消',
          value: '3',
        },
      ]
      if (this.query.priceType === '1') {
        orderStatusData.splice(2, 0, { label: '已挂单', value: '4' });
      }
      this.orderStatusDatas = orderStatusData
      // 作价方式不同，订单状态可选项不同 ******* end
      this.page.currentPage = 1
      this.query.priceType = value
      this.getList();
    },
    // 获取订单状态
    getOrderStatus(value) {
      if (this.initialize) return
      this.page.currentPage = 1;
      this.query.orderStatus = value;
      this.getList();
    },
    // 获取买家公司
    getBuyCompany(value) {
      this.page.currentPage = 1;
      this.query.buyUserCompanyCode = value;
      this.getList();
    },
    // 获取卖家公司
    getSellerCompany(value) {
      this.page.currentPage = 1;
      this.query.sellerCompanyCode = value;
      this.getList();
    },
    // 获取自定义时间戳
    changeDataPicker(value) {
      this.currentTime = value
      this.page.currentPage = 1;
      // this.query.dateKey = "";
      // this.query.dateNum = "";
      // this.query.createDateStart = value[0] / 1000;
      // this.query.createDateEnd = value[1] / 1000;
      // this.$refs.btnGroup.initialAction();
      if (value) {
        this.query.createDateStart = value[0] / 1000;
        this.query.createDateEnd = value[1] / 1000;
      } else {
        this.query.createDateStart = '';
        this.query.createDateEnd = '';
        this.currentTime = []
      }
      this.getList();
    },
    // 获取按钮组时间关键字
    // changeButtonGroup(value) {
    //   this.page.currentPage = 1;
    //   this.query.createDateStart = "";
    //   this.query.createDateEnd = "";
    //   this.query.dateKey = value;
    //   this.$refs.datePick.initialAction();
    //   this.getList();
    // }
  },
};
</script>
