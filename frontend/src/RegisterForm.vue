<template>
    <v-container fluid class='fill-height'>
        <v-row justify='center' align='center'>
            <v-col cols='12' md='8' lg='6'>
                <v-card class='pa-4'>
                    <h1 class='text-center text-h5 font-weight-bold text-maroon'>สมัครสมาชิก</h1>
                    <p class='text-center text-sm mt-2'>ระบบประเมินบุคลากรวิทยาลัยเทคนิคน่าน</p>
                    <v-form @submit.pervent="saveMember">
                        <v-row class='mt-4'>
                            <v-col cols='12' md='6'>
                                <v-text-field v-model='form.first_name' :error-messages='error.first_name' label='ชื่อ'></v-text-field>
                            </v-col>
                            <v-col cols='12' md='6'>
                                <v-text-field v-model='form.last_name' :error-messages='error.last_name' label='นามสกุล'></v-text-field>
                            </v-col>
                            <v-col cols='12' md='6'>
                                <v-text-field v-model='form.email' :error-messages='error.email' label='อีเมล'></v-text-field>
                            </v-col>
                            <v-col cols='12' md='6'>
                                <v-text-field v-model='form.username' :error-messages='error.username' label='ชื่อผู้ใช้'></v-text-field>
                            </v-col>
                            <v-col cols='12' md='6'>
                                <v-text-field v-model='form.first_name' :error-messages='error.first_name' label='รหัสผ่าน'></v-text-field>
                            </v-col>
                            <v-col cols='12' md='6'>
                                <v-text-field v-model='confirmPassword' :error-messages='error.confirmPassword' label='ยืนยันรหัสผ่าน'></v-text-field>
                            </v-col>
                            <v-col cols='12'>
                                <v-text-field v-model='form.role' :error-messages='error.role' label='เลือกประเภทสมาชิก'></v-text-field>
                            </v-col>
                            <v-col cols='12' class='text-center'>
                                <v-btn class='btn-maroon text-white' type='submit'>สมัคร</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import axios from 'axios'
const form = ref({
    first_name:'',
    last_name:'',
    email:'',
    username:'',
    password:'',
    role:'',
})
const error = ref<Record<string,string>>({})
const confirmPassword = ref('')
function validateForm(){
    error.value = {}
    const f = form.value
    if(!f.first_name.trim())error.value.first_name='กรุณากรอกชื่อ'
    if(!f.last_name.trim())error.value.last_name='กรุณากรอกนามสกุล'
    if(!f.email.trim())error.value.email='กรุณากรอกอีเมล'
    if(!f.username.trim())error.value.username='กรุณากรอกชื่อผู้ใช้'
    if(!f.password.trim())error.value.password='กรุณากรอกรหัสผ่าน'
    if(!confirmPassword.value.trim())error.value.confirmPassword='กรุณายืนยันรหัสผ่าน'
    if(!f.role.trim())error.value.role='กรุณาเลือกประเภทสมาชิก'
    return Object.keys(error.value).length === 0
}
const saveMember = async () =>{
    if(!validateForm())return
    try{
        await axios.get()
    }
}


</script>

<style scoped>
.btn-maroon{
    background-color: #7d0c14;
}
.text-maroon{
    color: #7d0c14;
}
</style>