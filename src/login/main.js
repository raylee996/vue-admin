import Vue from "vue";
import App from "./App";
import axios from "axios";
import {Loading, Message} from "element-ui";

var instance = new Vue({
    render: h => h(App)
})

var loading = Loading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0.3)'
});

axios.defaults.headers.common["Authorization"] = localStorage.getItem("token") || ""
axios.post("/api/checkStatus").then(res => {
    if(res.data.status == 1) {
        location.href = "/"
    }else {
        Message({
            type: "error",
            message: res.data.info
        })
        instance.$mount("#app")
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
    instance.$mount("#app")
}).finally(() => {
    loading.close();
})