<template>
    <div>
        <div class="adminSearch">
            <div>
                <el-input
                    style="width: 600px; margin: 20px 10px"
                    placeholder="输入员工姓名进行搜索..."
                    prefix-icon="el-icon-search"
                    v-model="keyWord"
                    :disabled="advancedSearchVisible"
                    @keydown.enter.native="searchEmp()">
                    <el-button :disabled="advancedSearchVisible" slot="append" icon="el-icon-search" @click="searchEmp()">搜索</el-button>
                </el-input>
                <el-popover
                    placement="bottom"
                    width="1220"
                    trigger="manual"
                    :offset="-50"
                    v-model="advancedSearchVisible">
                    <el-button slot="reference" @click="showAdvancedSearchVisible()">
                        <i class="fa fa-angle-double-down" aria-hidden="true"></i>高级搜索
                    </el-button>
                    <div class="advancedSearch">
                        <el-row>
                            <el-col :span="6">
                                <span class="title">民族：</span>
                                <el-select size="small" v-model="empByCondition.nationId" clearable placeholder="请选择民族">
                                    <el-option
                                        v-for="item in nations"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                                <span class="title">政治面貌：</span>
                                <el-select size="small" v-model="empByCondition.politicId" clearable placeholder="请选择政治面貌">
                                    <el-option
                                        v-for="item in politicsStatus"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="6">
                                <span class="title">所属部门：</span>
                                <el-popover
                                    placement="top"
                                    title="选择部门"
                                    width="220"
                                    trigger="manual"
                                    v-model="advancedDeptSearchVisible">
                                    <el-button class="deptButton" slot="reference" @click="advancedDeptSearchVisible = !advancedDeptSearchVisible" plain icon="el-icon-coordinate">
                                        <span v-if="!inputDept" style="color: #c0c4cc">请选择所属部门</span>
                                        {{inputDept}}
                                    </el-button>
                                    <el-tree :data="depts" :props="defaultProps" :expand-on-click-node="false" :default-expand-all="true" @node-click="advancedHandleNodeClick"></el-tree>
                                </el-popover>
                                <span class="title">聘用形式：</span>
                                <el-radio-group v-model="empByCondition.engageForm">
                                    <el-radio label="劳动合同">劳动合同</el-radio>
                                    <el-radio label="劳务合同">劳务合同</el-radio>
                                </el-radio-group>
                            </el-col>
                            <el-col :span="7">
                                <span class="title">职位：</span>
                                <el-select size="small" v-model="empByCondition.posId" clearable placeholder="请选择职位">
                                    <el-option
                                        v-for="item in positions"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                                <span class="title">入职日期：</span>
                                <el-date-picker
                                    style="width: 260px"
                                    size="small"
                                    v-model="empByCondition.beginDateScope"
                                    value-format="yyyy-MM-dd"
                                    unlink-panels
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                            </el-col>
                            <el-col :span="5">
                                <span>职称：</span>
                                <el-select size="small" v-model="empByCondition.jobLevelId" clearable placeholder="请选择职称">
                                    <el-option
                                        v-for="item in jobLevels"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                                <span style="margin-left: 50px">
                                    <el-button style="margin-right: 20px" size="small" @click="advancedSearchVisible = false">取 消</el-button>
                                    <el-button size="small" type="primary" @click="advancedSearch()">搜 索</el-button>
                                </span>
                            </el-col>
                        </el-row>
                    </div>
                </el-popover>
            </div>
            <div class="addEmp">
                <el-upload
                    style="display: inline-flex;margin: 0 10px"
                    :before-upload="beforeUpload"
                    :show-file-list="false"	
                    :headers="headers"
                    :on-success="onSuccess"
                    :on-error="onError"
                    action="/employee/basic/import">
                    <el-button type="success">
                        <i class="fa fa-level-up" aria-hidden="true">导入数据</i>
                    </el-button>
                </el-upload>
                <el-button type="success">
                    <i class="fa fa-level-down" aria-hidden="true" @click="exportEmpInfo()">导出数据</i>
                </el-button>
                <el-button type="primary" icon="el-icon-plus" @click="showAddEmpDialog()">新增员工</el-button>
            </div>
        </div>
        <div>
            <el-table 
                class="empTable" 
                :data="emps.data" 
                stripe 
                v-loading="loading"
                height="450" 
                @selection-change="handleSelectionChange" 
                style="width: 100%">
                <el-table-column align="center" type="selection" width="55"></el-table-column>
                <el-table-column align="center" prop="name" label="姓名" width="100" fixed="left"></el-table-column>
                <el-table-column align="center" prop="gender" label="性别" width="55"></el-table-column>
                <el-table-column align="center" prop="birthday" label="出生日期" width="120"></el-table-column>
                <el-table-column align="center" prop="idCard" label="身份证号" width="200"></el-table-column>
                <el-table-column align="center" prop="wedlock" label="婚姻状况" width="70"></el-table-column>
                <el-table-column align="center" prop="nation.name" label="民族" width="70"></el-table-column>
                <el-table-column align="center" prop="nativePlace" label="籍贯" width="100"></el-table-column>
                <el-table-column align="center" prop="politicsStatus.name" label="政治面貌" width="120"></el-table-column>
                <el-table-column align="center" prop="email" label="邮箱" width="210"></el-table-column>
                <el-table-column align="center" prop="phone" label="电话号码" width="150"></el-table-column>
                <el-table-column align="center" prop="address" label="联系地址" width="300"></el-table-column>
                <el-table-column align="center" prop="department.name" label="所属部门" width="100"></el-table-column>
                <el-table-column align="center" prop="joblevel.name" label="职称" width="70"></el-table-column>
                <el-table-column align="center" prop="position.name" label="职位" width="100"></el-table-column>
                <el-table-column align="center" prop="engageForm" label="聘用形式" width="100"></el-table-column>
                <el-table-column align="center" prop="tiptopDegree" label="最高学历" width="70"></el-table-column>
                <el-table-column align="center" prop="specialty" label="所属专业" width="150"></el-table-column>
                <el-table-column align="center" prop="school" label="毕业院校" width="150"></el-table-column>
                <el-table-column align="center" prop="beginDate" label="入职日期" width="120"></el-table-column>
                <el-table-column align="center" prop="workState" label="在职状态" width="70"></el-table-column>
                <el-table-column align="center" prop="workID" label="工号" width="100"></el-table-column>
                <el-table-column align="center" label="合同期限" width="70">
                    <template slot-scope="scope">
                        <span>{{scope.row.contractTerm}}</span>&nbsp;年
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="conversionTime" label="转正日期" width="120"></el-table-column>
                <el-table-column align="center" prop="notWorkDate" label="离职日期" width="120"></el-table-column>
                <el-table-column align="center" prop="beginContract" label="合同起始日期" width="120"></el-table-column>
                <el-table-column align="center" prop="endContract" label="合同终止日期" width="120"></el-table-column>
                <el-table-column align="center" label="操作" width="260" fixed="right">
                    <template slot-scope="scope">
                        <el-button size="mini" type="info" @click="showUpdateEmpDialog(scope.row)">编辑</el-button>
                        <el-dropdown 
                            size="mini"
                            split-button
                            placement="bottom"
                            style="margin: 0 10px"
                            @command="handleCommand">
                            管理
                            <el-dropdown-menu style="width: 150px; text-align: center;" slot="dropdown">
                                <el-dropdown-item :command="commandValue('employeeEc', scope.row)">奖励/处罚</el-dropdown-item>
                                <el-dropdown-item :command="commandValue('employeeTrain', scope.row)">参加培训</el-dropdown-item>
                                <el-dropdown-item :command="commandValue('salaryAdjust', scope.row)">调整薪资</el-dropdown-item>
                                <el-dropdown-item :command="commandValue('employeeRemove', scope.row)">调动岗位</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
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
        <el-dialog :title="title" :visible.sync="dialogVisible" width="80%">
            <el-form :rules="rules" ref="empForm" :model="emp" label-width="100px">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="姓名：" prop="name">
                            <el-input style="width: 190px" v-model="emp.name" placeholder="员工姓名" prefix-icon="el-icon-user" size="small"></el-input>
                        </el-form-item>
                        <el-form-item label="出生日期：" prop="birthday">
                            <el-date-picker
                                v-model="emp.birthday"
                                value-format="yyyy-MM-dd"
                                style="width: 190px"
                                type="date"
                                size="small"
                                placeholder="出生日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="籍贯：" prop="nativePlace">
                            <el-input style="width: 190px" v-model="emp.nativePlace" placeholder="籍贯" prefix-icon="el-icon-location-outline" size="small"></el-input>
                        </el-form-item>
                        <el-form-item label="入职日期：" prop="beginDate">
                            <el-date-picker
                                v-model="emp.beginDate"
                                value-format="yyyy-MM-dd"
                                type="date"
                                style="width: 190px"
                                size="small"
                                placeholder="入职日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="所属部门：" prop="departmentId">
                            <el-popover
                                placement="top"
                                title="选择部门"
                                width="220"
                                trigger="manual"
                                v-model="departVisible">
                                <el-button class="deptButton" slot="reference" @click="departVisible = !departVisible" plain icon="el-icon-coordinate">
                                    <span v-if="!inputDept" style="color: #c0c4cc">请选择所属部门</span>
                                    {{inputDept}}
                                </el-button>
                                <el-tree :data="depts" :props="defaultProps" :expand-on-click-node="false" :default-expand-all="true" @node-click="handleNodeClick"></el-tree>
                            </el-popover>
                        </el-form-item>
                        <el-form-item label="最高学历：" prop="tiptopDegree">
                            <el-select size="small" v-model="emp.tiptopDegree" clearable placeholder="请选择最高学历">
                                <el-option
                                    v-for="item in tiptopDegree"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="性别：" prop="gender">
                            <el-radio-group v-model="emp.gender">
                                <el-radio label="男">男</el-radio>
                                <el-radio label="女">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="政治面貌：" prop="politicId">
                            <el-select size="small" v-model="emp.politicId" clearable placeholder="请选择政治面貌">
                                <el-option
                                    v-for="item in politicsStatus"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="婚姻状况：" prop="wedlock">
                            <el-radio-group v-model="emp.wedlock">
                                <el-radio label="已婚">已婚</el-radio>
                                <el-radio label="未婚">未婚</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="转正日期：" prop="conversionTime">
                            <el-date-picker
                                v-model="emp.conversionTime"
                                value-format="yyyy-MM-dd"
                                type="date"
                                size="small"
                                style="width: 145px"
                                placeholder="转正日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="职位：" prop="posId">
                            <el-select size="small" v-model="emp.posId" clearable placeholder="请选择职位">
                                <el-option
                                    v-for="item in positions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="毕业院校：" prop="school">
                            <el-input v-model="emp.school" placeholder="毕业院校" prefix-icon="el-icon-school" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="电话号码：" prop="phone">
                            <el-input style="width: 220px;" v-model="emp.phone" placeholder="电话号码" prefix-icon="el-icon-phone-outline" size="small"></el-input>
                        </el-form-item>
                        <el-form-item label="民族：" prop="nationId">
                            <el-select style="width: 220px;" size="small" v-model="emp.nationId" clearable placeholder="请选择民族">
                                <el-option
                                    v-for="item in nations"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="联系地址：" prop="address">
                            <el-input style="width: 220px;" v-model="emp.address" placeholder="联系地址" prefix-icon="el-icon-position" size="small"></el-input>
                        </el-form-item>
                        <el-form-item label="合同起始：" prop="beginContract">
                            <el-date-picker
                                v-model="emp.beginContract"
                                value-format="yyyy-MM-dd"
                                type="date"
                                style="width: 220px"
                                size="small"
                                placeholder="合同起始日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="职称：" prop="jobLevelId">
                            <el-select style="width: 220px;" size="small" v-model="emp.jobLevelId" clearable placeholder="请选择职称">
                                <el-option
                                    v-for="item in jobLevels"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所属专业：" prop="specialty">
                            <el-input style="width: 220px;" v-model="emp.specialty" placeholder="所属专业" prefix-icon="el-icon-notebook-2" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="身份证号：" prop="idCard">
                            <el-input v-model="emp.idCard" placeholder="身份证号" prefix-icon="el-icon-postcard" size="small"></el-input>
                        </el-form-item>
                        
                        <el-form-item label="邮箱：" prop="email">
                            <el-input v-model="emp.email" placeholder="邮箱" prefix-icon="el-icon-message" size="small"></el-input>
                        </el-form-item>
                        <el-form-item label="聘用形式：" prop="engageForm">
                            <el-radio-group v-model="emp.engageForm">
                                <el-radio label="劳动合同">劳动合同</el-radio>
                                <el-radio label="劳务合同">劳务合同</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="合同终止：" prop="endContract">
                            <el-date-picker
                                v-model="emp.endContract"
                                value-format="yyyy-MM-dd"
                                style="width: 195px"
                                type="date"
                                size="small"
                                placeholder="合同终止日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="工号：" prop="workID">
                            <el-input v-model="emp.workID" placeholder="工号" prefix-icon="el-icon-bank-card" size="small" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addEmp()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="参加培训"
            :visible.sync="trainDialogVisible"
            width="40%">
            <el-form ref="trainForm" :model="empTrain" label-width="100px">
                <el-form-item label="员工">
                    <el-tag>{{emp.name}}</el-tag>
                </el-form-item>
                <el-form-item label="开始时间">
                    <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="empTrain.trainDate"></el-date-picker>
                </el-form-item>
                <el-form-item label="培训内容">
                    <el-input style="width: 400px" type="textarea" maxlength="50" show-word-limit v-model="empTrain.trainContent"></el-input>
                </el-form-item>
                <el-form-item label="完成培训">
                    <el-switch
                        v-model="empTrain.remark"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="trainDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addEmpTrain()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="奖励/处罚"
            :visible.sync="EcDiologVisible"
            width="40%">
            <el-form ref="EcForm" :model="empEc" label-width="100px">
                <el-form-item label="员工">
                    <el-tag>{{emp.name}}</el-tag>
                </el-form-item>
                <el-form-item label="奖惩时间">
                    <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="empEc.ecDate"></el-date-picker>
                </el-form-item>
                <el-form-item label="奖惩原因">
                    <el-input style="width: 400px" type="textarea" maxlength="50" show-word-limit v-model="empEc.ecReason"></el-input>
                </el-form-item>
                <el-form-item label="奖惩金额">
                    <el-input-number v-model="empEc.ecPoint" :min="100" :max="1000" :step="100" label="奖惩金额"></el-input-number>
                </el-form-item>
                <el-form-item label="奖惩类型">
                    <el-radio-group v-model="empEc.ecType" :fill="radioColor" @change="radioChange()" size="small">
                        <el-radio-button :label="0" border size="medium">奖金</el-radio-button>
                        <el-radio-button :label="1" border size="medium">罚金</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input style="width: 400px" type="textarea" maxlength="30" show-word-limit v-model="empEc.remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="EcDiologVisible = false">取 消</el-button>
                <el-button type="primary" @click="addEmpEc()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="调整薪资"
            :visible.sync="salaryAdjustDialogVisible"
            width="40%">
            <el-form ref="salaryAdjustForm" :model="salaryAdjust" label-width="100px">
                <el-form-item label="员工">
                    <el-tag>{{emp.name}}</el-tag>
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
                <el-button type="primary" @click="addSalaryAdjust()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="调动岗位"
            :visible.sync="removeDialogVisible"
            width="40%">
            <el-form ref="removeForm" :model="empRemove" label-width="100px">
                <el-form-item label="员工">
                    <el-tag>{{emp.name}}</el-tag>
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
                <el-button @click="removeDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addEmpRemove()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
           
