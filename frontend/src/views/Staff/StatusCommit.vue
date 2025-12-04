<template>
    <v-container fluid class="py-10">
                <v-card class="pa-4">
                    <h1 class="text-center text-h5 font-weight-bold text-maroon">สถานะการประเมินของกรรมการประเมิน</h1>
                   รายชื่อผู้รับการประเมินผล
                    <v-table class="table">
                        <thead>
                            <tr class="bg-gray-400">
                                <th class="text-center border">ลำดับ</th>
                                <th class="text-center border">ผู้รับการประเมินผล</th>
                                <th class="text-center border">รอบการประเมิน</th>
                                <th class="text-center border">วันที่ออกแบบประเมิน</th>
                                <th class="text-center border">สถานะการประเมิน</th>
                                <th class="text-center border">รายละเอียด</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(items,index) in result" :key="items.id_eva">
                                <td class="text-center border">{{ index+1 }}</td>
                                <td class="text-center border">{{ items.first_name }} {{ items.last_name }}</td>
                                <td class="text-center border">รอบที่ {{ items.round_sys }} ปี {{ items.year_sys }}</td>
                                <td class="text-center border">{{ items.day_eva }}</td>
                                <td class="text-center border">
                                    <v-btn :color="bg(items.status_eva)" size="small" class="text-white">{{ items.status_eva === 1 ? 'ประเมินตนเอง' : items.status_eva === 2 ? 'กรรมการประเมิน' : 'ประเมินเสร็จสิ้น' }}</v-btn>
                                </td>
                                <td class="text-center border">
                                    <!-- <v-btn class="text-white" color="warning" size="small" @click="edit(items)">แก้ไข</v-btn>&nbsp; -->
                                    <v-btn class="text-white" color="success" size="small" @click="add(items.id_eva)">รายละเอียด</v-btn>
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

const fetch = async () => {
    try{
        const res = await axios.get(`${Staff}/eva/all`,{headers:{Authorization : `Bearer ${token}`}})
        result.value = res.data
    }catch(err){
        console.error('Error Fetching',err)
    }
}

const bg = (status_eva) => {
    if(status_eva === 1) return 'blue'
    if(status_eva === 2) return 'warning'
    if(status_eva === 3) return 'success'
}

const add = (id_eva) => {
    router.push({path:`Status2/${id_eva}`})
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