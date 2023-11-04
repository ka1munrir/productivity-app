import {axiosInstance as api} from './axiosInstance';


export async function postShoppingItem(shoppingItem) {
    return await api.post(`/shoppingitems`, shoppingItem)
}
export async function patchShoppingItem(shoppingItem){
    return await api.patch(`/shoppingitems/${shoppingItem.id}`, shoppingItem)
}
export async function deleteShoppingItem(shoppingItemID) {
    return await api.delete(`/shoppingitems/${shoppingItemID}`)
}