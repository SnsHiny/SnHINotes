<template>
    <div style="width: 700px">
        <el-input
            placeholder="输入部门名称进行搜索..."
            prefix-icon="el-icon-search"
            v-model="filterText">
        </el-input>
        <el-tree
            style="background-color: #dff9fb"
            :data="depts"
            :props="defaultProps"
            :highlight-current="true"
            :default-expand-all="true"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            node-key="id"
            ref="tree">
            <span class="custom-tree-node" slot-scope="{ data }">
                <span>{{ data.name }}</span>
                <span>
                    <el-button
                        type="text"
                        size="mini"
                        @click="() => showAddDeptDialog(data)">
                        添加部门
                    </el-button>
                    <el-button
                        style="color: red"
                        type="text"
                        size="mini"
                        @click="() => removeDept(data)">
                        删除部门
                    </el-button>
                </span>
            </span>
        </el-tree>
        <el-dialog title="添加部门" :visible.sync="dialogVisible" width="30%">
            <div>
                <el-tag style="margin-right: 5px">所属部门</el-tag>
                {{parentName}}
            </div>
            <div>
                <el-tag>部门名称</el-tag>
                <el-input v-model="dept.name" placeholder="请输入部门名称..." style="width: 70%; margin-left: 10px"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addDept()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
           
<script>
    export default {
        name: 'DepMana',
        data() {
            return {
                filterText: '',
                depts: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                dialogVisible: false,
                dept: {
                    name: '',
                    parentId: -1,
                },
                parentName: '',
            }
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        mounted() {
            this.initDepts();
        },
        methods: {
            filterNode(value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },
            initDepts() {
                this.getRequest('/system/basic/department/').then(resp => {
                    if (resp) {
                        this.depts = resp;
                    }
                })
            },
            showAddDeptDialog(data) {
                this.dept.parentId = data.id;
                this.parentName = data.name;
                this.dialogVisible = true;
            },
            addDept() {
                this.postRequest('/system/basic/department/', this.dept).then(resp => {
                    if (resp) {
                        this.initDepts();
                        this.dept.name = '';
                        this.dialogVisible = false;
                    }
                })
            },
            removeDept(data) {
                if (data.isParent) {
                    this.$message.error('父部门删除失败！');
                } else {
                    this.$confirm('此操作将永久删除 [ ' + data.name + ' ] 部门, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.deleteRequest('/system/basic/department/' + data.id).then(resp => {
                                if (resp) {
                                    this.initDepts();
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
            
        },
    }
</script>
         
<style>
    .custom-tree-node {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
</style>