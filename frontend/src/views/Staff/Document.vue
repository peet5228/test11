<template>
    <v-container fluid class="py-10">
                <v-card class="pa-4">
                    <h1 class="text-center text-h5 font-weight-bold text-maroon">แนบเอกสารสำหรับการประเมิน</h1>
                    <v-form @submit.prevent="saveMember">
                        <v-row class="mt-4">
                            <v-col cols="12" md="12">
                                <v-text-field v-model="name_doc" label="ชื่อเอกสาร" />
                            </v-col>
                            <v-col cols="12" md="12">
                                <v-file-input v-model="file" accept=".png,.pdf,.doc,.docx,image/*" label="ไฟล์" />
                            </v-col>
                            <v-col cols="12" md="6" class="text-center">
                                <v-btn class="text-white w-full" color="blue" type="submit">บันทึก</v-btn>
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
                                <th class="text-center border">ชื่อเอกสาร</th>
                                <th class="text-center border">วันที่เพิ่มเอกสาร</th>
                                <th class="text-center border">ไฟล์</th>
                                <th class="text-center border">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(items,index) in result" :key="items.id_doc">
                                <td class="text-center border">{{ index+1 }}</td>
                                <td class="text-center border">{{ items.name_doc }}</td>
                                <td class="text-center border">{{ items.day_doc }}</td>
                                <td class="text-center border">
                                    <v-btn color="warning" class="text-white" @click="view(items.file)">เปิดดู</v-btn>
                                </td>
                                <td class="text-center border">
                                    <v-btn class="text-white" color="error" size="small" @click="del(items.id_doc)">ลบ</v-btn>
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

const name_doc = ref('')
const file = ref<File | null>(null)

const fetch = async () => {
    try{
        const res = await axios.get(`${Staff}/doc`,{headers:{Authorization : `Bearer ${token}`}})
        result.value = res.data
    }catch(err){
        console.error('Error Fetching',err)
    }
}
const saveMember = async () =>{
    if(!name_doc.value || !file.value) return alert('กรุณากรอกชื่อเอกสารและเพิ่มไฟล์')
    try{
        const formData = new FormData()
        formData.append('name_doc',name_doc.value)
        formData.append('file',file.value)
        await axios.post(`${Staff}/doc`,formData,{headers:{Authorization : `Bearer ${token}`}})
        alert('ทำรายการสำเร็จ')
        await fetch()
    }catch(err){
        console.error('ทำรายการไม่สำเร็จ',err)
    }
}

const edit = (items) => {
    form.value = {...items}
}

const del = async (id_doc) => {
    try{
        if(!confirm('ต้องการลบใช่หรือไม่')) return
        await axios.delete(`${Staff}/doc/${id_doc}`,{headers:{Authorization : `Bearer ${token}`}})
        await fetch()
    }catch(err){
        console.error('Error Delete')
    }
}

const view = (filename) => {
    const url = new URL (`/uploads/document/${filename}`,Staff).href
    window.open(url,'_blank')
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