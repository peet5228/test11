<template>
    <v-container>
        <v-row >
            <v-col cols="12">
                <v-card class="pa-4">
                    <h1 class="text-center text-h5 font-weight-bold text-maroon">แก้ไขข้อมูลส่วนตัว</h1>
                    <v-form @submit.prevent="saveMember">
                        <v-row class="mt-4">
                            <v-col cols="12" md="6">
                                <v-text-field v-model="form.first_name" :error-messages="error.first_name" label="ชื่อ"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="form.last_name" :error-messages="error.last_name" label="นามสกุล"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="form.email" :error-messages="error.email" label="อีเมล"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="form.username" :error-messages="error.username" label="ชื่อผู้ใช้"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="newPassword" :error-messages="error.password" type="password" label="รหัสผ่าน"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="confirmPassword" :error-messages="error.confirmPassword" type="password" label="ยืนยันรหัสผ่าน"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-alert> {{form.role}} </v-alert>
                            </v-col>
                            <v-col cols="12" class="text-center">
                                <v-btn class="btn-maroon text-white" type="submit">แก้ไข</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import {ref,onMounted} from 'vue'
import axios from 'axios'
import {Eva} from '@/api/API'
import {useRouter} from 'vue-router'
const router = useRouter()
const form = ref({
    first_name:'',
    last_name:'',
    email:'',
    username:'',
    password:'',
    role:'',
})
const error = ref<Record<string,string>>({})
const newPassword = ref('')
const confirmPassword = ref('')
const emailReget = /^[^\s]+@[^\s]+\.[^\s]{2,}$/i
const token = localStorage.getItem('token')
function vaildateForm(){
    error.value = {}
    const f = form.value
    if(!f.first_name.trim())error.value.first_name='กรุณากรอกชื่อ'
    if(!f.last_name.trim())error.value.last_name='กรุณากรอกนามสกุล'
    if(!f.email.trim())error.value.email='กรุณากรอกอีเมล'
    else if(!emailReget.test(f.email))error.value.email='รูปแบบอีเมลไม่ถูกต้อง'
    if(!f.username.trim())error.value.username='กรุณากรอกชื่อผู้ใช้'
    else if(f.username.trim().length < 4)error.value.username='ต้องมีอย่างน้อย 4 ตัวษร'
    if(newPassword.value.trim()){
         if(newPassword.value.trim().length < 6)error.value.newPassword='ต้องมีอย่างน้อย 6 ตัวษร'
        if(!confirmPassword.value.trim())error.value.confirmPassword='กรุณายืนยันรหัสผ่าน'
        else if(confirmPassword.value.trim() != newPassword.value.trim())error.value.confirmPassword='รหัสผ่านไม่ตรงกัน'
    }
   
    if(!f.role.trim())error.value.role='กรุณาเลือกประเภทสมาชิก'
    return Object.keys(error.value).length === 0
}
const fetchUser = async () =>{
    try{
        const res = await axios.get(`${Eva}/me`,{headers:{Authorization:`Bearer ${token}`}})
        form.value = res.data
    }catch(err){
        console.error('โหลดไม่สำเร็จ',err)
    }
}

const saveMember = async () =>{
    if(!vaildateForm())return
    const f = form.value
    const usePassword = newPassword.value.trim() ? newPassword.value.trim() : f.password
    const payload = {
        first_name:f.first_name,
        last_name:f.last_name,
        email:f.email,
        username:f.username,
        password:usePassword,
    }
    try{
        await axios.put(`${Eva}/me`,payload,{headers:{Authorization:`Bearer ${token}`}})
        alert('แก้ไขสำเร็จ')
        localStorage.removeItem('token')
        router.push({path:'/login'})
    }catch(err){
        console.error('แก้ไขไม่สำเร็จ',err)
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