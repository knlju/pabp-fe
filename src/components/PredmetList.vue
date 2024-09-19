<template>
  <div>
    <h2>Predmeti studenta</h2>
    <add-predmet :studentId="studentId" @refetchPredmets="getPredmets" />

    <div>
      <message
        v-if="predmetDeletedMessage"
        :type="predmetDeletedMessage.tip"
        @close="predmetDeletedMessage = false"
      >
        {{ predmetDeletedMessage.poruka }}
      </message>
    </div>

    <div style="margin-bottom: 16px">
      <label for="predmeti" class="big">Tip predmeta:</label>
      <select name="predmeti" id="predmeti" v-model="showNepolozenePredmete">
        <option :value="false">Svi predmeti</option>
        <option :value="true">Nepoloženi</option>
      </select>
    </div>

    <table>
      <thead>
        <tr>
          <th>Naziv</th>
          <th>ESPB</th>
          <th>Status</th>
          <th>Školska godina</th>
          <th>Akcija</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="predmets.length === 0">
          <td colspan="5">Nema predmeta</td>
        </tr>
        <predmet
          v-else
          v-for="{ predmet, skolskaGodina } in predmets"
          :key="`${studentId}-${predmet.idPredmeta}-${skolskaGodina}`"
          :studentPredmet="{ ...predmet, skolskaGodina, studentId }"
          @refetchPredmets="getPredmets"
          @deleteMessage="deleteMessage"
        />
      </tbody>
    </table>
  </div>
</template>

<script setup>
import Predmet from './Predmet.vue'
import Message from './Message.vue'
import AddPredmet from './AddPredmet.vue'
import { studentPredmetService } from '@/services/studentPredmetService'
import { onMounted, ref, watch } from 'vue'

const { studentId } = defineProps({
  studentId: {
    required: true
  }
})

const predmets = ref([])
const predmetDeletedMessage = ref()
const showNepolozenePredmete = ref(false)

onMounted(async () => {
  await getPredmets()
})

watch(showNepolozenePredmete, () => {
  getPredmets()
})

async function getPredmets() {
  let predmetsResponse

  if (showNepolozenePredmete.value) {
    predmetsResponse = await studentPredmetService.getUnpassedByStudentId(studentId)
  } else {
    predmetsResponse = await studentPredmetService.getByStudentId(studentId)
  }

  console.log(predmetsResponse)

  predmets.value = predmetsResponse.map((el) => ({ ...el }))
}

async function deleteMessage(poruka, tip) {
  console.log(poruka, tip)
  predmetDeletedMessage.value = { poruka, tip }
  if (tip == 'success') getPredmets()
}
</script>
<style>
.big {
  font-size: 1rem;
}
</style>
