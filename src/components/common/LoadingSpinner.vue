<template>
  <div class="loading-container">

    <div
      class="spinner-border text-success"
      role="status"
    >
      <span class="visually-hidden">
        Loading...
      </span>
    </div>

    <p class="mt-3 text-muted">
      Memuat data...
    </p>

  </div>
</template>

<script setup>
// Tidak memerlukan script
</script>

<style scoped>

.loading-container{

    min-height:250px;

    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;

}

.spinner-border{

    width:3rem;
    height:3rem;

}

</style>