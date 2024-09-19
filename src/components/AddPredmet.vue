<template>
  <div class="p-1">
    <h3>Dodaj predmet</h3>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="predmetId" class="label">Izaberite predmet: </label>
        <select name="predmetId" id="predmetId" v-model="predmetId">
          <option disabled>Odaberite predmet</option>
          <option v-for="predmet in predmets" :key="predmet.idPredmeta" :value="predmet.idPredmeta">
            {{ predmet.naziv }}
          </option>
        </select>
        <span v-show="predmetIdErr" class="input-error">{{ predmetIdErr }}</span>
      </div>

      <div>
        <label for="skolskaGodina" class="label">Školska godina: </label>
        <input type="text" id="skolskaGodina" name="skolskaGodina" v-model="skolskaGodina" />
        <span v-show="skolskaGodinaErr" class="input-error">{{ skolskaGodinaErr }}</span>
      </div>

      <button type="submit">Snimi</button>
    </form>

    <message v-show="success" type="success" @close="success = false">
      Uspesno sacuvan predmet studenta.
    </message>
    <message v-show="error" type="error" @close="error = false">{{ error }}</message>
  </div>
</template>

<script setup>
import { predmetService } from '@/services/predmetService'
import { studentPredmetService } from '@/services/studentPredmetService'
import { onMounted, ref } from 'vue'
import Message from './Message.vue'

const { studentId } = defineProps(['studentId'])
const emit = defineEmits(['refetchPredmets'])

const predmets = ref([])
const skolskaGodina = ref()
const predmetId = ref()

const skolskaGodinaErr = ref(false)
const predmetIdErr = ref(false)

const success = ref(false)
const error = ref(false)

async function handleSubmit() {
  skolskaGodinaErr.value = false
  predmetIdErr.value = false

  if (!skolskaGodina.value) skolskaGodinaErr.value = 'Skolska godina obavezna'
  // if (skolskaGodina.value?.length > 7)
  //   skolskaGodinaErr.value = 'Duzina mora biti manja od 7 karaktera'
  if (!predmetId.value) predmetIdErr.value = 'Predmet je obavezan'

  if (skolskaGodinaErr.value || predmetIdErr.value) return

  success.value = false
  error.value = false
  try {
    await studentPredmetService.postSP(studentId, predmetId.value, skolskaGodina.value)
    emit('refetchPredmets')
    success.value = true
  } catch (err) {
    console.error(err)
    error.value = err.status === 409 ? 'Predmet vec postoji' : 'Greska pri cuvanju'
  }
}

onMounted(async () => {
  const predmetsResponse = await predmetService.getAllPredmets()
  predmets.value = predmetsResponse
})
</script>
<style>
.label {
  font-size: 1.2rem;
}
.p-1 {
  padding: 1rem 0;
}
</style>
