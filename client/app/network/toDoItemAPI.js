import { axiosInstance as api } from "./axiosInstance";

export async function postToDoItem(toDoItem){
    return await api.post(`/todoitems`, toDoItem)
}
export async function patchToDoItem(toDoItem){
    return await api.patch(`/todoitems/${toDoItem.id}`, toDoItem)
}
export async function deleteToDoItem(id){
    return await api.delete(`/todoitems/${id}`)
}