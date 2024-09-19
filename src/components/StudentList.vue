<template>
  <div>
    <div style="margin-bottom: 16px">
      <h1>Studenti</h1>
    </div>
    <pretraga-studenta @search="searchStudents" />
    <table>
      <thead>
        <tr>
          <th>Ime</th>
          <th>Prezime</th>
          <th>Broj Indeksa</th>
          <th>Prosek</th>
          <th>Akcija</th>
        </tr>
      </thead>
      <tbody>
        <student
          v-for="student in students"
          :key="student.id"
          :student="student"
          @setStudent="(data) => $emit('setStudent', data)"
          @refetchStudents="fetchStudents"
        />
      </tbody>
    </table>
  </div>
</template>

<script setup>
import Student from './Student.vue'
import PretragaStudenta from './PretragaStudenta.vue'
import { studentService } from '../services/studentService'
import { onMounted, ref } from 'vue'

const emit = defineEmits(['setStudent'])
const students = ref([])
const search = ref()

async function searchStudents(newSearch) {
  search.value = newSearch
  await fetchStudents()
}

async function fetchStudents() {
  try {
    const studentsResponse = await studentService.pretraga(search.value)
    students.value = studentsResponse.map((student) => ({ ...student }))
    console.log('success', studentsResponse)
  } catch (error) {
    console.error('Error fetching students', error)
  }
}

onMounted(async () => {
  await fetchStudents()
})
</script>
