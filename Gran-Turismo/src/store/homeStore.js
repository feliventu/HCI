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

    return { homes, add }

})