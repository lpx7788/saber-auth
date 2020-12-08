<template>
  <basic-container>
    <avue-crud :option="frontOption"
               :table-loading="frontLoading"
               :data="frontDatas"
               :page.sync="page"
               v-model="form"
               ref="crud"
               @row-update="frontRowUpdate"
               @row-save="frontRowSave"
               @row-del="frontRowDel"
               @current-change="currentChange"
               @size-change="sizeChange"
               @on-load="frontOnLoad"
               @refresh-change="refreshChange">
      <template slot="seat"
                slot-scope="{ row }">
        <el-tag>{{ row.seat }}</el-tag>
      </template>
      <template slot="createDate"
                slot-scope="{ row }">
        <div>{{ moment(row.createDate).format("YYYY-MM-DD hh:mm:ss") }}</div>
      </template>
      <template slot="lastupdateDate"
                slot-scope="{ row }">
        <div>
          {{ moment(row.lastupdateDate).format("YYYY-MM-DD hh:mm:ss") }}
        </div>
      </template>
    </avue-crud>
  </basic-container>
</template>
<script>
import { getHedgeFrontList, getFuturesCompanyList, deletePreAddress, savePreAddress } from '@/api/hedge/front';

const moment = require('moment');

export default {
  data() {
    return {
      frontLoading: true, // 表格loading
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      }, // 请求页数相关
      frontOption: {
        height: 'auto',
        calcHeight: 30,
        tip: false,
        border: true,
        index: true,
        viewBtn: false,
        selection: false,
        searchBtn: false,
        selectClearBtn: false,
        menuWidth: 200,
        labelWidth: 100,
        dialogWidth: '30%',
        dialogClickModal: false,
        futuresCompanyList: [], // 期货公司列表
        column: [
          {
            label: '期货公司',
            prop: 'brokerName',
            span: 24,
            dicData: [],
            props: {
              label: 'name',
              value: 'id',
            },
            type: 'select',
            rules: [
              {
                required: true,
                message: '请选择期货公司',
                trigger: 'change',
              },
            ],
          },
          {
            label: '席位',
            prop: 'seat',
            slot: true,
            span: 24,
            rules: [
              {
                required: true,
                message: '请填写席位',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '前置地址',
            prop: 'preAddress',
            span: 24,
            rules: [
              {
                required: true,
                message: '请填写前置地址',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '创建时间',
            prop: 'createDate',
            slot: true,
            display: false,
          },
          {
            label: '最后修改时间',
            prop: 'lastupdateDate',
            slot: true,
            display: false,
          },
          {
            label: '修改人',
            prop: 'lastupdateName',
            display: false,
          },
        ],
      },

      frontDatas: [], // 表格数据列表
    };
  },

  created() {
    this.queryFuturesCompanyList();
  },
  methods: {
    moment,
    refreshChange() {
      this.page.currentPage = 1
      this.frontOnLoad()
    },
    // 期货公司列表
    queryFuturesCompanyList() {
      getFuturesCompanyList().then(res => {
        this.futuresCompanyList = res.data.returnObject;
        const column = this.findObject(this.frontOption.column, 'brokerName');
        column.dicData = res.data.returnObject
        this.futuresCompanyList = res.data.returnObject;
      }).catch(() => { });
    },
    // 保存操作
    frontRowSave(row, loading, done) {
      this.handelSave(row, loading, done)
    },
    // 保存提交数据
    handelSave(row, loading, done) {
      const self = this;
      let name = '';
      const id = row.brokerName
      // 获取对应的期货公司的id
      self.futuresCompanyList.forEach((item) => {
        if (item.id === id) {
          name = item.name
        }
      })
      const query = {
        brokerName: name, // 期货公司名
        brokerId: id,
        seat: row.seat, // 席位
        preAddress: row.preAddress, // 前置地址
      }
      savePreAddress(query).then(() => {
        loading();
        this.frontOnLoad();
        this.$message({
          type: 'success',
          message: '操作成功!',
        });
      }, () => {
        done();
      }).catch(() => {
        this.infoLoading = false;
      })
    },
    // 编辑操作
    frontRowUpdate(row, index, loading, done) {
      this.handelSave(row, loading, done)
    },
    // 删除操作
    frontRowDel(row) {
      this.$confirm('确定将选择数据删除?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          const query = {
            id: row.id,
          }
          deletePreAddress(query).then(() => {
            this.infoLoading = false;
            this.$message({
              type: 'success',
              message: '删除成功!',
            });
            this.frontOnLoad();
          }).catch(() => {
            this.infoLoading = false;
          });
        }).catch(e => e)
    },
    // 获取当前页面
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
    },
    // 每页数据量
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
      this.frontOnLoad();
    },
    // 初始化页面
    frontOnLoad() {
      this.frontLoading = true;
      const query = {
        pageNum: this.page.currentPage,
        pageSize: this.page.pageSize,
      };
      getHedgeFrontList(query).then(res => {
        const resData = res.data.returnObject;
        this.page.total = resData.total;
        this.frontDatas = resData.list
        this.frontLoading = false;
      }, () => {
        this.frontLoading = false;
      }).catch(() => { });
    },
  },
};
</script>

