<template>
    <v-container>
        <v-row >
            <v-col cols="12">
                <v-form v-if="user.status_eva === 1" @submit.prevent="saveScore">
                    <h1 class="text-h5 font-weight-bold">แบบประเมินตนเอง</h1>
                        <v-card class="pa-3">
                        <p>ชื่อ-นามสกุล : {{user.first_name}} {{user.last_name}} </p>
                        <p>รอบประเมินที่ : {{user.round_sys}} ปี {{user.year_sys}} </p>
                    </v-card>
                    <v-row v-for="(topic,i1) in topics" :key="topic.id_topic" class="mt-2">
                        <v-col cols="12">
                            <h1 class="text-h6 font-weight-bold"> {{i1+1}}.{{topic.name_topic}} </h1>
                            <v-card class="pa-3">
                                <v-row v-for="(indicate,i2) in topic.indicates" :key="indicate.id_indicate">
                                    <v-col cols="12">
                                        <p>
                                            {{i1+1}}.{{i2+1}} {{indicate.name_indicate}} น้ำนักคะแนน : {{indicate.point_indicate}} คะแนนเต็ม : {{indicate.point_indicate*4}} รายละเอียดตัวชี้วัด : {{indicate.detail_indicate}}
                                        </p>
                                        <v-textarea label="คำอธิบายเพิ่มเติม(ถ้ามี)" rows="2" v-model="indicate.detail_eva"></v-textarea>
                                        <v-file-input label="แนบไฟล์" @change="onFileChange($event,topic.id_topic,indicate.id_indicate)" accept="image/*,.pdf"></v-file-input>
                                        <v-select v-if="indicate.check_indicate === 'y'" :items="[1,2,3,4]" label="ใส่คะแนนประเมิน 1-4" v-model="indicate.score"></v-select>
                                        <v-text-field v-else type="number" label="ใส่คะแนนประเมิน 1-4" v-model="indicate.score"></v-text-field>
                                    </v-col>
                                </v-row>
                           </v-card>
                        </v-col>
                    </v-row>
                    <div class="mt-4 text-center">
                        <v-btn type="submit" color="blue">บันทึกคะแนน</v-btn><br><br><br>
                    </div>
                </v-form>
                <v-alert type="success" v-else-if="user.status_eva === 2 || user.status_eva === 3">คุณกรอกแบบประเมินแล้ว</v-alert>
                <v-alert type="warning" v-else>คุณยังไม่มีแบบประเมิน</v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import {ref,onMounted,computed} from 'vue'
import axios from 'axios'
import {Eva} from '@/api/API'
import {useRouter} from 'vue-router'
const router = useRouter()
const token = localStorage.getItem('token')
const user = ref({})
const topics = ref([])
const fetchUser = async () =>{
    try{
        const res = await axios.get(`${Eva}/selfeva`,{headers:{Authorization:`Bearer ${token}`}})
        user.value = res.data
    }catch(err){
        console.error('โหลดไม่สำเร็จ',err)
    }
}

const fetchTopics = async () =>{
    try{
        const res = await axios.get(`${Eva}/selfeva/indicate`,{headers:{Authorization:`Bearer ${token}`}})
        topics.value = res.data
    }catch(err){
        console.error('โหลดไม่สำเร็จ',err)
    }
}
onMounted(async () =>{
    await Promise.all([fetchTopics(),fetchUser(),])
})
const fileMap = ref<Record<string,string>>({})
const onFileChange = (event:Event,id_topic:number,id_indicate:number) =>{
    const file = (event.target as HTMLInputElement)?.files?.[0]
    fileMap.value[`${id_topic}-${id_indicate}`] = file
}
const saveScore = async () =>{
    const formData = new FormData()
    const allScore = topics.value.flatMap(topic =>
        topic.indicates.map((i:any) =>{
            const key = `${topic.id_topic}-${i.id_indicate}`
            const file = fileMap.value[key]
            if(file) formData.append(`file_${key}`,file)
            return{
                id_topic:topic.id_topic,
                id_indicate:i.id_indicate,
                score:i.score,
                detail_eva:i.detail_eva,
                file_key:file ? `file_${key}` : null,
            }
        })
    )
    if(allScore.some((s) => !s.score)){
        alert('กรุณาใส่คะแนนให้ครบ')
        return
    }
    formData.append('scores',JSON.stringify(allScore))
    try{
        await axios.post(`${Eva}/selfeva`,formData,{headers:{Authorization:`Bearer ${token}`}})
        alert('บันทึกคะแนนสำเร็จ')
        await Promise.all([fetchTopics(),fetchUser()])
    }catch(err){
        console.error('บันทึกคะแนนไม่สำเร็จ',err)
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