<template>
    <v-container fluid class="py-10">
                <v-card class="pa-4">
                    <h1 class="text-center text-h5 font-weight-bold text-maroon">จัดการหัวข้อการประเมิน</h1>
                    <v-form @submit.prevent="saveMember">
                        <v-row class="mt-4">
                            <v-col cols="12" md="12">
                                <v-text-field v-model="form.name_topic" :error-messages="error.name_topic" label="ชื่อหัวข้อการประเมิน"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6" class="text-center">
                                <v-btn class="text-white w-full" color="blue" type="submit">{{ form.id_topic ? 'อัปเดต' : 'บันทึก' }}</v-btn>
                            </v-col>
                            <v-col cols="12" md="6" class="text-center">
                                <v-btn class="text-white w-full" color="error" type="reset">ยกเลิก</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>

                    <br>

                    <v-table class="table">
                        <thead>
                            <tr class="bg-gray-400">
                                <th class="text-center border">ลำดับ</th>
                                <th class="text-center border">หัวข้อการประเมิน</th>
                                <th class="text-center border">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(items,index) in result" :key="items.id_topic">
                                <td class="text-center border">{{ index+1 }}</td>
                                <td class="text-center border">{{ items.name_topic }}</td>
                                <td class="text-center border">
                                    <v-btn class="text-white" color="warning" size="small" @click="edit(items)">แก้ไข</v-btn>&nbsp;
                                    <v-btn class="text-white" color="error" size="small" @click="del(items.id_topic)">ลบ</v-btn>
                                </td> 
                            </tr>
                            <tr v-if="result.length === 0">
                                <td class="text-center border text-gray-500" colspan="8">ไม่พบข้อมูล</td>
                            </tr>
                        </tbody>
                    </v-table>
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
        const res = await axios.get(`${Staff}/topic`,{headers:{Authorization : `Bearer ${token}`}})
        result.value = res.data
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