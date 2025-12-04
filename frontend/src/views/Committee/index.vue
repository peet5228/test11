<template>
    <v-container fluid class="py-10">
                <v-card class="pa-4">
                    <h1 class=" text-h5 font-weight-bold text-maroon">รายชื่อ</h1>
                    <v-table class="table">
                        <thead>
                            <tr class="bg-gray-400">
                                <th class="text-center border w-1/10">ลำดับ</th>
                                <th class="text-center border w-1/10">ชื่อ</th>
                                <th class="text-center border w-1/10">นามสกุล</th>
                                <th class="text-center border w-1/10">วันที่ออกแบบประเมิน</th>
                                <th class="text-center border w-1/10">สถานะการประเมิน</th>
                                <th class="text-center border w-1/10">ตรวจสอบการประเมิน</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(items,index) in result" :key="items.id_eva">
                                <td class="text-center border">{{ index+1 }}</td>
                                <td class="text-center border">{{ items.first_name }}</td>
                                <td class="text-center border">{{ items.last_name }}</td>
                                <td class="text-center border">{{ items.day_eva }}</td>
                                <td class="text-center border">{{ items.status_eva === 1 ? 'ประเมินตนเอง' : items.status_eva === 2 ? 'กรรมการประเมิน' : 'ประเมินเสร็จสิ้น' }}</td>
                                <td class="text-center border">
                                    <!-- <v-btn class="text-white" color="warning" size="small" @click="edit(items)">แก้ไข</v-btn>&nbsp; -->
                                    <v-btn class="text-white" color="success" size="small" @click="add(items.id_eva)">ตรวจสอบ</v-btn>
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
import {Commit} from '@/api/API'
import {api} from '@/api/API'
import {useRouter} from 'vue-router'

const token = localStorage.getItem('token')
const router = useRouter()

const result = ref([])
const fetch = async () => {
    try{
        const res = await axios.get(`${Commit}/show_eva`,{headers:{Authorization : `Bearer ${token}`}})
        result.value = res.data
    }catch(err){
        console.error('Error Fetching',err)
    }
}

const add = (id_eva) => {
    router.push({path:`Eva_commit/${id_eva}`})
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