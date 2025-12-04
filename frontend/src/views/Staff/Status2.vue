<template>
    <v-container fluid class="py-10">
                <v-card class="pa-4">
                    <h1 class="text-center text-h5 font-weight-bold text-maroon">สถานะการประเมินของกรรมการประเมิน</h1>
                   รายชื่อกรรมการประเมิน
                    <v-table class="table">
                        <thead>
                            <tr class="bg-gray-400">
                                <th class="text-center border">ลำดับ</th>
                                <th class="text-center border">กรรมการประเมิน</th>
                                <th class="text-center border">สถานะการประเมิน</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(items,index) in result" :key="items.id_eva">
                                <td class="text-center border">{{ index+1 }}</td>
                                <td class="text-center border">{{ items.first_name }} {{ items.last_name }}</td>
                                <td class="text-center border">
                                    <v-btn :color="bg(items.status_commit)" size="small" class="text-white">{{ items.status_commit === 'y' ? 'ประเมินเสร็จสิ้น' : 'ยังไม่ได้ประเมิน' }}</v-btn>
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
import {useRoute} from 'vue-router'

const token = localStorage.getItem('token')
const id_eva = useRoute().params.id_eva

const result = ref([])

const fetch = async () => {
    try{
        const res = await axios.get(`${Staff}/status/${id_eva}`,{headers:{Authorization : `Bearer ${token}`}})
        result.value = res.data
    }catch(err){
        console.error('Error Fetching',err)
    }
}

const bg = (status_commit) => {
    if(status_commit === 'y') return 'success'
    if(status_commit === 'n') return 'error'
}

const add = (id_eva) => {
    router.push({path:`/${id_eva}`})
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