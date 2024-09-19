<template>
  <student-data
    @toggleEdit="isEdit = !isEdit"
    v-if="!isEdit"
    :student="student"
    @setStudent="(data) => $emit('setStudent', data)"
  />
  <edit-student
    @toggleEdit="isEdit = !isEdit"
    v-else
    :student="student"
    @submit="handleEditStudent"
  />

  <tr v-show="success || error" class="message-row">
    <td colspan="5">
      <message v-show="success" type="success" @close="success = false">Uspešno sačuvano!</message>
      <message v-show="error" type="error" @close="error = false">Greška pri čuvanju!</message>
    </td>
  </tr>
</template>

<script setup>
import Message from './Message.vue'
import StudentData from './StudentData.vue'
import EditStudent from './EditStudent.vue'
import { ref } from 'vue'
import { studentService } from '@/services/studentService'

const emit = defineEmits(['setStudent', 'refetchStudents'])

const { student } = defineProps({
  student: Object
})
const isEdit = ref(false)

const loading = ref(false)
const error = ref(false)
const success = ref(false)

async function handleEditStudent(imeInputValue, prezimeInputValue) {
  loading.value = true
  error.value = false
  success.value = false
  try {
    const response = await studentService.patch(student.id, {
      ime: imeInputValue.value || undefined,
      prezime: prezimeInputValue.value || undefined
    })

    success.value = true
    emit('refetchStudents')
    isEdit.value = !isEdit.value
    console.log(response)
  } catch (err) {
    console.error(err)
    error.value = true
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
tr {
  cursor: pointer;
}
.message-row > td {
  padding: 0;
}
</style>
