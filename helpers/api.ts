import axios from "axios";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const API_URL = process.env.EXPO_PUBLIC_API_URL;
const apiUrl = API_URL + `?key=${API_KEY}`;
const formatUrl = (params: string | Object | any) => {
    let url = apiUrl + "&per_page=25&safeSearch=true&editors_choices=true";
    if (!params) return url;
    let paramKeys = Object.keys(params);
    paramKeys.map((key: string) => {
        let value = key == 'q' ? encodeURIComponent(params[key]) : params[key];
        url += `&${key}=${value}`;
    });
    console.log(url);
    return url;
}


export const fetchData = async (params: any) => {
    try {
        const res = await axios.get(formatUrl(params));
        return { success: true, data: res.data.hits };
    } catch (error: any) {
        console.log(error.message);
        return { success: false, message: error }
    }
}