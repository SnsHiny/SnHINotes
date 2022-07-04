<template>
    <div>
        <el-container>
            <el-header class="homeHeader">
                <div class="title">云上OA</div>
                <div>
                    <el-button 
                        icon="el-icon-chat-dot-round" 
                        type="text" 
                        style="margin-right: 20px; font-size: 25px; color: #00b894"
                        @click="goChat()">
                    </el-button>
                    <el-dropdown style="margin-right: 50px" placement="bottom-start" @command="handleCommand">
                        <span class="el-dropdown-link">
                            {{userInfo.name}}
                            <img class="headPortrait" :src="userInfo.userFace">
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="personalCenter">个人中心</el-dropdown-item>
                            <el-dropdown-item command="setting">设置</el-dropdown-item>
                            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>
            <el-container>
                <el-aside width="250px">
                    <el-menu style="border-right: 0px" router unique-opened>
                        <el-submenu :index="index+''" v-for="(item, index) in routes" :key="index">
                            <template v-if="!item.hidden"  slot="title"><i :class="item.iconCls" style="margin-right: 8px"></i>{{item.name}}</template>
                            <el-menu-item-group v-for="(children, indexj) in item.children" :key="indexj">
                                <el-menu-item :index="children.path">{{children.name}}</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-container>
                    <el-main>
                        <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path != '/home'">
                          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                          <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
                        </el-breadcrumb>
                        <div v-else class="welcomeTitle">
                          欢迎来到云上OA系统
                        </div>
                        <router-view></router-view>
                    </el-main>
                    <el-footer>云上OA项目作者@孙辉SnHI</el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>
           
<script>
    export default {
        name: 'Home',
        data() {
            return {
            }
        },
        computed: {
          routes() {
            return this.$store.state.routes;
          },
          userInfo() {
            return this.$store.state.currentAdmin;
          },
        },
        methods: {
          handleCommand(command) {
            if (command == 'logout') {
              this.$confirm('此操作将退出登录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.getRequest('/out');
                // 初始化菜单
                this.$store.commit('initRoutes', []);
                this.$router.replace('/Login');
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消操作'
                });          
              });
            } else if (command == 'personalCenter') {
              this.$router.push('/AdminInfo')
            }
          },
          goChat() {
            this.$router.push('/ChatView')
          },
        }
    }
</script>
         
<style>
  @font-face {
    font-family: 'myFont';
    src: url(..//assets//font//HanChengBoBoXingJian-2.ttf);
  }

  /* 头部导航和底部栏 */
  .el-header, .el-footer {
    display: flex;
    background-color: #c7ecee;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    color: #00b894;
    text-align: center;
    line-height: 56px;
  }

  .el-header {
    height: 56px !important;
  }

  .el-footer {
    font-size: 20px;
    font-family: 'myFont';
    height: 56px !important;
  }

  /* 系统名 */
  .homeHeader .title {
    margin-left: 50px;
    font-size: 50px;
    font-family: 'myFont';
  }
  
  /* 侧边菜单 */
  .el-aside {
    background-color: #c7ecee;
    color: #00b894;
    text-align: center;
    line-height: 200px;
  }

  .el-submenu {
    background-color: #c7ecee;
  }

  .el-menu-item-group {
    background-color: #dff9fb;
  }
  
  /* 主题 */
  .el-main {
    background-color: #dff9fb;
    color: #00b894;
    line-height: 55px;
    height: 609px;
  }

  /* 欢迎语 */
  .welcomeTitle {
    text-align: center;
    margin-top: 100px;
    font-size: 40px;
    font-family: 'myFont';
  }

  /* 身份 */
  .el-dropdown-link {
    color: #00b894;
    font-size: 16px;
  }

  .el-dropdown-link:hover {
    cursor: pointer;
  }

  /* 头像 */
  .headPortrait {
    width: 48px;
    height: 48px;
    border-radius: 24px;
    margin-left: 10px;
    margin-top: 5px;
  }
</style>