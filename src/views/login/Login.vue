<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区域 -->
            <div class="avatar_box">
                <img src="@/assets/img/logo.png" alt="">
            </div>
            <!-- 登录表单区域 -->
            <el-form ref="loginFormRef" :model="loginForm" label-width="0px" class="login_form" :rules="loginFormRules">
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input placeholder="请输入用户名" v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
                </el-form-item> 
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input placeholder="请输入密码" v-model="loginForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
                </el-form-item> 
                <!-- 按钮 -->
                <el-form-item class="btns">
                    <el-button type="primary" @click="submitLoginForm">登录</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item> 
            </el-form> 
        </div>
    </div>
</template>
<script>
export default {
    name: 'Login',
    data() {
        return {
            loginForm: {
                username: 'admin',
                password: '123456'
            },
            loginFormRules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        //点击登录按钮提交数据
        submitLoginForm() {
            //登录之前先本地进行验证
            this.$refs.loginFormRef.validate((valid) => {
                if (valid) {
                   this.$http
                        .post('login', this.loginForm)
                        .then(res => {
                            console.log(res.data);
                            if(res.data.meta.status !== 200){
                                this.$message.error("登录失败");
                            }else{
                                this.$message.success("登录成功");
                                //1.将登录成功之后的token保存到sessionstorage中
                                //  1.1项目中除了登录之外的其他接口，都必须登录之后才可以使用
                                //  1.2token只在当前网站中打开有效，所以将token保存到sessionStorage
                                window.sessionStorage.setItem('token', res.data.data.token);
                                this.$router.push("/home");
                            }
                            
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    return false;
                }
            });
        },
        //点击重置按钮重置表单
        resetLoginForm() {
            this.$refs.loginFormRef.resetFields();
        }
    }
}
</script>
<style lang="less" scoped>
    .login_container {
        position: relative;
        background-color: #2b4b6b;
        height: 100%;
        .login_box {
            width: 450px;
            height: 300px;
            background-color: #fff;
            border-radius: 3px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            .avatar_box {
                position: absolute;
                left: 50%;
                transform: translate(-50%,-50%);
                height: 130px;
                width: 130px;
                border: 1px solid #eee;
                border-radius: 50%;
                box-shadow: 0 0 10px #ddd;
                padding: 10px;
                background-color: #fff;
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    background-color: #eee;
                }
            }
            .login_form {
                position: absolute;
                box-sizing: border-box;
                bottom: 0;
                width: 100%;
                padding: 0 20px;
                .btns {
                    display: flex;
                    justify-content: flex-end;
                }
            }

        }
    }
</style>