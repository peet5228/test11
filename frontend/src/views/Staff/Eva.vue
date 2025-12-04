<template>
    <v-container fluid class="py-10">
                <v-card class="pa-4">
                    <h1 class="text-center text-h5 font-weight-bold text-maroon">จัดการแบบประเมิน</h1>
                    <v-form @submit.prevent="saveMember">
                        <v-row class="mt-4">
                            <v-col cols="12" md="6">
                                <v-text-field v-model="form.day_eva" type="date" label="วันที่ออกแบบประเมิน" />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-select v-model="form.id_member" :items="member.map(b => ({title:`${b.first_name} ${b.last_name}`,value:b.id_member}))" label="เลือกผู้รับการประเมิน" />
                            </v-col>
                            <v-col cols="12" md="12">
                                <v-select rows="3" v-model="form.id_sys" :items="round.map(r => ({title:`รอบที่ ${r.round_sys} ปี ${r.year_sys}`,value:r.id_sys}))" label="รอบการประเมิน" />
                            </v-col>
                            <v-col cols="12" md="6" class="text-center">
                                <v-btn class="text-white w-full" color="blue" type="submit">{{ form.id_eva ? 'อัปเดต' : 'บันทึก' }}</v-btn>
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
                                <th class="text-center border">ผู้รับการประเมินผล</th>
                                <th class="text-center border">รอบการประเมิน</th>
                                <th class="text-center border">วันที่ออกแบบประเมิน</th>
                                <th class="text-center border">สถานะการประเมิน</th>
                                <th class="text-center border">จัดการ</th>
                                <th class="text-center border">เพิ่มกรรมการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(items,index) in result" :key="items.id_eva">
                                <td class="text-center border">{{ index+1 }}</td>
                                <td class="text-center border">{{ items.first_name }} {{ items.last_name }}</td>
                                <td class="text-center border">รอบที่ {{ items.round_sys }} ปี {{ items.year_sys }}</td>
                                <td class="text-center border">{{ items.day_eva }}</td>
                                <td class="text-center border">{{ items.status_eva === 1 ? 'ประเมินตนเอง' : items.status_eva === 2 ? 'กรรมการประเมิน' : 'ประเมินเสร็จสิ้น' }}</td>
                                <td class="text-center border">
                                    <v-btn class="text-white" color="warning" size="small" @click="edit(items)">แก้ไข</v-btn>&nbsp;
                                    <v-btn class="text-white" color="error" size="small" @click="del(items.id_eva)">ลบ</v-btn>
                                </td> 
                                <td class="text-center border">
                                    <!-- <v-btn class="text-white" color="warning" size="small" @click="edit(items)">แก้ไข</v-btn>&nbsp; -->
                                    <v-btn class="text-white" color="success" size="small" @click="add(items.id_eva)">เพิ่มกรรมการ</v-btn>
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
const member = ref([])
const round = ref([])

const form = ref({
    id_eva:null,
    id_member:'',
    id_sys:'',
    day_eva:'',
})

const reset = () => {
    form.value = {
        id_member:'',
        id_sys:'',
        day_eva:'',
    }
}

const fetch = async () => {
    try{
        const r = await axios.get(`${Staff}/member/eva`,{headers:{Authorization : `Bearer ${token}`}})
        member.value = r.data
        const s = await axios.get(`${Staff}/eva/round`,{headers:{Authorization : `Bearer ${token}`}})
        round.value = s.data
        const res = await axios.get(`${Staff}/eva`,{headers:{Authorization : `Bearer ${token}`}})
        result.value = res.data
    }catch(err){
        console.error('Error Fetching',err)
    }
}

const saveMember = async () =>{
    try{
        if(form.value.id_eva){
            await axios.put(`${Staff}/eva/${form.value.id_eva}`,form.value,{headers:{Authorization : `Bearer ${token}`}})
        }else{
            await axios.post(`${Staff}/eva`,form.value,{headers:{Authorization : `Bearer ${token}`}})
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

const del = async (id_eva) => {
    try{
        if(!confirm('ต้องการลบใช่หรือไม่')) return
        await axios.delete(`${Staff}/eva/${id_eva}`,{headers:{Authorization : `Bearer ${token}`}})
        await fetch()
        await reset()
    }catch(err){
        console.error('Error Delete')
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