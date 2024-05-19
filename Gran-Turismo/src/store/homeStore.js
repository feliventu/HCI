import { ref } from 'vue'
import { defineStore } from 'pinia'
import { HomeApi, Home } from "@/api/home";


export const useHomeStore = defineStore('home', () => {
    const homes= ref([])

    
    async function add(home){
        const result = await HomeApi.add(home)
        homes.value = result
        return Object.assign(new Home(), result)
    }

    

    async function remove(id){
        const result = await HomeApi.remove(id)
        homes.value = result
        return result
    }

    async function get(){
        const result = await HomeApi.get()
        homes.value = result
        return result
    }

    return { homes, add, remove, get}

})