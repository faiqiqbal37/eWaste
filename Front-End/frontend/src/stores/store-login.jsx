import {create} from "zustand"

export const useStoreLogin = create((set)=>({
    loggedUser: {},
    updateLoggedUser: (newUser) => set({loggedUser: newUser})
}))