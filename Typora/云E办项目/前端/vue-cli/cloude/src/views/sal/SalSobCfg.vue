<template>
    <div>
        <el-table 
            class="SalSobCfgTable" 
            :data="emps" 
            stripe 
            v-loading="loading"
            height="450" 
            @selection-change="handleSelectionChange" 
            style="width: 100%; margin-top: 30px">
            <el-table-column align="center" type="selection" width="55"></el-table-column>
            <el-table-column align="center" prop="name" label="姓名" width="120" fixed="left"></el-table-column>
            <el-table-column align="center" prop="workID" label="工号" width="120"></el-table-column>
            <el-table-column align="center" prop="email" label="邮箱" width="240"></el-table-column>
            <el-table-column align="center" prop="phone" label="电话号码" width="180"></el-table-column>
            <el-table-column align="center" prop="department.name" label="所属部门" width="120"></el-table-column>
            <el-table-column align="center" label="工资账套" width="200">
                <template slot-scope="scope">
                    <el-tooltip placement="right" v-if="scope.row.salary">
                        <div slot="content">
                            <p>基本工资：{{scope.row.salary.basicSalary}}</p>
                            <p>奖金：{{scope.row.salary.bonus}}</p>
                            <p>午餐补助：{{scope.row.salary.lunchSalary}}</p>
                            <p>交通补助：{{scope.row.salary.trafficSalary}}</p>
                            <p>养老金基数：{{scope.row.salary.pensionBase}}</p>
                            <p>养老金比率：{{scope.row.salary.pensionPer}}</p>
                            <p>医疗保险基数：{{scope.row.salary.medicalBase}}</p>
                            <p>医疗保险比率：{{scope.row.salary.medicalPer}}</p>
                            <p>公积金基数：{{scope.row.salary.accumulationFundBase}}</p>
                            <p>公积金比率：{{scope.row.salary.accumulationFundPer}}</p>
                        </div>
                        <el-tag>{{scope.row.salary.name}}</el-tag>
                    </el-tooltip>
                    <el-tag v-else>暂未设置</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="160">
                <template slot-scope="scope">
                    <el-popover
                        placement="left"
                        width="300"
                        trigger="click"
                        @show="showUpdateSalSobCfgDialog(scope.row.salary)"
                        @hide="updateSalCobCfg(scope.row)">
                        <el-select @change="changeFlag()"  style="width: 280px" v-model="selectedSalary" placeholder="请选择...">
                            <el-option
                            v-for="item in salaries"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                            :disabled="item.name == selectedSalaryName">
                            </el-option>
                        </el-select>
                        <el-button size="mini" slot="reference">编辑</el-button>
                    </el-popover>
                </template>
            </el-table-column>
        </el-table>
        <div class="pages">
            <el-pagination
                background
                @current-change="currentChange"
                @size-change="sizeChange"
                layout="sizes, prev, pager, next, jumper, ->, total, slot"
                :total="totals">
            </el-pagination>
        </div>
    </div>
</template>
           
<script>
    export default {
        name: 'SalSobCfg',
        data() {
            return {
                emps: [],
                loading: false,
                currentPage: 1,
                size: 10,
                totals: 0,
                handleSelectionChange: [],
                keyWord: '',
                salaries: [],
                selectedSalary: null,
                selectedSalaryName: '',
                flag: false,
            }
        },
        mounted() {
            this.initEmps();
        },
        methods: {
            initEmps() {
                this.loading = true;
                this.getRequest('/salary/sobcfg/?currentPage=' + this.currentPage + '&size=' + this.size).then(resp => {
                    if (resp) {
                        this.emps = resp.data;
                        this.loading = false;
                        this.totals = resp.total;
                    }
                })
            },
            currentChange(currentPage) {
                this.currentPage = currentPage;
                this.initEmps();
            },
            sizeChange(size) {
                this.size = size;
                this.initEmps();
            },
            initSalaries() {
                this.getRequest('/salary/sobcfg/salaries').then(resp => {
                    if (resp) {
                        this.salaries = resp;
                    }
                })
            },
            showUpdateSalSobCfgDialog(data) {
                this.initSalaries();
                this.selectedSalary = null;
                if (data) {
                    this.selectedSalary = data.id;
                    this.selectedSalaryName = data.name;
                }
            },
            changeFlag() {
                this.flag = true;
            },
            updateSalCobCfg(data) {
                if (this.selectedSalary && this.flag) {
                    this.putRequest('/salary/sobcfg/?eid=' + data.id + '&sid=' + this.selectedSalary).then(resp => {
                        if (resp) {
                            this.initEmps();
                        }
                    })
                }
                this.flag = false;
            },
        },
    }
</script>
         
<style>
    .pages {
        margin-top: 15px;
        margin-bottom: -12px;
        line-height: 0px;
        display: flex;
        justify-content: flex-end;
    }
</style>