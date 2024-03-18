import {create} from "zustand"
import {createJSONStorage, persist} from "zustand/middleware"

export const useStoreLogin = create(persist((set)=>({
    loggedUser: {},
    updateLoggedUser: (newUser) => set({loggedUser: newUser})
}),{
    name: "user storage"}))