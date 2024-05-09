import axios from "./axios";

export const getCountriesRequest = ()=>axios.get('/countries');

export const getSeriesRequest = ()=>axios.get('/series')