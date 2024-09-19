<template>
  <tr @click="$emit('setStudent', student)">
    <td>{{ student.ime }}</td>
    <td>{{ student.prezime }}</td>
    <td>{{ student.brojIndeksa }}</td>
    <td>{{ student.prosek !== 0 ? student.prosek.toFixed(1) : null }}</td>
    <td>
      <button @click.stop="$emit('toggleEdit')">Izmeni</button>
    </td>
  </tr>
</template>

<script setup>
const emit = defineEmits(['setStudent', 'toggleEdit'])

const { student } = defineProps({
  student: Object
})
</script>

<style scoped>
tr {
  cursor: pointer;
}
</style>
