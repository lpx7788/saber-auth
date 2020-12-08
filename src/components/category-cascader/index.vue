<template>
  <div class="category">
    <el-cascader :disabled="disabled"
                 placeholder="请选择商品品种"
                 :class="width ? 'cascader' : ''"
                 v-model="value1"
                 ref="cascader"
                 :options="options"
                 :props="props"
                 :show-all-levels="false"
                 :clearable="isClearable"
                 :collapse-tags="isCollapseTags"
                 @change="handleChange"
                 @getCheckedNodes="getCheckedNodes">
    </el-cascader>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: [],
      options: [],
      props: {
        expandTrigger: 'hover',
        label: 'categoryName',
        value: 'categoryCode',
        children: 'childs',
        multiple: this.isMultiple,
      },
    }
  },
  props: {
    value1: {
      type: Array,
    },
    width: {
      type: String,
    },
    // 多选
    isMultiple: {
      type: Boolean,
      default: false,
    },
    // 多选时折叠tag
    isCollapseTags: {
      type: Boolean,
      default: false,
    },
    // 可清空
    isClearable: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  model: {
    prop: 'value',
  },
  methods: {
    getCheckedNodes() {
      return this.$refs.cascader.getCheckedNodes()
    },
    init() {
      if (this.$store.state.category.categoryTree.length !== 0) {
        this.options = this.$store.state.category.categoryTree
      } else {
        this.$store.dispatch('QueryCategoryTree').then(res => {
          this.options = res
        })
        // queryCategoryTree({}).then(res => {
        //     let arr = []
        //     res.data.returnObject.forEach(level1 => {
        //         let obj = {
        //             categoryCode: level1.categoryCode,
        //             categoryName: level1.categoryName,
        //             childs: []
        //         }
        //         level1.childs.forEach(level2 => {
        //             level2.childs.forEach(level3 => {
        //                 obj.childs.push(level3)
        //             })
        //         })
        //         arr.push(obj)
        //     })
        //     this.options = arr
        //     this.$store.commit('SET_CATEGORYTREE',arr)
        // })
      }
    },
    handleChange(val) {
      this.$emit('input', val)
    },
  },
  mounted() {
    this.init()
  },
}
</script>
<style lang="scss" scoped>
.cascader {
  width: 100%;
}
</style>
