import {create} from "zustand"

export const useStoreAdminUsers = create(((set)=>({
    adminUsers: [],
    setUsers: (users)=> set({adminUsers: [...users]}),

}),{
    name: "admin users"}))
