import Axios from "axios";

export function setupAxios() {
    Axios.defaults.baseURL = 'http://epic.gsfc.nasa.gov/';
} 

export function getAxiosClient() {
    return Axios.create()
}

