// import {setStore} from '@/util/store'
import queryCategoryTree from '@/api/category/tree'

const category = {
  state: {
    categoryTree: [],
  },
  actions: {
    QueryCategoryTree({
      commit,
    }) {
      return new Promise((resolve, reject) => {
        queryCategoryTree({}).then(res => {
          const arr = []
          res.data.returnObject.forEach(level1 => {
            const obj = {
              categoryCode: level1.categoryCode,
              categoryName: level1.categoryName,
              childs: [],
            }
            level1.childs.forEach(level2 => {
              level2.childs.forEach(level3 => {
                obj.childs.push(level3)
              })
            })
            arr.push(obj)
          })
          commit('SET_CATEGORYTREE', arr)
          resolve(arr);
        }).catch(error => {
          reject(error);
        })
      })
    },
  },
  mutations: {
    SET_CATEGORYTREE: (state, val) => {
      const stateData = state
      stateData.categoryTree = val
      //  setStore({name: 'categoryTree', content: state.categoryTree, type: 'session'})
    },
  },
}

export default category
