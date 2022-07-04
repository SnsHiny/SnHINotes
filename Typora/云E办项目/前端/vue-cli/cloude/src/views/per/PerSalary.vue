<template>
    <div>
        <div>
            <el-button type="danger" style="float: right; margin-bottom: 10px" :disabled="this.multipleSelection.length==0" @click="deleteSalaryAdjusts()">批量删除</el-button>
        </div>
        <div>
            <el-table 
                class="salaryAdjustTable" 
                :data="salaryAdjusts" 
                stripe 
                v-loading="loading"
                height="480" 
                @selection-change="handleSelectionChange" 
                style="width: 100%">
                <el-table-column align="center" type="selection" width="55"></el-table-column>
                <el-table-column align="center" prop="name" label="员工姓名" width="150"></el-table-column>
                <el-table-column align="center" prop="asDate" label="调薪日期" width="170"></el-table-column>
                <el-table-column align="center" prop="beforeSalary" label="调前薪资" width="120">
                    <template slot-scope="scope">
                        <el-tag>{{scope.row.beforeSalary}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="afterSalary" label="调后薪资" width="120">
                    <template slot-scope="scope">
                        <el-tag>{{scope.row.afterSalary}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="reason" label="调资原因" width="200"></el-table-column>
                <el-table-column align="center" prop="remark" label="备注" width="150"></el-table-column>
                <el-table-column align="center" label="操作" width="250">
                    <template slot-scope="scope">
                        <el-button size="small" @click="showDialog(scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
            title="编辑调薪记录"
            :visible.sync="salaryAdjustDialogVisible"
            width="40%">
            <el-form ref="salaryAdjustForm" :model="salaryAdjust" label-width="100px">
                <el-form-item label="员工">
                    <el-tag>{{salaryAdjust.name}}</el-tag>
                </el-form-item>
                <el-form-item label="调薪时间">
                    <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="salaryAdjust.asDate"></el-date-picker>
                </el-form-item>
                <el-form-item label="调前薪资">
                    <el-slider
                        v-model="salaryAdjust.beforeSalary"
                        :min="3000"
                        :max="20000"
                        :step="100"
                        show-input>
                    </el-slider>
                </el-form-item>
                <el-form-item label="调后薪资">
                    <el-slider
                        v-model="salaryAdjust.afterSalary"
                        :min="3000"
                        :max="20000"
                        :step="100"
                        show-input>
                    </el-slider>
                </el-form-item>
                <el-form-item label="调薪原因">
                    <el-input style="width: 400px" type="textarea" maxlength="50" show-word-limit v-model="salaryAdjust.reason"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input style="width: 400px" type="textarea" maxlength="30" show-word-limit v-model="salaryAdjust.remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="salaryAdjustDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateSalaryAdjust()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
           
<script>
    export default {
        name: 'PerSalary',
        data() {
            return {
                salaryAdjusts: [],
                salaryAdjust: {
                    id: null,
                    eid: null,
                    name: '',
                    asDate: null,
                    beforeSalary: 0,
                    afterSalary: 0,
                    reason: '',
                    remark: '',
                },
                salaryAdjustDialogVisible: false,
                loading: false,
                multipleSelection: [],
            }
        },
        mounted() {
            this.initSalaryAdjust();
        },
        methods: {
            initSalaryAdjust() {
                this.loading = true;
                this.getRequest('/salary/adjust/').then(resp => {
                    if (resp) {
                        this.salaryAdjusts = resp;
                        this.loading = false;
                    }
                }) 
            },
            showDialog(data) {
                this.salaryAdjustDialogVisible = true;
                Object.assign(this.salaryAdjust, data);
            },
            updateSalaryAdjust() {
                this.putRequest('/salary/adjust/', this.salaryAdjust).then(resp => {
                    if (resp) {
                        this.initSalaryAdjust();
                        this.salaryAdjustDialogVisible = false;
                    }
                })
            },
            handleDelete(data) {
                this.$confirm('此操作将永久删除 [ ' + data.name + ' ] 调薪记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest('/salary/adjust/' + data.id).then(resp => {
                            if (resp) {
                                this.initSalaryAdjust();
                            }
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            deleteSalaryAdjusts() {
                this.$confirm('此操作将永久删除 [ ' + this.multipleSelection.length + ' ] 条调薪记录数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = "?";
                    this.multipleSelection.forEach(item => {
                        ids += 'ids=' + item.id + '&';
                    })
                    this.deleteRequest('/salary/adjust/' + ids).then(resp => {
                        if (resp) {
                            this.initSalaryAdjust();
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
        },
    }
</script>
         
<style>
    .el-tag {
        margin-right: 10px;
    }
</style>