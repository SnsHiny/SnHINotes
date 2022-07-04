<template>
    <div>
        <div>
            <el-select v-model="jobLevel.titleLevel" clearable placeholder="请选择职称等级...">
                <el-option
                v-for="item in titleLevels"
                :key="item"
                :label="item"
                :value="item">
                </el-option>
            </el-select>
            <el-input
                style="width: 400px; margin-left: 10px"
                placeholder="请输入职称..."
                v-model="jobLevel.name"
                @keydown.enter.native="addJobLevel()">
                <el-button slot="append" icon="el-icon-plus" @click="addJobLevel()">添加</el-button>
            </el-input>
            <el-button type="danger" style="margin-left: 245px" :disabled="this.multipleSelection.length==0" @click="deleteJobLevels()">批量删除</el-button>
        </div>
        <div>
            <el-table class="jobLevelTable" :data="jobLevels" stripe height="430" @selection-change="handleSelectionChange" style="width: 80%">
                <el-table-column align="center" type="selection" width="55"></el-table-column>
                <el-table-column align="center" prop="id" label="编号" width="70"></el-table-column>
                <el-table-column align="center" prop="name" label="职称名称" width="180"></el-table-column>
                <el-table-column align="center" prop="titleLevel" label="职称等级" width="120"></el-table-column>
                <el-table-column align="center" prop="createDate" label="创建日期" width="200"></el-table-column>
                <el-table-column align="center" prop="enabled" label="是否启用" width="100">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.enabled" type="success">已启用</el-tag>
                        <el-tag v-else type="danger">未启用</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="250">
                    <template slot-scope="scope">
                        <el-button size="small" @click="showDialog(scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="编辑职称" :visible.sync="dialogVisible" width="30%">
            <div>
                <el-tag>职位名称</el-tag>
                <el-input v-model="updateJobLevel.name" style="width: 70%; margin-left: 10px"></el-input>
            </div>
            <div>
                <el-tag>职位等级</el-tag>
                <el-select v-model="updateJobLevel.titleLevel" clearable placeholder="请选择职称等级..." style="margin-left: 10px">
                    <el-option
                    v-for="item in titleLevels"
                    :key="item"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
            </div>
            <div>
                <el-tag>是否启用</el-tag>
                <el-switch
                    v-model="updateJobLevel.enabled"
                    style="margin-left: 10px"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-text="已启用"
                    inactive-text="未启用">
                </el-switch>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="updatePosition()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
           
<script>
    export default {
        name: 'JoblevelMana',
        data() {
            return {
                jobLevel: {
                    name: '',
                    titleLevel: ''
                },
                jobLevels: [],
                titleLevels: [
                    '正高级', '副高级', '高级', '中级', '初级'
                ],
                dialogVisible: false,
                updateJobLevel: {
                    name: '',
                    titleLevel: '',
                    enabled: false
                },
                multipleSelection: [],
            }
        },
        mounted() {
            this.initJobLevels();
        },
        methods: {
            initJobLevels() {
                this.getRequest('/system/basic/lobLevel/').then(resp => {
                    if (resp) {
                        this.jobLevels = resp;
                    }
                })
            },
            addJobLevel() {
                if (this.jobLevel.name && this.jobLevel.titleLevel) {
                    this.postRequest('/system/basic/lobLevel/', this.jobLevel).then(resp => {
                        if (resp) {
                            this.initJobLevels();
                            this.jobLevel.name = '';
                            this.jobLevel.titleLevel = '';
                        }
                    })
                } else {
                    this.$message.error('职称信息不能为空！');
                }
            },
            updatePosition() {
                this.putRequest('/system/basic/lobLevel/', this.updateJobLevel).then(resp => {
                    if (resp) {
                        this.initJobLevels();
                        this.dialogVisible = false;
                    }
                })
            },
            handleDelete(data) {
                this.$confirm('此操作将永久删除 [ ' + data.name + ' ] 职称, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest('/system/basic/lobLevel/' + data.id).then(resp => {
                            if (resp) {
                                this.initJobLevels();
                            }
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            deleteJobLevels() {
                this.$confirm('此操作将永久删除 [ ' + this.multipleSelection.length + ' ] 条职称数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = "?";
                    this.multipleSelection.forEach(item => {
                        ids += 'ids=' + item.id + '&';
                    })
                    this.deleteRequest('/system/basic/lobLevel/' + ids).then(resp => {
                        if (resp) {
                            this.initJobLevels();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            showDialog(data) {
                Object.assign(this.updateJobLevel, data);
                this.updateJobLevel.createDate = '';
                this.dialogVisible = true;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        },
    }
</script>
         
<style>
       
</style>