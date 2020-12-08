import {
  removeRefreshToken,
  removeToken,
  setRefreshToken,
  setToken,
} from '@/util/auth'
import {
  Message,
} from 'element-ui'
import {
  getStore,
  setStore,
} from '@/util/store'
import {
  isURL,
  validatenull,
} from '@/util/validate'
import {
  deepClone,
} from '@/util/util'
import website from '@/config/website'
import {
  getButtons,
  getUserInfo,
  loginBySocial,
  loginByUsername,
  logout,
  refreshToken,
} from '@/api/user'
import {
  getRoutes,
  getTopMenu,
} from '@/api/system/menu'
// import { getSideMenu } from '@/api/getSideMenu'
import md5 from 'js-md5'

function addPath(ele, first) {
  const menuData = website.menu;
  const propsConfig = menuData.props;
  const propsDefault = {
    label: propsConfig.label || 'name',
    path: propsConfig.path || 'path',
    icon: propsConfig.icon || 'icon',
    children: propsConfig.children || 'children',
  }
  const icon = ele[propsDefault.icon];
  ele[propsDefault.icon] = validatenull(icon) ? menuData.iconDefault : icon;
  const isChild = ele[propsDefault.children] && ele[propsDefault.children].length !== 0;
  if (!isChild) ele[propsDefault.children] = [];
  if (!isChild && first && !isURL(ele[propsDefault.path])) {
    ele[propsDefault.path] = ele[propsDefault.path] + '/index'
  } else {
    ele[propsDefault.children].forEach(child => {
      addPath(child);
    })
  }
}

