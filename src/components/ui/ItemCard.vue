<template>
  <div class="card item-card shadow-sm border-0 h-100">

    <!-- Foto Barang -->
    <img
      :src="imageUrl"
      class="card-img-top item-image"
      alt="Item"
    />

    <div class="card-body d-flex flex-column">

      <!-- Nama -->
      <h5 class="fw-bold text-center">
        {{ item.item_name }}
      </h5>

      <!-- Deskripsi -->
      <p class="text-muted text-center flex-grow-1">
        {{ item.description || "Tidak ada deskripsi." }}
      </p>

      <!-- Harga -->
      <div class="text-center mb-3">

        <span class="badge bg-success fs-6">
          Rp {{ formatPrice(item.price_per_day) }} / hari
        </span>

      </div>

      <!-- Informasi -->
      <div class="mb-3">

        <div class="d-flex justify-content-between mb-2">

          <span class="fw-semibold">
            Stok
          </span>

          <span>
            {{ item.stock }}
          </span>

        </div>

        <div class="d-flex justify-content-between">

          <span class="fw-semibold">
            Status
          </span>

          <span
            class="badge"
            :class="statusClass"
          >
            {{ statusText }}
          </span>

        </div>

      </div>

      <!-- Tombol Admin -->
      <div
        v-if="role === 'admin'"
        class="d-flex gap-2 mt-auto"
      >

        <button
          class="btn btn-warning flex-fill"
          @click="$emit('edit', item)"
        >
          <i class="bi bi-pencil-square me-1"></i>
          Edit
        </button>

        <button
          class="btn btn-danger flex-fill"
          @click="$emit('delete', item)"
        >
          <i class="bi bi-trash me-1"></i>
          Hapus
        </button>

      </div>

      <!-- Tombol User -->
      <button
        v-else
        class="btn btn-success w-100 mt-auto"
        :disabled="!available"
        @click="$emit('rent', item)"
      >

        {{ available ? "Rental Sekarang" : "Stok Habis" }}

      </button>

    </div>

  </div>
</template>

<script setup>
import { computed } from "vue";

import defaultImage from "@/assets/images/default-item.png";

const props = defineProps({

  item: {
    type: Object,
    required: true,
  },

  role: {
    type: String,
    default: "user",
  },

});

defineEmits([
  "edit",
  "delete",
  "rent",
]);

const available = computed(() => props.item.stock > 0);

const statusText = computed(() =>
  available.value
    ? "Tersedia"
    : "Habis"
);

const statusClass = computed(() =>
  available.value
    ? "bg-success"
    : "bg-danger"
);

const imageUrl = computed(() => {

  if (props.item.image) {

    return `http://localhost:3000/uploads/${props.item.image}`;

  }

  return defaultImage;

});

const formatPrice = (price) => {

  return Number(price).toLocaleString("id-ID");

};
</script>

<style scoped>

.item-card{

    border-radius:18px;
    transition:.3s;
    overflow:hidden;

}

.item-card:hover{

    transform:translateY(-6px);

}

.item-image{

    width:100%;
    height:220px;
    object-fit:cover;

}

.card-body{

    display:flex;
    flex-direction:column;

}

p{

    min-height:65px;

}

.btn{

    font-weight:600;

}

.badge{

    padding:8px 12px;

}

</style>