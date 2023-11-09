import { create } from "zustand";
import { persist } from "zustand/middleware";
import { postShoppingItem, patchShoppingItem, deleteShoppingItem } from "../app/network/shoppingItemAPI";
import { patchUser, deleteUser } from "../app/network/userAPI";
import { postToDoList, patchToDoList, deleteToDoList } from "../app/network/toDoListAPI";
import { postToDoItem, patchToDoItem, deleteToDoItem } from "../app/network/toDoItemAPI";


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
  addToDoList: (list) => {
    postToDoList(list)
      .then((resp) =>
        set((state) => ({
          toDoLists: [...state.toDoLists, resp.data]
        }))
      )
  },
  editToDoList: (list) => {
    patchToDoList(list)
      .then((resp) =>
        set((state) => ({
          toDoLists: state.toDoLists.map(toDoList => {
            if (toDoList.id === list.id) {
              return resp.data;
            }
            return toDoList;
          })
        }))
      )
  },
  removeToDoList: (id) => {
    deleteToDoList(id);
    set((state) => ({
      toDoLists: [...state.toDoLists.filter(toDoList => toDoList.id !== id)]
    }))
  },
  addTask: (task) => {
    postToDoItem(task)
    .then(resp => 
      set((state) => ({
        toDoLists: [...state.toDoLists.map(toDoList => {
          if(toDoList.id === task.toDoList_id){
            toDoList.to_do_items_rel = [...toDoList.to_do_items_rel, resp.data];
          }
          return toDoList
        })]
      }))
      )
  },
  editTask: (task) => {
    patchToDoItem(task)
    .then(resp => 
      set((state) => ({
        toDoLists: [...state.toDoLists.map(toDoList => {
          if (toDoList.id === task.toDoList_id){
            toDoList.to_do_items_rel = [...toDoList.to_do_items_rel.map(toDoItem => {
              if (toDoItem.id === task.id){
                return resp.data
              }
              return toDoItem;
            })]
          }
          return toDoList;
        })]
      }))
      )
  },
  removeTask: (task) => {
    deleteToDoItem(task.id);
    set((state) => ({
      toDoLists: [...state.toDoLists.map(toDoList => {
        if (toDoList.id === task.toDoList_id){
          toDoList.to_do_items_rel = [...toDoList.to_do_items_rel.filter(toDoItem => toDoItem.id !== task.id)];
        }
        return toDoList
      })]
    }))
  }

});


const useUserStore = create(
  persist(userStore, {
    name: "user",
  })
);

export default useUserStore;