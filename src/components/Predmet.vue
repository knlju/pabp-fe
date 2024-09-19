<template lang="">
  <tr>
    <td>{{ studentPredmet.naziv }}</td>
    <td>{{ studentPredmet.espb }}</td>
    <td>{{ studentPredmet.status }}</td>
    <td>{{ studentPredmet.skolskaGodina }}</td>
    <td>
      <button @click="deleteSP" class="delete-btn">🗑 Brisi</button>
    </td>
  </tr>
</template>
<script setup>
import { studentPredmetService } from '@/services/studentPredmetService'

const { studentPredmet } = defineProps(['studentPredmet'])

const emit = defineEmits(['deleteMessage'])

async function deleteSP() {
  try {
    await studentPredmetService.deleteSP(
      studentPredmet.studentId,
      studentPredmet.idPredmeta,
      studentPredmet.skolskaGodina
    )
    emit('deleteMessage', `Predmet ${studentPredmet.naziv} uspesno obrisan`, 'success')
  } catch (err) {
    console.log(err)
    if (err.status === 409) {
      emit(
        'deleteMessage',
        `${studentPredmet.naziv} ${studentPredmet.skolskaGodina} vec polozen`,
        'error'
      )
      return
    }
    emit('deleteMessage', `Greska pri brisanju predmeta ${studentPredmet.naziv}`, 'error')
  }
}
</script>
<style>
.delete-btn {
  background-color: #d32f2f;
}
</style>
