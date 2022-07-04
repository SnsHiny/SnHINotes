<template>
    <div>
        <div class="PerInput">
            <el-input placeholder="请输入角色英文名" v-model="role.name">
                <template slot="prepend">ROLE_</template>
            </el-input>
            <el-input @keydown.enter.native="addPermission()" placeholder="请输入角色中文名" v-model="role.nameZh">
                <el-button slot="append" icon="el-icon-plus" @click="addPermission()">添加</el-button>
            </el-input>
        </div>
        <div class="PerContext">
            <el-collapse v-model="activeNames" @change="changePer" accordion>
                <el-collapse-item :title="role.nameZh" :name="role.id" v-for="(role, index) in roles" :key="index">
                    <el-card shadow="hover" class="box-card">
                        <div slot="header" class="clearfix">
                            <span>可访问资源</span>
                            <el-button style="float: right; padding: 3px 0; color: red" type="text" icon="el-icon-delete" @click="deleteRole(role)"></el-button>
                        </div>
                        <div>
                            <el-tree show-checkbox :default-checked-keys="selectedMenus" ref="tree" node-key="id" :data="allMenus" :props="defaultProps"></el-tree>
                        </div>
                        <div style="display: flex; justify-content: flex-end;">
                            <el-button size="small" @click="activeNames = -1">取消修改</el-button>
                            <el-button size="small" type="primary" @click="updateMenu(role.id, index)">确认修改</el-button>
                        </div>
                    </el-card>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>
           
<script>
    export default {
        name: 'PermissMana',
        data() {
            return {
                role: {
                    name: '',
                    nameZh: '',
                },
                roles: [],
                allMenus: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                activeNames: -1,
                selectedMenus: [],
            }
        },
        mounted() {
            this.initRoles();
        },
        methods: {
            changePer(rid) {
                if (rid) {
                    this.initSelectedMenus(rid);
                    this.initMenu();
                }
            },
            initRoles() {
                this.getRequest('/system/basic/permiss/').then(resp => {
                    if (resp) {
                        this.roles = resp;
                    }
                })
            },
            initMenu() {
                this.getRequest('/system/basic/permiss/menus').then(resp => {
                    if (resp) {
                        this.allMenus = resp;
                    }
                })
            },
            initSelectedMenus(rid) {
                this.getRequest('/system/basic/permiss/mid/' + rid).then(resp => {
                    if (resp) {
                        this.selectedMenus = resp;
                    }
                })
            },
            addPermission() {
                if (this.role.name && this.role.nameZh) {
                    this.postRequest('/system/basic/permiss/role', this.role).then(resp => {
                        if (resp) {
                            this.initRoles();
                            this.role.name = '';
                            this.role.nameZh = '';
                        }
                    })
                } else {
                    this.$message.error('角色信息不能为空！');
                }
            },
            updateMenu(rid, index) {
                let selectedKeys = this.$refs.tree[index].getCheckedKeys(true);
                let url = '/system/basic/permiss/?rid=' + rid;
                selectedKeys.forEach(key => {
                    url += '&mids=' + key;
                });
                this.putRequest(url).then(resp => {
                    if (resp) {
                        this.activeNames = -1;
                    }
                })
            },
            deleteRole(role) {
                this.$confirm('此操作将永久删除 [ ' + role.nameZh + ' ] 角色, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest('/system/basic/permiss/role/' + role.id).then(resp => {
                            if (resp) {
                                this.initRoles();
                            }
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            }
        },
    }
</script>
         
<style>
    .PerInput {
        display: flex;
        width: 700px;
    }

    .el-input {
        margin-right: 10px;
    }

    .PerContext {
        margin-top: 20px;
        width: 800px;
    }

    .el-collapse {
        border-top: 1px solid #c7ecee;
    }

    .el-collapse-item__header {
        background-color: #dff9fb;
        padding-left: 20px;
        border-bottom: 1px solid #c7ecee;
    }
</style>