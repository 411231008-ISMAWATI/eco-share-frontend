<template>
  <div
    class="alert alert-danger d-flex align-items-center"
    role="alert"
  >

    <i class="bi bi-exclamation-triangle-fill me-2"></i>

    <div>
      {{ message }}
    </div>

  </div>
</template>

<script setup>

defineProps({

  message: {
    type: String,
    default: "Terjadi kesalahan.",
  },

});

</script>

<style scoped>

.alert{

    border-radius:12px;

    font-size:15px;

}

</style>