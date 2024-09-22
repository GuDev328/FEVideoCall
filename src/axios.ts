/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import * as jwtDecode from "jwt-decode";

const BASE_URL = "https://masterlearning.onrender.com";
//const BASE_URL = "https://1tbkgprl-3030.asse.devtunnels.ms/";

const axiosN = axios.create({
    baseURL: BASE_URL,
});

axiosN.interceptors.request.use(
    (config) => {
        config.headers = config.headers ?? {};
        config.headers["Authorization"] = `Bearer ${localStorage.getItem(
            "accessToken"
        )}`;
        return config;
    },
    (error) => {
        // Xử lý lỗi request
        return Promise.reject(error);
    }
);
export const refreshTokenFunc = async (refreshToken: string) => {
    try {
        const res = await axiosN.post("/users/refresh-token", { refreshToken });
        localStorage.setItem("accessToken", res.data.result.accessToken);
        localStorage.setItem("refreshToken", res.data.result.refreshToken);
        return res.data.result.accessToken;
    } catch (error) {
        console.log(error);
    }
};

const checkToken = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (accessToken && refreshToken) {
        const decodedToken = jwtDecode.jwtDecode(accessToken);
        const decodedRFToken = jwtDecode.jwtDecode(refreshToken);
        const date = new Date();
        if ((decodedRFToken as { exp: number }).exp < date.getTime() / 1000) {
            window.location.href = "/login?jwt=out";
        }
        if ((decodedToken as { exp: number }).exp < date.getTime() / 1000) {
            await refreshTokenFunc(refreshToken);
        }
        return true;
    } else {
        window.location.href = "/login?jwt=out";
        return false;
    }
};

class Axios {
    async post(url: string, data: any, callback?: (res: any) => void) {
        const response = await axiosN
            .post(url, data)
            .then((res) => {
                if (res.status === 200) {
                    if (typeof callback === "function") {
                        callback(res);
                    }
                    return res;
                }
            })
            .catch((err) => {
                console.log(err.response.data.message);
                return null;
            });
        return response;
    }

    async postAuth(url: string, data: any, callback?: (res: any) => void) {
        await checkToken();
        const response = await axiosN
            .post(url, data)
            .then((res) => {
                if (res.status === 200) {
                    if (typeof callback === "function") {
                        callback(res);
                    }
                    return res;
                }
            })
            .catch((err) => {
                console.log(err.response.data.message);
                return null;
            });
        return response;
    }

    async get(url: string, callback?: (res: any) => void) {
        const response = await axiosN
            .get(url)
            .then((res) => {
                if (res.status === 200) {
                    if (typeof callback === "function") {
                        callback(res);
                    }
                    return res;
                }
            })
            .catch((err) => {
                console.log(err.response.data.message);
                return null;
            });
        return response;
    }

    async getAuth(url: string, callback?: (res: any) => void) {
        await checkToken();
        const response = await axiosN
            .get(url)
            .then((res) => {
                if (res.status === 200) {
                    if (typeof callback === "function") {
                        callback(res);
                    }
                    return res;
                }
            })
            .catch((err) => {
                console.log(err.response.data.message);
                return null;
            });
        return response;
    }
}

const axiosIns = new Axios();

export default axiosIns;
