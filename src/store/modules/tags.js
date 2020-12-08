import {
  setStore,
  getStore,
} from '@/util/store'
import {
  diff,
} from '@/util/util'
import website from '@/config/website'

const isFirstPages = website.isFirstPage;
const tagWel = website.fistPage;
const tagObj = {
  label: '', // 标题名称
  value: '', // 标题的路径
  params: '', // 标题的路径参数
  query: '', // 标题的参数
  meta: {}, // 额外参数
  group: [], // 分组
}

// 处理首个标签
function setFistTag(list) {
  let listData = list
  if (listData.length === 1) {
    listData[0].close = false;
  } else {
    listData.forEach(ele => {
      let eleData = ele
      if (eleData.value === tagWel.value && isFirstPages === false) {
        eleData.close = false
      } else {
        eleData.close = true
      }
    })
  }
}

// tab标签去重
function deWEight(arr) {
  const obj = {};
  const route = arr.reduce((item, next) => {
    let nextData = next
    if (nextData.value !== -1) {
      nextData.value = nextData.value.split('?')[0]
    }
    if (obj[nextData.value]) {
      obj[nextData.value] = ''
    } else {
      obj[nextData.value] = true && item.push(nextData)
    }
    // obj[nextData.value] ? '' : obj[nextData.value] = true && item.push(nextData);
    return item;
  }, [])
  return route
}
const navs = {
  state: {
    tagList: getStore({
      name: 'tagList',
    }) || [],
    tag: getStore({
      name: 'tag',
    }) || tagObj,
    tagWel: website.fistPage,
  },
  actions: {},
  mutations: {
    // 设置顶部tab标签栏
    ADD_TAG: (state, action) => {
      const stateData = state
      stateData.tag = action;
      setStore({
        name: 'tag',
        content: stateData.tag,
      })
      if (stateData.tagList.some(ele => diff(ele, action))) return
      stateData.tagList.push(action)
      stateData.tagList = deWEight(stateData.tagList)
      setFistTag(stateData.tagList);
      setStore({
        name: 'tagList',
        content: stateData.tagList,
      })
    },
    DEL_TAG: (state, action) => {
      const stateData = state
      stateData.tagList = stateData.tagList.filter(item => {
        return !diff(item, action);
      })
      setFistTag(stateData.tagList);
      setStore({
        name: 'tagList',
        content: stateData.tagList,
      })
    },
    DEL_ALL_TAG: (state) => {
      const stateData = state
      stateData.tagList = [stateData.tagWel];
      setStore({
        name: 'tagList',
        content: stateData.tagList,
      })
    },
    DEL_TAG_OTHER: (state) => {
      const stateData = state
      stateData.tagList = stateData.tagList.filter(item => {
        if (item.value === stateData.tag.value) {
          return true;
        } else if (!website.isFirstPage && item.value === website.fistPage.value) {
          return true;
        }
        return true
      })
      const tagListDatas = deWEight(stateData.tagList)
      setFistTag(tagListDatas);
      setStore({
        name: 'tagList',
        content: tagListDatas,
      })
    },
    SET_TAG_LIST(state, tagList) {
      const stateData = state
      stateData.tagList = tagList;
      setStore({
        name: 'tagList',
        content: stateData.tagList,
      })
    },
  },
}
export default navs
