<template>
    <v-container fluid class="py-10">
                <v-card class="pa-4">
                    <h1 class="text-center text-h5 font-weight-bold text-maroon">Dashboard - Staff</h1>
                    <br>
                    <v-row>
                        <v-col cols="12" md="4" v-for="b in result" ::keys="b">
                            <v-card elevation="5" class="pa-4">
                                <div>{{ b.label }}</div>
                                <div class="text-h3">{{ b.value }}</div>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card>
    </v-container>
</template>

<script setup lang="ts">
import {ref ,onMounted } from 'vue'
import axios from 'axios'
import {Staff} from '@/api/API'
import {api} from '@/api/API'
import {useRouter} from 'vue-router'

const token = localStorage.getItem('token')
const router = useRouter()

const result = ref([])

const form = ref({
    id_topic:null,
    name_toic:'',
})

const reset = () => {
    form.value = {
        id_topic:null,
        name_toic:'',
    }
}

const fetch = async () => {
    try{
        const res = await axios.get(`${api}/dash/staff`,{headers:{Authorization : `Bearer ${token}`}})
        result.value = res.data.box
    }catch(err){
        console.error('Error Fetching',err)
    }
}

const error = ref<Record<string,string>>({})
const confirmPassword = ref('')
const emailReget = /^[^\s]+@[^\s]+\.[^\s]{2,}$/i

function vaildateForm(){
    error.value = {}
    const f = form.value
    if(!f.name_topic)error.value.name_topic='กรุณากรอกชื่อหัวข้อการประเมิน'
    return Object.keys(error.value).length === 0
}

const saveMember = async () =>{
    if(!vaildateForm()) return
    try{
        if(form.value.id_topic){
            await axios.put(`${Staff}/topic/${form.value.id_topic}`,form.value,{headers:{Authorization : `Bearer ${token}`}})
        }else{
            await axios.post(`${Staff}/topic`,form.value,{headers:{Authorization : `Bearer ${token}`}})
        }
        alert('ทำรายการสำเร็จ')
        await fetch()
        await reset()
    }catch(err){
        console.error('ทำรายการไม่สำเร็จ',err)
    }
}

const edit = (items) => {
    form.value = {...items}
}

const del = async (id_topic) => {
    try{
        if(!confirm('ต้องการลบใช่หรือไม่')) return
        await axios.delete(`${Staff}/topic/${id_topic}`,{headers:{Authorization : `Bearer ${token}`}})
        await fetch()
        await reset()
    }catch(err){
        console.error('Error Delete')
    }
}

onMounted(fetch)
</script>

<style scoped>
.btn-maroon{
    background-color: #7d0c14;
}
.text-maroon{
    color: #7d0c14;
}
</style>