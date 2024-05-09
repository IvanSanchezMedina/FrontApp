import axios from "./axios";

export const getCountriesRequest = ()=>axios.get('/countries');

export const getSeriesRequest = ()=>axios.get('/series')

export const getSeriesNameByIdRequest = (id)=>axios.get(`/serie/${id}`)