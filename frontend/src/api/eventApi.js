import axios from "axios";
const base_url = import.meta.env.VITE_BASE_URL

export const getEvents = async (token) => {
    try {
        const res = await axios.get(
            `${base_url}/event/get-all`,
            { headers: { 'Authorization': `Bearer ${token}` } }
        )
        return { data: res.data, status: res.status };
    } catch (error) {
        console.log(error.response)
        return { data: error.response.data, status: error.response.status }
    }
}

export const createEvent = async (data, token) => {
    try {
        const res = await axios.post(
            `${base_url}/event/create`,
            {
                title: data.title,
                type: data.type,
                from: data.from,
                to: data.to
            },
            { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } }
        );
        return { data: res.data, status: res.status };
    } catch (error) {
        console.log(error.response)
        return { data: error.response.data, status: error.response.status }
    }
}

export const deleteEvent = async (title, token) => {
    try {
        const res = await axios.post(
            `${base_url}/event/delete`,
            {
                title,
            },
            { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } }
        );
        return { data: res.data, status: res.status };
    } catch (error) {
        console.log(error.response)
        return { data: error.response.data, status: error.response.status }
    }
}