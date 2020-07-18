<template>
    <div class="container">
        <el-form :model="formProps" :rule="rules" label-width="100px" ref="form">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="formProps.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="formProps.password" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPassword">
                <el-input v-model="formProps.checkPassword" show-password></el-input>
            </el-form-item>
            <el-form-item prop="remember">
                <el-checkbox v-model="formProps.remember" label="自动登录" name="remember"></el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(1)">登录</el-button>
                <el-button @click="submitForm(2)">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
function validatePwd(rule, value, callback) {
    if(!/[0-9_a-z]/gi.test(value)) {
        callback(new Error("密码只等包含数字、字母、下划线"))
    }else {
        callback()
    }
}

export default {
    name: "login",
    data() {
        return {
            formProps: {
                username: localStorage.getItem("remember") && localStorage.getItem("username") ? localStorage.getItem("username") : "",
                password: localStorage.getItem("remember") && localStorage.getItem("password") ? localStorage.getItem("password") : "",
                checkPassword: localStorage.getItem("remember") && localStorage.getItem("password") ? localStorage.getItem("password") : "",
                remember: localStorage.getItem("remember")
            },
            rules: {
                username: [
                    {required: true, message: '请输入用户名', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'},
                    {validator: validatePwd, trigger: 'blur'}
                ],
                checkPassword: [
                    {required: true, message: '请确认密码', trigger: 'blur'},
                ]
            }
        }
    }
}
</script>

<style lang="less">

</style>