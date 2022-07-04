<template>
    <div>
        <div>
            <el-table 
                class="empRemoveTable" 
                :data="empRemoves" 
                stripe 
                height="480" 
                v-loading="loading"
                style="width: 100%; margin-top: 40px">
                <el-table-column align="center" prop="employee.name" label="员工姓名" width="150"></el-table-column>
                <el-table-column align="center" prop="department.name" label="调动后部门" width="150"></el-table-column>
                <el-table-column align="center" prop="position.name" label="调动后职位" width="150"></el-table-column>
                <el-table-column align="center" prop="removeDate" label="调动时间" width="200"></el-table-column>
                <el-table-column align="center" prop="reason" label="调动原因" width="200"></el-table-column>
                <el-table-column align="center" prop="remark" label="备注" width="150"></el-table-column>
                <el-table-column align="center" label="操作" width="250">
                    <template slot-scope="scope">
                        <el-button size="small" type="info" @click="showDialog(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
            title="调动岗位"
            :visible.sync="dialogVisible"
            width="40%">
            <el-form ref="removeForm" :model="empRemove" label-width="100px">
                <el-form-item label="员工">
                    <el-tag>{{empRemove.employee.name}}</el-tag>
                </el-form-item>
                <el-form-item label="调动后部门" prop="afterDepId">
                    <el-popover
                        placement="top"
                        title="选择部门"
                        width="220"
                        trigger="manual"
                        v-model="afterDepartVisible">
                        <el-button class="deptButton" slot="reference" @click="afterDepartVisible = !afterDepartVisible" plain icon="el-icon-coordinate">
                            <span v-if="!inputDept" style="color: #c0c4cc">请选择所属部门</span>
                            {{inputDept}}
                        </el-button>
                        <el-tree :data="depts" :props="defaultProps" :expand-on-click-node="false" :default-expand-all="true" @node-click="handleNodeClick"></el-tree>
                    </el-popover>
                </el-form-item>
                <el-form-item label="调动后职位" prop="afterPosId">
                    <el-select size="small" v-model="empRemove.afterPosId" clearable placeholder="请选择职位">
                        <el-option
                            v-for="item in positions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="调动日期" prop="removeDate">
                    <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="empRemove.removeDate"></el-date-picker>
                </el-form-item>
                <el-form-item label="调动原因" prop="reason">
                    <el-input style="width: 400px" type="textarea" maxlength="50" show-word-limit v-model="empRemove.reason"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input style="width: 400px" type="textarea" maxlength="30" show-word-limit v-model="empRemove.remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateEmpRemove()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
           
<script>
    export default {
        name: 'PerMv',
        data() {
            return {
                empRemoves: [],
                empRemove: {
                    id: null,
                    eid: null,
                    eName: '',
                    afterDepId: null,
                    afterPosId: null,
                    removeDate: null,
                    employee: {
                        name: '',
                    },
                    reason: '',
                    remark: '',
                },
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                depts: [],
                positions: [],
                inputDept: '',
                dialogVisible: false,
                afterDepartVisible: false,
                loading: false,
            }
        },
        mounted() {
            this.initEmpRemove();
            this.initPostions();
            this.initDepts();
        },
        methods: {
            initEmpRemove() {
                this.loading = true;
                this.getRequest('/employee/remove/').then(resp => {
                    if (resp) {
                        this.empRemoves = resp;
                        this.loading = false;
                    }
                })
            },
            initPostions() {
                this.getRequest('/employee/basic/position').then(resp => {
                    if (resp) {
                        this.positions = resp;
                    }
                })
            },
            initDepts() {
                if (!window.sessionStorage.getItem('depts')) {
                    this.getRequest('/employee/basic/department').then(resp => {
                        if (resp) {
                            this.depts = resp;
                            window.sessionStorage.setItem('depts', JSON.stringify(resp));
                        }
                    })
                } else {
                    this.depts = JSON.parse(window.sessionStorage.getItem('depts'));
                }
            },
            showDialog(data) {
                Object.assign(this.empRemove, data);
                this.inputDept = data.department.name;
                this.dialogVisible = true;
            },
            updateEmpRemove() {
                this.putRequest('/employee/remove/', this.empRemove).then(resp => {
                    if (resp) {
                        this.initEmpRemove();
                        this.dialogVisible = false;
                    }
                })
            },
            handleNodeClick(data) {
                this.inputDept = data.name;
                this.empRemove.afterDepId = data.id;
                this.afterDepartVisible = false;
            },
        },
    }
</script>
         
<style>
    .deptButton {
        width: 190px;
        height: 32px;
        font-size: 13px;
        text-align: left;
        padding: 0 20px;
    }

    .deptButton:hover {
        border: 1px solid #C0C4CC !important;
    }
</style>