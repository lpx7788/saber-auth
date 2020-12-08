<template>
  <basic-container>
    <el-tabs type="card"
             v-model="tabsIdx">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-document"></i> 企业信息</span>
        <info ref="info"
              v-if="tabsIdx === '0'" />
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="icon-yuangongliebiao"></i> 员工列表</span>
        <staff ref="staff"
               v-if="tabsIdx === '1'" />
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="icon-kehuliebiao"></i> 客户列表</span>
        <customerSupplier ref="customerSupplier"
                          type="1"
                          v-if="tabsIdx === '2'" />
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="icon-gongyingshang"></i> 供应商列表</span>
        <customerSupplier ref="customerSupplier"
                          type="2"
                          v-if="tabsIdx === '3'" />
      </el-tab-pane>
      <el-tab-pane label="套保账户">
        <span slot="label"><i class="icon-zhanghu"></i> 套保设置</span>
        <hedging ref="hedging" />
      </el-tab-pane>
      <el-tab-pane label="积分设置">
        <span slot="label"><i class="el-icon-coin"></i> 积分设置</span>
        <integral ref="integral"
                  v-if="tabsIdx === '5'" />
      </el-tab-pane>
    </el-tabs>
  </basic-container>
</template>

<script>
import info from './components/info' // 基本信息
import customerSupplier from './components/customerSupplier' // 客户与供应商
import staff from './components/staff' // 员工
import integral from './components/integral' // 积分设置
import hedging from './components/hedging' // 套保账户

export default {
  data() {
    return {
      tabsIdx: '0',
    }
  },
  components: {
    info,
    customerSupplier,
    staff,
    integral,
    hedging,
  },
  computed: {

  },
  watch: {
    $route() {
      this.tabsIdx = '0'
      this.$refs.info.getDetail()
    },
  },
  methods: {
  },
}
</script>