const user = {
  state: {
    tenantId: getStore({
      name: 'tenantId',
    }) || '',
    userInfo: getStore({
      name: 'userInfo',
    }) || [],
    permission: getStore({
      name: 'permission',
    }) || {},
    roles: [],
    menu: getStore({
      name: 'menu',
    }) || [],
    menuId: getStore({
      name: 'menuId',
    }) || [],
    menuAll: getStore({
      name: 'menuAll',
    }) || [],
    token: getStore({
      name: 'token',
    }) || '',
    refreshToken: getStore({
      name: 'refreshToken',
    }) || '',
  },
  actions: {
    // 根据用户名登录获取token
    LoginByUsername({
      commit,
      dispatch,
    }, userInfo) {
      return new Promise((resolve, reject) => {
        // 模拟登陆
        // commit('SET_TOKEN', 'eyJ0eXAiOiJKc29uV2ViVG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJyb2xlX25hbWUiOiJhZG1pbmlzdHJhdG9yIiwidXNlcl9pZCI6IjExMjM1OTg4MjE3Mzg2NzUyMDEiLCJyb2xlX2lkIjoiMTEyMzU5ODgxNjczODY3NTIwMSIsInVzZXJfbmFtZSI6ImFkbWluIiwibmlja19uYW1lIjoi566h55CG5ZGYIiwidG9rZW5fdHlwZSI6ImFjY2Vzc190b2tlbiIsImRlcHRfaWQiOiIxMTIzNTk4ODEzNzM4Njc1MjAxIiwiYWNjb3VudCI6ImFkbWluIiwiY2xpZW50X2lkIjoic2FiZXIiLCJleHAiOjE1ODY0MDUzNzMsIm5iZiI6MTU4NjQwMTc3M30.3pvZ2c7J2ftdsNNq7YncHrtXEuo5jdof6NpMhnOkHRg');
        // commit('SET_REFRESH_TOKEN', 'eyJ0eXAiOiJKc29uV2ViVG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ1c2VyX2lkIjoiMTEyMzU5ODgyMTczODY3NTIwMSIsInRva2VuX3R5cGUiOiJyZWZyZXNoX3Rva2VuIiwiY2xpZW50X2lkIjoic2FiZXIiLCJleHAiOjE1ODcwMDY1NzMsIm5iZiI6MTU4NjQwMTc3M30.yBqgpmreOY80Cd780r3Nk3oaKL44CutcQmK4e5Q2hhM');

        loginByUsername(
          userInfo.tenantId,
          userInfo.username,
          md5(userInfo.password),
          userInfo.type,
          userInfo.key,
          userInfo.code).then(res => {
            const returnData = res.data;
            if (returnData.error_description) {
              Message({
                message: returnData.error_description,
                type: 'error',
              })
            } else {
              commit('SET_TOKEN', returnData.access_token);
              commit('SET_REFRESH_TOKEN', returnData.refresh_token);
              commit('SET_TENANT_ID', returnData.tenantId);
              dispatch('GetUserInfo')
              commit('DEL_ALL_TAG');
              commit('CLEAR_LOCK');
            }
            resolve();
          }).catch(error => {
            reject(error);
          })
      })
    },
    // 根据手机号登录
    LoginByPhone({
      commit,
    }, userInfo) {
      return new Promise((resolve) => {
        loginByUsername(userInfo.phone, userInfo.code).then(res => {
          const returnData = res.data.data;
          commit('SET_TOKEN', returnData);
          commit('DEL_ALL_TAG');
          commit('CLEAR_LOCK');
          resolve();
        }).catch(() => { })
      })
    },
    // 根据第三方信息登录
    LoginBySocial({
      commit,
    }, userInfo) {
      return new Promise((resolve) => {
        loginBySocial(
          userInfo.tenantId,
          userInfo.source,
          userInfo.code,
          userInfo.state).then(res => {
            const returnData = res.data;
            if (returnData.error_description) {
              Message({
                message: returnData.error_description,
                type: 'error',
              })
            } else {
              commit('SET_TOKEN', returnData.access_token);
              commit('SET_REFRESH_TOKEN', returnData.refresh_token);
              commit('SET_USER_INFO', returnData);
              commit('DEL_ALL_TAG');
              commit('CLEAR_LOCK');
            }
            resolve();
          })
      })
    },
    // 获取用户信息
    GetUserInfo({
      commit,
    },) {
      return new Promise((resolve, reject) => {
        getUserInfo().then((res) => {
          const returnData = res.data.data;
          commit('SET_USER_INFO', returnData);
          commit('SET_ROLES', returnData.roles);
          resolve(returnData);
        }).catch(err => {
          reject(err);
        })
      })
    },
    // 刷新token
    refreshToken({
      state,
      commit,
    }) {
      return new Promise((resolve, reject) => {
        refreshToken(state.refreshToken, state.tenantId).then(res => {
          const returnData = res.data;
          commit('SET_TOKEN', returnData.access_token);
          commit('SET_REFRESH_TOKEN', returnData.refresh_token);
          resolve();
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出登录
    LogOut({
      commit,
    }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', '');
          commit('SET_MENU', []);
          commit('SET_MENU_ID', {});
          commit('SET_MENU_ALL', []);
          commit('SET_ROLES', []);
          commit('SET_TAG_LIST', []);
          commit('DEL_ALL_TAG');
          commit('CLEAR_LOCK');
          removeToken();
          removeRefreshToken();
          resolve();
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 注销session
    FedLogOut({
      commit,
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        commit('SET_MENU_ID', {});
        commit('SET_MENU_ALL', []);
        commit('SET_MENU', []);
        commit('SET_ROLES', []);
        commit('SET_TAG_LIST', []);
        commit('DEL_ALL_TAG');
        commit('CLEAR_LOCK');
        removeToken();
        removeRefreshToken();
        resolve();
      })
    },
    // 获取顶部菜单
    GetTopMenu() {
      return new Promise(resolve => {
        getTopMenu().then((res) => {
          const returnData = res.data.data || [];
          resolve(returnData)
        }).catch(() => { })
      })
    },
    // 获取系统菜单
    GetMenu({
      commit,
      dispatch,
    }, topMenuId) {
      return new Promise(resolve => {
        // 获取菜单(后端返回)
        getRoutes(topMenuId).then((res) => {
          const returnData = res.data.data
          const menu = deepClone(returnData);
          menu.forEach(ele => {
            addPath(ele, true);
          });
          commit('SET_MENU_ALL', menu)
          commit('SET_MENU', menu)
          dispatch('GetButtons');
          resolve(menu)
        }).catch(() => { })

        //模拟menu数据
        // getSideMenu(topMenuId).then((res) => {
        //   const data = res.data.data
        //   let menu = deepClone(data);
        //   menu.forEach(ele => {
        //     addPath(ele, true);
        //   });
        //   commit('SET_MENU', menu)
        //   dispatch('GetButtons');
        //   resolve(menu)
        // })
      })
    },
    // 获取系统按钮
    GetButtons({
      commit,
    }) {
      return new Promise((resolve) => {
        getButtons().then(res => {
          const returnData = res.data.data;
          commit('SET_PERMISSION', returnData);
          resolve();
        })
      })
    },
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      setToken(token);
      state.token = token;
      setStore({
        name: 'token',
        content: state.token,
      })
    },
    SET_MENU_ID(state, menuId) {
      state.menuId = menuId;
      setStore({
        name: 'menuId',
        content: state.menuId,
      })
    },
    SET_MENU_ALL: (state, menuAll) => {
      state.menuAll = menuAll
      setStore({
        name: 'menuAll',
        content: state.menuAll,
      })
    },
    SET_MENU: (state, menu) => {
      state.menu = menu
      setStore({
        name: 'menu',
        content: state.menu,
      })
      if (validatenull(menu)) return;
      // 合并动态路由去重
      let menuAll = state.menuAll;
      menuAll = menuAll.concat(menu).reverse();
      const newMenu = [];
      for (const item1 of menuAll) {
        let flag = true;
        for (const item2 of newMenu) {
          if (item1.name === item2.name || item1.path === item2.path) {
            flag = false;
          }
        }
        if (flag) {
          newMenu.push(item1);
        }
      }
      state.menuAll = newMenu;
      setStore({
        name: 'menuAll',
        content: state.menuAll,
      })
    },
    SET_REFRESH_TOKEN: (state, refreshToken) => {
      setRefreshToken(refreshToken)
      state.refreshToken = refreshToken;
      setStore({
        name: 'refreshToken',
        content: state.refreshToken,
      })
    },
    SET_TENANT_ID: (state, tenantId) => {
      state.tenantId = tenantId;
      setStore({
        name: 'tenantId',
        content: state.tenantId,
      })
    },
    SET_USER_INFO: (state, userInfo) => {
      if (validatenull(userInfo.avatar)) {
        userInfo.avatar = '/img/bg/img-logo.png';
      }
      state.userInfo = userInfo;
      setStore({
        name: 'userInfo',
        content: state.userInfo,
      })
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_PERMISSION: (state, permission) => {
      let result = [];

      function getCode(list) {
        list.forEach(ele => {
          if (typeof (ele) === 'object') {
            const chiildren = ele.children;
            const code = ele.code;
            if (chiildren) {
              getCode(chiildren)
            } else {
              result.push(code);
            }
          }
        })
      }

      // 获取按钮权限数组（中获取chiildren数组下面的所有权限按钮）
      getCode(permission);
      state.permission = {};
      result.forEach(ele => {
        state.permission[ele] = true;
      });
      // 给返回来的所有权限按钮变成dept_delete: true 格式
      setStore({
        name: 'permission',
        content: state.permission,
      })
    },
  },

}
export default user
