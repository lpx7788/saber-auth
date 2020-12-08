<template>
  <div class="order-detail-page">
    <basic-container>
      <el-row>
        <el-col :span="24">
          <el-card class="box-card">
            <avue-skeleton :loading="loading"
                           :rows="0">
              <div class="order-code">
                <div class="font14 inline-b">
                  <i class="iconfont_title iconfont icon-single"></i>
                  <b> 订单编号 {{ orderDetail[0].customerOrderCode }}</b>
                  <el-tag class="ml10"
                          :type="
                      orderDetail[0].orderStatus === '1'
                        ? 'warning'
                        : orderDetail[0].orderStatus === '2'
                        ? ''
                        : orderDetail[0].orderStatus === '3'
                        ? 'danger'
                        : orderDetail[0].orderStatus === '4'
                        ? 'success'
                        : orderDetail[0].orderStatus === '5'
                        ? ''
                        : 'info'
                    ">
                    {{ orderDetail[0].orderStatusName }}
                  </el-tag>
                </div>
                <div class="font14">
                  <el-button icon="el-icon-refresh"
                             type="primary"
                             @click="getOrderDetailDatas">刷新</el-button>
                </div>
              </div>
            </avue-skeleton>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-card class="box-card">
            <div class="box-card-item price-msg"
                 v-if="orderDetail[0].priceType !== '2'">
              <p class="title">
                <el-link type="primary"
                         class="noCursor"
                         :underline="false">点价信息</el-link>
              </p>
              <avue-skeleton :loading="loading"
                             :rows="1">
                <avue-crud :data="orderDetail"
                           :option="priceMsgOption">
                  <template slot-scope="{ row }"
                            slot="createDate">
                    {{ moment(row.createDate).format("YYYY-MM-DD HH:mm:ss") }}
                  </template>
                </avue-crud>
              </avue-skeleton>
            </div>
            <div class="box-card-item price-child"
                 v-if="orderDetail[0].priceType === '3'">
              <p class="title">
                <el-link type="primary"
                         class="noCursor"
                         :underline="false">点价列表</el-link>
              </p>
              <avue-skeleton :loading="loading"
                             :rows="1">
                <avue-crud :data="orderDetail"
                           :option="priceChildOption">
                </avue-crud>
              </avue-skeleton>
            </div>
            <div class="box-card-item product-msg">
              <p class="title">
                <el-link type="primary"
                         class="noCursor"
                         :underline="false">商品信息</el-link>
              </p>
              <avue-skeleton :loading="loading"
                             :rows="1">
                <avue-crud :data="orderDetail"
                           :option="productOption">
                </avue-crud>
              </avue-skeleton>
            </div>
            <div class="box-card-item order-amount">
              <p class="title">
                <el-link type="primary"
                         class="noCursor"
                         :underline="false">订单金额</el-link>
              </p>
              <avue-skeleton :loading="loading"
                             :rows="1">
                <avue-crud :data="orderDetail"
                           :option="amountOption">
                  <template slot-scope="{ row }"
                            slot="priceTypeName">
                    {{ row.priceTypeName }}
                    <el-tag type="success">{{
                      row.priceType !== "2"
                        ? `${
                            row.contractName +
                            (row.floatingPrice > 0 ? "+" : "-") +
                            row.floatingPrice
                          }`
                        : ""
                    }}</el-tag>
                  </template>
                </avue-crud>
              </avue-skeleton>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-card class="box-card">
            <div class="box-card-item other-msg">
              <p class="title">
                <el-link type="primary"
                         class="noCursor"
                         :underline="false">其他信息</el-link>
              </p>
              <avue-skeleton :loading="loading"
                             :rows="1">
                <avue-crud :data="orderDetail"
                           :option="otherOption">
                </avue-crud>
              </avue-skeleton>
            </div>
            <div class="box-card-item buyer-msg">
              <p class="title">
                <el-link type="primary"
                         class="noCursor"
                         :underline="false">买家信息</el-link>
              </p>
              <avue-skeleton :loading="loading"
                             :rows="1">
                <avue-crud :data="orderDetail"
                           :option="buyerOption">
                </avue-crud>
              </avue-skeleton>
            </div>
            <div class="box-card-item seller-msg">
              <p class="title">
                <el-link type="primary"
                         class="noCursor"
                         :underline="false">卖家信息</el-link>
              </p>
              <avue-skeleton :loading="loading"
                             :rows="1">
                <avue-crud :data="orderDetail"
                           :option="sellerOption">
                </avue-crud>
              </avue-skeleton>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>
<script>
import { getOrderDetail } from '@/api/order/index';

const moment = require('moment');

