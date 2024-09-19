<template>
  <div :class="`alert ${type}`">
    <span class="closebtn" @click="$emit('close')">&times;</span>
    <slot />
  </div>
</template>
<script setup>
const { type } = defineProps({
  message: String,
  type: String,
  close: Function
})

const { close } = defineEmits(['close'])
</script>
<style>
.alert {
  padding: 20px;
}

.success {
  background-color: #0b941e;
  color: white;
}

.error {
  background-color: #f44336;
  color: white;
}

.closebtn {
  color: white;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
}
</style>
