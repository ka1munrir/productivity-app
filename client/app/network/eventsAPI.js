import { axiosInstance as api } from "./axiosInstance";

export async function postEvent(event){
    return await api.post(`/events`, event)
}
export async function patchEvent(event){
    return await api.patch(`/events/${event.id}`, event)
}
export async function deleteEvent(id){
    return await api.delete(`/events/${id}`)
}