export default {
  data() {
    return {
      loading: true,
      orderDetail: [{}], // 订单详情信息
      priceMsgOption: {
        refreshBtn: false,
        addBtn: false,
        menu: false,
        columnBtn: false,
        border: true,
        column: [],
      }, //点价信息表格信息
      priceChildOption: {
        refreshBtn: false,
        addBtn: false,
        menu: false,
        columnBtn: false,
        border: true,
        column: [
          {
            label: '基价',
            prop: 'basePrice',
            slot: true,
          }, {
            label: '下单数量',
            prop: 'quantity',
            slot: true,
          }, {
            label: '成交数量',
            prop: 'dealQuantity',
            slot: true,
          }, {
            label: '状态',
            prop: 'orderStatus',
            slot: true,
          }, {
            label: '最后操作时间',
            prop: 'createDate',
            slot: true,
          },
        ],
      },
      productOption: {
        refreshBtn: false,
        addBtn: false,
        menu: false,
        columnBtn: false,
        border: true,
        column: [],
      }, //商品信息表格信息
      amountOption: {
        refreshBtn: false,
        addBtn: false,
        menu: false,
        columnBtn: false,
        border: true,
        column: [
          {
            label: '作价方式',
            prop: 'priceTypeName',
            slot: true,
          }, {
            label: '含税单价',
            prop: 'taxesPrice',
          },
          {
            label: '成交数量',
            prop: 'dealQuantity',
          }, {
            label: '订单总金额',
            prop: 'totalPrice',
          },
        ],
      }, //订单金额表格信息
      otherOption: {
        refreshBtn: false,
        addBtn: false,
        menu: false,
        columnBtn: false,
        border: true,
        column: [
          {
            label: '交货方式',
            prop: 'deliveryPattern',
          }, {
            label: '开票日期',
            prop: 'invoicedateType',
          },
          {
            label: '结算方式',
            prop: 'settleAccountsType',
          },
        ],
      }, //其他信息表格信息
      buyerOption: {
        refreshBtn: false,
        addBtn: false,
        menu: false,
        columnBtn: false,
        border: true,
        column: [
          {
            label: '公司名称',
            prop: 'buyCompanyName',
          }, {
            label: '求购用户',
            prop: 'buyUserName',
          },
          {
            label: '联系电话',
            prop: 'buyUserPhone',
          },
        ],
      },
      sellerOption: {
        refreshBtn: false,
        addBtn: false,
        menu: false,
        columnBtn: false,
        border: true,
        column: [],
      },
    };
  },
  watch: {
    $route() {
      this.getOrderDetailDatas()
    },
  },
  created() {
    this.getOrderDetailDatas()
  },
  methods: {
    moment,
    // 设置表格需要展示哪些数据
    getTableColumn(data) {
      let productColumn = [{
        label: '商品名称',
        prop: 'categoryName',
      }, {
        label: '品牌',
        prop: 'brand',
      },
      {
        label: '规格',
        prop: 'spec',
      }, {
        label: '材质',
        prop: 'material',
      }, {
        label: '其他',
        prop: 'other',
      },
      {
        label: '仓库简称',
        prop: 'wareHouse',
      }]
      let priceMsgColumn = [{
        label: '点价人',
        prop: 'buyUserName',
      }, {
        label: '合约',
        prop: 'contractName',
      }, {
        label: '基价',
        prop: 'basePrice',
      },
      {
        label: '下单数量',
        prop: 'quantity',
      },
      {
        label: '下单时间',
        prop: 'createDate',
        slot: true,
      }]
      if (data.priceType !== '2') {
        productColumn.push({
          label: '升贴水',
          prop: 'floatingPrice',
        })
      }
      if (data.priceType === '1') {
        priceMsgColumn.splice(3, 0, {
          label: '成交数量',
          prop: 'dealQuantity',
        })
      }
      let sellerColumn = [
        {
          label: '公司名称',
          prop: 'buyCompanyName',
        }, {
          label: this.orderDetail[0].priceType === '1' ? '点价用户' : '下单用户',
          prop: 'buyUserName',
        },
        {
          label: '联系电话',
          prop: 'buyUserPhone',
        },
      ]
      this.productOption.column = productColumn
      this.priceMsgOption.column = priceMsgColumn
      this.sellerOption.column = sellerColumn
    },
    // 获取订单详情
    getOrderDetailDatas() {
      this.loading = true
      const query = {
        orderCode: this.$route.query.orderCode,
      }
      getOrderDetail(query).then(res => {
        this.loading = false
        let datas = res.data.returnObject;
        this.getTableColumn(datas)
        datas.dealQuantity = datas.dealQuantity + datas.unit
        datas.quantity = datas.quantity + datas.unit
        datas.taxesPrice = datas.taxesPrice + '元/吨'
        datas.totalPrice = datas.totalPrice + '元'
        this.orderDetail = [res.data.returnObject];
      }).catch(() => { })
    },
  },
};
</script>

<style lang="scss">
.order-detail-page {
  .el-card__body .box-card-item:first-child .title {
    margin-top: 0;
  }
  .box-card-item p.title {
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    margin-top: 26px;
  }
  .avue-crud__pagination {
    display: none;
  }
  .avue-crud__menu {
    min-height: 0px;
  }
  .order-status {
    background: #ffffff;
    padding: 14px 20px;
    margin: 0 5px;
  }
  .el-card.is-always-shadow {
    webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .order-code {
    display: flex;
    justify-content: space-between;
  }
}
</style>
