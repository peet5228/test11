<template>
    <v-container fluid class="py-10">
                <v-card class="pa-4">
                    <h1 class="text-center text-h5 font-weight-bold text-maroon">จัดการตัวชี้วัด</h1>
                    <v-form @submit.prevent="saveMember">
                        <v-row class="mt-4">
                            <v-col cols="12" md="6">
                                <v-select v-model="form.id_topic" :items="topic.map(m => ({title:m.name_topic,value:m.id_topic}))" :error-messages="error.id_topic" label="หัวข้อการประเมิน" />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="form.name_indicate" :error-messages="error.name_indicate" label="ชื่อตัวชี้วัด" />
                            </v-col>
                            <v-col cols="12" md="12">
                                <v-textarea rows="3" v-model="form.detail_indicate" :error-messages="error.detail_indicate" label="รายละเอียด" />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-select rows="3" v-model="form.point_indicate" :items="['1','2','3','4','5']" :error-messages="error.point_indicate" label="น้ำหนักคะแนน" />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-select rows="3" v-model="form.check_indicate" :items="[{title:'มี',value:'y'},{title:'ไม่มี',value:'n'}]" :error-messages="error.check_indicate" label="ลักษณะตัวเลือกคะแนน" />
                            </v-col>
                            <v-col cols="12" md="6" class="text-center">
                                <v-btn class="text-white w-full" color="blue" type="submit">{{ form.id_indicate ? 'อัปเดต' : 'บันทึก' }}</v-btn>
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
                                <th class="text-center border">ตัวชี้วัด</th>
                                <th class="text-center border">รายละเอียด</th>
                                <th class="text-center border">น้ำหนักคะแนน</th>
                                <th class="text-center border">ลักษณะตัวเลือกคะแนน</th>
                                <th class="text-center border">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(items,index) in result" :key="items.id_indicate">
                                <td class="text-center border">{{ index+1 }}</td>
                                <td class="text-center border">{{ items.name_topic }}</td>
                                <td class="text-center border">{{ items.name_indicate }}</td>
                                <td class="text-center border">{{ items.detail_indicate }}</td>
                                <td class="text-center border">{{ items.point_indicate }}</td>
                                <td class="text-center border">{{ items.check_indicate === 'y' ? 'มี' : 'ไม่มี' }}</td>
                                <td class="text-center border">
                                    <v-btn class="text-white" color="warning" size="small" @click="edit(items)">แก้ไข</v-btn>&nbsp;
                                    <v-btn class="text-white" color="error" size="small" @click="del(items.id_indicate)">ลบ</v-btn>
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
    id_indicate:null,
    id_toic:'',
    name_indicate:'',
    detail_indicate:'',
    point_indicate:'',
    check_indicate:'',
})

const reset = () => {
    form.value = {
        id_indicate:null,
        id_toic:'',
        name_indicate:'',
        detail_indicate:'',
        point_indicate:'',
        check_indicate:'',
    }
}

const fetch = async () => {
    try{
        const t = await axios.get(`${Staff}/topic`,{headers:{Authorization : `Bearer ${token}`}})
        topic.value = t.data
        const res = await axios.get(`${Staff}/indicate`,{headers:{Authorization : `Bearer ${token}`}})
        result.value = res.data
    }catch(err){
        console.error('Error Fetching',err)
    }
}

const error = ref<Record<string,string>>({})

function vaildateForm(){
    error.value = {}
    const f = form.value
    if(!f.id_topic)error.value.id_topic='กรุณาเลือกหัวข้อการประเมิน'
    if(!f.name_indicate)error.value.name_indicate='กรุณากรอกชื่อตัวชี้วัด'
    if(!f.detail_indicate)error.value.detail_indicate='กรุณากรอกรายละเอียด'
    if(!f.point_indicate)error.value.point_indicate='กรุณาเลือกน้ำหนักคะแนน'
    if(!f.check_indicate)error.value.check_indicate='กรุณาเลือกลักษณะตัวเลือกคะแนน'
    return Object.keys(error.value).length === 0
}

const saveMember = async () =>{
    if(!vaildateForm()) return
    try{
        if(form.value.id_indicate){
            await axios.put(`${Staff}/indicate/${form.value.id_indicate}`,form.value,{headers:{Authorization : `Bearer ${token}`}})
        }else{
            await axios.post(`${Staff}/indicate`,form.value,{headers:{Authorization : `Bearer ${token}`}})
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

const del = async (id_indicate) => {
    try{
        if(!confirm('ต้องการลบใช่หรือไม่')) return
        await axios.delete(`${Staff}/indicate/${id_indicate}`,{headers:{Authorization : `Bearer ${token}`}})
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