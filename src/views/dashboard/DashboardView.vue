<template>
  <div class="container-fluid">

    <!-- Header -->
    <div class="mb-4">
      <h2 class="fw-bold">
        Dashboard
      </h2>

      <p class="text-muted">
        Selamat datang di EcoShare Rental Management System.
      </p>
    </div>

    <!-- Statistik -->
    <div class="row g-4 mb-5">

      <div class="col-lg-4 col-md-6">
        <StatCard
          title="Total Barang"
          :value="totalItems"
          icon="bi bi-box-seam"
          color="success"
        />
      </div>

      <div class="col-lg-4 col-md-6">
        <StatCard
          title="Sedang Dipinjam"
          :value="borrowedItems"
          icon="bi bi-arrow-left-right"
          color="primary"
        />
      </div>

      <div class="col-lg-4 col-md-6">
        <StatCard
          title="Barang Tersedia"
          :value="availableItems"
          icon="bi bi-check-circle"
          color="warning"
        />
      </div>

    </div>

    <!-- Barang Terbaru -->
    <div class="card shadow-sm border-0">

      <div class="card-header bg-white">
        <h5 class="fw-bold mb-0">
          Barang Terbaru
        </h5>
      </div>

      <div class="card-body">

        <div class="row g-4">

          <div
            v-for="item in latestItems"
            :key="item.id"
            class="col-lg-4 col-md-6"
          >
            <ItemCard
              :item="item"
              :role="auth.role"
              @action="handleItemAction"
            />
          </div>

          <div
            v-if="latestItems.length === 0"
            class="col-12 text-center text-muted py-5"
          >
            Belum ada data barang.
          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";

import StatCard from "@/components/ui/StatCard.vue";
import ItemCard from "@/components/ui/ItemCard.vue";

import { getDashboard } from "@/api/dashboard";

const auth = useAuthStore();

const totalItems = ref(0);
const borrowedItems = ref(0);
const availableItems = ref(0);

const latestItems = ref([]);

const loadDashboard = async () => {
  try {

    const data = await getDashboard();

    totalItems.value = data.totalItems;
    borrowedItems.value = data.borrowedItems;
    availableItems.value = data.availableItems;

    latestItems.value = data.latestItems;

  } catch (error) {

    console.error("Dashboard Error:", error);

  }
};

onMounted(() => {
  loadDashboard();
});

const handleItemAction = (item) => {

  if (auth.role === "admin") {

    console.log("Edit Barang", item);

  } else {

    console.log("Rental Barang", item);

  }

};
</script>

<style scoped>

.container-fluid{
    padding:25px;
}

.card{
    border-radius:18px;
}

.card-header{
    border-bottom:none;
    padding:20px;
}

</style>