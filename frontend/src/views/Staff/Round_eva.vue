<template>
    <v-container fluid class="py-10">
                <v-card class="pa-4">
                    <h1 class="text-center text-h5 font-weight-bold text-maroon">จัดการรอบการประเมิน</h1>
                    <v-form @submit.prevent="saveMember">
                        <v-row class="mt-4">
                            <v-col cols="12" md="6">
                                <v-text-field v-model="form.day_open" type="date" label="วันที่เปิดรอบการประเมิน" />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="form.day_out" type="date" label="วันที่ปิดรอบการประเมิน" />
                            </v-col>
                            <v-col cols="12" md="12">
                                <v-select rows="3" v-model="form.round_sys" :items="[{title:'รอบที่ 1' , value:'1'},{title:'รอบที่ 2' , value:'2'}]" label="รอบการประเมิน" />
                            </v-col>
                             <v-col cols="12" md="6">
                                <v-text-field v-model="form.year_sys" type="number" label="ปี" />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-select rows="3" v-model="form.status_sys" :items="[{title:'เปิด',value:'y'},{title:'ปิด',value:'n'}]" label="สถานะ เปิด/ปิด รอบการประเมิน" />
                            </v-col>
                            <v-col cols="12" md="6" class="text-center">
                                <v-btn class="text-white w-full" color="blue" type="submit">{{ form.id_sys ? 'อัปเดต' : 'บันทึก' }}</v-btn>
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
                                <th class="text-center border">วันที่เปิดรอบการประเมิน</th>
                                <th class="text-center border">วันที่ปิดรอบการประเมิน</th>
                                <th class="text-center border">รอบการประเมิน</th>
                                <th class="text-center border">สถานะ เปิด/ปิด รอบการประเมิน</th>
                                <th class="text-center border">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(items,index) in result" :key="items.id_sys">
                                <td class="text-center border">{{ index+1 }}</td>
                                <td class="text-center border">{{ items.day_open }}</td>
                                <td class="text-center border">{{ items.day_out }}</td>
                                <td class="text-center border">รอบที่ {{ items.round_sys }} ปี {{ items.year_sys }}</td>
                                <td class="text-center border">{{ items.status_sys === 'y' ? 'เปิด' : 'ปิด' }}</td>
                                <td class="text-center border">
                                    <v-btn class="text-white" color="warning" size="small" @click="edit(items)">แก้ไข</v-btn>&nbsp;
                                    <v-btn class="text-white" color="error" size="small" @click="del(items.id_sys)">ลบ</v-btn>
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
const topic = ref([])

const form = ref({
    id_sys:null,
    day_open:'',
    day_out:'',
    round_sys:'',
    year_sys:'',
    status_sys:'',
})

const reset = () => {
    form.value = {
        id_sys:null,
    day_open:'',
    day_out:'',
    round_sys:'',
    year_sys:'',
    status_sys:'',
    }
}

const fetch = async () => {
    try{
        const res = await axios.get(`${Staff}/round_eva`,{headers:{Authorization : `Bearer ${token}`}})
        result.value = res.data
    }catch(err){
        console.error('Error Fetching',err)
    }
}

const saveMember = async () =>{
    try{
        if(form.value.id_sys){
            await axios.put(`${Staff}/round_eva/${form.value.id_sys}`,form.value,{headers:{Authorization : `Bearer ${token}`}})
        }else{
            await axios.post(`${Staff}/round_eva`,form.value,{headers:{Authorization : `Bearer ${token}`}})
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

const del = async (id_sys) => {
    try{
        if(!confirm('ต้องการลบใช่หรือไม่')) return
        await axios.delete(`${Staff}/round_eva/${id_sys}`,{headers:{Authorization : `Bearer ${token}`}})
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