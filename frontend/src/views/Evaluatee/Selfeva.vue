<template>
    <v-container>
        <v-row >
            <v-col cols="12">
                
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import {ref,onMounted,computed} from 'vue'
import axios from 'axios'
import {Eva} from '@/api/API'
import {useRouter} from 'vue-router'
const router = useRouter()
const error = ref<Record<string,string>>({})
const newPassword = ref('')
const confirmPassword = ref('')
const token = localStorage.getItem('token')
const fetchUser = async () =>{
    try{
        const res = await axios.get(`${Eva}/selfeva`,{headers:{Authorization:`Bearer ${token}`}})
        form.value = res.data
    }catch(err){
        console.error('โหลดไม่สำเร็จ',err)
    }
}
onMounted(fetchUser)
</script>

<style scoped>
.btn-maroon{
    background-color: #7d0c14;
}
.text-maroon{
    color: #7d0c14;
}
</style>