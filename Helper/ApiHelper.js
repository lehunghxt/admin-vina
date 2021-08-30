import axios from "axios";

//Very Important
axios.defaults.withCredentials = true;
axios.defaults.baseURL = '/api';
export async function Get(url, params) {
    try {
        const response = await axios.get(url, params);
        if (response && response.status === 200) {
            return response.data;
        } else return response;
    }
    catch (e) {
        return null;
        //return e;
    }
}

export async function Post(url, obj) {
    try {
        const response = await axios.post(url, obj);
        if (response && response.status === 200) {
            return response.data;
        } else return response;
    }
    catch (e) {
        return null;
        //throw e;
    }
}

export async function Delete(url, obj) {
    try {
        const response = await axios.delete(url, { data: obj });
        if (response && response.status === 200) {
            return response.data;
        } else return response;
    }
    catch (e) {
        return null;
        //throw e;
    }
}

export async function PATCH(url, obj) {
    try {
        const response = await axios.patch(url, obj);
        if (response && response.status === 200) {
            return response.data;
        } else return response;
    }
    catch (e) {
        return null;
        //throw e;
    }
}