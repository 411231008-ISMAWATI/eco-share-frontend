<template>
  <div class="card stat-card shadow-sm border-0 h-100">

    <div class="card-body d-flex justify-content-between align-items-center">

      <div>

        <p class="text-muted mb-1">
          {{ title }}
        </p>

        <h3 class="fw-bold mb-0">
          {{ value }}
        </h3>

      </div>

      <div
        class="icon-wrapper"
        :class="bgClass"
      >
        <i :class="icon"></i>
      </div>

    </div>

  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },

  value: {
    type: [String, Number],
    default: 0,
  },

  icon: {
    type: String,
    default: "bi bi-box",
  },

  color: {
    type: String,
    default: "success",
  },
});

const bgClass = computed(() => {
  return `bg-${props.color}`;
});
</script>

<style scoped>

.stat-card{
    border-radius:18px;
    transition:all .3s ease;
}

.stat-card:hover{
    transform:translateY(-5px);
}

.icon-wrapper{

    width:60px;
    height:60px;

    border-radius:15px;

    display:flex;
    align-items:center;
    justify-content:center;

    color:white;

    font-size:26px;

}

h3{
    font-size:30px;
}

p{
    font-size:14px;
}

</style>