<script>
    export default {
        name: 'EmpBasic',
        data() {
            return {
                emps: {},
                keyWord: '',
                multipleSelection: [],
                loading: false,
                totals: 0,
                currentPage: 1,
                size: 10,
                title: '',
                emp: {
                    id: null,
                    name: '',
                    gender: '',
                    birthday: '',
                    idCard: '',
                    wedlock: '',
                    nationId: null,
                    nativePlace: '',
                    politicId: null,
                    email: '',
                    phone: '',
                    address: '',
                    departmentId: null,
                    jobLevelId: null,
                    posId: null,
                    engageForm: '',
                    tiptopDegree: '',
                    specialty: '',
                    school: '',
                    beginDate: '',
                    workState: '在职',
                    workID: '',
                    contractTerm: null,
                    conversionTime: '',
                    notWorkDate: null,
                    beginContract: '',
                    endContract: '',
                    workAge: null,
                    salaryId: null,
                },
                empByCondition: {
                    nationId: null,
                    politicId: null,
                    departmentId: null,
                    jobLevelId: null,
                    posId: null,
                    engageForm: '',
                    beginDateScope: null,
                },
                empTrain: {
                    id: null,
                    eid: null,
                    trainDate: null,
                    trainContent: '',
                    remark: false,
                },
                empEc: {
                    id: null,
                    eid: null,
                    ecDate: null,
                    ecReason: '',
                    ecPoint: 0,
                    ecType: 0,
                    remark: '',
                },
                salaryAdjust: {
                    id: null,
                    eid: null,
                    asDate: null,
                    beforeSalary: 0,
                    afterSalary: 0,
                    reason: '',
                    remark: '',
                },
                empRemove: {
                    id: null,
                    eid: null,
                    afterDepId: null,
                    afterPosId: null,
                    removeDate: null,
                    reason: '',
                    remark: '',
                },
                nations: [],
                politicsStatus: [],
                jobLevels: [],
                positions: [],
                departments: [],
                tiptopDegree: ['博士', '硕士', '本科', '大专', '高中', '初中', '小学', '其他'],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                depts: [],
                dialogVisible: false,
                departVisible: false,
                advancedSearchVisible: false,
                advancedDeptSearchVisible: false,
                PMVisible: false,
                trainDialogVisible: false,
                EcDiologVisible: false,
                salaryAdjustDialogVisible: false,
                removeDialogVisible: false,
                afterDepartVisible: false,
                inputDept: '',
                isAdvancedSearch: false,
                headers: {
                    token: window.sessionStorage.getItem('token')
                },
                rules: {
                    name: [{ required: true, message: '请输入员工姓名', trigger: 'blur' }],
                    gender: [{ required: true, message: '请选择员工性别', trigger: 'blur' }],
                    birthday: [{ required: true, message: '请选择出生日期', trigger: 'blur' }],
                    idCard: [
                        { required: true, message: '请输入身份证号', trigger: 'blur' },
                        { pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)/, message: '身份证号错误', trigger: 'blur' }
                    ],
                    wedlock: [{ required: true, message: '请选择婚姻状况', trigger: 'blur' }],
                    nationId: [{ required: true, message: '请选择民族', trigger: 'blur' }],
                    nativePlace: [{ required: true, message: '请输入籍贯', trigger: 'blur' }],
                    politicId: [{ required: true, message: '请选择政治面貌', trigger: 'blur' }],
                    email: [
                        { required: true, message: '请输入邮箱号', trigger: 'blur' },
                        { type:'email', message: '邮箱格式错误', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '请输入电话号码', trigger: 'blur' },
                        { pattern: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/, message: '电话号码错误', trigger: 'blur' }
                    ],
                    address: [{ required: true, message: '请输入联系地址', trigger: 'blur' }],
                    departmentId: [{ required: true, message: '请选择所属部门', trigger: 'blur' }],
                    jobLevelId: [{ required: true, message: '请选择员工职称', trigger: 'blur' }],
                    posId: [{ required: true, message: '请选择员工职位', trigger: 'blur' }],
                    engageForm: [{ required: true, message: '请选择聘用形式', trigger: 'blur' }],
                    tiptopDegree: [{ required: true, message: '请选择最高学历', trigger: 'blur' }],
                    specialty: [{ required: true, message: '请输入所属专业', trigger: 'blur' }],
                    school: [{ required: true, message: '请输入毕业院校', trigger: 'blur' }],
                    beginDate: [{ required: true, message: '请选择入职日期', trigger: 'blur' }],
                    conversionTime: [{ required: true, message: '请选择转正日期', trigger: 'blur' }],
                    beginContract: [{ required: true, message: '请选择合同起始日期', trigger: 'blur' }],
                    endContract: [{ required: true, message: '请选择合同截止日期', trigger: 'blur' }],
                },
            }
        },
        computed: {
            radioColor() {
                return this.empEc.ecType == 0 ? '#78e08f': '#ff6b6b';
            }
        },
        mounted() {
            this.initEmps();
            this.initData();
            this.initPostions();
        },
        watch: {
            dialogVisible: {
                handler(newValue) {
                    if (!newValue) {
                        this.departVisible = false;
                    } 
                }
            },
            removeDialogVisible: {
                handler(newValue) {
                    if (!newValue) {
                        this.afterDepartVisible = false;
                    }
                }
            },
        },
        methods: {
            currentChange(currentPage) {
                this.currentPage = currentPage;
                if (this.isAdvancedSearch) {
                    this.initEmps('advanced');
                } else {
                    this.initEmps();
                }
            },
            sizeChange(size) {
                this.size = size;
                if (this.isAdvancedSearch) {
                    this.initEmps('advanced');
                } else {
                    this.initEmps();
                }
            },
            initEmps(type) {
                this.loading = true;
                let url = '/employee/basic/?currentPage=' + this.currentPage + '&size=' + this.size;
                if (type && type == 'advanced') {
                    if (this.empByCondition.nationId) {
                        url += '&nationId=' + this.empByCondition.nationId;
                    }
                    if (this.empByCondition.politicId) {
                        url += '&politicId=' + this.empByCondition.politicId;
                    }
                    if (this.empByCondition.departmentId) {
                        url += '&departmentId=' + this.empByCondition.departmentId;
                    }
                    if (this.empByCondition.jobLevelId) {
                        url += '&jobLevelId=' + this.empByCondition.jobLevelId;
                    }
                    if (this.empByCondition.posId) {
                        url += '&posId=' + this.empByCondition.posId;
                    }
                    if (this.empByCondition.engageForm) {
                        url += '&engageForm=' + this.empByCondition.engageForm;
                    }
                    if (this.empByCondition.beginDateScope) {
                        url += '&beginDateScope=' + this.empByCondition.beginDateScope;
                    }
                } else {
                    url += '&name=' + this.keyWord;
                }
                this.getRequest(url).then(resp => {
                    if (resp) {
                        this.emps = resp;
                        this.loading = false;
                        this.totals = resp.total;
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
            initData() {
                if (!window.sessionStorage.getItem('nations')) {
                    this.getRequest('/employee/basic/nation').then(resp => {
                        if (resp) {
                            this.nations = resp;
                            window.sessionStorage.setItem('nations', JSON.stringify(resp));
                        }
                    })
                } else {
                    this.nations = JSON.parse(window.sessionStorage.getItem('nations'));
                }
                if (!window.sessionStorage.getItem('politicsStatus')) {
                    this.getRequest('/employee/basic/politicsStatus').then(resp => {
                        if (resp) {
                            this.politicsStatus = resp;
                            window.sessionStorage.setItem('politicsStatus', JSON.stringify(resp));
                        }
                    })
                } else {
                    this.politicsStatus = JSON.parse(window.sessionStorage.getItem('politicsStatus'));
                }
                if (!window.sessionStorage.getItem('jobLevels')) {
                    this.getRequest('/employee/basic/jobLevel').then(resp => {
                        if (resp) {
                            this.jobLevels = resp;
                            window.sessionStorage.setItem('jobLevels', JSON.stringify(resp));
                        }
                    })
                } else {
                    this.jobLevels = JSON.parse(window.sessionStorage.getItem('jobLevels'));
                }
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
            initMaxWorkId() {
                this.getRequest('/employee/basic/maxWorkID').then(resp => {
                    if (resp) {
                        this.emp.workID = resp;
                    }
                })
            },
            handleNodeClick(data) {
                this.inputDept = data.name;
                this.emp.departmentId = data.id;
                this.empRemove.afterDepId = data.id;
                this.departVisible = false;
                this.afterDepartVisible = false;
            },
            advancedHandleNodeClick(data) {
                this.inputDept = data.name;
                this.empByCondition.departmentId = data.id;
                this.advancedDeptSearchVisible = !this.advancedDeptSearchVisible;
            },
            searchEmp() {
                this.isAdvancedSearch = false;
                this.initEmps();
            },
            advancedSearch() {
                this.advancedSearchVisible = false;
                this.isAdvancedSearch = true;
                this.initEmps('advanced');
            },
            addEmp() {
                // 编辑员工信息
                if (this.emp.id) {
                    this.$refs['empForm'].validate((valid) => {
                        // 第一次登陆将后端传来的token存入本地存储中
                        if (valid) {
                            this.putRequest('/employee/basic/', this.emp).then(resp => {
                                this.dialogVisible = false;
                                if (resp) {
                                    this.isAdvancedSearch = false;
                                    this.initEmps();
                                }
                            })
                        } else {
                            this.$message.error('请填写完整员工信息！');
                            return false;
                        }
                    });
                // 新增员工
                } else {
                    this.$refs['empForm'].validate((valid) => {
                        // 第一次登陆将后端传来的token存入本地存储中
                        if (valid) {
                            this.postRequest('/employee/basic/', this.emp).then(resp => {
                                this.dialogVisible = false;
                                if (resp) {
                                    this.isAdvancedSearch = false;
                                    this.initEmps();
                                }
                            })
                        } else {
                            this.$message.error('请填写完整员工信息！');
                            return false;
                        }
                    });
                }
            },
            showAdvancedSearchVisible() {
                this.empByCondition= {
                    nationId: null,
                    politicId: null,
                    departmentId: null,
                    jobLevelId: null,
                    posId: null,
                    engageForm: '',
                    beginDateScope: null,
                },
                this.inputDept = '';
                this.advancedSearchVisible = !this.advancedSearchVisible;
            },
            showAddEmpDialog() {
                this.title = '添加员工';
                this.initMaxWorkId();
                this.emp = {
                    id: null,
                    name: '',
                    gender: '',
                    birthday: '',
                    idCard: '',
                    wedlock: '',
                    nationId: null,
                    nativePlace: '',
                    politicId: null,
                    email: '',
                    phone: '',
                    address: '',
                    departmentId: null,
                    jobLevelId: null,
                    posId: null,
                    engageForm: '',
                    tiptopDegree: '',
                    specialty: '',
                    school: '',
                    beginDate: '',
                    workState: '在职',
                    workID: '',
                    contractTerm: null,
                    conversionTime: '',
                    notWorkDate: null,
                    beginContract: '',
                    endContract: '',
                    workAge: null,
                    salaryId: null,
                }
                this.inputDept = '';
                this.dialogVisible = true;
            },
            showUpdateEmpDialog(data) {
                this.title = '编辑员工';
                Object.assign(this.emp, data);
                this.inputDept = data.department.name;
                this.dialogVisible = true;
            },
            commandValue(command, data) {
                return {
                    'command': command,
                    'data': data,
                }
            },
            handleCommand(parm) {
                const {command, data} = parm;
                if (command == "employeeEc") {
                    this.empEc = {
                        id: null,
                        eid: null,
                        ecDate: null,
                        ecReason: '',
                        ecPoint: 0,
                        ecType: 0,
                        remark: '',
                    },
                    this.empEc.eid = data.id;
                    this.EcDiologVisible = true;
                } else if (command == "employeeTrain") {
                    this.empTrain = {
                        id: null,
                        eid: null,
                        trainDate: null,
                        trainContent: '',
                        remark: false,
                    }
                    this.empTrain.eid = data.id;
                    this.trainDialogVisible = true;
                } else if (command == "salaryAdjust") {
                    this.salaryAdjust = {
                        id: null,
                        eid: null,
                        asDate: null,
                        beforeSalary: 0,
                        afterSalary: 0,
                        reason: '',
                        remark: '',
                    }
                    this.salaryAdjust.eid = data.id;
                    this.salaryAdjustDialogVisible = true;
                } else if (command == "employeeRemove") {
                    this.empRemove = {
                        id: null,
                        eid: null,
                        afterDepId: null,
                        afterPosId: null,
                        removeDate: null,
                        reason: '',
                        remark: '',
                    }
                    this.inputDept = '';
                    this.empRemove.eid = data.id;
                    this.removeDialogVisible = true;
                }
                this.emp.name = data.name;
            },
            addEmpTrain() {
                if (this.empTrain.trainDate && this.empTrain.trainContent) {
                    this.postRequest('/employee/train/', this.empTrain).then(resp=> {
                        if(resp) {
                            this.$router.push('/per/train');
                        }
                    })
                } else {
                    this.$message.error('培训信息不完整！');
                }
            },
            addEmpEc() {
                if (this.empEc.ecDate && this.empEc.ecReason) {
                    this.postRequest('/employee/ec/', this.empEc).then(resp => {
                        if (resp) {
                            this.$router.push('/per/ec');
                        }
                    })
                } else {
                    this.$message.error('奖惩信息不完整！');
                }
            },
            addSalaryAdjust() {
                if (this.salaryAdjust.asDate && this.salaryAdjust.reason) {
                    this.postRequest('/salary/adjust/', this.salaryAdjust).then(resp => {
                        if (resp) {
                            this.$router.push('/per/salary');
                        }
                    })
                } else {
                    this.$message.error('调薪信息不完整！');
                }
            },
            addEmpRemove() {
                if (this.empRemove.removeDate && this.empRemove.reason && this.empRemove.afterDepId && this.empRemove.afterPosId) {
                    this.postRequest('/employee/remove/', this.empRemove).then(resp => {
                        if (resp) {
                            this.$router.push('/per/mv');
                        }
                    })
                } else {
                    this.$message.error('调岗信息不完整！');
                }
            },
            handleDelete(data) {
                this.$confirm('此操作将永久删除 [ ' + data.name + ' ] 员工, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest('/employee/basic/' + data.id).then(resp => {
                            if (resp) {
                                this.isAdvancedSearch = false;
                                this.initEmps();
                            }
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            exportEmpInfo() {
                this.downloadRequest('/employee/basic/export');
            },
            beforeUpload() {
                this.loading = true;
            },
            onSuccess() {
                this.isAdvancedSearch = false;
                this.initEmps();
                this.loading = false;
            },
            onError() {
                this.$message.error('导入失败！');
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
    .adminSearch {
        display: flex; 
        justify-content: space-between;
    }

    .addEmp {
        margin-top: -35px;
    }

    .el-dialog {
        margin-top: 50px !important;
        margin: 0 auto;
    }

    .pages {
        margin-top: 5px;
        margin-bottom: -12px;
        line-height: 0px;
        display: flex;
        justify-content: flex-end;
    }

    .advancedSearch {
        line-height: 55px;
        margin: 10px 0;
    }

    .advancedSearch .title {
        text-align: right;
        display: inline-block;
        width: 80px;
    }

    .el-pagination__total {
        margin-left: 10px
    }

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

    .el-icon-coordinate {
        margin-left: -10px;
        color: #C0C4CC;
    }
</style>