import axios from "./axios";

export const getCountriesRequest = ()=>axios.get('/countries');