<script setup>
import { ref } from 'vue'
import StudentList from './components/StudentList.vue'
import SingleStudent from './components/SingleStudent.vue'

const currentView = ref('table')
const student = ref(null)

const setStudent = (newStudent) => {
  currentView.value = 'student'
  student.value = newStudent
}

const goBack = () => {
  currentView.value = 'table'
  student.value = null
}
</script>

<template>
  <student-list v-if="currentView === 'table'" @setStudent="setStudent" />
  <single-student v-else :student="student" @goBack="goBack" />
</template>

<style>
@import 'styles.css';
</style>
