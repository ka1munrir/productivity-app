import { axiosInstance as api } from "./axiosInstance";

export async function postToDoList(toDoList){
    return await api.post(`/todolists`, toDoList);
}
export async function patchToDoList(toDoList){
    return await api.patch(`/todolists/${toDoList.id}`, toDoList);
}
export async function deleteToDoList(id){
    return await api.delete(`/todolists/${id}`);
}