<template>
  <slot name="boxAll">
    <test-slot>
      <template #testBody>
        <slot name="boxSolt"></slot>
      </template>
    </test-slot>
  </slot>
</template>
<script setup>
import TestSlot from "./TestSlot.vue";
</script>
