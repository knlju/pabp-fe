<template>
  <tr>
    <td>
      <input type="text" v-model="imeInputValue" />
      <span v-show="imeError" class="input-error">Ime je obavezno</span>
    </td>
    <td>
      <input type="text" v-model="prezimeInputValue" />
      <span v-show="prezimeError" class="input-error">Prezime je obavezno</span>
    </td>
    <td>{{ student.brojIndeksa }}</td>
    <td>{{ student.prosek !== 0 ? student.prosek.toFixed(1) : null }}</td>
    <td>
      <button @click.prevent="handleSubmit">Sacuvaj</button>
      <button @click="$emit('toggleEdit')" class="otkazi">Otkazi</button>
    </td>
  </tr>
</template>
<script setup>
import { ref } from 'vue'

const { student } = defineProps(['student'])
const emit = defineEmits(['submit', 'toggleEdit'])

const { ime, prezime } = student

const imeInputValue = ref(ime)
const prezimeInputValue = ref(prezime)

const imeError = ref(false)
const prezimeError = ref(false)

function handleSubmit() {
  imeError.value = false
  prezimeError.value = false

  imeError.value = !imeInputValue.value
  prezimeError.value = !prezimeInputValue.value

  if (imeError.value || prezimeError.value) return
  emit('submit', imeInputValue, prezimeInputValue)
}
</script>
<style>
button {
  margin-right: 1rem;
}

.p-0 {
  padding: 0;
}

.otkazi {
  background-color: #ffc107;
  font-weight: bold;
}
</style>
