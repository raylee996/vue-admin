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
                <el-checkbox v-model="formProps.remember" label="记住密码" name="remember"></el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(1)">登录</el-button>
                <el-button @click="submitForm(2)">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from "axios"
import Qs from "qs"
import {Loading, Message} from "element-ui"

function validatePwd(rule, value, callback) {
    if(!/[0-9_a-z]/gi.test(value)) {
        callback(new Error("密码只能包含数字、字母、下划线"))
    }else {
        callback()
    }
}
var getStore = localStorage.getItem
var setStore = localStorage.setItem
var removeStore = localStorage.removeItem

export default {
    name: "login",
    data() {
        return {
            formProps: {
                username: getStore("remember") && getStore("username") ? getStore("username") : "",
                password: getStore("remember") && getStore("password") ? getStore("password") : "",
                checkPassword: getStore("remember") && getStore("password") ? getStore("password") : "",
                remember: getStore("remember") ? true : false
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
    },
    methods: {
        submitForm(type) {
            var url = type == 1 ? "/api/register" : "/api/log_in"
            var body = {
                username: this.formProps.username,
                password: this.formProps.password,
            }
            var loading = Loading.service({
                lock: true,
                background: 'rgba(0, 0, 0, 0.3)'
            });
            axios.post(url, Qs.stringify(body)).then(res => {
                if(res.data.status == 1) {
                    if(this.formProps.remember) {
                        setStore("remember", this.formProps.remember)
                        setStore("username", this.formProps.username)
                        setStore("password", this.formProps.password)
                    }else {
                        removeStore("remember")
                        removeStore("username")
                        removeStore("password")
                    }
                    setStore("token", res.data.info.token)
                    setStore("role", res.data.info.role)
                    location.href = "/"
                }else {
                    Message({
                        type: "error",
                        message: res.data.info
                    })
                }
            }).catch(error => {
                if (error.response) {
                    Message({
                        type: "error",
                        message: error.response.data.info
                    })
                }else {
                    Message({
                        type: "error",
                        message: error.message
                    })
                }
            }).finally(() => {
                loading.close()
            })
        }
    }
}
</script>

<style lang="less">
.container {
    width: 100%;
    height: 100%;
    background-image: url(./bg.jpg);
    background-size: cover;
    background-position: center center;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>