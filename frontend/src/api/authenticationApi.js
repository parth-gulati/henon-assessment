import axios from 'axios'
const base_url = import.meta.env.VITE_BASE_URL

export const login = async (data) => {
    try {
        console.log(data)
        const res = await axios.post(
            `${base_url}/user/signin`,
            data,
            { headers: { 'Content-Type': 'application/json' } }
        );
        return { data: res.data, status: res.status };
    } catch (error) {
        console.log(error.response)
        return { data: error.response.data, status: error.response.status }
    }
};

export const logout = async () => {
    try {
        const res = await axios.post(
            `${base_url}/user/signout`,
        )
        return { data: res.data, status: res.status };
    }
    catch (error) {
        console.log(error.response)
        return { data: error.response.data, status: error.response.status }
    }
}

export const signup = async (data) => {
    try {
        const res = await axios.post(
            `${base_url}/user/signup`,
            {
                first_name: data.firstName,
                last_name: data.lastName,
                email: data.email,
                password: data.password
            },
            { headers: { 'Content-Type': 'application/json' } }
        );
        return { data: res.data, status: res.status };
    } catch (error) {
        console.log(error.response)
        return { data: error.response.data, status: error.response.status }
    }
};

export const getuser = async (token) => {
    try {
        const res = await axios.get(
            `${base_url}/user/getuser`,
            { headers: { 'Authorization': `Bearer ${token}` } }
        )

        return { data: res.data, status: res.status };
    } catch (error) {
        console.log(error.response)
        return { data: error.response.data, status: error.response.status }
    }


}