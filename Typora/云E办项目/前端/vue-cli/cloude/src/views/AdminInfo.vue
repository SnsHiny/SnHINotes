<template>
    <div>
        <el-card shadow="hover" class="admin-card">
            <div slot="header" class="clearfix">
                <div>
                    <el-upload
                        class="adminImg"
                        :show-file-list="false"	
                        :headers="headers"
                        :data="admin"
                        :on-success="onSuccess"
                        action="/system/admin/userface">
                        <img :src="admin.userFace" :alt="admin.name" title="点击更换头像" class="adminFace">
                    </el-upload>
                </div>
            </div>
            <el-descriptions class="admin-info" :column="1">
                <el-descriptions-item label="用户名">{{admin.name}}</el-descriptions-item>
                <el-descriptions-item label="手机号码">{{admin.phone}}</el-descriptions-item>
                <el-descriptions-item label="电话号码">{{admin.telephone}}</el-descriptions-item>
                <el-descriptions-item label="联系地址">{{admin.address}}</el-descriptions-item>
                <el-descriptions-item labelClassName="adminRole" label="用户角色">
                    <el-tag
                        style="margin-right: 5px; margin-bottom: 5px;" 
                        type="success"  
                        v-for="(role, index) in admin.roles" 
                        :key="index">
                        {{role.nameZh}}
                    </el-tag>
                </el-descriptions-item>
            </el-descriptions>
            <div style="float: right">
                <el-button type="primary" @click="dialogVisible = true">修改信息</el-button>
                <el-button type="danger" @click="showUpdatePassDialog()">修改密码</el-button>
            </div>
        </el-card>
        <el-dialog title="修改个人信息" :visible.sync="dialogVisible" width="30%">
            <div>
                <el-tag>用户昵称</el-tag>
                <el-input v-model="updateAdminInfo.name" style="width: 70%; margin-left: 10px"></el-input>
                <el-tag>手机号码</el-tag>
                <el-input v-model="updateAdminInfo.phone" style="width: 70%; margin-left: 10px"></el-input>
                <el-tag>电话号码</el-tag>
                <el-input v-model="updateAdminInfo.telephone" style="width: 70%; margin-left: 10px"></el-input>
                <el-tag>联系地址</el-tag>
                <el-input v-model="updateAdminInfo.address" style="width: 70%; margin-left: 10px"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateAdmin()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="更新密码" :visible.sync="updatePassdialogVisible" width="30%">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="旧密码" prop="oldPass">
                    <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
           
<script>
    export default {
        name: 'AdminInfo',
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                admin: {},
                updateAdminInfo: {},
                dialogVisible: false,
                updatePassdialogVisible: false,
                headers: {
                    token: window.sessionStorage.getItem('token')
                },
                ruleForm: {
                    oldPass: '',
                    pass: '',
                    checkPass: '',
                },
                rules: {
                    oldPass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                }
            };
        },
        mounted() {
            this.initAdmin();
        },
        methods: {
            initAdmin() {
                this.getRequest('/info').then(resp => {
                    if (resp) {
                        this.admin = resp;
                        this.updateAdminInfo = Object.assign({}, this.admin);
                        window.sessionStorage.setItem('userInfo', JSON.stringify(resp));
                        this.$store.commit('INIT_ADMIN', resp);
                    }
                })
            },
            updateAdmin() {
                this.putRequest('/system/admin/info', this.updateAdminInfo).then(resp => {
                    if (resp) {
                        this.initAdmin();
                        this.dialogVisible = false;
                    }
                })
            },
            updatePassword() {

            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.ruleForm.adminId = this.admin.id;
                        this.putRequest('/system/admin/pass', this.ruleForm).then(resp => {
                            if (resp) {
                                this.postRequest('logout');
                                this.$store.commit('initRoutes', []);
                                this.$router.replace('/Login');
                            } else {
                                this.$message.error('旧密码错误！');
                                return false;
                            }
                        })
                    } else {
                        this.$message.error('重复密码有误！');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            showUpdatePassDialog() {
                this.updatePassdialogVisible = true;
                this.resetForm('ruleForm');
            },
            onSuccess() {
                this.initAdmin();
            },
        },
    }
</script>
         
<style scoped>
    .admin-card {
        width: 500px;
        height: 480px;
        margin: 30px;
    }

    .adminFace {
        width: 72px;
        height: 72px;
        border-radius: 72px;
    }

    .el-descriptions-item {
        font-size: 16px;
        line-height: 40px !important;
    }
</style>