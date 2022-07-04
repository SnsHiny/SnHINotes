<template>
    <div>
        <div>
            <el-button type="danger" style="float: right; margin-bottom: 10px;" :disabled="this.multipleSelection.length==0" @click="deleteEcs()">批量删除</el-button>
        </div>
        <div>
            <el-table 
                class="EcTable" 
                :data="empEcs" 
                stripe 
                height="480" 
                v-loading="loading"
                @selection-change="handleSelectionChange" 
                style="width: 100%">
                <el-table-column align="center" type="selection" width="55"></el-table-column>
                <el-table-column align="center" prop="name" label="员工姓名" width="150"></el-table-column>
                <el-table-column align="center" prop="ecDate" label="奖惩时间" width="150"></el-table-column>
                <el-table-column align="center" prop="ecReason" label="奖惩原因" width="250"></el-table-column>
                <el-table-column align="center" prop="ecPoint" label="奖惩金额" width="150"></el-table-column>
                <el-table-column align="center" prop="ecType" label="奖惩类型" width="100">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.ecType" type="danger">罚金</el-tag>
                        <el-tag v-else type="success">奖金</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="remark" label="备注" width="150"></el-table-column>
                <el-table-column align="center" label="操作" width="250">
                    <template slot-scope="scope">
                        <el-button size="small" @click="showDialog(scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog top="10vh" title="编辑奖惩记录" :visible.sync="dialogVisible" width="35%">
            <div>
                <el-tag>员工姓名</el-tag>
                <span>{{empEc.name}}</span>
            </div>
            <div>
                <el-tag>奖惩时间</el-tag>
                <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="empEc.ecDate"></el-date-picker>
            </div>
            <div>
                <el-tag>奖惩原因</el-tag>
                <el-input style="width: 350px; margin-top: 10px" type="textarea" maxlength="50" show-word-limit v-model="empEc.ecReason"></el-input>
            </div>
            <div>
                <el-tag>奖惩金额</el-tag>
                <el-input-number v-model="empEc.ecPoint" :min="100" :max="1000" :step="100" label="奖惩金额"></el-input-number>
            </div>
            <div>
                <el-tag>奖惩类型</el-tag>
                <el-radio-group v-model="empEc.ecType" :fill="radioColor" @change="radioChange()" size="small">
                    <el-radio-button :label="0" border size="medium">奖金</el-radio-button>
                    <el-radio-button :label="1" border size="medium">罚金</el-radio-button>
                </el-radio-group>
            </div>
            <div>
                <el-tag style="margin-left: 25px">备注</el-tag>
                <el-input style="width: 400px" type="textarea" maxlength="30" show-word-limit v-model="empEc.remark"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateEc()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
           
<script>
    export default {
        name: 'PerEc',
        data() {
            return {
                empEcs: [],
                empEc: {
                    id: null,
                    eid: null,
                    name: '',
                    ecDate: null,
                    ecReason: '',
                    ecPoint: 0,
                    ecType: 0,
                    remark: '',
                },
                multipleSelection: [],
                loading: false,
                dialogVisible: false,
            }
        },
        computed: {
            radioColor() {
                return this.empEc.ecType == 0 ? '#78e08f': '#ff6b6b';
            }
        },
        mounted() {
            this.initEmpEc();
        },
        methods: {
            initEmpEc() {
                this.loading = true;
                this.getRequest('/employee/ec/').then(resp => {
                    if (resp) {
                        this.empEcs = resp;
                        this.loading = false;
                    }
                })
            },
            showDialog(data) {
                this.dialogVisible = true;
                Object.assign(this.empEc, data);
            },
            updateEc() {
                this.putRequest('/employee/ec/', this.empEc).then(resp => {
                    if (resp) {
                        this.initEmpEc();
                        this.dialogVisible = false;
                    }
                })
            },
            handleDelete(data) {
                this.$confirm('此操作将永久删除 [ ' + data.name + ' ] 奖惩记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest('/employee/ec/' + data.id).then(resp => {
                        if (resp) {
                            this.initEmpEc();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            deleteEcs() {
                this.$confirm('此操作将永久删除 [ ' + this.multipleSelection.length + ' ] 条奖惩记录数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = '?';
                    this.multipleSelection.forEach(item => {
                        ids += 'ids=' + item.id + '&';
                    })
                    this.deleteRequest('/employee/ec/' + ids).then(resp => {
                        if (resp) {
                            this.initEmpEc();
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
            radioChange() {
                this.radioColor = this.radioColor == '#ff6b6b'? '#78e08f': '#ff6b6b';
            },
        },
    }
</script>
         
<style>
    .el-tag {
        margin-right: 10px
    }
</style>