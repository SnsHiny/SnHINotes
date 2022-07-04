<template>
    <div>
        <div class="adminSearch">
            <el-input
                style="width: 600px; margin: 20px auto"
                placeholder="输入操作员姓名进行搜索..."
                prefix-icon="el-icon-search"
                v-model="keyWord"
                @keydown.enter.native="searchAdmin()">
                <el-button slot="append" icon="el-icon-search" @click="searchAdmin()">搜索</el-button>
            </el-input>
        </div>
        <div class="adminCard">
            <el-card shadow="hover" class="admin-card" v-for="(admin, index) in admins" :key="index">
                <div slot="header" class="clearfix">
                    <div class="adminImg">
                        <img :src="admin.userFace" :alt="admin.name" :title="admin.name" class="adminFace">
                    </div>
                    <span class="adminName">{{admin.name}}</span>
                    <el-button style="margin-left: 5px; padding: 3px 0; color: red" type="text" icon="el-icon-delete" @click="deleteAdmin(admin)"></el-button>
                </div>
                <el-descriptions class="admin-info" :column="1">
                    <el-descriptions-item label="用户名">{{admin.name}}</el-descriptions-item>
                    <el-descriptions-item label="手机号码">{{admin.phone}}</el-descriptions-item>
                    <el-descriptions-item label="电话号码">{{admin.telephone}}</el-descriptions-item>
                    <el-descriptions-item label="地址">{{admin.address}}</el-descriptions-item>
                    <el-descriptions-item label="用户状态">
                        <el-switch
                            v-model="admin.enabled"
                            style="margin-left: 10px"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            @change="changeEnabled(admin)"
                            active-text="启用"
                            inactive-text="禁用">
                        </el-switch>
                    </el-descriptions-item>
                    <el-descriptions-item labelClassName="adminRole" label="用户角色">
                        <el-tag
                            closable 
                            style="margin-right: 5px; margin-bottom: 5px;" 
                            type="success"  
                            v-for="(role, indexJ) in admin.roles" 
                            @close="deleteRole(admin, role)"
                            :key="indexJ">
                            {{role.nameZh}}
                        </el-tag>
                        <el-dropdown @visible-change="initRoles()" @command="addRoles" placement="bottom">
                            <el-button style="margin-left: 5px" size="mini" icon="el-icon-plus"></el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item :command="composeValue(admin, role)" :disabled="JSON.stringify(admin.roles).indexOf(JSON.stringify(role)) != -1" v-for="(role, index) in allroles" :key="index">{{role.nameZh}}</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-descriptions-item>
                </el-descriptions>
            </el-card>
        </div>
    </div>
</template>
           
<script>
    export default {
        name: 'SysAdmin',
        data() {
            return {
                admins: [],
                keyWord: '',
                allroles: [],
            }
        },
        mounted() {
            this.initAdmins();
        },
        methods: {
            initAdmins() {
                this.getRequest('/system/admin/?keyWords=' + this.keyWord).then(resp => {
                    if (resp.length) {
                        this.admins = resp;
                    } else {
                        this.$message.warning('未查询到该操作员信息');
                    }
                })
            },
            initRoles() {
                this.getRequest('/system/admin/roles').then(resp => {
                    if(resp) {
                        this.allroles = resp;
                    } 
                })
            },
            searchAdmin() {
                this.initAdmins();
            },
            deleteAdmin(admin) {
                this.$confirm('此操作将永久删除 [ ' + admin.name + ' ] 操作员, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest('/system/admin/' + admin.id).then(resp => {
                            if (resp) {
                                this.initAdmins();
                            }
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            changeEnabled(admin) {
                this.putRequest('/system/admin/', admin).then(resp => {
                    if (resp) {
                        this.initAdmins();
                    }
                })
            },
            composeValue(admin, role) {
                return {
                    admin,
                    role
                }
            },
            addRoles(command) {
                this.$confirm('此操作将为 [ ' + command.admin.name + ' ] 操作员新增 [ ' + command.role.nameZh +' ] 角色, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let url = '/system/admin/role?adminId=' + command.admin.id + '&rids=' + command.role.id;
                    command.admin.roles.forEach(r => {
                        url += '&rids=' + r.id;
                    });
                    this.putRequest(url).then(resp => {
                            if (resp) {
                                this.initAdmins();
                            }
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消添加'
                    });          
                });
            },
            deleteRole(admin, role) {
                this.$confirm('此操作将永久删除 [ ' + admin.name + ' ] 操作员的 [ ' + role.nameZh +' ] 角色, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let url = '/system/admin/role?adminId=' + admin.id;
                    admin.roles.forEach(r => {
                        if (r.id != role.id) {
                            url += '&rids=' + r.id;
                        }
                    });
                    this.putRequest(url).then(resp => {
                            if (resp) {
                                this.initAdmins();
                            }
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
        },
    }
</script>
         
<style scope>
    .adminSearch {
        display: flex; 
    }

    .adminCard {
        display: flex;
        flex-wrap: wrap;
    }

    .admin-card {
        width: 385px;
        margin: 10px;
    }

    .adminFace {
        width: 64px;
        height: 64px;
        border-radius: 64px;
    }

    .adminInfo {
        line-height: 45px;
    }

    .adminRole {
        min-width: 60px;
    }
</style>