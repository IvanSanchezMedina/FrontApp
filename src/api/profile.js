import axios from "./axios"

export const updateUserRequest = (id,values)=>axios.patch(`/usuarios/${id}`,values);