<template>
    <div>
        <div>
            <el-button type="danger" style="float: right; margin-bottom: 10px" :disabled="this.multipleSelection.length==0" @click="deleteTrains()">批量删除</el-button>
        </div>
        <div>
            <el-table 
                class="trainTable" 
                :data="empTrains" 
                stripe 
                v-loading="loading"
                height="480" 
                @selection-change="handleSelectionChange" 
                style="width: 100%">
                <el-table-column align="center" type="selection" width="55"></el-table-column>
                <el-table-column align="center" prop="name" label="员工姓名" width="180"></el-table-column>
                <el-table-column align="center" prop="trainDate" label="开始日期" width="200"></el-table-column>
                <el-table-column align="center" prop="trainContent" label="培训内容" width="300"></el-table-column>
                <el-table-column align="center" prop="remark" label="是否完成" width="150">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.remark == '已完成'" type="success">已完成</el-tag>
                        <el-tag v-else type="danger">未完成</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button size="small" @click="showDialog(scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="编辑培训记录" :visible.sync="dialogVisible" width="35%">
            <div>
                <el-tag>员工姓名</el-tag>
                <span>{{empTrain.name}}</span>
            </div>
            <div>
                <el-tag>开始时间</el-tag>
                <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="empTrain.trainDate"></el-date-picker>
            </div>
            <div>
                <el-tag>培训内容</el-tag>
                <el-input style="width: 350px; margin-top: 10px" type="textarea" maxlength="50" show-word-limit v-model="empTrain.trainContent"></el-input>
            </div>
            <div>
                <el-tag>是否完成</el-tag>
                <el-switch
                    v-model="isDone"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-text="已完成"
                    inactive-text="未完成"
                    @change="isDoneChange()">
                </el-switch>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateTrain()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
           
<script>
    export default {
        name: 'PerTrain',
        data() {
            return {
                empTrains: [],
                empTrain: {
                    id: null,
                    eid: null,
                    name: '',
                    trainDate: null,
                    trainContent: '',
                    remark: '',
                },
                dialogVisible: false,
                multipleSelection: [],
                loading: false,
            }
        },
        computed: {
            isDone() {
                return this.empTrain.remark == '已完成'? true: false;
            }
        },
        mounted() {
            this.initEmpTrain();
        },
        methods: {
            initEmpTrain() {
                this.loading = true;
                this.getRequest('/employee/train/').then(resp => {
                    if (resp) {
                        this.empTrains = resp;
                        this.loading = false;
                    }
                })
            },
            showDialog(data) {
                this.dialogVisible = true;
                Object.assign(this.empTrain, data);
            },
            updateTrain() {
                this.putRequest('/employee/train/', this.empTrain).then(resp => {
                    if (resp) {
                        this.initEmpTrain();
                        this.dialogVisible = false;
                    }
                })
            },
            handleDelete(data) {
                this.$confirm('此操作将永久删除 [ ' + data.name + ' ] 培训记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest('/employee/train/' + data.id).then(resp => {
                            if (resp) {
                                this.initEmpTrain();
                            }
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            deleteTrains() {
                this.$confirm('此操作将永久删除 [ ' + this.multipleSelection.length + ' ] 条培训记录数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = "?";
                    this.multipleSelection.forEach(item => {
                        ids += 'ids=' + item.id + '&';
                    })
                    this.deleteRequest('/employee/train/' + ids).then(resp => {
                        if (resp) {
                            this.initEmpTrain();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            isDoneChange() {
                this.empTrain.remark = this.empTrain.remark == '已完成'? '未完成': '已完成'; 
            },
        },
    }
</script>
         
<style>
    .trainTable {
        text-align: center;
    }

    .el-tag {
        margin: 0 10px;
    }
</style>