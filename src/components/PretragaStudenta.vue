<template>
  <table>
    <caption>
      Pretraga studenata
    </caption>
    <thead>
      <tr>
        <th>Ime</th>
        <th>Prezime</th>
        <th>Broj</th>
        <th colspan="2">Smer</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><input v-model="search.ime" placeholder="Ime" /></td>
        <td><input v-model="search.prezime" placeholder="Prezime" /></td>
        <td><input v-model="search.broj" placeholder="Broj" /></td>
        <td><input v-model="search.smer" placeholder="Smer" /></td>
        <td><button @click="$emit('search', search)">Pretrazi</button></td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['search'])

const search = ref({ ime: '', prezime: '', broj: '', smer: '' })
</script>
