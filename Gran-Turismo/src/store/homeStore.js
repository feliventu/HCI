import { ref } from 'vue'
import { defineStore } from 'pinia'
import { HomeApi, Home } from "@/api/home";


export const useHomeStore = defineStore('home', () => {
    const homes= ref([])
   

    
    async function add(home){
        const result = await HomeApi.add(home)
        homes.value.push(home)
        updateHomes()
    }

    
    async function remove(){

        if(homes.value.length === 0){
            return
        }
        const result = await HomeApi.remove(getLast())
        updateHomes()
        return result
    }

    async function get(){
        const result = await HomeApi.get()
        updateHomes()
        return result
    }

    function getLast(){ 
        return homes.value.pop()
    }

    async function updateHomes(){
        const result = await HomeApi.get()
        homes.value = result.map((home) => Object.assign(new Home(), home))
        console.log(homes.value)
    }

    return {
        homes,
        add,
        remove,
        get
    }
})