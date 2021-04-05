<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="@/assets/img/heima.png" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside :width="!isCollapse ? '200px' : '64px'">
        <div class="toggle-button" @click="menuCollapse" >|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#449EFE"
          unique-opened
          :collapse = "isCollapse"
          :collapse-transition = "false"
          router
          :default-active="selectNavUrl"
        >
          
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
            <!-- 一级菜单的模板区 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/'+subItem.path)">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体区域 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      //左侧菜单数据
      menuList: [],
      iconObj: {
        '125': 'el-icon-s-platform',
        '103': 'el-icon-s-cooperation',
        '101': 'el-icon-s-order',
        '102': 'el-icon-s-promotion',
        '145': 'el-icon-s-home'
      },
      isCollapse: false,
      selectNavUrl: ''
    }
  },
  created() {
    this.getMenuList()
    this.selectNavUrl = window.sessionStorage.getItem('navStatePath');
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    //获取所有菜单
    getMenuList() {
      this.$http.get('menus')
                .then(res => {
                  if(res.data.meta.status !== 200){
                    this.$message.error(res.data.meta.msg);
                  }else{
                    this.menuList = res.data.data
                    console.log(this.menuList);
                  }

                })
                .catch(error => {
                  this.$message.error(error)
                })
    },
    menuCollapse() {
      this.isCollapse = !this.isCollapse
    },
    //保存选中菜单栏
    saveNavState(navStatePath){
      window.sessionStorage.setItem('navStatePath',navStatePath)
      this.selectNavUrl = navStatePath;
    }
  },
};
</script>
<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
    
  }
  .toggle-button {
      background-color: #4A5064;
      font-size: 10px;
      line-height: 24px;
      color: #fff;
      text-align: center;
    }
}
.el-main {
  background-color: #eaedf1;
}
.el-submenu {
  i {
    margin-right: 5px;
  }
}
</style>