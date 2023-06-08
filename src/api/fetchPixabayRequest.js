import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '25738423-b3273d9a56f64cc8a00238b49';
const defaultSettings = 'image_type=photo&orientation=horizontal&per_page=12';

export async function fetchPixabayRequest( query, page ) {
    
    try {
        const { data } = await axios.get(`${BASE_URL}?q=${query}&page=${page}&key=${KEY}&${defaultSettings}`);
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}