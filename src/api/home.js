import axios from "./axios"

export const getHomeSlideRequest = (language)=>axios.get(`/configuration_slides/${language}`);