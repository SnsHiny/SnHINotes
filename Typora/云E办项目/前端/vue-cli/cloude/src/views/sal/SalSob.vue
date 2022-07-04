<template>
    <div>
        <div class="addSalary">
            <el-button icon="el-icon-plus" @click="showAddSalaryDialog()">添加账套工资</el-button>
            <el-button type="success" icon="el-icon-refresh" @click="initSalaries()">刷新</el-button>
        </div>
        <div>
            <el-table 
                class="salaryTable" 
                :data="salaries" 
                stripe 
                v-loading="loading"
                height="480" 
                @selection-change="handleSelectionChange" 
                style="line-height: 0px; width: 100%">
                <el-table-column align="center" type="selection" width="55"></el-table-column>
                <el-table-column align="center" prop="name" label="账套名称" width="180" fixed="left"></el-table-column>
                <el-table-column align="center" prop="basicSalary" label="基本工资" width="100"></el-table-column>
                <el-table-column align="center" prop="bonus" label="奖金" width="100"></el-table-column>
                <el-table-column align="center" prop="lunchSalary" label="午餐补助" width="100"></el-table-column>
                <el-table-column align="center" prop="trafficSalary" label="交通补助" width="100"></el-table-column>
                <el-table-column align="center" prop="createDate" label="启用时间" width="180"></el-table-column>
                <el-table-column align="center" label="养老金">
                    <el-table-column align="center" prop="pensionBase" label="基数" width="100"></el-table-column>
                    <el-table-column align="center" prop="pensionPer" label="比率" width="100"></el-table-column>
                </el-table-column>
                <el-table-column align="center" label="医疗保险">
                    <el-table-column align="center" prop="medicalBase" label="基数" width="100"></el-table-column>
                    <el-table-column align="center" prop="medicalPer" label="比率" width="100"></el-table-column>
                </el-table-column>
                <el-table-column align="center" label="公积金">
                    <el-table-column align="center" prop="accumulationFundBase" label="基数" width="100"></el-table-column>
                    <el-table-column align="center" prop="accumulationFundPer" label="比率" width="100"></el-table-column>
                </el-table-column>
                <el-table-column align="center" label="操作" width="220" fixed="right">
                    <template slot-scope="scope">
                        <el-button size="mini" type="info" @click="showUpdateSalaryDialog(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
            :title="salaryTitle"
            :visible.sync="dialogVisible"
            style="line-height: 0px; margin-top: 0vh;"
            width="50%">
            <div class="salaryStep">
                <el-steps :space="38" direction="vertical" :active="activeItemIndex">
                    <el-step :title="item" v-for="(item, index) in salaryItems" :key="index"></el-step>
                </el-steps>
                <el-input 
                    :style="'height: 40px; position: relative; top: ' + index * 37 + 'px;'" 
                    v-model="salary[title]"
                    :placeholder="'请输入' + salaryItems[index] + '...'" 
                    v-show="activeItemIndex == index" 
                    v-for="(value, title, index) in salary" 
                    :key="index" style="width: 200px">
                </el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button :disabled="preStepDisabled" @click="preStep()">上一步</el-button>
                <el-button type="primary" @click="nextStep()">{{this.activeItemIndex == this.salaryItems.length - 1? '完 成': '下一步'}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>
           
<script>
    export default {
        name: 'SalSob',
        data() {
            return {
                salaries: [],
                multipleSelection: [],
                dialogVisible: false,
                activeItemIndex: 0,
                preStepDisabled: false,
                salaryTitle: '',
                loading: false,
                salaryItems: [
                    '账套名称',
                    '基本工资',
                    '奖金',
                    '午餐补助',
                    '交通补助',
                    '养老金基数',
                    '养老金比率',
                    '医疗保险基数',
                    '医疗保险比率',
                    '公积金基数',
                    '公积金比率',
                ],
                salary: {
                    name: '',
                    basicSalary: 0,
                    bonus: 0,
                    lunchSalary: 0,
                    trafficSalary: 0,
                    pensionBase: 0,
                    pensionPer: 0,
                    medicalBase: 0,
                    medicalPer: 0,
                    accumulationFundBase: 0,
                    accumulationFundPer: 0,
                },
            }
        },
        mounted() {
            this.initSalaries();
        },
        methods: {
            initSalaries() {
                this.loading = true;
                this.getRequest('/salary/sob/').then(resp => {
                    if (resp) {
                        this.salaries = resp;
                        this.loading = false;
                    }
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            showAddSalaryDialog() {
                this.salaryTitle = '添加工资账套';
                this.salary= {
                    name: '',
                    basicSalary: 0,
                    bonus: 0,
                    lunchSalary: 0,
                    trafficSalary: 0,
                    pensionBase: 0,
                    pensionPer: 0,
                    medicalBase: 0,
                    medicalPer: 0,
                    accumulationFundBase: 0,
                    accumulationFundPer: 0,
                };
                this.activeItemIndex = 0;
                this.dialogVisible = true;
            },
            showUpdateSalaryDialog(data) {
                this.salaryTitle = '编辑工资账套';
                this.salary.id = data.id;
                this.salary.name =  data.name;
                this.salary.basicSalary =  data.basicSalary;
                this.salary.bonus =  data.bonus;
                this.salary.lunchSalary =  data.lunchSalary;
                this.salary.trafficSalary =  data.trafficSalary;
                this.salary.pensionBase =  data.pensionBase;
                this.salary.pensionPer =  data.pensionPer;
                this.salary.medicalBase =  data.medicalBase;
                this.salary.medicalPer =  data.medicalPer;
                this.salary.accumulationFundBase =  data.accumulationFundBase;
                this.salary.accumulationFundPer =  data.accumulationFundPer;
                this.activeItemIndex = 0;
                this.dialogVisible = true;
            },
            handleDelete(data) {
                this.$confirm('此操作将永久删除 [ ' + data.name + ' ] 账套信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest('/salary/sob/' + data.id).then(resp => {
                            if (resp) {
                                this.initSalaries();
                            }
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            preStep() {
                if (this.activeItemIndex == 1) {
                    this.activeItemIndex--;
                    this.preStepDisabled = true;
                } else {
                    this.preStepDisabled = false;
                    this.activeItemIndex--;
                }
            },
            nextStep() {
                if (this.activeItemIndex == this.salaryItems.length - 1) {
                    if (this.salary.id) {
                        this.putRequest('/salary/sob/', this.salary).then(resp => {
                            if (resp) {
                                this.initSalaries();
                                this.dialogVisible = false;
                            }
                        })
                    } else {
                        this.postRequest('/salary/sob/', this.salary).then(resp => {
                            if (resp) {
                                this.initSalaries();
                                this.dialogVisible = false;
                            }
                        })
                    }
                } else {
                    this.preStepDisabled = false;
                    this.activeItemIndex++;
                }
            },
        },
    }
</script>
         
<style>
    .addSalary {
        display: flex;
        justify-content: space-between;
        margin: 20px 0 10px;
    }

    .el-dialog__body {
        padding: 10px 20px;
    }

    .salaryStep {
        display: flex;
        justify-content: space-around;
    }
</style>