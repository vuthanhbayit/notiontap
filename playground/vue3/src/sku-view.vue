<template>
  <div>sku: {{ id }}</div>
</template>

<script lang="ts" setup>
interface Props {
  id: string
}

const props = defineProps<Props>()
</script>
