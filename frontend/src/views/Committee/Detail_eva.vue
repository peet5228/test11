<template>
    <v-container>
        <v-row >
            <v-col cols="12">
                <v-form v-if="user.status_eva === 2 || user.status_eva === 3">
                    <h1 class="text-h5 font-weight-bold">แบบประเมินตนเอง</h1>
                        <v-card class="pa-3">
                        <p>ชื่อ-นามสกุล : {{user.first_name}} {{user.last_name}} </p>
                        <p>รอบประเมินที่ : {{user.round_sys}} ปี {{user.year_sys}} </p>
                    </v-card>
                    <v-row v-for="(topic,i1) in topics" :key="topic.id_topic" class="mt-2">
                        <v-col cols="12">
                            <h1 class="text-h6 font-weight-bold"> {{i1+1}}.{{topic.name_topic}} </h1>
                            <v-table class="table">
                                    <tr>
                                        <th class="border bg-grey py-2 text-center w-1/10">ตัวชี้วัด</th>
                                        <th class="border bg-grey py-2 text-center w-1/10">รายละเอียดตัวชี้วัด</th>
                                        <th class="border bg-grey py-2 text-center w-1/10">น้ำหนักคะแนน</th>
                                        <th class="border bg-grey py-2 text-center w-1/10">คะแนนเต็ม</th>
                                        <th class="border bg-grey py-2 text-center w-1/10">คะแนนที่ได้</th>
                                    </tr>

                                    <tr v-for="indicate in topic.indicates" :key="indicate.id_indicate">
                                        <td class="border py-2 text-center">{{indicate.name_indicate}}</td>
                                        <td class="border py-2 text-center">{{indicate.detail_indicate}}</td>
                                        <td class="border py-2 text-center">{{indicate.point_indicate}}</td>
                                        <td class="border py-2 text-center">{{indicate.point_indicate*4}}</td>
                                        <td class="border py-2 text-center">{{indicate.score_member*indicate.point_indicate}}</td>
                                    </tr>
                            </v-table>
                        </v-col>
                    </v-row>
                    <div class="mt-4 text-center">
                        <v-card color="success" class="text-end px-2 py-2">คะแนนรวมสุทธิ : {{totalScore || 0 }} คะแนน </v-card>
                    </div>
                </v-form>
                <v-alert type="info" v-else-if="user.status_eva === 1">คุณยังไม่ได้กรอกแบบประเมิน</v-alert>
                <v-alert type="warning" v-else>คุณยังไม่มีแบบประเมิน</v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import {ref,onMounted,computed} from 'vue'
import axios from 'axios'
import {Commit} from '@/api/API'
import {useRouter,useRoute} from 'vue-router'
const router = useRouter()
const id_eva = useRoute().params.id_eva
const token = localStorage.getItem('token')
const user = ref({})
const topics = ref([])
const totalScore = ref(0)
const fetchUser = async () =>{
    try{
        const res = await axios.get(`${Commit}/detail_eva/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        user.value = res.data
    }catch(err){
        console.error('โหลดไม่สำเร็จ',err)
    }
}

const fetchTopics = async () =>{
    try{
        const res = await axios.get(`${Commit}/detail_eva/indicate/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        topics.value = res.data
        res.data.forEach(score =>
            score.indicates.forEach((i) =>{
                totalScore.value += (i.score_member)*(i.point_indicate)
            })
        )
    }catch(err){
        console.error('โหลดไม่สำเร็จ',err)
    }
}
onMounted(async () =>{
    await Promise.all([fetchTopics(),fetchUser(),])
})

</script>

<style scoped>
.btn-maroon{
    background-color: #7d0c14;
}
.text-maroon{
    color: #7d0c14;
}
</style>