<template>
    <div v-loading="loading">
        <el-form @keydown.enter.native="submitForm()" :rules="rules" class="loginContainer" ref="LoginForm" label-position="top" label-width="80px" :model="LoginInfo">
            <h2 class="loginTitle">用户登录</h2>
            <el-form-item prop="username" label="用户名">
                <el-input type="text" v-model="LoginInfo.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码">
                <el-input type="password" v-model="LoginInfo.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item prop="code" label="验证码">
                <el-input type="text" style="width: 270px; margin-right: 5px" v-model="LoginInfo.code" placeholder="点击图片更换验证码"></el-input>
                <img :src="captchaUrl" @click="updateCaptcha()">
            </el-form-item>
            <el-button type="primary" style="width: 100%" @click="submitForm()">登录</el-button>
        </el-form>
    </div>
</template>
           
<script>
    export default {
        name: 'Login',
        data() {
            return {
                // 登录加载样式
                loading: false,
                // 验证码
                captchaUrl: '/captcha?time=' + new Date(),
                LoginInfo: {
                    username: 'admin',
                    password: '123',
                    code: '',
                },
                // 校验规则
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 4, max: 12, message: '用户名长度在 4 到 12 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 3, max: 10, message: '密码长度在 3 到 10 个字符', trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '请输入验证码', trigger: 'blur' },
                    ],
                },
            }
        },
        methods: {
            submitForm() {
                // 检验通过才能进入方法
                this.$refs.LoginForm.validate((valid) => {
                    // 第一次登陆将后端传来的token存入本地存储中
                    if (valid) {
                        this.postRequest('/login', this.LoginInfo).then(resp => {
                            this.loading = true;
                            if (resp) {
                                window.sessionStorage.setItem("token", resp.data.token);
                                this.$store.commit('INIT_ADMIN', resp);
                                this.$router.replace('/home')
                            }
                            this.loading = false;
                        })
                    } else {
                        this.$message.error('请填写完整登录信息！');
                        return false;
                    }
                });
            },
            updateCaptcha() {
                this.captchaUrl = '/captcha?time=' + new Date();
            }
        },  
    }
</script>
         
<style scope="scope">
    .loginContainer {
        width: 400px;
        margin: 100px auto;
        border: 1px solid #cacaca;
        padding: 15px 35px;
        border-radius: 15px;
        background-clip: padding-box;
        background: #fff;
        box-shadow: 0 0 25px #cacaca;
    }

    .loginTitle {
        text-align: center;
    }

    img {
        float: right;
    }
</style>