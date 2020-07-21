import axios from "axios";
import Qs from "qs";

class Request {
    static instance = axios.create({
        baseURL: "/api",
        headers: {
            Authorization: localStorage.getItem("token")
        }
    })
}
