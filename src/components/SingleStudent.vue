<template>
  <div style="padding: 16px">
    <button @click="$emit('goBack')">⤺ Nazad na tabelu</button>

    <div style="margin-top: 16px">
      <h1>Student</h1>
      <div><strong>Ime:</strong> {{ student.ime }}</div>
      <div><strong>Prezime:</strong> {{ student.prezime }}</div>
      <div><strong>Broj Indeksa:</strong> {{ student.brojIndeksa }}</div>
      <div><strong>Prosek:</strong> {{ student.prosek }}</div>
    </div>
    <div style="margin-top: 16px">
      <predmet-list :studentId="student.id" />
    </div>
  </div>
</template>
<script setup>
import PredmetList from './PredmetList.vue'

const { student } = defineProps(['student'])
const emit = defineEmits(['goBack'])
</script>

<style scoped></style>
