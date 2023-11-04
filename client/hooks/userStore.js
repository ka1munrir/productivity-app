import { create } from "zustand";
import { persist } from "zustand/middleware";
import { postShoppingItem, patchShoppingItem, deleteShoppingItem } from "../app/network/shoppingItemAPI";
import { patchUser, deleteUser } from "../app/network/userAPI";


const userStore = (set) => ({
  user: null,
  events: [],
  locations: [],
  shoppingItems: [],
  toDoLists: [],
  setUser: (newUser) =>
    set(() => ({
      user: {
        "id": newUser["id"],
        "first_name": newUser['first_name'],
        "last_name": newUser['last_name'],
        "email": newUser['email'],
        "username": newUser['username'] 
      },
      events: newUser['events_rel'],
      locations: newUser['locations_rel'],
      shoppingItems: newUser['shopping_items_rel'],
      toDoLists: newUser['to_do_lists_rel'],
    })),
  editUser: (editedUser) => {
    patchUser(editedUser)
    set(() => ({
      user: editedUser
    }))
  },
  logOutUser: () =>
    set(() => ({
      user: null,
      events: [],
      locations: [],
      shoppingItems: [],
      toDoLists: [],
    })),
  deleteTheUser: (id) => {
    deleteUser(id)
    state.logOutUser();
  },
  addShoppingItem: (item) => {
    postShoppingItem(item)
    .then((resp) => 
    set((state) => ({
      shoppingItems: [...state.shoppingItems, resp.data]
    })))
  },
  editShoppingItem: (item) => {
    patchShoppingItem(item)
    .then((resp) => 
    set((state) => ({
      shoppingItems: state.shoppingItems.map(shoppingItem => {
        if (shoppingItem.id === item.id) {
          console.log(resp.data);
          return resp.data;
        }
        return shoppingItem
      })
    })))
  },
  removeShoppingItem: (id) => {
    deleteShoppingItem(id);
    set((state) => ({
      shoppingItems: [...state.shoppingItems.filter(sItem => sItem.id !== id)]
    })
    )
    
  },
  });


const useUserStore = create(
    persist(userStore, {
      name: "user",
    })
);

export default useUserStore;