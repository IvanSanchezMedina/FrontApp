import axios from "./axios"

export const getHomeSlideRequest = (language)=>axios.get(`/configuration_slides/${language}`);
export const getHomeBlocksRequest = (language)=>axios.get(`/configuration_blocks/${language}`);